#!/usr/bin/env python3
"""Discover the current public repository universe under the Comfy-Org GitHub organization.

The curated sources.json file is intentionally not exhaustive. This helper queries GitHub
at runtime, marks repositories already present in the curated routing registry, and leaves
new official repositories visible to the agent without requiring a skill-pack update.
"""
from __future__ import annotations

import argparse
import json
import os
from pathlib import Path
import sys
import urllib.error
import urllib.parse

DEFAULT_ORG = "Comfy-Org"
MAX_REGISTRY_BYTES = 8 * 1024 * 1024


from github_http import github_get_json


def get_json(url: str, token: str | None, timeout: float):
    return github_get_json(url, token, timeout)

def load_registry(path: Path) -> tuple[str, dict[str, dict]]:
    if path.stat().st_size > MAX_REGISTRY_BYTES:
        raise ValueError(f"sources.json exceeds the {MAX_REGISTRY_BYTES}-byte input limit")
    raw = path.read_bytes()
    if len(raw) > MAX_REGISTRY_BYTES:
        raise ValueError(f"sources.json exceeds the {MAX_REGISTRY_BYTES}-byte input limit")
    data = json.loads(raw.decode("utf-8"))
    if not isinstance(data, dict):
        raise ValueError("sources.json root must be a JSON object")
    org_data = data.get("organization", DEFAULT_ORG)
    if isinstance(org_data, dict):
        org = org_data.get("owner") or DEFAULT_ORG
    else:
        org = org_data or DEFAULT_ORG
    if not isinstance(org, str) or not org.strip():
        raise ValueError("sources.json organization owner must be a non-empty string")
    repositories = data.get("repositories", [])
    if not isinstance(repositories, list):
        raise ValueError("sources.json repositories must be an array")
    curated: dict[str, dict] = {}
    for item in repositories:
        if not isinstance(item, dict) or not isinstance(item.get("repo"), str) or not item["repo"]:
            raise ValueError("each curated repository must be an object with a non-empty repo string")
        if item["repo"] in curated:
            raise ValueError(f"duplicate curated repository: {item['repo']}")
        curated[item["repo"]] = item
    return org.strip(), curated


def fetch_org_repositories(org: str, token: str | None, timeout: float, max_pages: int = 100) -> list[dict]:
    if timeout <= 0:
        raise ValueError("timeout must be greater than 0 seconds")
    if max_pages <= 0:
        raise ValueError("max_pages must be greater than 0")
    repos: list[dict] = []
    page = 1
    while page <= max_pages:
        params = urllib.parse.urlencode({
            "type": "public",
            "sort": "full_name",
            "direction": "asc",
            "per_page": 100,
            "page": page,
        })
        url = f"https://api.github.com/orgs/{urllib.parse.quote(org, safe='')}/repos?{params}"
        batch = get_json(url, token, timeout)
        if not isinstance(batch, list):
            raise ValueError("GitHub organization repositories response was not a list")
        repos.extend(batch)
        if len(batch) < 100:
            return repos
        page += 1
    raise RuntimeError(f"repository pagination exceeded safety limit of {max_pages} pages")


def normalize(repo: dict, curated: dict[str, dict]) -> dict:
    full_name = repo.get("full_name") or ""
    known = curated.get(full_name)
    return {
        "repo": full_name,
        "description": repo.get("description"),
        "default_branch": repo.get("default_branch"),
        "archived": bool(repo.get("archived")),
        "fork": bool(repo.get("fork")),
        "pushed_at": repo.get("pushed_at"),
        "updated_at": repo.get("updated_at"),
        "url": repo.get("html_url"),
        "curated": known is not None,
        "domain": known.get("domain") if known else None,
        "role": known.get("role") if known else None,
    }


def matches(row: dict, term: str | None) -> bool:
    if not term:
        return True
    needle = term.casefold()
    haystack = " ".join(str(row.get(k) or "") for k in ("repo", "description", "domain", "role"))
    return needle in haystack.casefold()


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    default_registry = Path(__file__).resolve().parents[1] / "references" / "sources.json"
    parser.add_argument("--registry", type=Path, default=default_registry)
    parser.add_argument("--org", help="Override organization owner from sources.json")
    parser.add_argument("--token", default=os.environ.get("GITHUB_TOKEN"))
    parser.add_argument("--timeout", type=float, default=10.0)
    parser.add_argument("--max-pages", type=int, default=100, help="Pagination safety limit (default: 100)")
    parser.add_argument("--match", help="Case-insensitive filter over repository name, description, curated domain and role")
    parser.add_argument("--active-only", action="store_true", help="Hide archived repositories")
    parser.add_argument("--uncurated-only", action="store_true", help="Show only official repositories not yet in sources.json")
    parser.add_argument("--json", action="store_true", dest="as_json")
    args = parser.parse_args()

    try:
        registry_org, curated = load_registry(args.registry)
        org = args.org or registry_org
        raw = fetch_org_repositories(org, args.token, args.timeout, args.max_pages)
    except (OSError, ValueError, RuntimeError, json.JSONDecodeError, urllib.error.URLError, urllib.error.HTTPError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1

    rows = [normalize(repo, curated) for repo in raw]
    if args.active_only:
        rows = [row for row in rows if not row["archived"]]
    if args.uncurated_only:
        rows = [row for row in rows if not row["curated"]]
    rows = [row for row in rows if matches(row, args.match)]

    if args.as_json:
        print(json.dumps({
            "organization": org,
            "count": len(rows),
            "repositories": rows,
        }, indent=2))
        return 0

    print(f"Official upstream organization: https://github.com/{org}")
    print(f"Repositories shown: {len(rows)}")
    for row in rows:
        flags = []
        flags.append("curated" if row["curated"] else "unmapped")
        if row["archived"]:
            flags.append("archived")
        if row["fork"]:
            flags.append("fork")
        domain = f" domain={row['domain']}" if row["domain"] else ""
        desc = f" - {row['description']}" if row["description"] else ""
        print(f"{row['repo']} [{', '.join(flags)}]{domain}{desc}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
