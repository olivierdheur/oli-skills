#!/usr/bin/env python3
"""Guarded maintainer handoff and transactional local skill self-modification.

This helper owns the write boundary for optional local self-modification. It can:

- validate an exact local skill modification plan;
- transactionally apply that plan with rollback on failure;
- keep a bounded local divergence ledger with before/after SHA-256 hashes;
- restore the latest recorded local transaction when no later drift is present;
- render a maintainer-ready GitHub Issue draft from structured findings;
- report whether the installed copy has local modifications.

It never publishes, commits, pushes, files an Issue, changes release metadata, edits public
package documentation, rewrites its own maintenance guard, or writes executable code.
"""
from __future__ import annotations

import argparse
import base64
import binascii
from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import sys
import tempfile
import uuid
from urllib.parse import quote

SCRIPT_DIR = Path(__file__).resolve().parent
ROOT_SKILL = SCRIPT_DIR.parent
SKILLS_ROOT = ROOT_SKILL.parent
PACKAGE_ROOT = SKILLS_ROOT.parent
REFERENCES = ROOT_SKILL / "references"
LOCAL_STATE_PATH = REFERENCES / "local-maintenance.json"
LOCAL_BACKUP_DIR = REFERENCES / "local-backups"
VERSION_PATH = PACKAGE_ROOT / "VERSION"
PACKAGE_JSON_PATH = PACKAGE_ROOT / "package.json"

FINDINGS_SCHEMA_VERSION = 1
PLAN_SCHEMA_VERSION = 2
LOCAL_STATE_SCHEMA_VERSION = 2
BACKUP_SCHEMA_VERSION = 1

ALLOWED_REASON_CODES = {
    "new_specialist_required",
    "task_router_change_required",
    "protocol_change_detected",
    "manifest_change_required",
    "test_contract_change_required",
    "public_documentation_change_required",
    "release_update_recommended",
    "maintenance_logic_change_required",
    "other_maintainer_review_required",
}

FORBIDDEN_SKILL_PREFIXES = (
    "skills/comfyui-self-maintenance/",
    "skills/comfyui-development/scripts/",
    "skills/comfyui-development/references/local-backups/",
)
FORBIDDEN_EXACT_PATHS = {
    "skills/comfyui-development/references/local-maintenance.json",
    "skills/comfyui-development/references/sources.json",
    "skills/comfyui-development/references/upstream-snapshot.json",
}
ALLOWED_SUFFIXES = {".md", ".json"}
MAX_TEXT = 12000
MAX_LIST = 100
MAX_RECORDS = 50
MAX_FILE_BYTES = 512 * 1024
MAX_TRANSACTION_BYTES = 4 * 1024 * 1024
MAX_JSON_INPUT_BYTES = 8 * 1024 * 1024


def _now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def _sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def _read_json_object(path: Path, label: str) -> dict:
    try:
        size = path.stat().st_size
    except OSError:
        raise
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


def _bounded_text(value: object, label: str, *, required: bool = True) -> str:
    if not isinstance(value, str):
        if required:
            raise ValueError(f"{label} must be a string")
        return ""
    value = value.strip() if required else value
    if required and not value:
        raise ValueError(f"{label} must not be empty")
    if len(value) > MAX_TEXT and label not in {"file content"}:
        raise ValueError(f"{label} exceeds {MAX_TEXT} characters")
    return value


def _string_list(value: object, label: str, *, allow_empty: bool = True) -> list[str]:
    if not isinstance(value, list):
        raise ValueError(f"{label} must be an array")
    if len(value) > MAX_LIST:
        raise ValueError(f"{label} exceeds {MAX_LIST} entries")
    result = []
    for i, item in enumerate(value):
        result.append(_bounded_text(item, f"{label}[{i}]"))
    if not allow_empty and not result:
        raise ValueError(f"{label} must not be empty")
    return result


def canonical_version() -> str:
    return VERSION_PATH.read_text(encoding="utf-8").strip()


def package_repository_url() -> str:
    data = _read_json_object(PACKAGE_JSON_PATH, "package.json")
    repo = data.get("repository")
    if isinstance(repo, dict):
        repo = repo.get("url")
    if not isinstance(repo, str) or not repo.strip():
        raise ValueError("package.json repository URL is missing")
    url = repo.strip()
    if url.startswith("git+"):
        url = url[4:]
    if url.endswith(".git"):
        url = url[:-4]
    if not url.startswith("https://github.com/"):
        raise ValueError("maintainer repository must be an https://github.com URL")
    return url


def _valid_sha256(value: object) -> bool:
    return (
        isinstance(value, str)
        and len(value) == 64
        and all(c in "0123456789abcdefABCDEF" for c in value)
    )


def load_local_state(path: Path = LOCAL_STATE_PATH) -> dict:
    data = _read_json_object(path, "local maintenance state")
    if data.get("schema_version") != LOCAL_STATE_SCHEMA_VERSION:
        raise ValueError(f"unsupported local maintenance schema_version: {data.get('schema_version')!r}")
    if data.get("base_package_version") != canonical_version():
        raise ValueError("local maintenance base_package_version does not match installed VERSION")
    locally_modified = data.get("locally_modified")
    if not isinstance(locally_modified, bool):
        raise ValueError("local maintenance locally_modified must be boolean")
    last_modified_at = data.get("last_modified_at")
    if last_modified_at is not None and (not isinstance(last_modified_at, str) or not last_modified_at.strip()):
        raise ValueError("local maintenance last_modified_at must be null or a non-empty string")
    records = data.get("records")
    if not isinstance(records, list):
        raise ValueError("local maintenance records must be an array")
    if len(records) > MAX_RECORDS:
        raise ValueError(f"local maintenance records exceed {MAX_RECORDS}")
    if locally_modified != bool(records):
        raise ValueError("local maintenance locally_modified does not match whether records exist")
    if records and last_modified_at is None:
        raise ValueError("local maintenance last_modified_at is required when records exist")
    if not records and last_modified_at is not None:
        raise ValueError("local maintenance last_modified_at must be null when no records exist")

    seen_transactions: set[str] = set()
    for i, record in enumerate(records):
        prefix = f"local maintenance records[{i}]"
        if not isinstance(record, dict):
            raise ValueError(f"{prefix} must be an object")
        required_keys = {
            "transaction_id", "modified_at", "summary", "reason_codes",
            "affected_repositories", "files", "validation", "report_generated", "backup_file",
        }
        missing = sorted(required_keys - set(record))
        if missing:
            raise ValueError(f"{prefix} is missing required keys: {missing}")
        transaction_id = record.get("transaction_id")
        if not isinstance(transaction_id, str) or not transaction_id.strip():
            raise ValueError(f"{prefix} transaction_id is missing")
        if transaction_id in seen_transactions:
            raise ValueError(f"duplicate local maintenance transaction_id: {transaction_id}")
        seen_transactions.add(transaction_id)
        modified_at = record.get("modified_at")
        if not isinstance(modified_at, str) or not modified_at.strip():
            raise ValueError(f"{prefix} modified_at must be a non-empty string")
        _bounded_text(record.get("summary"), f"{prefix}.summary")
        reasons = _string_list(record.get("reason_codes"), f"{prefix}.reason_codes", allow_empty=False)
        bad_reasons = sorted(set(reasons) - ALLOWED_REASON_CODES)
        if bad_reasons:
            raise ValueError(f"{prefix} has unsupported reason codes: {bad_reasons}")
        repos = _string_list(record.get("affected_repositories"), f"{prefix}.affected_repositories")
        for repo in repos:
            if not repo.startswith("Comfy-Org/") or repo.count("/") != 1:
                raise ValueError(f"{prefix} has invalid affected repository: {repo}")
        if not isinstance(record.get("report_generated"), bool):
            raise ValueError(f"{prefix} report_generated must be boolean")
        _string_list(record.get("validation"), f"{prefix}.validation")
        _normalize_backup_relative_path(record.get("backup_file"))

        files = record.get("files")
        if not isinstance(files, list):
            raise ValueError(f"{prefix} files must be an array")
        if len(files) > MAX_LIST:
            raise ValueError(f"{prefix} files exceed {MAX_LIST} entries")
        seen_paths: set[str] = set()
        for j, item in enumerate(files):
            file_prefix = f"{prefix}.files[{j}]"
            if not isinstance(item, dict):
                raise ValueError(f"{file_prefix} must be an object")
            rel = _normalize_relative_path(item.get("path"))
            if rel in seen_paths:
                raise ValueError(f"{prefix} contains duplicate file path: {rel}")
            seen_paths.add(rel)
            if item.get("action") not in {"create", "modify"}:
                raise ValueError(f"{file_prefix} has unsupported action: {item.get('action')!r}")
            before = item.get("before_sha256")
            if item.get("action") == "modify":
                if not _valid_sha256(before):
                    raise ValueError(f"{file_prefix} before_sha256 is invalid")
            elif before is not None:
                raise ValueError(f"{file_prefix} create action must have null before_sha256")
            if not _valid_sha256(item.get("after_sha256")):
                raise ValueError(f"{file_prefix} after_sha256 is invalid")

    if records and last_modified_at != records[-1]["modified_at"]:
        raise ValueError("local maintenance last_modified_at does not match the latest record")
    return data


def _normalize_relative_path(raw: object) -> str:
    text = _bounded_text(raw, "plan path")
    text = text.replace("\\", "/")
    p = PurePosixPath(text)
    if p.is_absolute() or any(part in {"", ".", ".."} for part in p.parts):
        raise ValueError(f"local self-modification path must be a clean relative path: {text!r}")
    normalized = p.as_posix()
    if not normalized.startswith("skills/"):
        raise ValueError(f"local self-modification may write only inside skills/: {normalized}")
    if normalized in FORBIDDEN_EXACT_PATHS:
        raise ValueError(f"local self-modification may not write guard state directly: {normalized}")
    if any(normalized.startswith(prefix) for prefix in FORBIDDEN_SKILL_PREFIXES):
        raise ValueError(f"local self-modification may not rewrite the maintenance guard or executable helper code: {normalized}")
    if PurePosixPath(normalized).suffix.lower() not in ALLOWED_SUFFIXES:
        raise ValueError(f"local self-modification may create/edit only Markdown or JSON skill resources: {normalized}")
    target = PACKAGE_ROOT / normalized
    resolved_skills = SKILLS_ROOT.resolve()
    try:
        target.resolve(strict=False).relative_to(resolved_skills)
    except ValueError as exc:
        raise ValueError(f"local self-modification path resolves outside skills/: {normalized}") from exc
    current = PACKAGE_ROOT
    for part in PurePosixPath(normalized).parts:
        current = current / part
        if current.is_symlink():
            raise ValueError(f"local self-modification path may not traverse a symlink: {normalized}")
    return normalized


def _validate_skill_markdown(rel: str, content: str) -> None:
    p = PurePosixPath(rel)
    if p.name != "SKILL.md":
        return
    if not content.startswith("---\n"):
        raise ValueError(f"{rel} must start with YAML frontmatter")
    try:
        _, frontmatter, body = content.split("---\n", 2)
    except ValueError as exc:
        raise ValueError(f"{rel} has incomplete YAML frontmatter") from exc
    if not body.strip():
        raise ValueError(f"{rel} must contain skill instructions after frontmatter")

    allowed_top = {"name", "description", "compatibility", "allowed-tools", "metadata"}
    values: dict[str, object] = {}
    current_map: str | None = None
    for raw in frontmatter.splitlines():
        if not raw.strip():
            continue
        if raw.startswith("  "):
            if current_map != "metadata":
                raise ValueError(f"{rel} contains unsupported nested frontmatter: {raw!r}")
            key, sep, value = raw.strip().partition(":")
            if not sep or not key.strip():
                raise ValueError(f"{rel} contains malformed metadata: {raw!r}")
            metadata = values[current_map]
            assert isinstance(metadata, dict)
            if key.strip() in metadata:
                raise ValueError(f"{rel} contains duplicate metadata key: {key.strip()}")
            metadata[key.strip()] = value.strip().strip('"\'')
            continue
        key, sep, value = raw.partition(":")
        if not sep or not key.strip():
            raise ValueError(f"{rel} contains malformed frontmatter: {raw!r}")
        key = key.strip()
        if key in values:
            raise ValueError(f"{rel} contains duplicate frontmatter key: {key}")
        if key not in allowed_top:
            raise ValueError(f"{rel} contains unsupported frontmatter key: {key}")
        value = value.strip()
        if key == "metadata":
            if value:
                raise ValueError(f"{rel} metadata must be a mapping")
            values[key] = {}
            current_map = key
        else:
            if not value:
                raise ValueError(f"{rel} frontmatter field {key} must not be empty")
            values[key] = value.strip('"\'')
            current_map = None

    expected = p.parent.name
    if values.get("name") != expected:
        raise ValueError(f"{rel} frontmatter name must match directory name {expected!r}")
    if not expected.startswith("comfyui-"):
        raise ValueError(f"new or modified specialist name must use the comfyui- prefix: {expected}")
    description = values.get("description")
    if not isinstance(description, str) or not description.strip():
        raise ValueError(f"{rel} requires a non-empty description")
    if len(description) > 1024:
        raise ValueError(f"{rel} description exceeds 1024 characters")
    metadata = values.get("metadata", {})
    if not isinstance(metadata, dict):
        raise ValueError(f"{rel} metadata must be a mapping")
    if "author" in metadata:
        raise ValueError(f"{rel} must not repeat author metadata in skill context")
    if metadata.get("version") != canonical_version():
        raise ValueError(f"{rel} metadata.version must remain the installed base version {canonical_version()}")


def _validate_file_content(rel: str, content: str) -> bytes:
    if "\x00" in content:
        raise ValueError(f"{rel} contains a NUL byte")
    payload = content.encode("utf-8")
    if len(payload) > MAX_FILE_BYTES:
        raise ValueError(f"{rel} exceeds the {MAX_FILE_BYTES}-byte local self-modification limit")
    if rel.endswith(".json"):
        try:
            json.loads(content)
        except json.JSONDecodeError as exc:
            raise ValueError(f"{rel} must contain valid JSON: {exc}") from exc
    if rel.endswith("/SKILL.md"):
        _validate_skill_markdown(rel, content)
    return payload


def load_plan(path: Path) -> dict:
    data = _read_json_object(path, "local modification plan")
    if data.get("schema_version") != PLAN_SCHEMA_VERSION:
        raise ValueError(f"local modification plan must use schema_version {PLAN_SCHEMA_VERSION}")
    unknown = set(data) - {"schema_version", "summary", "reason_codes", "affected_repositories", "files"}
    if unknown:
        raise ValueError(f"local modification plan contains unsupported keys: {sorted(unknown)}")
    summary = _bounded_text(data.get("summary"), "plan summary")
    reason_codes = _string_list(data.get("reason_codes", []), "reason_codes", allow_empty=False)
    bad_reasons = sorted(set(reason_codes) - ALLOWED_REASON_CODES)
    if bad_reasons:
        raise ValueError(f"unsupported maintenance reason codes: {bad_reasons}")
    repos = _string_list(data.get("affected_repositories", []), "affected_repositories")
    for repo in repos:
        if not repo.startswith("Comfy-Org/") or repo.count("/") != 1:
            raise ValueError(f"affected repository must be an official Comfy-Org repo: {repo}")
    files = data.get("files")
    if not isinstance(files, list) or not files:
        raise ValueError("local modification plan files must be a non-empty array")
    if len(files) > MAX_LIST:
        raise ValueError(f"local modification plan exceeds {MAX_LIST} files")
    normalized_files = []
    seen = set()
    total = 0
    for i, item in enumerate(files):
        if not isinstance(item, dict):
            raise ValueError(f"files[{i}] must be an object")
        unknown_item = set(item) - {"action", "path", "purpose", "content", "expected_sha256"}
        if unknown_item:
            raise ValueError(f"files[{i}] contains unsupported keys: {sorted(unknown_item)}")
        action = item.get("action")
        if action not in {"create", "modify"}:
            raise ValueError(f"files[{i}].action must be create or modify")
        rel = _normalize_relative_path(item.get("path"))
        if rel in seen:
            raise ValueError(f"duplicate local modification path: {rel}")
        seen.add(rel)
        purpose = _bounded_text(item.get("purpose"), f"files[{i}].purpose")
        content = item.get("content")
        if not isinstance(content, str):
            raise ValueError(f"files[{i}].content must be a string")
        payload = _validate_file_content(rel, content)
        total += len(payload)
        if total > MAX_TRANSACTION_BYTES:
            raise ValueError(f"local modification plan exceeds the {MAX_TRANSACTION_BYTES}-byte combined before/after transaction limit")
        target = PACKAGE_ROOT / rel
        expected = item.get("expected_sha256")
        if action == "create":
            if expected not in (None, ""):
                raise ValueError(f"files[{i}].expected_sha256 is not allowed for create")
            if target.exists():
                raise ValueError(f"create target already exists: {rel}")
            expected = None
        else:
            if not target.is_file():
                raise ValueError(f"modify target does not exist as a file: {rel}")
            existing_size = target.stat().st_size
            if existing_size > MAX_FILE_BYTES:
                raise ValueError(f"modify target exceeds the {MAX_FILE_BYTES}-byte local backup limit: {rel}")
            total += existing_size
            if total > MAX_TRANSACTION_BYTES:
                raise ValueError(f"local modification plan exceeds the {MAX_TRANSACTION_BYTES}-byte combined before/after transaction limit")
            if not isinstance(expected, str) or len(expected) != 64 or any(c not in "0123456789abcdefABCDEF" for c in expected):
                raise ValueError(f"files[{i}].expected_sha256 must be a 64-character SHA-256 hex string for modify")
            before = target.read_bytes()
            if len(before) != existing_size:
                raise ValueError(f"modify target changed size while the plan was being validated: {rel}")
            actual = _sha256(before)
            if actual.lower() != expected.lower():
                raise ValueError(f"modify target changed since the plan was prepared: {rel}")
            expected = expected.lower()
        normalized_files.append({
            "action": action,
            "path": rel,
            "purpose": purpose,
            "content": content,
            "expected_sha256": expected,
            "after_sha256": _sha256(payload),
        })
    return {
        "schema_version": PLAN_SCHEMA_VERSION,
        "summary": summary,
        "reason_codes": reason_codes,
        "affected_repositories": repos,
        "files": normalized_files,
    }


def load_findings(path: Path) -> dict:
    data = _read_json_object(path, "maintenance findings")
    if data.get("schema_version") != FINDINGS_SCHEMA_VERSION:
        raise ValueError(f"maintenance findings must use schema_version {FINDINGS_SCHEMA_VERSION}")
    unknown = set(data) - {
        "schema_version", "reason_codes", "summary", "affected_repositories", "evidence",
        "recommended_maintainer_action", "local_modification_summary", "local_files", "validation",
    }
    if unknown:
        raise ValueError(f"maintenance findings contain unsupported keys: {sorted(unknown)}")
    reasons = _string_list(data.get("reason_codes", []), "reason_codes", allow_empty=False)
    bad = sorted(set(reasons) - ALLOWED_REASON_CODES)
    if bad:
        raise ValueError(f"unsupported maintenance reason codes: {bad}")
    repos = _string_list(data.get("affected_repositories", []), "affected_repositories")
    for repo in repos:
        if not repo.startswith("Comfy-Org/") or repo.count("/") != 1:
            raise ValueError(f"affected repository must be an official Comfy-Org repo: {repo}")
    evidence = data.get("evidence", [])
    if not isinstance(evidence, list) or len(evidence) > MAX_LIST:
        raise ValueError("evidence must be an array with at most 100 entries")
    normalized_evidence = []
    for i, item in enumerate(evidence):
        if not isinstance(item, dict) or set(item) - {"source", "finding"}:
            raise ValueError(f"evidence[{i}] must contain only source and finding")
        normalized_evidence.append({
            "source": _bounded_text(item.get("source"), f"evidence[{i}].source"),
            "finding": _bounded_text(item.get("finding"), f"evidence[{i}].finding"),
        })
    return {
        "schema_version": FINDINGS_SCHEMA_VERSION,
        "reason_codes": reasons,
        "summary": _bounded_text(data.get("summary"), "summary"),
        "affected_repositories": repos,
        "evidence": normalized_evidence,
        "recommended_maintainer_action": _bounded_text(data.get("recommended_maintainer_action"), "recommended_maintainer_action"),
        "local_modification_summary": _bounded_text(data.get("local_modification_summary", ""), "local_modification_summary", required=False),
        "local_files": [_normalize_relative_path(x) for x in _string_list(data.get("local_files", []), "local_files")],
        "validation": _string_list(data.get("validation", []), "validation"),
    }


def _write_bytes_atomic(path: Path, payload: bytes) -> None:
    if not path.parent.is_dir():
        raise OSError(f"parent directory does not exist: {path.parent}")
    fd, name = tempfile.mkstemp(prefix=f".{path.name}.", suffix=".tmp", dir=path.parent)
    tmp = Path(name)
    try:
        with os.fdopen(fd, "wb") as fh:
            fh.write(payload)
            fh.flush()
            os.fsync(fh.fileno())
        os.replace(tmp, path)
    finally:
        tmp.unlink(missing_ok=True)


def _write_json_atomic(path: Path, data: dict) -> None:
    _write_bytes_atomic(path, (json.dumps(data, indent=2) + "\n").encode("utf-8"))


def _make_parent_dirs(path: Path) -> list[Path]:
    created = []
    cursor = path.parent
    stack = []
    while cursor != SKILLS_ROOT and not cursor.exists():
        stack.append(cursor)
        cursor = cursor.parent
    for directory in reversed(stack):
        directory.mkdir()
        created.append(directory)
    return created


def _cleanup_empty_dirs(dirs: list[Path]) -> None:
    for directory in sorted(dirs, key=lambda p: len(p.parts), reverse=True):
        try:
            directory.rmdir()
        except OSError:
            pass


def _backup_path(transaction_id: str) -> Path:
    return LOCAL_BACKUP_DIR / f"{transaction_id}.json"


def _normalize_backup_relative_path(raw: object) -> str:
    text = _bounded_text(raw, "backup path").replace("\\", "/")
    p = PurePosixPath(text)
    if p.is_absolute() or any(part in {"", ".", ".."} for part in p.parts):
        raise ValueError(f"backup path must be a clean relative path: {text!r}")
    normalized = p.as_posix()
    prefix = "skills/comfyui-development/references/local-backups/"
    if not normalized.startswith(prefix) or not normalized.endswith(".json"):
        raise ValueError(f"backup path is outside the maintenance backup directory: {normalized}")
    target = PACKAGE_ROOT / normalized
    try:
        target.resolve(strict=False).relative_to(LOCAL_BACKUP_DIR.resolve())
    except ValueError as exc:
        raise ValueError(f"backup path resolves outside the maintenance backup directory: {normalized}") from exc
    return normalized


def _build_backup(plan: dict, transaction_id: str) -> dict:
    entries = []
    for item in plan["files"]:
        target = PACKAGE_ROOT / item["path"]
        if item["action"] == "modify":
            before = target.read_bytes()
            entries.append({
                "path": item["path"],
                "action": "modify",
                "before_sha256": _sha256(before),
                "before_base64": base64.b64encode(before).decode("ascii"),
                "after_sha256": item["after_sha256"],
                "after_base64": base64.b64encode(item["content"].encode("utf-8")).decode("ascii"),
            })
        else:
            entries.append({
                "path": item["path"],
                "action": "create",
                "before_sha256": None,
                "before_base64": None,
                "after_sha256": item["after_sha256"],
                "after_base64": base64.b64encode(item["content"].encode("utf-8")).decode("ascii"),
            })
    return {
        "schema_version": BACKUP_SCHEMA_VERSION,
        "transaction_id": transaction_id,
        "base_package_version": canonical_version(),
        "created_at": _now_iso(),
        "files": entries,
    }


def _decode_backup_payload(entry: dict, field: str, checksum_field: str, rel: str) -> bytes:
    raw = entry.get(field)
    expected = entry.get(checksum_field)
    if not isinstance(raw, str) or not isinstance(expected, str):
        raise ValueError(f"backup is missing {field} or {checksum_field} for {rel}")
    try:
        payload = base64.b64decode(raw, validate=True)
    except (ValueError, binascii.Error) as exc:
        raise ValueError(f"backup contains invalid base64 for {rel}") from exc
    if len(payload) > MAX_FILE_BYTES:
        raise ValueError(f"backup payload exceeds the {MAX_FILE_BYTES}-byte local file limit for {rel}")
    if _sha256(payload) != expected:
        raise ValueError(f"backup checksum mismatch for {rel}")
    return payload


def _preflight_backup(backup: dict, *, require_after_hash: bool) -> list[dict]:
    if backup.get("base_package_version") != canonical_version():
        raise ValueError("local maintenance backup base_package_version does not match installed VERSION")
    files = backup.get("files")
    if not isinstance(files, list) or not files:
        raise ValueError("local maintenance backup files must be a non-empty array")
    if len(files) > MAX_LIST:
        raise ValueError(f"local maintenance backup exceeds {MAX_LIST} files")
    prepared = []
    seen_paths: set[str] = set()
    total = 0
    for entry in files:
        if not isinstance(entry, dict):
            raise ValueError("local maintenance backup contains a non-object file entry")
        unknown = set(entry) - {"path", "action", "before_sha256", "before_base64", "after_sha256", "after_base64"}
        if unknown:
            raise ValueError(f"local maintenance backup contains unsupported file keys: {sorted(unknown)}")
        rel = _normalize_relative_path(entry.get("path"))
        if rel in seen_paths:
            raise ValueError(f"local maintenance backup contains duplicate file path: {rel}")
        seen_paths.add(rel)
        action = entry.get("action")
        if action not in {"create", "modify"}:
            raise ValueError(f"backup has unsupported action for {rel}: {action!r}")
        target = PACKAGE_ROOT / rel
        after = _decode_backup_payload(entry, "after_base64", "after_sha256", rel)
        total += len(after)
        before = None
        if action == "modify":
            before = _decode_backup_payload(entry, "before_base64", "before_sha256", rel)
            total += len(before)
        elif entry.get("before_base64") is not None or entry.get("before_sha256") is not None:
            raise ValueError(f"create backup unexpectedly contains before-state data for {rel}")
        if total > MAX_TRANSACTION_BYTES:
            raise ValueError(f"local maintenance backup exceeds the {MAX_TRANSACTION_BYTES}-byte combined before/after transaction limit")
        if require_after_hash:
            if not target.is_file():
                raise ValueError(f"cannot restore because locally modified file is missing: {rel}")
            if _sha256(target.read_bytes()) != entry["after_sha256"]:
                raise ValueError(f"cannot restore because file changed after the local transaction: {rel}")
        prepared.append({"rel": rel, "target": target, "action": action, "before": before, "after": after})
    return prepared


def _restore_from_backup(backup: dict, *, require_after_hash: bool) -> None:
    prepared = _preflight_backup(backup, require_after_hash=require_after_hash)
    created_dirs: list[Path] = []
    for item in reversed(prepared):
        target = item["target"]
        if item["action"] == "create":
            target.unlink(missing_ok=True)
            created_dirs.append(target.parent)
        else:
            target.parent.mkdir(parents=True, exist_ok=True)
            _write_bytes_atomic(target, item["before"])
    _cleanup_empty_dirs(created_dirs)


def _reapply_after_from_backup(backup: dict) -> None:
    prepared = _preflight_backup(backup, require_after_hash=False)
    for item in prepared:
        target = item["target"]
        if not target.parent.exists():
            _make_parent_dirs(target)
        _write_bytes_atomic(target, item["after"])


def apply_local_plan(plan_path: Path, *, report_generated: bool, state_path: Path = LOCAL_STATE_PATH) -> dict:
    plan = load_plan(plan_path)
    state = load_local_state(state_path)
    transaction_id = uuid.uuid4().hex
    backup = _build_backup(plan, transaction_id)
    LOCAL_BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    backup_path = _backup_path(transaction_id)
    if backup_path.exists():
        raise OSError(f"backup path already exists: {backup_path}")
    _write_json_atomic(backup_path, backup)

    created_dirs: list[Path] = []
    writes_started = False
    try:
        for item in plan["files"]:
            target = PACKAGE_ROOT / item["path"]
            if item["action"] == "modify":
                current = _sha256(target.read_bytes())
                if current != item["expected_sha256"]:
                    raise ValueError(f"modify target changed during apply: {item['path']}")
            else:
                if target.exists():
                    raise ValueError(f"create target appeared during apply: {item['path']}")
                created_dirs.extend(_make_parent_dirs(target))
            writes_started = True
            _write_bytes_atomic(target, item["content"].encode("utf-8"))
            if _sha256(target.read_bytes()) != item["after_sha256"]:
                raise OSError(f"post-write checksum mismatch: {item['path']}")
        record = {
            "transaction_id": transaction_id,
            "modified_at": _now_iso(),
            "summary": plan["summary"],
            "reason_codes": plan["reason_codes"],
            "affected_repositories": plan["affected_repositories"],
            "files": [
                {
                    "path": entry["path"],
                    "action": entry["action"],
                    "before_sha256": entry["before_sha256"],
                    "after_sha256": entry["after_sha256"],
                }
                for entry in backup["files"]
            ],
            "validation": ["transactional write checks passed"],
            "report_generated": bool(report_generated),
            "backup_file": backup_path.relative_to(PACKAGE_ROOT).as_posix(),
        }
        state["locally_modified"] = True
        state["last_modified_at"] = record["modified_at"]
        combined_records = state.get("records", []) + [record]
        dropped_records = combined_records[:-MAX_RECORDS] if len(combined_records) > MAX_RECORDS else []
        state["records"] = combined_records[-MAX_RECORDS:]
        _write_json_atomic(state_path, state)
        cleanup_warnings = []
        for dropped in dropped_records:
            backup_rel = dropped.get("backup_file") if isinstance(dropped, dict) else None
            if not isinstance(backup_rel, str):
                continue
            try:
                old_backup = PACKAGE_ROOT / _normalize_backup_relative_path(backup_rel)
                old_backup.unlink(missing_ok=True)
            except (OSError, ValueError) as exc:
                cleanup_warnings.append(f"could not remove aged-out backup {backup_rel}: {exc}")
        result = {"applied": True, "transaction_id": transaction_id, "record": record, "state": state}
        if cleanup_warnings:
            result["warnings"] = cleanup_warnings
        return result
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError, binascii.Error) as exc:
        rollback_error = None
        if writes_started:
            try:
                _restore_from_backup(backup, require_after_hash=False)
            except (OSError, UnicodeError, ValueError, binascii.Error) as rollback_exc:
                rollback_error = rollback_exc
            finally:
                _cleanup_empty_dirs(created_dirs)
        try:
            backup_path.unlink(missing_ok=True)
        except OSError as cleanup_exc:
            if rollback_error is None:
                rollback_error = cleanup_exc
        if rollback_error is not None:
            raise RuntimeError(f"local self-modification failed and rollback/cleanup was incomplete: {exc}; rollback: {rollback_error}") from exc
        raise


def restore_local_transaction(*, state_path: Path = LOCAL_STATE_PATH) -> dict:
    state = load_local_state(state_path)
    records = list(state.get("records", []))
    if not records:
        raise ValueError("no recorded local self-modification transaction is available to restore")
    record = records[-1]
    backup_rel = record.get("backup_file")
    if not isinstance(backup_rel, str):
        raise ValueError("latest local transaction has no restorable backup")
    backup_path = PACKAGE_ROOT / _normalize_backup_relative_path(backup_rel)
    backup = _read_json_object(backup_path, "local maintenance backup")
    if backup.get("schema_version") != BACKUP_SCHEMA_VERSION:
        raise ValueError("unsupported local maintenance backup schema")
    if backup.get("transaction_id") != record.get("transaction_id"):
        raise ValueError("local maintenance backup transaction does not match the ledger")

    _restore_from_backup(backup, require_after_hash=True)
    new_state = dict(state)
    new_records = records[:-1]
    new_state["records"] = new_records
    new_state["locally_modified"] = bool(new_records)
    new_state["last_modified_at"] = new_records[-1]["modified_at"] if new_records else None
    try:
        _write_json_atomic(state_path, new_state)
    except (OSError, UnicodeError, ValueError):
        _reapply_after_from_backup(backup)
        raise

    cleanup_warning = None
    try:
        backup_path.unlink(missing_ok=True)
    except OSError as exc:
        cleanup_warning = f"restored successfully but backup cleanup failed: {exc}"
    result = {"restored": True, "transaction_id": record["transaction_id"], "state": new_state}
    if cleanup_warning:
        result["warning"] = cleanup_warning
    return result


def verify_local_state(state: dict | None = None) -> dict:
    state = state if state is not None else load_local_state()
    expected_by_path: dict[str, str] = {}
    for record in state.get("records", []):
        for item in record.get("files", []):
            rel = item.get("path")
            expected = item.get("after_sha256")
            if isinstance(rel, str) and isinstance(expected, str):
                expected_by_path[rel] = expected
    drift = []
    for rel, expected in sorted(expected_by_path.items()):
        target = PACKAGE_ROOT / _normalize_relative_path(rel)
        if not target.is_file():
            drift.append({"path": rel, "status": "missing"})
        elif _sha256(target.read_bytes()) != expected:
            drift.append({"path": rel, "status": "changed_after_record"})
    return {"locally_modified": state["locally_modified"], "drift": drift, "state": state}


def _bullet_list(items: list[str], empty: str = "- None reported") -> str:
    if not items:
        return empty
    return "\n".join(f"- {item}" for item in items)


def render_issue_report(findings: dict, state: dict | None = None) -> dict:
    version = canonical_version()
    repo_url = package_repository_url()
    state = state if state is not None else load_local_state()
    locally_modified = bool(state.get("locally_modified"))
    display_version = f"{version}+local" if locally_modified else version
    first_reason = findings["reason_codes"][0].replace("_", " ")
    title = f"Upstream maintenance: {first_reason}"
    if len(title) > 120:
        title = title[:117] + "..."
    evidence_lines = [f"{item['source']} — {item['finding']}" for item in findings["evidence"]]
    body = f"""## Upstream maintenance report

**Skill pack version:** `{display_version}`  
**Base package version:** `{version}`  
**Local installation modified:** `{'yes' if locally_modified else 'no'}`  
**Reason codes:** `{', '.join(findings['reason_codes'])}`

### Summary

{findings['summary']}

### Affected official repositories

{_bullet_list(findings['affected_repositories'])}

### Official evidence checked

{_bullet_list(evidence_lines)}

### Recommended maintainer action

{findings['recommended_maintainer_action']}

### Local workaround

{findings.get('local_modification_summary') or 'No local self-modification was applied.'}

**Locally changed skill files:**

{_bullet_list(findings.get('local_files', []))}

**Local validation:**

{_bullet_list(findings.get('validation', []))}

---

Generated by the ComfyUI Development Skills explicit self-maintenance workflow. No GitHub Issue was filed automatically.
"""
    return {
        "schema_version": 1,
        "maintainer_follow_up": {"required": True, "reason_codes": findings["reason_codes"], "summary": findings["summary"]},
        "configured_maintainer_repository": repo_url,
        "new_issue_url": repo_url + "/issues/new?title=" + quote(title, safe=""),
        "issue_destination_verified": False,
        "issue_destination_note": "This helper does not contact GitHub. Verify that the configured repository exists and accepts Issues before submission.",
        "suggested_issue_title": title,
        "suggested_issue_body": body,
        "local_installation_modified": locally_modified,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)

    validate = sub.add_parser("validate-plan", help="Validate an exact local self-modification plan. Read-only.")
    validate.add_argument("--plan", type=Path, required=True)

    apply_cmd = sub.add_parser("apply-local", help="Transactionally apply an explicitly approved local skill-only plan.")
    apply_cmd.add_argument("--plan", type=Path, required=True)
    apply_cmd.add_argument("--report-generated", action="store_true", help="Record that a maintainer report was generated for this same finding.")
    apply_cmd.add_argument("--yes", action="store_true", help="Required confirmation that the user explicitly chose a self-modification option.")

    restore = sub.add_parser("restore-local", help="Restore the latest local self-modification transaction when its files have not drifted.")
    restore.add_argument("--yes", action="store_true", help="Required confirmation before restoring local skill files.")

    report = sub.add_parser("report", help="Render a maintainer-ready GitHub Issue draft. Does not file the issue.")
    report.add_argument("--findings", type=Path, required=True)
    report.add_argument("--format", choices=("json", "markdown"), default="markdown")

    sub.add_parser("status", help="Show local self-modification state and detect drift in the latest recorded transaction.")

    args = parser.parse_args()
    try:
        if args.command == "validate-plan":
            plan = load_plan(args.plan)
            safe_plan = {**plan, "files": [{k: v for k, v in item.items() if k != "content"} for item in plan["files"]]}
            print(json.dumps({"valid": True, "plan": safe_plan}, indent=2))
            return 0
        if args.command == "apply-local":
            if not args.yes:
                raise ValueError("apply-local requires --yes after the user explicitly chose self-modification")
            print(json.dumps(apply_local_plan(args.plan, report_generated=args.report_generated), indent=2))
            return 0
        if args.command == "restore-local":
            if not args.yes:
                raise ValueError("restore-local requires --yes")
            print(json.dumps(restore_local_transaction(), indent=2))
            return 0
        if args.command == "report":
            findings = load_findings(args.findings)
            rendered = render_issue_report(findings)
            if args.format == "json":
                print(json.dumps(rendered, indent=2))
            else:
                print("Maintainer update needed\n")
                print(f"Configured repository: {rendered['configured_maintainer_repository']}")
                print(f"Candidate issue URL: {rendered['new_issue_url']}")
                print(rendered["issue_destination_note"] + "\n")
                print(f"Suggested title: {rendered['suggested_issue_title']}\n")
                print(rendered["suggested_issue_body"])
            return 0
        print(json.dumps(verify_local_state(), indent=2))
        return 0
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError, RuntimeError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
