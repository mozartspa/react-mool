#!/usr/bin/env bash
#
# Lerna bumps the versions, npm publishes the packages: Lerna only accepts a
# typed one-time password, while npm also handles the browser confirmation.
#
#   yarn release          bump, commit, tag, push, then publish
#   yarn release:publish  publish only what is missing from npm (resume)

set -euo pipefail

cd "$(dirname "$0")/.."

# In dependency order
PACKAGES="core eui i18n-it react-mool"

# yarn exports npm_config_registry=https://registry.yarnpkg.com to its scripts,
# which would make npm use the wrong registry
for var in $(compgen -e | grep -i '^npm_config_' || true); do
  unset "$var"
done

node_major=$(node -p "process.versions.node.split('.')[0]")
if [ "$node_major" != "$(cat .nvmrc)" ]; then
  echo "Node $(cat .nvmrc) is required, found $(node -v). Run: nvm use" >&2
  exit 1
fi

if ! npm whoami >/dev/null 2>&1; then
  echo "Not logged in to npm. Run: npm login --auth-type web" >&2
  exit 1
fi

if [ "${1:-}" != "--publish-only" ]; then
  yarn lerna version
fi

yarn lerna run clean --ignore example
yarn lerna run build --ignore example

for package in $PACKAGES; do
  (
    cd "packages/$package"
    name=$(node -p "require('./package.json').name")
    version=$(node -p "require('./package.json').version")

    if [ -n "$(npm view "$name@$version" version 2>/dev/null)" ]; then
      echo "Skipping $name@$version: already on npm"
    else
      echo "Publishing $name@$version"
      npm publish --ignore-scripts
    fi
  )
done
