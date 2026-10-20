#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
# Mirrors the existing Render build command. Supporting assets already live in public/.
mkdir -p public
cp index.html styles.css app.js favicon.svg public/
test -f public/data/states.js
test -f public/data/toolkit.js
test -f public/data/workflow.js
test -f public/assets/fonts/fonts.css
