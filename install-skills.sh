#!/bin/bash
# Quick installer for oli-skills
# Run from your skills-browser repo: ./install-skills.sh /path/to/target/project

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLI="$SCRIPT_DIR/packages/oli-skills/dist/cli.js"

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

if [ ! -f "$CLI" ]; then
    echo "Building oli-skills first..."
    cd "$SCRIPT_DIR/packages/oli-skills"
    node scripts/build.js
    cd - > /dev/null
fi

if [ -n "$1" ]; then
    TARGET="$1"
    if [ ! -d "$TARGET" ]; then
        echo "Creating directory: $TARGET"
        mkdir -p "$TARGET"
    fi
    cd "$TARGET"
fi

echo -e "${BLUE}Installing oli-skills to: $(pwd)${NC}"
echo ""

node "$CLI" init
