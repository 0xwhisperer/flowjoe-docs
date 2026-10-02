#!/bin/bash

# run_docs.sh - A developer script to start FlowJoe Docs locally.
# Must be executed from the repository root or the mintlify subdirectory.

# Color definitions
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}"
echo "███████╗██╗      ██████╗ ██╗    ██╗     ██╗ ██████╗ ███████╗"
echo "██╔════╝██║     ██╔═══██╗██║    ██║     ██║██╔═══██╗██╔════╝"
echo "█████╗  ██║     ██║   ██║██║ █╗ ██║     ██║██║   ██║█████╗  "
echo "██╔══╝  ██║     ██║   ██║██║███╗██║██   ██║██║   ██║██╔══╝  "
echo "██║     ███████╗╚██████╔╝╚███╔███╔╝╚█████╔╝╚██████╔╝███████╗"
echo "╚═╝     ╚══════╝ ╚═════╝  ╚══╝╚══╝  ╚════╝  ╚═════╝ ╚══════╝"
echo "                    Developer Docs Portal"
echo -e "${NC}"

# Navigate to the repo root if run from inside mintlify
if [[ "$PWD" == *"/mintlify" ]]; then
  cd ..
fi

echo -e "Checking workspace configuration..."

# 1. Check Node.js
if ! command -v node &> /dev/null; then
  echo -e "${RED}Error: Node.js is not installed. Please install Node.js first.${NC}"
  exit 1
fi
echo -e "  - Node.js version: $(node -v)"

# 2. Check dependencies
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}Warning: node_modules folder is missing. Installing dependencies now...${NC}"
  npm install
  if [ $? -ne 0 ]; then
    echo -e "${RED}Error: 'npm install' failed. Please run it manually.${NC}"
    exit 1
  fi
fi
echo -e "  - Dependencies: Checked."

# 3. Check if port 3000 is already in use
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
  echo -e "${YELLOW}Warning: Port 3000 is already in use.${NC}"
  PID=$(lsof -t -i:3000)
  echo -e "Attempting to release port 3000 (killing process $PID)..."
  kill -9 $PID 2>/dev/null
  sleep 1
fi
echo -e "  - Port 3000: Ready."

# 4. Start Mintlify dev server
echo -e "${GREEN}Starting FlowJoe Docs local dev server...${NC}"
echo -e "Access the portal at: ${YELLOW}http://localhost:3000${NC}"
echo -e "Press Ctrl+C to stop the server."
echo ""

cd mintlify
../node_modules/.bin/mint dev
