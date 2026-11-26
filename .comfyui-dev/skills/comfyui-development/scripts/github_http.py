#!/usr/bin/env python3
"""Small, dependency-free GitHub API safety helper for source-discovery scripts."""
from __future__ import annotations

import json
from urllib.parse import urlsplit
import urllib.request

USER_AGENT = "comfyui-development-skills/0.1.11"
MAX_JSON_BYTES = 32 * 1024 * 1024


class NoRedirectHandler(urllib.request.HTTPRedirectHandler):
    """Reject redirects so a GitHub token is never replayed to another host."""

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def read_json_response(response, max_bytes: int = MAX_JSON_BYTES):
    """Read one GitHub JSON response with a hard byte limit."""
    if max_bytes <= 0:
        raise ValueError("max_bytes must be greater than 0")
    headers = getattr(response, "headers", None)
    content_length = headers.get("Content-Length") if headers is not None else None
    if content_length:
        try:
            declared = int(content_length)
        except (TypeError, ValueError):
            declared = None
        if declared is not None and declared > max_bytes:
            raise ValueError(f"GitHub JSON response exceeds safety limit of {max_bytes} bytes")
    payload = response.read(max_bytes + 1)
    if len(payload) > max_bytes:
        raise ValueError(f"GitHub JSON response exceeds safety limit of {max_bytes} bytes")
    return json.loads(payload)


def github_get_json(url: str, token: str | None, timeout: float):
    if timeout <= 0:
        raise ValueError("timeout must be greater than 0 seconds")
    parsed = urlsplit(url)
    if parsed.scheme != "https" or parsed.hostname != "api.github.com":
        raise ValueError("GitHub API requests must use https://api.github.com")
    if parsed.username is not None or parsed.password is not None:
        raise ValueError("GitHub API URL must not contain embedded credentials")
    try:
        port = parsed.port
    except ValueError as exc:
        raise ValueError("GitHub API URL contains an invalid port") from exc
    if port not in (None, 443):
        raise ValueError("GitHub API URL must use the default HTTPS port")
    if parsed.fragment:
        raise ValueError("GitHub API URL must not contain a fragment")
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": USER_AGENT,
        "X-GitHub-Api-Version": "2022-11-28",
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"
    request = urllib.request.Request(url, headers=headers)
    opener = urllib.request.build_opener(NoRedirectHandler())
    with opener.open(request, timeout=timeout) as response:
        return read_json_response(response)
