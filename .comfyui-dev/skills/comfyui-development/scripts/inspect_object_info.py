#!/usr/bin/env python3
"""Inspect live ComfyUI node definitions without third-party dependencies."""
from __future__ import annotations

import argparse
import json
import os
import tempfile
from pathlib import Path
import sys
import urllib.error
import urllib.parse

from comfy_http import positive_timeout, prepare_server, request_json


def _specific_node_payload(data: object, node: str) -> dict | None:
    if not isinstance(data, dict):
        return None
    if node in data:
        return {node: data[node]}
    # Some servers may return the definition directly from a node-specific route.
    definition_keys = {"input", "inputs", "output", "outputs", "display_name", "category"}
    if data and definition_keys.intersection(data):
        return {node: data}
    return None


def fetch_object_info(server: str, node: str | None, api_key: str | None, timeout: float):
    encoded = urllib.parse.quote(node, safe="") if node else None
    paths = []
    if encoded:
        paths += [f"/object_info/{encoded}", f"/api/object_info/{encoded}"]
    else:
        paths += ["/object_info", "/api/object_info"]

    errors = []
    for path in paths:
        url = server + path
        try:
            data = request_json(url, api_key=api_key, timeout=timeout)
            if node:
                selected = _specific_node_payload(data, node)
                if selected is not None:
                    return selected, url
                errors.append(f"{url}: node {node!r} was not present in the response")
            elif isinstance(data, dict):
                return data, url
            else:
                errors.append(f"{url}: response was not a JSON object")
        except (urllib.error.URLError, urllib.error.HTTPError, json.JSONDecodeError, ValueError) as exc:
            errors.append(f"{url}: {exc}")

    if node:
        # Some targets expose only the all-nodes route.
        for path in ["/object_info", "/api/object_info"]:
            url = server + path
            try:
                data = request_json(url, api_key=api_key, timeout=timeout)
                if isinstance(data, dict) and node in data:
                    return {node: data[node]}, url
                if isinstance(data, dict):
                    errors.append(f"{url}: node {node!r} was not present in the live catalog")
                else:
                    errors.append(f"{url}: response was not a JSON object")
            except (urllib.error.URLError, urllib.error.HTTPError, json.JSONDecodeError, ValueError) as exc:
                errors.append(f"{url}: {exc}")

    raise RuntimeError("Could not retrieve object_info.\n" + "\n".join(errors))


def summarize(name: str, definition: object) -> dict:
    if not isinstance(definition, dict):
        return {"name": name, "definition_type": type(definition).__name__}
    inputs = definition.get("input") or definition.get("inputs") or {}
    output = definition.get("output") or definition.get("outputs") or []
    result = {
        "name": name,
        "display_name": definition.get("display_name") or definition.get("name"),
        "category": definition.get("category"),
        "output_count": len(output) if isinstance(output, (list, tuple, dict)) else None,
    }
    if isinstance(inputs, dict):
        result["required_inputs"] = sorted((inputs.get("required") or {}).keys()) if isinstance(inputs.get("required"), dict) else []
        result["optional_inputs"] = sorted((inputs.get("optional") or {}).keys()) if isinstance(inputs.get("optional"), dict) else []
        result["hidden_inputs"] = sorted((inputs.get("hidden") or {}).keys()) if isinstance(inputs.get("hidden"), dict) else []
    return result


def write_output(path: Path, text: str, overwrite: bool = False) -> None:
    if path.exists() and path.is_dir():
        raise OSError(f"output path is a directory: {path}")
    parent = path.parent
    if parent and not parent.exists():
        raise OSError(f"output directory does not exist: {parent}")

    payload = text + "\n"
    if not overwrite:
        created = False
        try:
            with path.open("x", encoding="utf-8") as handle:
                created = True
                handle.write(payload)
            return
        except FileExistsError as exc:
            raise OSError(f"output file already exists: {path}; use --force-output to replace it") from exc
        except OSError:
            if created:
                try:
                    path.unlink(missing_ok=True)
                except OSError:
                    pass
            raise

    temp_name = None
    try:
        with tempfile.NamedTemporaryFile(
            "w",
            encoding="utf-8",
            dir=parent,
            prefix=f".{path.name}.",
            suffix=".tmp",
            delete=False,
        ) as handle:
            temp_name = handle.name
            handle.write(payload)
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(temp_name, path)
        temp_name = None
    finally:
        if temp_name is not None:
            try:
                Path(temp_name).unlink(missing_ok=True)
            except OSError:
                pass


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--server", default=os.environ.get("COMFYUI_URL", "http://127.0.0.1:8188"))
    ap.add_argument("--node", help="Exact node class/id to inspect")
    ap.add_argument("--search", help="Case-insensitive substring search over node ids and display names")
    ap.add_argument("--raw", action="store_true", help="Print full returned definitions")
    ap.add_argument("--output", type=Path, help="Write JSON result to this path")
    ap.add_argument("--force-output", action="store_true", help="Allow --output to replace an existing file")
    ap.add_argument("--api-key", default=os.environ.get("COMFY_API_KEY"))
    ap.add_argument("--allow-remote-api-key", action="store_true", help="Allow sending the API key to a non-loopback server URL")
    ap.add_argument("--timeout", type=float, default=10.0)
    args = ap.parse_args()

    try:
        timeout = positive_timeout(args.timeout)
        server = prepare_server(args.server, args.api_key, args.allow_remote_api_key)
        data, source_url = fetch_object_info(server, args.node, args.api_key, timeout)
    except (ValueError, RuntimeError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2

    if not isinstance(data, dict):
        print("ERROR: object_info response is not a JSON object", file=sys.stderr)
        return 2

    selected = data
    if args.search:
        q = args.search.casefold()
        selected = {}
        for name, definition in data.items():
            display = definition.get("display_name", "") if isinstance(definition, dict) else ""
            if q in str(name).casefold() or q in str(display).casefold():
                selected[name] = definition

    payload = {
        "source_url": source_url,
        "count": len(selected),
        "nodes": selected if args.raw else [summarize(name, selected[name]) for name in sorted(selected)],
    }

    text = json.dumps(payload, indent=2, sort_keys=False)
    if args.output:
        try:
            write_output(args.output, text, overwrite=args.force_output)
        except OSError as exc:
            print(f"ERROR: {exc}", file=sys.stderr)
            return 3
    print(text)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
