#!/bin/bash
# Add a new skill to the library
# Usage: ./scripts/add-skill.sh <source> <skill-name>
# Example: ./scripts/add-skill.sh marketing new-skill

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

if [ -z "$1" ] || [ -z "$2" ]; then
    echo -e "${YELLOW}Usage:${NC} ./scripts/add-skill.sh <source> <skill-name>"
    echo ""
    echo "Sources:"
    echo "  agents      - Design & animation (Emil)"
    echo "  cursor      - Developer skills (ECC)"
    echo "  superpowers - Workflow & SDLC"
    echo "  marketing   - Marketing & growth"
    echo "  vercel      - Vercel platform"
    echo "  seo         - SEO optimization"
    echo "  agency      - Specialized agents"
    echo ""
    echo "Example:"
    echo "  ./scripts/add-skill.sh marketing my-new-skill"
    exit 1
fi

SOURCE=$1
SKILL_NAME=$2

# Map source to directory
case $SOURCE in
    agents)      DIR=".agents/skills" ;;
    cursor)      DIR=".cursor/skills" ;;
    superpowers) DIR=".superpowers/skills" ;;
    marketing)   DIR=".marketing/skills" ;;
    vercel)      DIR=".vercel-skills/skills" ;;
    seo)         DIR=".claude-seo/skills" ;;
    agency)      DIR=".agency/skills" ;;
    *)
        echo -e "${YELLOW}Unknown source: $SOURCE${NC}"
        echo "Valid sources: agents, cursor, superpowers, marketing, vercel, seo, agency"
        exit 1
        ;;
esac

SKILL_DIR="$DIR/$SKILL_NAME"

if [ -d "$SKILL_DIR" ]; then
    echo -e "${YELLOW}Skill already exists: $SKILL_DIR${NC}"
    exit 1
fi

echo -e "${BLUE}Creating skill: $SKILL_NAME in $SOURCE${NC}"

mkdir -p "$SKILL_DIR"

cat > "$SKILL_DIR/SKILL.md" << EOF
---
name: $SKILL_NAME
description: "Description of what this skill does"
---

# $SKILL_NAME

## Overview

Describe what this skill helps with.

## When to Use

- Use case 1
- Use case 2

## Instructions

Step-by-step guidance for the AI assistant.

## Examples

\`\`\`
Example usage or code
\`\`\`

## Related Skills

- skill-1
- skill-2
EOF

echo -e "${GREEN}✓${NC} Created $SKILL_DIR/SKILL.md"
echo ""
echo -e "Next steps:"
echo -e "  1. Edit ${BLUE}$SKILL_DIR/SKILL.md${NC} with your skill content"
echo -e "  2. Commit and push to trigger auto-publish"
echo ""
echo -e "${GREEN}git add $SKILL_DIR && git commit -m 'Add $SKILL_NAME skill' && git push${NC}"
