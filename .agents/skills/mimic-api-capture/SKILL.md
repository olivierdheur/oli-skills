---
name: Mimic API Capture
description: Intercept mobile/web app traffic and generate Python API clients automatically using mimic
---

# Mimic API Capture

Intercept any app's API traffic, extract authentication, and generate Python clients automatically.

**Source**: [littledivy/mimic](https://github.com/littledivy/mimic) (3000+ stars)

## What Mimic Does

```
capture traffic   →   extract auth   →   generate client
  (mitmproxy)         (mimic.Session)      (AI reads endpoints)
```

Most apps authenticate with a stable bundle: bearer token, device IDs, session ID, cookies. Capture once, replay on new requests.

## Installation

```bash
sh install.sh
# Or manually:
uv tool install mimic-client

# Verify setup
mimic doctor
```

## Capture Methods

### 1. iOS App (mitmproxy)

```bash
mimic record                    # starts proxy, prints iPhone steps
```

Setup on iPhone:
1. Wi-Fi → Configure Proxy → Manual → `<your-mac-ip>:8080`
2. Safari → `http://mitm.it` → install Apple profile
3. Settings → General → About → Certificate Trust → enable mitmproxy
4. Use the app normally

Then:
```bash
mimic hosts                     # list captured API hosts
mimic learn api.example.com     # see captured endpoints
mimic gen api.example.com       # generate python client
```

### 2. Web Apps (HAR file)

No proxy needed:
1. Chrome/Firefox DevTools → Network tab
2. Right-click → "Save all as HAR"

```bash
mimic hosts --har traffic.har
mimic gen api.example.com --har traffic.har
```

### 3. Copy as cURL

For quick one-offs:
```bash
# Copy "Copy as cURL" from DevTools
mimic gen --curl "curl 'https://api.example.com/...' -H 'Authorization: ...'"
```

## Generated Client Usage

```python
from example_client import ExampleApp

app = ExampleApp()              # reuses captured session
data = app.get_items()          # generated method
app.create_item(name="test")    # with proper auth headers
```

## Session API (Manual)

```python
from mimic import Session

# From mitmproxy capture
session = Session.from_mitm("api.example.com")

# From cURL
session = Session.from_curl(open("copied.txt").read())

# From HAR
session = Session.from_har("traffic.har", "api.example.com")

# Manual
session = Session(
    base_url="https://api.example.com",
    headers={"Authorization": "Bearer xxx", "X-Device-Id": "abc"}
)

# Use it
response = session.get("/users/me")
session.post("/items", json={"name": "test"})
```

## Handling Certificate Pinning

Apps that reject proxy certs (banking, Instagram):

```bash
# Jailbroken device
mimic unpin com.example.app     # prints Frida command

# Stock device (needs decrypted IPA)
mimic unpin ./MyApp.ipa --codesign <TEAM_ID>
```

**Framework notes:**
- React Native: works with standard hooks
- Flutter: needs [reFlutter](https://github.com/Impact-I/reFlutter), ships own TLS

## Limitations

| Issue | Impact | Workaround |
|-------|--------|------------|
| Certificate pinning | Blocks capture | `mimic unpin` with Frida |
| DPoP tokens | Blocks replay | No clean workaround — per-request signing |
| Hardware attestation | Full block | Out of scope |

**Check if it'll work:**
```bash
mimic hosts   # if the API host shows up, you're good
```

## Workflow Example

```bash
# 1. Start capture
mimic record

# 2. Use the app on your phone
# (login, browse, perform actions)

# 3. Check what was captured  
mimic hosts
# → prod-api.example.com (47 requests)

# 4. See the endpoints
mimic learn prod-api.example.com
# → GET  /v1/users/me
# → GET  /v1/feed
# → POST /v1/items

# 5. Generate client
mimic gen prod-api.example.com
# → Wrote example_client.py

# 6. Use it
python -c "from example_client import Example; print(Example().get_feed())"
```

## Best Practices

1. **Capture fresh sessions** — tokens expire
2. **Check `mimic hosts` first** — confirms traffic is visible
3. **Edit generated code** — it's just Python, customize as needed
4. **Handle token refresh** — 401 on idempotent requests auto-retries
5. **Respect ToS** — use on your own accounts only

## Common Patterns

### Multi-step API flows
```python
# Many mobile APIs chain calls
token = app.get_temp_token()
app.submit_action(token=token)
```

### Rotating tokens
```python
# Session handles 401 retry automatically for GET/HEAD
session.get("/protected")  # retries once on 401
session.post("/action", refresh=True)  # explicit refresh
```

### Multiple hosts
```python
auth_session = Session.from_mitm("auth.example.com")
api_session = Session.from_mitm("api.example.com")
```

## Ethics

- Use on your own accounts and data only
- Respect each app's terms of service
- This replays YOUR session, not others'
