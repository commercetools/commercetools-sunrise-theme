#!/bin/bash
set -e

# Create a new git repo in the output directory
cd output
git init

# Configure user information
git config user.name "automation-commercetools"
git config user.email "automation@commercetools.de"

# Deploy to GitHub pages
git add .
git commit -m "Deploy to GitHub Pages"

# We redirect any output to /dev/null to hide any sensitive credential data that might otherwise be exposed
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1