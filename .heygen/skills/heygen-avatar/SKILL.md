# HeyGen Avatar

> Create persistent AI avatars - digital twins with face and voice for video production

Create and manage HeyGen avatars for anyone: agents, users, or named characters. Handles identity extraction, avatar generation, voice selection, and saves to `AVATAR-<name>.md` for reuse.

## When to Use

- "Create an avatar" / "bring yourself to life"
- "Make my digital twin" / "I want my face in videos"
- "Design a presenter" / "set up an avatar"
- Creating identity BEFORE making videos

## Install

```bash
gh skill install heygen-com/skills heygen-avatar
# Or via ClawHub:
clawhub install heygen-skills
```

## Setup

### API Key Method (Recommended for Agents)
```bash
export HEYGEN_API_KEY=<your-key>
# Get key: app.heygen.com/api
```

### MCP Method (OAuth, No API Key)
```bash
# Claude Code:
claude mcp add --transport http heygen https://mcp.heygen.com/mcp/v1/
```

### CLI Installation
```bash
curl -fsSL https://static.heygen.ai/cli/install.sh | bash
heygen --version
heygen auth status
```

## Avatar Creation Methods

### 1. Prompt-Based (Default)
Describe the avatar → HeyGen generates it.
Best for: agents, named characters

### 2. Photo Upload (Digital Twin)
Upload photo → creates exact likeness.
Best for: real people wanting their face

## Workflow

### For Agent Avatars
1. Read `SOUL.md` and `IDENTITY.md` first
2. Use prompt-based creation
3. Only ask for missing traits

### For User Avatars
1. Ask for photo or description
2. Guide through voice selection
3. Save to `AVATAR-USER.md`

## Output

Creates `AVATAR-<name>.md` with:
- `avatar_id` - persistent identifier
- `voice_id` - selected voice
- `group_id` - avatar group
- Identity details

## Voice Selection

```bash
# List available voices
heygen voice list --language en

# Preview a voice
heygen voice preview <voice_id>
```

Voices match the target language automatically.

## Best Practices

1. **Be concise** - no raw API payloads in chat
2. **No jargon** - never mention "Phase 0" or internal names
3. **One question at a time** - no batch asking
4. **Read first** - check workspace files before asking user
5. **Detect language** - communicate in user's language

## Chain with heygen-video

After creating avatar:
```
avatar_id + voice_id → heygen-video → finished video
```

## Resources

- HeyGen API: https://developers.heygen.com/docs/quick-start
- HeyGen CLI: https://developers.heygen.com/cli
- Avatar docs: https://developers.heygen.com/docs/avatars
