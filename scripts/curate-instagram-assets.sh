#!/bin/sh

set -eu

ROOT_DIR="$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)"
PROFILE_ROOT="$ROOT_DIR/assets/intake/instagram/luca._.dc"
POSTS_DIR="$PROFILE_ROOT/posts"
REELS_DIR="$PROFILE_ROOT/reels"
SELECTED_ROOT="$PROFILE_ROOT/selected"
PUBLIC_ROOT="$ROOT_DIR/public"

mkdir -p \
  "$SELECTED_ROOT/artworks/instagram/portraits" \
  "$SELECTED_ROOT/artworks/instagram/studies" \
  "$SELECTED_ROOT/artworks/instagram/subjects" \
  "$SELECTED_ROOT/process/instagram/stills" \
  "$SELECTED_ROOT/process/instagram/reels" \
  "$PUBLIC_ROOT/artworks/instagram/portraits" \
  "$PUBLIC_ROOT/artworks/instagram/studies" \
  "$PUBLIC_ROOT/artworks/instagram/subjects" \
  "$PUBLIC_ROOT/process/instagram/stills" \
  "$PUBLIC_ROOT/process/instagram/reels"

relocate_asset() {
  source_group="$1"
  target_group="$2"
  filename="$3"

  if [ "$source_group" = "posts" ]; then
    source_dir="$POSTS_DIR"
  else
    source_dir="$REELS_DIR"
  fi

  selected_path="$SELECTED_ROOT/$target_group/$filename"
  public_path="$PUBLIC_ROOT/$target_group/$filename"

  if [ -f "$source_dir/$filename" ]; then
    mv "$source_dir/$filename" "$selected_path"
  elif [ ! -f "$selected_path" ]; then
    echo "Missing asset: $filename" >&2
    exit 1
  fi

  cp -f "$selected_path" "$public_path"
}

while IFS='|' read -r source_group target_group filename; do
  [ -n "$filename" ] || continue
  relocate_asset "$source_group" "$target_group" "$filename"
done <<'EOF'
posts|artworks/instagram/portraits|2025-08-04T13-16-28Z_UTC_DM7zeyaIYYz_1.jpg
posts|artworks/instagram/portraits|2023-08-24T15-10-53Z_UTC_CwVPYv4MDBv_1.jpg
posts|artworks/instagram/portraits|2023-01-07T13-41-34Z_UTC_CnHbIJLMdGZ_1.webp
posts|artworks/instagram/portraits|2022-05-07T11-50-20Z_UTC_CdQXpGbMz6h_1.webp
posts|artworks/instagram/portraits|2022-01-07T13-23-45Z_UTC_CYbi8PxMSk7_1.webp
posts|artworks/instagram/portraits|2021-10-31T14-06-57Z_UTC_CVsh1JSMQKw_1.jpg
posts|artworks/instagram/portraits|2021-10-17T13-48-57Z_UTC_CVIcpCys5R9_1.jpg
posts|artworks/instagram/portraits|2021-10-13T12-28-56Z_UTC_CU-ATg1MwnX_1.jpg
posts|artworks/instagram/portraits|2020-08-25T06-29-20Z_UTC_CETWDjbI56i_1.jpg
posts|artworks/instagram/portraits|2020-08-19T12-01-55Z_UTC_CEEfWK5o1-S_1.jpg
posts|artworks/instagram/studies|2021-12-01T13-31-59Z_UTC_CW8SeMJMLQs_1.jpg
posts|artworks/instagram/studies|2021-09-05T13-23-25Z_UTC_CTcQVSCMhik_1.jpg
posts|artworks/instagram/studies|2022-12-11T13-00-42Z_UTC_CmB0_PnsbdI_1.webp
posts|artworks/instagram/studies|2022-09-15T12-39-05Z_UTC_CihxWyPMbvM_1.webp
posts|artworks/instagram/studies|2022-07-09T13-15-42Z_UTC_Cfyvfa_MF9o_1.webp
posts|artworks/instagram/studies|2022-04-03T14-02-05Z_UTC_Cb5DsU8szdt_1.webp
posts|artworks/instagram/studies|2020-12-28T13-34-20Z_UTC_CJV-DullJPu_1.jpg
posts|artworks/instagram/studies|2020-09-01T12-16-42Z_UTC_CEl_X4LIlS1_1.jpg
posts|artworks/instagram/studies|2021-09-29T13-13-27Z_UTC_CUaCRWQsPdl_1.jpg
posts|artworks/instagram/subjects|2021-01-06T19-35-22Z_UTC_CJtyh5Olerw_1.jpg
posts|artworks/instagram/subjects|2020-09-16T12-45-28Z_UTC_CFMqlnsI5dh_1.jpg
posts|artworks/instagram/subjects|2022-06-09T12-47-51Z_UTC_CelcdNPMnYp_1.webp
posts|process/instagram/stills|2024-05-13T14-32-11Z_UTC_C66YBbvM99i_1.jpg
reels|process/instagram/reels|2025-10-15T13-56-52Z_UTC_DP1Q3I0CHsg_1.mp4
reels|process/instagram/reels|2023-11-14T13-01-51Z_UTC_CzoJGHRsOzH_1.mp4
reels|process/instagram/reels|2023-09-15T15-54-22Z_UTC_CxN8uxHsiWp_1.mp4
reels|process/instagram/reels|2022-08-16T12-55-34Z_UTC_ChUjEdJAt11_1.mp4
EOF

find "$POSTS_DIR" -maxdepth 1 -type f -delete
find "$REELS_DIR" -maxdepth 1 -type f -delete

echo "Curated Instagram assets into selected/ and public/."
