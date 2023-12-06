#!/bin/bash
if [ -e $1 ]; then
  exit 1
fi

# Check git status
# GIT_STATUS=$(git status -s)
# if [ -n "$GIT_STATUS" ]; then
#   git reset --hard
# fi

# Get latest code
# git pull origin $1

# Check pm2 status
OUTPUT=$(pm2 pid sspot_$1)
CHECK="NO"

if [ -n "$OUTPUT" ]; then
  CHECK="YES"
else
  CHECK="NO"
fi

COMMAND=""

# Run build commands and to clear cache
npm cache clear --force
NODE_OPTIONS="--max-old-space-size=4096" npm install --legacy-peer-deps
npm run build:$1

# Decide PM2 script
if [ $CHECK == "NO" ]; then
  COMMAND="pm2 start npm --name sspot_$1 -- run serve:$1"
else
  COMMAND="pm2 reload sspot_$1"
fi

# Run pm2 command
$COMMAND
