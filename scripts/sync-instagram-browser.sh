#!/bin/sh

PROFILE="${1:-luca._.dc}"
BROWSER_SOURCE="${BROWSER_SOURCE:-chrome/instagram.com}"
BASE_DIR="assets/intake/instagram/${PROFILE}"

mkdir -p "${BASE_DIR}/posts" "${BASE_DIR}/reels"

python3 -m gallery_dl \
  --cookies-from-browser "${BROWSER_SOURCE}" \
  -D "${BASE_DIR}/posts" \
  --download-archive "${BASE_DIR}/archive.txt" \
  -f "{date:%Y-%m-%dT%H-%M-%SZ}_UTC_{shortcode}_{num}.{extension}" \
  "https://www.instagram.com/${PROFILE}/posts/"

python3 -m gallery_dl \
  --cookies-from-browser "${BROWSER_SOURCE}" \
  -D "${BASE_DIR}/reels" \
  --download-archive "${BASE_DIR}/reels-archive.txt" \
  -f "{date:%Y-%m-%dT%H-%M-%SZ}_UTC_{shortcode}_{num}.{extension}" \
  "https://www.instagram.com/${PROFILE}/reels/"
