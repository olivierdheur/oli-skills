#!/usr/bin/env python3
"""Conservative ComfyUI workflow preflight against a live object_info catalog.

This does not replace ComfyUI's current official validator. It catches common,
deterministic mismatches in frontend and API-format workflow JSON.
"""
from __future__ import annotations

import argparse
import json
import os
from pathlib import Path
import sys
import urllib.error

from comfy_http import positive_timeout, prepare_server, request_json

MAX_WORKFLOW_BYTES = 64 * 1024 * 1024



def load_workflow_json(path: Path):
    size = path.stat().st_size
    if size > MAX_WORKFLOW_BYTES:
        raise ValueError(f"workflow exceeds the {MAX_WORKFLOW_BYTES}-byte input limit")
    raw = path.read_bytes()
    if len(raw) > MAX_WORKFLOW_BYTES:
        raise ValueError(f"workflow exceeds the {MAX_WORKFLOW_BYTES}-byte input limit")
    try:
        text = raw.decode("utf-8")
    except UnicodeDecodeError as exc:
        raise UnicodeError("workflow is not valid UTF-8") from exc
    return json.loads(text)

def fetch_catalog(server: str, api_key: str | None, timeout: float):
    errors = []
    for path in ("/object_info", "/api/object_info"):
        url = server + path
        try:
            data = request_json(url, api_key, timeout)
            if isinstance(data, dict):
                return data, url
            errors.append(f"{url}: response was not an object")
        except (urllib.error.URLError, urllib.error.HTTPError, json.JSONDecodeError, ValueError) as exc:
            errors.append(f"{url}: {exc}")
    raise RuntimeError("Unable to fetch live node catalog:\n" + "\n".join(errors))


def detect_format(data):
    if isinstance(data, dict) and isinstance(data.get("nodes"), list):
        return "frontend"
    if isinstance(data, dict) and isinstance(data.get("prompt"), dict):
        return "api-envelope"
    if isinstance(data, dict) and data and all(isinstance(v, dict) for v in data.values()):
        values = list(data.values())
        if any("class_type" in value for value in values) or all("inputs" in value for value in values):
            return "api"
    return "unknown"


def catalog_inputs(defn):
    if not isinstance(defn, dict):
        return {}, {}, {}
    inp = defn.get("input") or defn.get("inputs") or {}
    if not isinstance(inp, dict):
        return {}, {}, {}
    req = inp.get("required") if isinstance(inp.get("required"), dict) else {}
    opt = inp.get("optional") if isinstance(inp.get("optional"), dict) else {}
    hidden = inp.get("hidden") if isinstance(inp.get("hidden"), dict) else {}
    return req, opt, hidden


def enum_values(spec):
    # Common object_info shapes represent combo choices as the first element.
    if isinstance(spec, (list, tuple)) and spec:
        first = spec[0]
        if isinstance(first, list):
            return first
    return None


def output_count(defn):
    if not isinstance(defn, dict):
        return None
    out = defn.get("output") or defn.get("outputs")
    if isinstance(out, (list, tuple, dict)):
        return len(out)
    return None


def slot_index(value):
    if isinstance(value, bool):
        return None
    if isinstance(value, int):
        return value
    if isinstance(value, str) and value.isdigit():
        return int(value)
    return None


def add(items, code, message, **extra):
    item = {"code": code, "message": message}
    item.update(extra)
    items.append(item)


def validate_api(graph, catalog, errors, warnings):
    if not isinstance(graph, dict):
        add(errors, "bad_api_graph", "API workflow graph is not a JSON object")
        return
    if not graph:
        add(errors, "empty_graph", "API workflow graph contains no nodes")
        return
    node_ids = {str(k) for k in graph}
    for node_id, node in graph.items():
        nid = str(node_id)
        if not isinstance(node, dict):
            add(errors, "bad_node", f"Node {nid} is not a JSON object", node_id=nid)
            continue
        cls = node.get("class_type")
        if not isinstance(cls, str) or not cls:
            add(errors, "missing_class_type", f"Node {nid} has no class_type", node_id=nid)
            continue
        if cls not in catalog:
            add(errors, "unknown_node", f"Node {nid} uses unavailable class {cls!r}", node_id=nid, class_type=cls)
            continue
        defn = catalog[cls]
        req, opt, hidden = catalog_inputs(defn)
        inputs = node.get("inputs") if isinstance(node.get("inputs"), dict) else {}
        for name in req:
            if name not in inputs and name not in hidden:
                add(errors, "missing_required_input", f"Node {nid} ({cls}) is missing required input {name!r}", node_id=nid, field=name)
        known = set(req) | set(opt) | set(hidden)
        for name, value in inputs.items():
            if known and name not in known:
                add(warnings, "unknown_input", f"Node {nid} ({cls}) supplies input {name!r} not present in live definition", node_id=nid, field=name)
                continue
            spec = req.get(name, opt.get(name))
            choices = enum_values(spec)
            link_like = isinstance(value, list) and len(value) == 2 and slot_index(value[1]) is not None
            is_link = link_like and str(value[0]) in node_ids
            if is_link:
                src, slot = str(value[0]), slot_index(value[1])
                src_node = graph.get(src, graph.get(int(src) if src.isdigit() else src))
                if isinstance(src_node, dict):
                    src_cls = src_node.get("class_type")
                    count = output_count(catalog.get(src_cls))
                    if count is not None and not (0 <= slot < count):
                        add(errors, "bad_output_slot", f"Node {nid} input {name!r} references output {slot} of {src}, but live definition exposes {count} outputs", node_id=nid, field=name)
            elif link_like and isinstance(value[0], (str, int)):
                add(warnings, "unresolved_link_like_value", f"Node {nid} input {name!r} looks like a link to missing node {value[0]!r}", node_id=nid, field=name)
            elif choices is not None and value not in choices:
                add(errors, "invalid_choice", f"Node {nid} ({cls}) input {name!r} has value {value!r} not present in live choices", node_id=nid, field=name)


def frontend_link_fields(link):
    """Return (link_id, src_id, src_slot, dst_id, dst_slot) for v1.0 or legacy v0.4 links."""
    if isinstance(link, dict):
        required = ("id", "origin_id", "origin_slot", "target_id", "target_slot", "type")
        if not all(key in link for key in required):
            return None
        return (
            link["id"],
            link["origin_id"],
            link["origin_slot"],
            link["target_id"],
            link["target_slot"],
        )
    if isinstance(link, list) and len(link) == 6:
        return tuple(link[:5])
    return None


def validate_frontend(workflow, catalog, errors, warnings):
    nodes = workflow.get("nodes", [])
    if not isinstance(nodes, list):
        add(errors, "bad_nodes", "Frontend workflow nodes field is not an array")
        return

    by_id = {}
    for node in nodes:
        if not isinstance(node, dict):
            add(errors, "bad_node", "Frontend workflow contains a non-object node")
            continue
        if "id" not in node:
            add(errors, "missing_node_id", "Frontend workflow contains a node with no id")
            continue
        raw_id = node["id"]
        if isinstance(raw_id, bool) or not isinstance(raw_id, (int, str)) or raw_id == "":
            add(errors, "bad_node_id", f"Frontend workflow contains invalid node id {raw_id!r}")
            continue
        nid = str(raw_id)
        if nid in by_id:
            add(errors, "duplicate_node_id", f"Frontend workflow contains duplicate node id {nid}", node_id=nid)
            continue
        by_id[nid] = node

    input_link_refs = []
    output_link_refs = []
    for nid, node in by_id.items():
        cls = node.get("type")
        if not isinstance(cls, str) or not cls:
            add(errors, "missing_node_type", f"Frontend node {nid} has no type", node_id=nid)
            continue
        if cls not in catalog:
            add(errors, "unknown_node", f"Node {nid} uses unavailable type {cls!r}", node_id=nid, class_type=cls)
            continue
        req, opt, hidden = catalog_inputs(catalog[cls])
        known = set(req) | set(opt) | set(hidden)
        raw_inputs = node.get("inputs", [])
        if not isinstance(raw_inputs, list):
            add(errors, "bad_inputs", f"Frontend node {nid} inputs field is not an array", node_id=nid)
            inputs = []
        else:
            inputs = raw_inputs
        for input_index, entry in enumerate(inputs):
            if not isinstance(entry, dict):
                add(warnings, "bad_input_entry", f"Node {nid} contains a non-object frontend input entry", node_id=nid)
                continue
            name = entry.get("name")
            if name and known and name not in known:
                add(warnings, "unknown_input", f"Node {nid} ({cls}) frontend input {name!r} is not present in live definition", node_id=nid, field=name)
            link = entry.get("link")
            if link is not None:
                if isinstance(link, bool) or not isinstance(link, int):
                    add(errors, "bad_link_id", f"Node {nid} input {name!r} has invalid link identifier {link!r}", node_id=nid, field=name)
                else:
                    expected_slot = slot_index(entry.get("slot_index"))
                    if expected_slot is None:
                        expected_slot = input_index
                    input_link_refs.append((nid, name, link, expected_slot))

        raw_outputs = node.get("outputs", [])
        if not isinstance(raw_outputs, list):
            add(errors, "bad_outputs", f"Frontend node {nid} outputs field is not an array", node_id=nid)
            outputs = []
        else:
            outputs = raw_outputs
        for output_index, entry in enumerate(outputs):
            if not isinstance(entry, dict):
                add(warnings, "bad_output_entry", f"Node {nid} contains a non-object frontend output entry", node_id=nid)
                continue
            links_for_output = entry.get("links")
            if links_for_output is None:
                continue
            if not isinstance(links_for_output, list):
                add(errors, "bad_output_links", f"Node {nid} output {entry.get('name')!r} links field is not an array or null", node_id=nid)
                continue
            expected_slot = slot_index(entry.get("slot_index"))
            if expected_slot is None:
                expected_slot = output_index
            for link_id in links_for_output:
                if isinstance(link_id, bool) or not isinstance(link_id, int):
                    add(errors, "bad_link_id", f"Node {nid} output {entry.get('name')!r} has invalid link identifier {link_id!r}", node_id=nid)
                else:
                    output_link_refs.append((nid, entry.get("name"), link_id, expected_slot))

    links = workflow.get("links", [])
    if links is not None and not isinstance(links, list):
        add(errors, "bad_links", "Frontend workflow links field is not an array")
        return

    seen_link_ids = set()
    links_by_id = {}
    for link in links or []:
        fields = frontend_link_fields(link)
        if fields is None:
            add(errors, "malformed_link", f"Unrecognized frontend link structure: {link!r}")
            continue
        link_id, src_id, src_slot_raw, dst_id, dst_slot_raw = fields
        if isinstance(link_id, bool) or not isinstance(link_id, int):
            add(errors, "bad_link_id", f"Frontend link has invalid numeric id {link_id!r}")
            continue
        link_key = str(link_id)
        if link_key in seen_link_ids:
            add(errors, "duplicate_link_id", f"Frontend workflow contains duplicate link id {link_id}")
            continue
        seen_link_ids.add(link_key)

        src = by_id.get(str(src_id))
        dst = by_id.get(str(dst_id))
        if src is None:
            add(errors, "missing_source_node", f"Link {link_id} references missing source node {src_id}")
        if dst is None:
            add(errors, "missing_destination_node", f"Link {link_id} references missing destination node {dst_id}")

        src_slot = slot_index(src_slot_raw)
        if src_slot is None or src_slot < 0:
            add(errors, "bad_output_slot", f"Link {link_id} has invalid source output slot {src_slot_raw!r}")
        elif src is not None and src.get("type") in catalog:
            count = output_count(catalog[src["type"]])
            if count is not None and not (0 <= src_slot < count):
                add(errors, "bad_output_slot", f"Link {link_id} references output {src_slot} of node {src_id}, but live definition exposes {count} outputs")

        dst_slot = slot_index(dst_slot_raw)
        if dst_slot is None or dst_slot < 0:
            add(errors, "bad_input_slot", f"Link {link_id} has invalid destination input slot {dst_slot_raw!r}")
        elif dst is not None and isinstance(dst.get("inputs"), list):
            count = len(dst["inputs"])
            if not (0 <= dst_slot < count):
                add(errors, "bad_input_slot", f"Link {link_id} references input slot {dst_slot} of node {dst_id}, but workflow node exposes {count} input slots")

        links_by_id[link_id] = {
            "src_id": str(src_id), "src_slot": src_slot,
            "dst_id": str(dst_id), "dst_slot": dst_slot,
        }

    for nid, name, link_id, expected_slot in input_link_refs:
        resolved = links_by_id.get(link_id)
        if resolved is None:
            add(errors, "dangling_input_link", f"Node {nid} input {name!r} references missing link {link_id}", node_id=nid, field=name)
            continue
        if resolved["dst_id"] != nid or resolved["dst_slot"] != expected_slot:
            add(errors, "input_link_mismatch", f"Node {nid} input {name!r} references link {link_id}, but that link targets node {resolved['dst_id']} slot {resolved['dst_slot']}", node_id=nid, field=name)

    for nid, name, link_id, expected_slot in output_link_refs:
        resolved = links_by_id.get(link_id)
        if resolved is None:
            add(errors, "dangling_output_link", f"Node {nid} output {name!r} references missing link {link_id}", node_id=nid, field=name)
            continue
        if resolved["src_id"] != nid or resolved["src_slot"] != expected_slot:
            add(errors, "output_link_mismatch", f"Node {nid} output {name!r} references link {link_id}, but that link originates at node {resolved['src_id']} slot {resolved['src_slot']}", node_id=nid, field=name)

def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("workflow", type=Path)
    ap.add_argument("--server", default=os.environ.get("COMFYUI_URL", "http://127.0.0.1:8188"))
    ap.add_argument("--api-key", default=os.environ.get("COMFY_API_KEY"))
    ap.add_argument("--allow-remote-api-key", action="store_true", help="Allow sending the API key to a non-loopback server URL")
    ap.add_argument("--timeout", type=float, default=10.0)
    ap.add_argument("--json", action="store_true", dest="as_json")
    args = ap.parse_args()

    result = {"workflow": str(args.workflow), "valid": False, "format": None, "catalog_url": None, "errors": [], "warnings": []}
    try:
        data = load_workflow_json(args.workflow)
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError) as exc:
        add(result["errors"], "json_error", str(exc))
        print(json.dumps(result, indent=2) if args.as_json else f"INVALID: {exc}")
        return 1

    fmt = detect_format(data)
    result["format"] = fmt
    if fmt == "unknown":
        add(result["errors"], "unknown_format", "Could not identify frontend or API workflow format")
        print(json.dumps(result, indent=2) if args.as_json else "INVALID: unknown workflow format")
        return 1

    try:
        timeout = positive_timeout(args.timeout)
        server = prepare_server(args.server, args.api_key, args.allow_remote_api_key)
        catalog, url = fetch_catalog(server, args.api_key, timeout)
        result["catalog_url"] = url
    except ValueError as exc:
        add(result["errors"], "unsafe_or_invalid_server", str(exc))
        print(json.dumps(result, indent=2) if args.as_json else f"UNVERIFIED: {exc}")
        return 2
    except RuntimeError as exc:
        add(result["errors"], "catalog_unavailable", str(exc))
        print(json.dumps(result, indent=2) if args.as_json else f"UNVERIFIED: {exc}")
        return 2

    graph = data.get("prompt") if fmt == "api-envelope" else data
    if fmt in ("api", "api-envelope"):
        validate_api(graph, catalog, result["errors"], result["warnings"])
    else:
        validate_frontend(data, catalog, result["errors"], result["warnings"])

    result["valid"] = not result["errors"]
    if args.as_json:
        print(json.dumps(result, indent=2))
    else:
        print("VALID" if result["valid"] else "INVALID")
        print(f"format: {result['format']}")
        print(f"catalog: {result['catalog_url']}")
        for error in result["errors"]:
            print(f"ERROR [{error['code']}] {error['message']}")
        for warning in result["warnings"]:
            print(f"WARN  [{warning['code']}] {warning['message']}")
    return 0 if result["valid"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
