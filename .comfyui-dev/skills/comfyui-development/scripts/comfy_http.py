#!/usr/bin/env python3
"""Small, dependency-free HTTP safety helpers for ComfyUI development scripts."""
from __future__ import annotations

import ipaddress
import json
from urllib.parse import urlsplit, urlunsplit
import urllib.request

USER_AGENT = "comfyui-development-skills/0.1.11"
MAX_JSON_BYTES = 128 * 1024 * 1024


class NoRedirectHandler(urllib.request.HTTPRedirectHandler):
    """Reject redirects so credentials are never replayed to a new location."""

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def positive_timeout(value: float) -> float:
    if value <= 0:
        raise ValueError("timeout must be greater than 0 seconds")
    return value


def normalize_server_url(server: str) -> str:
    value = (server or "").strip()
    if not value:
        raise ValueError("server URL is empty")
    parsed = urlsplit(value)
    if parsed.scheme not in {"http", "https"}:
        raise ValueError("server URL must use http:// or https://")
    if not parsed.hostname:
        raise ValueError("server URL must include a hostname")
    if parsed.username is not None or parsed.password is not None:
        raise ValueError("server URL must not contain embedded credentials")
    if parsed.query or parsed.fragment:
        raise ValueError("server URL must not contain a query string or fragment")
    path = parsed.path.rstrip("/")
    return urlunsplit((parsed.scheme, parsed.netloc, path, "", ""))


def is_loopback_host(hostname: str | None) -> bool:
    if not hostname:
        return False
    host = hostname.strip("[]").rstrip(".").casefold()
    if host == "localhost" or host.endswith(".localhost"):
        return True
    try:
        return ipaddress.ip_address(host).is_loopback
    except ValueError:
        return False


def prepare_server(server: str, api_key: str | None, allow_remote_api_key: bool = False) -> str:
    normalized = normalize_server_url(server)
    parsed = urlsplit(normalized)
    if api_key and not is_loopback_host(parsed.hostname):
        if parsed.scheme != "https":
            raise ValueError(
                "refusing to send COMFY_API_KEY to a non-loopback server over plain HTTP; "
                "use HTTPS"
            )
        if not allow_remote_api_key:
            raise ValueError(
                "refusing to send COMFY_API_KEY to a non-loopback server without "
                "--allow-remote-api-key"
            )
    return normalized


def read_json_response(response, max_bytes: int = MAX_JSON_BYTES):
    """Read one JSON response with a hard byte limit."""
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
            raise ValueError(f"JSON response exceeds safety limit of {max_bytes} bytes")
    payload = response.read(max_bytes + 1)
    if len(payload) > max_bytes:
        raise ValueError(f"JSON response exceeds safety limit of {max_bytes} bytes")
    return json.loads(payload)


def request_json(url: str, api_key: str | None = None, timeout: float = 10.0):
    positive_timeout(timeout)
    headers = {"Accept": "application/json", "User-Agent": USER_AGENT}
    if api_key:
        headers["X-API-Key"] = api_key
    req = urllib.request.Request(url, headers=headers)
    opener = urllib.request.build_opener(NoRedirectHandler())
    with opener.open(req, timeout=timeout) as response:
        return read_json_response(response)
