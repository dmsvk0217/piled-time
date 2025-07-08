#!/bin/bash

cd "$(dirname "$0")"

if [ -f .env ]; then
  echo "Loading environment from .env..."
  set -a
  . .env
  set +a
else
  echo "No .env file found in $(pwd)"
  exit 1
fi

# Conditionally set SSL_BLOCK
if [ "$ENABLE_SSL" = "true" ]; then
  export SSL_BLOCK="$(cat ./nginx/ssl_block.template.conf)"
else
  export SSL_BLOCK=""
fi

# Generate final config
echo "Generating default.conf from default.template.conf..."
envsubst '${DOMAIN} ${DOMAIN_WWW} ${SSL_BLOCK}' < ./nginx/default.template.conf > ./nginx/default.conf
echo "✅ default.conf successfully generated."
