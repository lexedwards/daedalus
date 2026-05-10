#!/usr/bin/env bash
set -euo pipefail

# ------------------------------------------------------------------------------
# Interactive Skill Linking Manager
# Links repository-managed skills to the local agent skills directory with
# interactive checklist, install-all, and force-replace support.
# ------------------------------------------------------------------------------

SOURCE_DIR="./skills"
DEST_DIR="$HOME/.agents/skills"
INSTALL_ALL=false
FORCE=false

# Arrays for skill state
SKILL_NAMES=()
SKILL_SOURCES=()
SKILL_STATES=()
SKILL_SELECTED=()

# Global key variable for interactive mode
KEY=""

usage() {
  cat <<EOF
Usage: $0 [OPTIONS]

Link repository-managed skills to the local agent skills directory.

Options:
  --install-all    Install or update all repo-managed skills without interaction
  --force          Allow replacing real files and empty directories
  --source-dir     Source directory containing skills (default: ./skills)
  --dest-dir       Destination directory for skill links (default: ~/.agents/skills)
  -h, --help       Show this help message
EOF
  exit 0
}

parse_args() {
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --install-all)
        INSTALL_ALL=true
        shift
        ;;
      --force)
        FORCE=true
        shift
        ;;
      --source-dir)
        if [[ -z "${2:-}" ]]; then
          echo "Error: --source-dir requires an argument" >&2
          exit 1
        fi
        SOURCE_DIR="$2"
        shift 2
        ;;
      --dest-dir)
        if [[ -z "${2:-}" ]]; then
          echo "Error: --dest-dir requires an argument" >&2
          exit 1
        fi
        DEST_DIR="$2"
        shift 2
        ;;
      -h|--help)
        usage
        ;;
      *)
        echo "Error: Unknown option: $1" >&2
        usage
        ;;
    esac
  done
}

validate_source() {
  if [ ! -d "$SOURCE_DIR" ]; then
    echo "Error: Source directory not found: $SOURCE_DIR" >&2
    exit 1
  fi

  SOURCE_DIR="$(cd "$SOURCE_DIR" && pwd -P)"
}

ensure_dest() {
  if [ -L "$DEST_DIR" ] && [ ! -d "$DEST_DIR" ]; then
    echo "Error: Destination is a broken symlink: $DEST_DIR" >&2
    exit 1
  fi

  if [ -e "$DEST_DIR" ] && [ ! -d "$DEST_DIR" ]; then
    echo "Error: Destination exists but is not a directory: $DEST_DIR" >&2
    exit 1
  fi

  if [ ! -d "$DEST_DIR" ]; then
    mkdir -p "$DEST_DIR"
  fi
  DEST_DIR="$(cd "$DEST_DIR" && pwd -P)"
}

classify_skills() {
  local src name dest current

  for src in "$SOURCE_DIR"/*; do
    [ -d "$src" ] || continue

    name="$(basename "$src")"
    dest="$DEST_DIR/$name"

    SKILL_NAMES+=("$name")
    SKILL_SOURCES+=("$src")

    if [ -L "$dest" ]; then
      current="$(readlink "$dest")"
      if [ "$current" = "$src" ]; then
        SKILL_STATES+=("linked")
        SKILL_SELECTED+=(1)
      else
        SKILL_STATES+=("symlink_conflict")
        SKILL_SELECTED+=(0)
      fi
    elif [ -f "$dest" ]; then
      SKILL_STATES+=("file_conflict")
      SKILL_SELECTED+=(0)
    elif [ -d "$dest" ]; then
      SKILL_STATES+=("dir_conflict")
      SKILL_SELECTED+=(0)
    elif [ -e "$dest" ]; then
      SKILL_STATES+=("file_conflict")
      SKILL_SELECTED+=(0)
    else
      SKILL_STATES+=("missing")
      SKILL_SELECTED+=(0)
    fi
  done
}

select_all() {
  local i=0
  while [ $i -lt ${#SKILL_SELECTED[@]} ]; do
    SKILL_SELECTED[$i]=1
    i=$((i + 1))
  done
}

validate_interactive() {
  if [ "$INSTALL_ALL" = true ]; then
    return 0
  fi

  if [ ! -t 0 ] || [ ! -t 1 ]; then
    echo "Error: Interactive mode requires a terminal." >&2
    echo "Use --install-all for non-interactive installation, or run in a terminal." >&2
    exit 1
  fi
}

validate_before_apply() {
  if [ "$FORCE" = true ]; then
    return 0
  fi

  local has_conflict=false
  local i=0

  while [ $i -lt ${#SKILL_NAMES[@]} ]; do
    if [ ${SKILL_SELECTED[$i]} -eq 1 ]; then
      local state="${SKILL_STATES[$i]}"
      if [ "$state" = "file_conflict" ] || [ "$state" = "dir_conflict" ]; then
        echo "Error: Selected skill '${SKILL_NAMES[$i]}' conflicts with a real file or directory." >&2
        has_conflict=true
      fi
    fi
    i=$((i + 1))
  done

  if [ "$has_conflict" = true ]; then
    echo "Use --force to replace, or unselect conflicting skills." >&2
    return 1
  fi

  return 0
}

read_key() {
  local ch rest
  if ! IFS= read -rs -n1 -d '' ch; then
    return 1
  fi

  if [ "$ch" = $'\e' ]; then
    if IFS= read -rs -t 1 -n2 -d '' rest 2>/dev/null; then
      KEY="$ch$rest"
    else
      KEY="$ch"
    fi
  else
    KEY="$ch"
  fi
}

draw_checklist() {
  local active_idx=$1
  local i=0

  clear 2>/dev/null || printf '\033[2J\033[H'

  echo "Interactive Skill Linking"
  echo "========================="
  echo ""
  echo "Source: $SOURCE_DIR"
  echo "Destination: $DEST_DIR"
  echo ""
  printf "Use \u2191/\u2193 to navigate, Space to toggle, Enter to apply, q to quit\n"
  echo ""

  while [ $i -lt ${#SKILL_NAMES[@]} ]; do
    local prefix="  "
    [ $i -eq "$active_idx" ] && prefix="> "

    local checkbox="[ ]"
    [ ${SKILL_SELECTED[$i]} -eq 1 ] && checkbox="[x]"

    local state="${SKILL_STATES[$i]}"
    local status=""
    case "$state" in
      linked)
        status="already linked"
        ;;
      missing)
        status="missing"
        ;;
      symlink_conflict)
        status="symlink conflict"
        ;;
      file_conflict)
        status="file conflict"
        ;;
      dir_conflict)
        status="directory conflict"
        ;;
    esac

    printf "%s%s %-25s %s\n" "$prefix" "$checkbox" "${SKILL_NAMES[$i]}" "($status)"
    i=$((i + 1))
  done

  echo ""
  echo "Press Enter to apply changes, q to quit without changes"
}

run_checklist() {
  local active=0

  # Hide cursor
  tput civis 2>/dev/null || true

  # Ensure cursor is restored on exit
  trap 'tput cnorm 2>/dev/null || true' EXIT

  while true; do
    draw_checklist "$active"

    if ! read_key; then
      break
    fi

    case "$KEY" in
      $'\e[A')
        if [ "$active" -gt 0 ]; then
          active=$((active - 1))
        fi
        ;;
      $'\e[B')
        local max_idx
        max_idx=$((${#SKILL_NAMES[@]} - 1))
        if [ "$active" -lt "$max_idx" ]; then
          active=$((active + 1))
        fi
        ;;
      ' ')
        if [ ${SKILL_SELECTED[$active]} -eq 1 ]; then
          SKILL_SELECTED[$active]=0
        else
          SKILL_SELECTED[$active]=1
        fi
        ;;
      $'\n')
        tput cnorm 2>/dev/null || true
        return 0
        ;;
      'q'|'Q'|$'\e')
        tput cnorm 2>/dev/null || true
        echo ""
        echo "No changes made."
        exit 0
        ;;
    esac
  done
}

apply_changes() {
  local created=0
  local updated=0
  local removed=0
  local skipped=0
  local i=0

  while [ $i -lt ${#SKILL_NAMES[@]} ]; do
    local name="${SKILL_NAMES[$i]}"
    local src="${SKILL_SOURCES[$i]}"
    local dest="$DEST_DIR/$name"
    local state="${SKILL_STATES[$i]}"
    local selected=${SKILL_SELECTED[$i]}

    if [ "$selected" -eq 1 ]; then
      case "$state" in
        linked)
          echo "[UNCHANGED] $name (already linked)"
          ;;
        missing)
          ln -s "$src" "$dest"
          echo "[CREATED]   $name"
          created=$((created + 1))
          ;;
        symlink_conflict)
          rm "$dest"
          ln -s "$src" "$dest"
          echo "[UPDATED]   $name (replaced conflicting symlink)"
          updated=$((updated + 1))
          ;;
        file_conflict)
          if [ "$FORCE" = true ]; then
            rm "$dest"
            ln -s "$src" "$dest"
            echo "[REPLACED]  $name (replaced file)"
            updated=$((updated + 1))
          else
            echo "[SKIPPED]   $name (file conflict, use --force to replace)"
            skipped=$((skipped + 1))
          fi
          ;;
        dir_conflict)
          if [ "$FORCE" = true ]; then
            if [ -z "$(ls -A "$dest" 2>/dev/null)" ]; then
              rmdir "$dest"
              ln -s "$src" "$dest"
              echo "[REPLACED]  $name (replaced empty directory)"
              updated=$((updated + 1))
            else
              echo "[SKIPPED]   $name (non-empty directory protected)"
              skipped=$((skipped + 1))
            fi
          else
            echo "[SKIPPED]   $name (directory conflict, use --force to replace)"
            skipped=$((skipped + 1))
          fi
          ;;
      esac
    else
      if [ "$state" = "linked" ]; then
        rm "$dest"
        echo "[REMOVED]   $name"
        removed=$((removed + 1))
      fi
    fi

    i=$((i + 1))
  done

  echo ""

  if [ "$created" -eq 0 ] && [ "$updated" -eq 0 ] && [ "$removed" -eq 0 ] && [ "$skipped" -eq 0 ]; then
    echo "No changes were necessary."
  else
    echo "Summary:"
    [ "$created" -gt 0 ] && echo "  Created:   $created"
    [ "$updated" -gt 0 ] && echo "  Updated:   $updated"
    [ "$removed" -gt 0 ] && echo "  Removed:   $removed"
    [ "$skipped" -gt 0 ] && echo "  Skipped:   $skipped"
  fi
}

main() {
  parse_args "$@"
  validate_source
  ensure_dest
  classify_skills

  if [ ${#SKILL_NAMES[@]} -eq 0 ]; then
    echo "No repo-managed skills found."
    echo "No changes were necessary."
    exit 0
  fi

  if [ "$INSTALL_ALL" = true ]; then
    select_all
    apply_changes
  else
    validate_interactive
    run_checklist
    validate_before_apply
    apply_changes
  fi
}

main "$@"
