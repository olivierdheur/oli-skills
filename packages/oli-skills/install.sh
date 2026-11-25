#!/bin/bash
# oli-skills installer - Run this in any project to get 500+ AI skills for Cursor
# Usage: curl -fsSL https://raw.githubusercontent.com/YOUR_USERNAME/skills-browser/main/packages/oli-skills/install.sh | bash

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  oli-skills installer - 500+ AI skills for Cursor${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Node.js is required but not installed.${NC}"
    echo "Install from: https://nodejs.org/"
    exit 1
fi

# Create temp directory
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

echo -e "${GREEN}✓${NC} Downloading oli-skills..."

# Download the package (replace with your actual repo URL)
curl -sL https://github.com/YOUR_USERNAME/skills-browser/archive/main.tar.gz | tar -xz -C "$TEMP_DIR" --strip-components=1

echo -e "${GREEN}✓${NC} Installing skills to current project..."

# Run the CLI
node "$TEMP_DIR/packages/oli-skills/dist/cli.js" init

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  Installation complete!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Usage in Cursor:"
echo "  Read .skills/agents/animate/SKILL.md"
echo ""
echo "Or ask Cursor:"
echo "  Using the cro skill, review this landing page"
echo ""
