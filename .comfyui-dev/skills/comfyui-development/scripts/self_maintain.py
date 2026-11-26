#!/usr/bin/env python3
"""Explicit self-maintenance for ComfyUI upstream routing and snapshots.

This helper is intentionally narrow. A scan is read-only. Apply mode may update only:

- references/sources.json
- references/upstream-snapshot.json

Broader local self-modification is a separate, explicitly authorized agent workflow guarded
by maintenance_boundary.py. This helper never edits skills, public documentation, tests,
manifests, versions, changelogs, executable maintenance guards, or release artifacts.
"""
from __future__ import annotations

import argparse
import base64
import binascii
from datetime import datetime, timezone
import json
import os
from pathlib import Path
import re
import sys
import tempfile
import urllib.error
import urllib.parse

from discover_comfy_org import fetch_org_repositories, load_registry as load_curated_registry, normalize
from github_http import github_get_json

SCRIPT_DIR = Path(__file__).resolve().parent
SKILL_ROOT = SCRIPT_DIR.parent
REFERENCES = SKILL_ROOT / "references"
REGISTRY_PATH = REFERENCES / "sources.json"
SNAPSHOT_PATH = REFERENCES / "upstream-snapshot.json"

SNAPSHOT_SCHEMA_VERSION = 1
DECISIONS_SCHEMA_VERSION = 1
REGISTRY_SCHEMA_VERSION = 3
ALLOWED_STATUS = {"active", "experimental", "historical", "archived", "superseded"}
ALLOWED_ROUTE_FIELDS = {"domain", "role", "specialist", "status", "superseded_by", "authority_notes"}
MAX_JSON_INPUT_BYTES = 8 * 1024 * 1024

REPLACEMENT_PATTERNS = (
    re.compile(r"\bmerged into\b", re.I),
    re.compile(r"\bmoved to\b", re.I),
    re.compile(r"\bnew location\b", re.I),
    re.compile(r"\breplaced by\b", re.I),
    re.compile(r"\bsuperseded by\b", re.I),
    re.compile(r"\bno longer maintained\b", re.I),
    re.compile(r"\bnow part of\b", re.I),
    re.compile(r"\bhas been merged\b", re.I),
)


def _now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def _read_json_object(path: Path, label: str) -> dict:
    size = path.stat().st_size
    if size > MAX_JSON_INPUT_BYTES:
        raise ValueError(f"{label} exceeds the {MAX_JSON_INPUT_BYTES}-byte input limit")
    raw = path.read_bytes()
    if len(raw) > MAX_JSON_INPUT_BYTES:
        raise ValueError(f"{label} exceeds the {MAX_JSON_INPUT_BYTES}-byte input limit")
    try:
        text = raw.decode("utf-8")
    except UnicodeDecodeError as exc:
        raise UnicodeError(f"{label} is not valid UTF-8") from exc
    data = json.loads(text)
    if not isinstance(data, dict):
        raise ValueError(f"{label} root must be a JSON object")
    return data


def load_snapshot(path: Path = SNAPSHOT_PATH) -> dict:
    data = _read_json_object(path, "upstream snapshot")
    if data.get("schema_version") != SNAPSHOT_SCHEMA_VERSION:
        raise ValueError(f"unsupported upstream snapshot schema_version: {data.get('schema_version')!r}")
    if data.get("organization") != "Comfy-Org":
        raise ValueError("upstream snapshot organization must be Comfy-Org")
    repos = data.get("repositories")
    if not isinstance(repos, list):
        raise ValueError("upstream snapshot repositories must be an array")
    seen = set()
    for item in repos:
        if not isinstance(item, dict) or not isinstance(item.get("repo"), str):
            raise ValueError("each upstream snapshot entry must contain a repo string")
        repo = item["repo"]
        if not repo.startswith("Comfy-Org/"):
            raise ValueError(f"snapshot contains non-Comfy-Org repository: {repo}")
        if repo in seen:
            raise ValueError(f"duplicate repository in upstream snapshot: {repo}")
        seen.add(repo)
    return data


def load_registry_data(path: Path = REGISTRY_PATH) -> dict:
    data = _read_json_object(path, "sources registry")
    if data.get("schema_version") != REGISTRY_SCHEMA_VERSION:
        raise ValueError(f"sources registry must use schema_version {REGISTRY_SCHEMA_VERSION}")
    org = data.get("organization")
    if not isinstance(org, dict) or org.get("owner") != "Comfy-Org":
        raise ValueError("sources registry organization owner must be Comfy-Org")
    repos = data.get("repositories")
    if not isinstance(repos, list):
        raise ValueError("sources registry repositories must be an array")
    seen = set()
    for item in repos:
        _validate_route_entry(item, seen=seen)
    return data


def _validate_route_entry(item: object, *, seen: set[str] | None = None) -> None:
    if not isinstance(item, dict):
        raise ValueError("each route entry must be a JSON object")
    repo = item.get("repo")
    if not isinstance(repo, str) or not repo.startswith("Comfy-Org/") or repo.count("/") != 1:
        raise ValueError(f"invalid route repository: {repo!r}")
    if seen is not None:
        if repo in seen:
            raise ValueError(f"duplicate route repository: {repo}")
        seen.add(repo)
    if item.get("url") != f"https://github.com/{repo}":
        raise ValueError(f"route URL does not match repository: {repo}")
    for field in ("domain", "role"):
        if not isinstance(item.get(field), str) or not item[field].strip():
            raise ValueError(f"route {repo} requires non-empty {field}")
    status = item.get("status", "active")
    if status not in ALLOWED_STATUS:
        raise ValueError(f"route {repo} has unsupported status: {status!r}")
    superseded_by = item.get("superseded_by")
    if superseded_by is not None:
        if status != "superseded":
            raise ValueError(f"route {repo} may set superseded_by only when status is superseded")
        if not isinstance(superseded_by, str) or not superseded_by.startswith("Comfy-Org/"):
            raise ValueError(f"route {repo} has invalid superseded_by value")
    specialist = item.get("specialist")
    if specialist is not None and (not isinstance(specialist, str) or not specialist.startswith("comfyui-")):
        raise ValueError(f"route {repo} has invalid specialist hint")
    notes = item.get("authority_notes")
    if notes is not None and (not isinstance(notes, str) or not notes.strip()):
        raise ValueError(f"route {repo} has invalid authority_notes")


def snapshot_from_live(org: str, live_rows: list[dict]) -> dict:
    repositories = []
    for row in sorted(live_rows, key=lambda x: x.get("repo") or ""):
        repositories.append({
            "repo": row.get("repo"),
            "default_branch": row.get("default_branch"),
            "archived": bool(row.get("archived")),
            "fork": bool(row.get("fork")),
            "url": row.get("url"),
        })
    return {
        "schema_version": SNAPSHOT_SCHEMA_VERSION,
        "organization": org,
        "captured_at": _now_iso(),
        "purpose": "Baseline for detecting upstream repository additions, removals, branch changes, and archive-state changes. It is not an authority registry.",
        "compare_fields": ["default_branch", "archived"],
        "repositories": repositories,
    }


def compare_snapshot(snapshot: dict, live_rows: list[dict]) -> dict:
    old = {x["repo"]: x for x in snapshot["repositories"]}
    current = {x["repo"]: x for x in live_rows}
    new_repos = [current[name] for name in sorted(current.keys() - old.keys())]
    missing_repos = [old[name] for name in sorted(old.keys() - current.keys())]
    metadata_changes = []
    for name in sorted(old.keys() & current.keys()):
        changes = {}
        for field in snapshot.get("compare_fields", ["default_branch", "archived"]):
            before = old[name].get(field)
            after = current[name].get(field)
            if before != after:
                changes[field] = {"before": before, "after": after}
        if changes:
            metadata_changes.append({"repo": name, "changes": changes})
    return {
        "new_repositories": new_repos,
        "missing_repositories": missing_repos,
        "metadata_changes": metadata_changes,
    }


def fetch_readme_text(repo: str, token: str | None, timeout: float) -> str | None:
    owner, name = repo.split("/", 1)
    url = (
        "https://api.github.com/repos/"
        + urllib.parse.quote(owner, safe="")
        + "/"
        + urllib.parse.quote(name, safe="")
        + "/readme"
    )
    try:
        data = github_get_json(url, token, timeout)
    except urllib.error.HTTPError as exc:
        if exc.code == 404:
            return None
        raise
    if not isinstance(data, dict):
        raise ValueError(f"README response for {repo} was not an object")
    content = data.get("content")
    encoding = data.get("encoding")
    if not isinstance(content, str) or encoding != "base64":
        return None
    try:
        raw = base64.b64decode("".join(content.split()), validate=True)
    except (ValueError, binascii.Error) as exc:
        raise ValueError(f"README for {repo} contains invalid base64 content") from exc
    if len(raw) > 2 * 1024 * 1024:
        raise ValueError(f"README for {repo} exceeds 2 MiB maintenance limit")
    return raw.decode("utf-8", errors="replace")


def replacement_signals(repos: list[str], token: str | None, timeout: float) -> tuple[list[dict], list[dict]]:
    candidates = []
    errors = []
    for repo in sorted(set(repos)):
        try:
            text = fetch_readme_text(repo, token, timeout)
            if not text:
                continue
            matches = []
            for line in text.splitlines():
                clean = " ".join(line.strip().split())
                if not clean:
                    continue
                if any(pattern.search(clean) for pattern in REPLACEMENT_PATTERNS):
                    matches.append(clean[:300])
                if len(matches) >= 4:
                    break
            if matches:
                candidates.append({
                    "repo": repo,
                    "signals": matches,
                    "warning": "Heuristic only. Verify the official README/source and the proposed replacement before changing authority routing.",
                })
        except (ValueError, UnicodeError, urllib.error.URLError, urllib.error.HTTPError, json.JSONDecodeError) as exc:
            errors.append({"repo": repo, "error": str(exc)})
    return candidates, errors


def build_scan(token: str | None, timeout: float, max_pages: int, *, inspect_replacements: bool = True) -> tuple[dict, dict]:
    registry = load_registry_data()
    org, curated = load_curated_registry(REGISTRY_PATH)
    snapshot = load_snapshot()
    raw = fetch_org_repositories(org, token, timeout, max_pages)
    live_rows = [normalize(repo, curated) for repo in raw]
    comparison = compare_snapshot(snapshot, live_rows)
    live_names = {row["repo"] for row in live_rows}
    uncurated = [row for row in live_rows if row["repo"] not in curated]
    routed_missing = sorted(set(curated) - live_names)
    candidates: list[dict] = []
    readme_errors: list[dict] = []
    if inspect_replacements:
        candidates, readme_errors = replacement_signals(list(curated), token, timeout)
    report = {
        "schema_version": 1,
        "mode": "scan",
        "generated_at": _now_iso(),
        "organization": org,
        "baseline_captured_at": snapshot.get("captured_at"),
        "current_repository_count": len(live_rows),
        "curated_route_count": len(curated),
        **comparison,
        "unrouted_official_repositories": uncurated,
        "routed_repositories_missing_upstream": routed_missing,
        "replacement_candidates": candidates,
        "readme_scan_errors": readme_errors,
        "mutation_performed": False,
        "next_step": "Review evidence. Add only durable development subsystems or verified authority replacements. Ordinary new repos do not require a route.",
    }
    return report, snapshot_from_live(org, live_rows)


def load_decisions(path: Path | None) -> dict:
    if path is None:
        return {"schema_version": DECISIONS_SCHEMA_VERSION, "routes": []}
    data = _read_json_object(path, "maintenance decisions")
    if data.get("schema_version") != DECISIONS_SCHEMA_VERSION:
        raise ValueError(f"maintenance decisions must use schema_version {DECISIONS_SCHEMA_VERSION}")
    unknown = set(data) - {"schema_version", "routes"}
    if unknown:
        raise ValueError(f"maintenance decisions contain unsupported keys: {sorted(unknown)}")
    routes = data.get("routes", [])
    if not isinstance(routes, list):
        raise ValueError("maintenance decisions routes must be an array")
    seen = set()
    for action in routes:
        if not isinstance(action, dict):
            raise ValueError("each maintenance route decision must be an object")
        unknown_action = set(action) - ({"action", "repo"} | ALLOWED_ROUTE_FIELDS)
        if unknown_action:
            raise ValueError(f"maintenance route decision has unsupported keys: {sorted(unknown_action)}")
        op = action.get("action")
        repo = action.get("repo")
        if op not in {"add", "update"}:
            raise ValueError(f"unsupported maintenance action: {op!r}")
        if not isinstance(repo, str) or not repo.startswith("Comfy-Org/") or repo.count("/") != 1:
            raise ValueError(f"invalid maintenance repository: {repo!r}")
        if repo in seen:
            raise ValueError(f"multiple maintenance decisions for the same repository: {repo}")
        seen.add(repo)
        if op == "add":
            for field in ("domain", "role"):
                if not isinstance(action.get(field), str) or not action[field].strip():
                    raise ValueError(f"add decision for {repo} requires non-empty {field}")
        elif not (set(action) & ALLOWED_ROUTE_FIELDS):
            raise ValueError(f"update decision for {repo} does not change any routing field")
        status = action.get("status")
        if status is not None and status not in ALLOWED_STATUS:
            raise ValueError(f"unsupported route status in decision for {repo}: {status!r}")
    return data


def apply_decisions(registry: dict, decisions: dict, live_snapshot: dict, specialist_names: set[str]) -> dict:
    # Work on a detached copy so a rejected decision set cannot partially mutate caller state.
    registry = json.loads(json.dumps(registry))
    live = {x["repo"]: x for x in live_snapshot["repositories"]}
    entries = registry["repositories"]
    by_repo = {x["repo"]: x for x in entries}
    pending_adds = {x["repo"] for x in decisions["routes"] if x["action"] == "add"}

    for action in decisions["routes"]:
        repo = action["repo"]
        is_live = repo in live
        if action["action"] == "add":
            if not is_live:
                raise ValueError(f"cannot add a route for a repository that is not in the current Comfy-Org snapshot: {repo}")
            if repo in by_repo:
                raise ValueError(f"route already exists; use update instead: {repo}")
            target = {
                "repo": repo,
                "url": f"https://github.com/{repo}",
                "domain": action["domain"].strip(),
                "role": action["role"].strip(),
            }
            entries.append(target)
            by_repo[repo] = target
        else:
            if repo not in by_repo:
                raise ValueError(f"route does not exist; use add instead: {repo}")
            target = by_repo[repo]

        for field in ALLOWED_ROUTE_FIELDS:
            if field not in action:
                continue
            value = action[field]
            if value is None and field in {"specialist", "superseded_by", "authority_notes"}:
                target.pop(field, None)
                continue
            if isinstance(value, str):
                value = value.strip()
            if field in {"domain", "role", "authority_notes"} and (not isinstance(value, str) or not value):
                raise ValueError(f"{field} must be a non-empty string for {repo}")
            if field == "specialist":
                if value in {"comfyui-development", "comfyui-self-maintenance"} or value not in specialist_names:
                    raise ValueError(f"unknown or invalid specialist routing target for {repo}: {value!r}")
            target[field] = value

        status = target.get("status", "active")
        if not is_live and status not in {"historical", "archived", "superseded"}:
            raise ValueError(f"route missing from current Comfy-Org must be marked historical, archived, or superseded: {repo}")
        superseded_by = target.get("superseded_by")
        if superseded_by:
            if status != "superseded":
                raise ValueError(f"{repo} sets superseded_by but is not marked superseded")
            if superseded_by == repo:
                raise ValueError(f"{repo} cannot supersede itself")
            if superseded_by not in live:
                raise ValueError(f"replacement repository is not in current Comfy-Org snapshot: {superseded_by}")
            if live[superseded_by].get("archived"):
                raise ValueError(f"replacement repository is archived: {superseded_by}")
            if superseded_by not in by_repo and superseded_by not in pending_adds:
                raise ValueError(f"replacement must already be routed or added in the same decision set: {superseded_by}")
        elif status == "superseded":
            raise ValueError(f"superseded route requires superseded_by: {repo}")

    entries.sort(key=lambda x: x["repo"].casefold())
    seen: set[str] = set()
    for entry in entries:
        _validate_route_entry(entry, seen=seen)
    return registry


def _json_bytes(data: dict) -> bytes:
    return (json.dumps(data, indent=2, sort_keys=False) + "\n").encode("utf-8")


def _write_temp_for(path: Path, payload: bytes) -> Path:
    if not path.parent.is_dir():
        raise OSError(f"parent directory does not exist: {path.parent}")
    fd, name = tempfile.mkstemp(prefix=f".{path.name}.", suffix=".tmp", dir=path.parent)
    tmp = Path(name)
    try:
        with os.fdopen(fd, "wb") as fh:
            fh.write(payload)
            fh.flush()
            os.fsync(fh.fileno())
        return tmp
    except BaseException:
        try:
            tmp.unlink(missing_ok=True)
        finally:
            raise


def commit_snapshot(snapshot: dict, snapshot_path: Path = SNAPSHOT_PATH) -> None:
    """Atomically refresh only the upstream snapshot."""
    tmp = _write_temp_for(snapshot_path, _json_bytes(snapshot))
    try:
        os.replace(tmp, snapshot_path)
    finally:
        tmp.unlink(missing_ok=True)


def commit_maintenance(registry: dict, snapshot: dict, registry_path: Path = REGISTRY_PATH, snapshot_path: Path = SNAPSHOT_PATH) -> None:
    """Replace registry and snapshot as one best-effort transaction with rollback."""
    original_registry = registry_path.read_bytes()
    original_snapshot = snapshot_path.read_bytes()
    reg_tmp: Path | None = None
    snap_tmp: Path | None = None
    replaced_registry = False
    try:
        reg_tmp = _write_temp_for(registry_path, _json_bytes(registry))
        snap_tmp = _write_temp_for(snapshot_path, _json_bytes(snapshot))
        os.replace(reg_tmp, registry_path)
        replaced_registry = True
        os.replace(snap_tmp, snapshot_path)
    except BaseException as exc:
        for tmp in (reg_tmp, snap_tmp):
            if tmp is not None:
                tmp.unlink(missing_ok=True)
        rollback_errors = []
        if replaced_registry:
            rollback_tmp: Path | None = None
            try:
                rollback_tmp = _write_temp_for(registry_path, original_registry)
                os.replace(rollback_tmp, registry_path)
            except BaseException as rollback_exc:
                rollback_errors.append(str(rollback_exc))
            finally:
                if rollback_tmp is not None:
                    rollback_tmp.unlink(missing_ok=True)
        try:
            snapshot_changed = snapshot_path.read_bytes() != original_snapshot
        except OSError as read_exc:
            rollback_errors.append(str(read_exc))
            snapshot_changed = False
        if snapshot_changed:
            rollback_tmp = None
            try:
                rollback_tmp = _write_temp_for(snapshot_path, original_snapshot)
                os.replace(rollback_tmp, snapshot_path)
            except BaseException as rollback_exc:
                rollback_errors.append(str(rollback_exc))
            finally:
                if rollback_tmp is not None:
                    rollback_tmp.unlink(missing_ok=True)
        if rollback_errors:
            raise RuntimeError(f"maintenance write failed and rollback was incomplete: {exc}; rollback: {rollback_errors}") from exc
        raise
    finally:
        for tmp in (reg_tmp, snap_tmp):
            if tmp is not None:
                tmp.unlink(missing_ok=True)


def discovered_specialists() -> set[str]:
    skill_dir = SKILL_ROOT.parent
    excluded = {"comfyui-development", "comfyui-self-maintenance"}
    return {p.name for p in skill_dir.iterdir() if p.is_dir() and (p / "SKILL.md").is_file() and p.name not in excluded}


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)

    scan = sub.add_parser("scan", help="Read-only upstream comparison. Never modifies the package.")
    scan.add_argument("--token", default=os.environ.get("GITHUB_TOKEN"), help="GitHub token. Prefer GITHUB_TOKEN over command-line use.")
    scan.add_argument("--timeout", type=float, default=10.0)
    scan.add_argument("--max-pages", type=int, default=100)
    scan.add_argument("--skip-replacement-signals", action="store_true", help="Skip README replacement-signal checks.")

    apply = sub.add_parser("apply", help="Apply reviewed routing decisions and refresh the upstream snapshot.")
    apply.add_argument("--decisions", type=Path, help="Reviewed decisions JSON. Omit to refresh only the snapshot.")
    apply.add_argument("--token", default=os.environ.get("GITHUB_TOKEN"), help="GitHub token. Prefer GITHUB_TOKEN over command-line use.")
    apply.add_argument("--timeout", type=float, default=10.0)
    apply.add_argument("--max-pages", type=int, default=100)
    apply.add_argument("--yes", action="store_true", help="Required mutation guard confirming explicit self-maintenance was requested.")

    args = parser.parse_args()
    try:
        if args.timeout <= 0:
            raise ValueError("timeout must be greater than 0 seconds")
        if args.max_pages <= 0:
            raise ValueError("max-pages must be greater than 0")

        if args.command == "scan":
            report, _live_snapshot = build_scan(
                args.token,
                args.timeout,
                args.max_pages,
                inspect_replacements=not args.skip_replacement_signals,
            )
            print(json.dumps(report, indent=2))
            return 0

        if not args.yes:
            raise ValueError("apply mode requires --yes; use it only after the user explicitly requested self-maintenance")
        report, live_snapshot = build_scan(args.token, args.timeout, args.max_pages, inspect_replacements=False)
        decisions = load_decisions(args.decisions)
        registry = load_registry_data()
        updated = apply_decisions(registry, decisions, live_snapshot, discovered_specialists())
        if decisions["routes"]:
            commit_maintenance(updated, live_snapshot)
            changed_files = [
                str(REGISTRY_PATH.relative_to(SKILL_ROOT)),
                str(SNAPSHOT_PATH.relative_to(SKILL_ROOT)),
            ]
        else:
            commit_snapshot(live_snapshot)
            changed_files = [str(SNAPSHOT_PATH.relative_to(SKILL_ROOT))]
        result = {
            "schema_version": 1,
            "mode": "apply",
            "applied_at": _now_iso(),
            "route_actions_applied": len(decisions["routes"]),
            "snapshot_repository_count": len(live_snapshot["repositories"]),
            "changed_files": changed_files,
            "forbidden_release_work_performed": False,
            "maintainer_boundary": {
                "broader_work_requires_user_choice": True,
                "choices": [
                    "report_only",
                    "self_modify_only",
                    "report_and_self_modify",
                    "stop",
                ],
                "report_helper": "scripts/maintenance_boundary.py report",
                "local_plan_helper": "scripts/maintenance_boundary.py validate-plan",
                "local_apply_helper": "scripts/maintenance_boundary.py apply-local --yes",
                "local_restore_helper": "scripts/maintenance_boundary.py restore-local --yes",
                "note": "No broader self-modification or GitHub Issue filing is performed by this routing/snapshot helper.",
            },
            "scan_summary": {
                "new_repositories": len(report["new_repositories"]),
                "metadata_changes": len(report["metadata_changes"]),
                "replacement_candidates": len(report["replacement_candidates"]),
            },
        }
        print(json.dumps(result, indent=2))
        return 0
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError, RuntimeError, urllib.error.URLError, urllib.error.HTTPError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
