#!/bin/sh

PROFILE="${1:-luca._.dc}"

python3 -m instaloader \
  --reels \
  --no-captions \
  --no-metadata-json \
  --no-profile-pic \
  --dirname-pattern="assets/intake/instagram/{profile}" \
  --filename-pattern="{date_utc}_UTC_{shortcode}" \
  -- "$PROFILE"
