#!/usr/bin/env python3
"""Inspect a ComfyUI checkout and optionally probe a running server."""
from __future__ import annotations

import argparse
import json
import os
from pathlib import Path
import subprocess
import sys
import urllib.error
from urllib.parse import urlsplit, urlunsplit

from comfy_http import positive_timeout, prepare_server, request_json


def run_git(path: Path, *args: str, timeout: float = 5.0) -> str | None:
    env = os.environ.copy()
    env["GIT_OPTIONAL_LOCKS"] = "0"
    env["GIT_TERMINAL_PROMPT"] = "0"
    command = [
        "git",
        "-c",
        "core.fsmonitor=false",
        "-c",
        "core.untrackedCache=false",
        "-C",
        str(path),
        *args,
    ]
    try:
        p = subprocess.run(
            command,
            check=True,
            text=True,
            capture_output=True,
            stdin=subprocess.DEVNULL,
            timeout=timeout,
            env=env,
        )
        return p.stdout.strip()
    except (OSError, subprocess.CalledProcessError, subprocess.TimeoutExpired):
        return None


def sanitize_git_remote(value: str | None) -> str | None:
    """Remove credentials, query strings, and fragments from URL-style git remotes."""
    if not value:
        return value
    parsed = urlsplit(value)
    if not parsed.scheme or not parsed.hostname:
        # Git also accepts SCP-like remotes such as user@host:path. Never echo the
        # username because some setups use credentials in that position.
        if "@" in value and ":" in value.split("@", 1)[1]:
            _user, rest = value.split("@", 1)
            return rest
        return value
    host = parsed.hostname
    if ":" in host and not host.startswith("["):
        host = f"[{host}]"
    try:
        port = parsed.port
    except ValueError:
        port = None
    if port is not None:
        host = f"{host}:{port}"
    return urlunsplit((parsed.scheme, host, parsed.path, "", ""))


def probe(server: str, api_key: str | None, timeout: float, probe_nodes: bool) -> dict:
    result = {"server": server, "reachable": False, "probes": {}}
    candidates = {
        "system_stats": ["/system_stats", "/api/system_stats"],
        "features": ["/features", "/api/features"],
    }
    if probe_nodes:
        candidates["object_info"] = ["/object_info", "/api/object_info"]
    for name, paths in candidates.items():
        entry = {"ok": False}
        for path in paths:
            url = server + path
            try:
                data = request_json(url, api_key, timeout)
                entry = {"ok": True, "url": url}
                if name == "object_info" and isinstance(data, dict):
                    entry["node_count"] = len(data)
                elif name in {"system_stats", "features"} and isinstance(data, dict):
                    entry["data"] = data
                result["reachable"] = True
                break
            except (urllib.error.URLError, urllib.error.HTTPError, json.JSONDecodeError, ValueError) as exc:
                entry.setdefault("errors", []).append(f"{url}: {exc}")
        result["probes"][name] = entry
    return result


def inspect_checkout(path: Path, git_timeout: float = 5.0) -> dict:
    try:
        resolved = path.resolve()
    except OSError:
        resolved = path.absolute()
    info = {"path": str(resolved), "exists": path.exists()}
    if not path.exists():
        return info
    info.update({
        "git_commit": run_git(path, "rev-parse", "HEAD", timeout=git_timeout),
        "git_branch": run_git(path, "branch", "--show-current", timeout=git_timeout),
        "git_describe": run_git(path, "describe", "--tags", "--always", "--dirty", timeout=git_timeout),
        "git_origin": sanitize_git_remote(run_git(path, "remote", "get-url", "origin", timeout=git_timeout)),
        "git_status_short": run_git(path, "status", "--short", timeout=git_timeout),
    })
    comfy_api = path / "comfy_api"
    if comfy_api.is_dir():
        try:
            versions = sorted(p.name for p in comfy_api.iterdir() if p.is_dir() and p.name.startswith("v"))
        except OSError:
            versions = []
        info["comfy_api_version_dirs"] = versions
        info["comfy_api_latest_exists"] = (comfy_api / "latest").exists() or (comfy_api / "latest.py").exists()
    return info


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--comfy-path", type=Path, help="Path to the target ComfyUI checkout")
    ap.add_argument("--server", default=os.environ.get("COMFYUI_URL"), help="Optional running ComfyUI base URL")
    ap.add_argument("--probe-nodes", action="store_true", help="Also fetch object_info and report node count")
    ap.add_argument("--api-key", default=os.environ.get("COMFY_API_KEY"))
    ap.add_argument("--allow-remote-api-key", action="store_true", help="Allow sending the API key to a non-loopback server URL")
    ap.add_argument("--timeout", type=float, default=8.0)
    ap.add_argument("--git-timeout", type=float, default=5.0)
    args = ap.parse_args()

    try:
        timeout = positive_timeout(args.timeout)
        git_timeout = positive_timeout(args.git_timeout)
        server = prepare_server(args.server, args.api_key, args.allow_remote_api_key) if args.server else None
    except ValueError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2

    result = {
        "python": sys.version.split()[0],
        "python_executable": sys.executable,
        "checkout": inspect_checkout(args.comfy_path, git_timeout) if args.comfy_path else None,
        "runtime": probe(server, args.api_key, timeout, args.probe_nodes) if server else None,
    }
    print(json.dumps(result, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
