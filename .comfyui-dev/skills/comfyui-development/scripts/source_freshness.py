#!/usr/bin/env python3
"""Report current GitHub metadata for the curated official source registry."""
from __future__ import annotations

import argparse
import json
import os
from pathlib import Path
import re
import sys
import urllib.error
import urllib.parse

REPO_RE = re.compile(r"^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$")
MAX_REGISTRY_BYTES = 8 * 1024 * 1024


from github_http import github_get_json


def get_json(url: str, token: str | None, timeout: float):
    return github_get_json(url, token, timeout)

def load_registry(path: Path) -> list[dict]:
    if path.stat().st_size > MAX_REGISTRY_BYTES:
        raise ValueError(f"sources.json exceeds the {MAX_REGISTRY_BYTES}-byte input limit")
    raw = path.read_bytes()
    if len(raw) > MAX_REGISTRY_BYTES:
        raise ValueError(f"sources.json exceeds the {MAX_REGISTRY_BYTES}-byte input limit")
    data = json.loads(raw.decode("utf-8"))
    if not isinstance(data, dict):
        raise ValueError("sources.json root must be a JSON object")
    repositories = data.get("repositories")
    if not isinstance(repositories, list):
        raise ValueError("sources.json must contain a repositories array")
    seen = set()
    for item in repositories:
        if not isinstance(item, dict) or not isinstance(item.get("repo"), str):
            raise ValueError("each repository entry must be an object with a repo string")
        repo = item["repo"]
        if not REPO_RE.fullmatch(repo):
            raise ValueError(f"invalid repository name in sources.json: {repo!r}")
        if repo in seen:
            raise ValueError(f"duplicate repository in sources.json: {repo}")
        seen.add(repo)
    return repositories


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    default_registry = Path(__file__).resolve().parents[1] / "references" / "sources.json"
    ap.add_argument("--registry", type=Path, default=default_registry)
    ap.add_argument("--token", default=os.environ.get("GITHUB_TOKEN"))
    ap.add_argument("--timeout", type=float, default=10.0)
    ap.add_argument("--json", action="store_true", dest="as_json")
    args = ap.parse_args()

    try:
        repositories = load_registry(args.registry)
        if args.timeout <= 0:
            raise ValueError("timeout must be greater than 0 seconds")
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2

    rows = []
    failed = False
    for item in repositories:
        repo = item["repo"]
        owner, name = repo.split("/", 1)
        url = "https://api.github.com/repos/" + urllib.parse.quote(owner, safe="") + "/" + urllib.parse.quote(name, safe="")
        try:
            data = get_json(url, args.token, args.timeout)
            if not isinstance(data, dict):
                raise ValueError("GitHub repository response was not a JSON object")
            rows.append({
                "repo": repo,
                "domain": item.get("domain"),
                "default_branch": data.get("default_branch"),
                "archived": data.get("archived"),
                "pushed_at": data.get("pushed_at"),
                "updated_at": data.get("updated_at"),
                "html_url": data.get("html_url"),
            })
        except (ValueError, urllib.error.URLError, urllib.error.HTTPError, json.JSONDecodeError) as exc:
            failed = True
            rows.append({"repo": repo, "domain": item.get("domain"), "error": str(exc)})

    if args.as_json:
        print(json.dumps(rows, indent=2))
    else:
        for row in rows:
            if "error" in row:
                print(f"ERROR {row['repo']}: {row['error']}")
            else:
                state = "archived" if row["archived"] else "active"
                print(f"{row['repo']} | {state} | branch={row['default_branch']} | pushed={row['pushed_at']}")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
