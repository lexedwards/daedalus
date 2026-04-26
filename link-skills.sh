#!/usr/bin/env bash
set -euo pipefail

SOURCE_DIR="${1:-./skills}"
DEST_DIR="$HOME/.agents/skills"

if [ ! -d "$SOURCE_DIR" ]; then
  echo "Source directory not found: $SOURCE_DIR" >&2
  exit 1
fi

SOURCE_DIR="$(cd "$SOURCE_DIR" && pwd -P)"
mkdir -p "$DEST_DIR"

for src in "$SOURCE_DIR"/*; do
  [ -d "$src" ] || continue

  name="$(basename "$src")"
  dest="$DEST_DIR/$name"

  if [ -L "$dest" ]; then
    current="$(readlink "$dest")"

    if [ "$current" = "$src" ]; then
      echo "Already linked: $dest -> $src"
    else
      rm "$dest"
      ln -s "$src" "$dest"
      echo "Updated link: $dest -> $src"
    fi
  elif [ -e "$dest" ]; then
    echo "Skipping existing non-symlink: $dest" >&2
  else
    ln -s "$src" "$dest"
    echo "Created link: $dest -> $src"
  fi
done
