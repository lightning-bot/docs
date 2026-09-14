#!/usr/bin/env bash
# Run from the repository root after building dist/. Requires Linux on the VPS.
set -euo pipefail

fail() { printf '%s\n' "$*" >&2; exit 1; }
: "${VPS_HOST:?Set VPS_HOST}"
: "${VPS_USER:?Set VPS_USER}"
: "${VPS_SSH_KEY:?Set VPS_SSH_KEY}"
: "${VPS_KNOWN_HOSTS:?Set VPS_KNOWN_HOSTS}"
: "${RELEASE_ID:?Set RELEASE_ID}"
VPS_PORT=${VPS_PORT:-22}
VPS_PATH=${VPS_PATH:-/var/www/lightning-docs}

# These values also enter a remote shell command; permit only simple literals.
[[ $VPS_HOST =~ ^[a-zA-Z0-9][a-zA-Z0-9.-]*$ ]] || fail 'Use a DNS hostname or IPv4 address for VPS_HOST.'
[[ $VPS_USER =~ ^[a-z_][a-z0-9_-]*$ && $VPS_USER != root ]] || fail 'Use a dedicated non-root VPS_USER.'
[[ $VPS_PORT =~ ^[0-9]{1,5}$ ]] && (( 10#$VPS_PORT >= 1 && 10#$VPS_PORT <= 65535 )) || fail 'Invalid VPS_PORT.'
[[ $VPS_PATH =~ ^/([a-zA-Z0-9_-]+/)*[a-zA-Z0-9_-]+$ ]] || fail 'VPS_PATH must be an absolute path with simple directory names.'
[[ $RELEASE_ID =~ ^[a-f0-9]{40}-[0-9]+-[0-9]+$ ]] || fail 'Invalid RELEASE_ID.'
required_files=(index.html 404.html docs/index.html)
for file in "${required_files[@]}"; do
  [[ -s dist/$file ]] || fail "Missing or empty dist/$file"
done
# Read the same validated, named-table navigation used by the build.
script_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
route_files=$(node --input-type=module - "$script_dir/content/navigation.mjs" "$PWD" <<'NODE'
import {pathToFileURL} from 'node:url'
const {loadNavigation} = await import(pathToFileURL(process.argv[2]).href)
for (const page of loadNavigation(process.argv[3])) {
  console.log(`${page.path.slice(1)}/index.html`)
}
NODE
) || fail 'Unable to validate navigation.toml.'
while IFS= read -r file; do
  [[ -s dist/$file ]] || fail "Missing or empty dist/$file"
  required_files+=("$file")
done <<< "$route_files"
[[ -d dist/assets ]] || fail 'Missing dist/assets.'
[[ -z $(find dist -type l -print -quit) ]] || fail 'Publish regular files, not symbolic links.'

umask 077
ssh_dir=$(mktemp -d)
trap 'rm -rf -- "$ssh_dir"' EXIT
printf '%s\n' "$VPS_SSH_KEY" > "$ssh_dir/key"
printf '%s\n' "$VPS_KNOWN_HOSTS" > "$ssh_dir/known_hosts"
unset VPS_SSH_KEY VPS_KNOWN_HOSTS
# A config file keeps quoting identical for ssh and rsync.
cat > "$ssh_dir/config" <<EOF
Host deploy-vps
  HostName $VPS_HOST
  User $VPS_USER
  Port $VPS_PORT
  IdentityFile "$ssh_dir/key"
  UserKnownHostsFile "$ssh_dir/known_hosts"
  GlobalKnownHostsFile /dev/null
  StrictHostKeyChecking yes
  IdentitiesOnly yes
  BatchMode yes
  PasswordAuthentication no
  ConnectTimeout 15
  ServerAliveInterval 15
  ServerAliveCountMax 3
  ForwardAgent no
  ClearAllForwardings yes
EOF

release="$VPS_PATH/releases/$RELEASE_ID"
# Refuse to overwrite an existing release, including on a retry.
ssh -F "$ssh_dir/config" deploy-vps "bash -se -- '$VPS_PATH' '$RELEASE_ID'" <<'REMOTE'
set -euo pipefail
umask 022
base=$1
release="$base/releases/$2"
[[ $(id -u) != 0 ]] || { echo 'Deploy using an unprivileged account.' >&2; exit 1; }
command -v rsync >/dev/null || { echo 'An administrator must install rsync on the VPS first.' >&2; exit 1; }
[[ -d $base && -w $base && -x $base ]] || {
  echo "Deployment user needs write and traversal access to $base; see docs/DEPLOYMENT.md." >&2
  exit 1
}
[[ ! -e $base/current || -L $base/current ]] || { echo 'current must be a symlink.' >&2; exit 1; }
mkdir -p "$base/releases"
[[ -w $base/releases && -x $base/releases ]] || {
  echo "Deployment user needs write and traversal access to $base/releases." >&2
  exit 1
}
mkdir "$release"
REMOTE

# Upload only the staged public files; never delete from the live directory.
rsync -rltz --chmod=D755,F644 --exclude='.DS_Store' \
  -e "ssh -F '$ssh_dir/config'" dist/ "deploy-vps:$release/"


# Paths come from the validated /docs endpoint format, so they contain no
# shell metacharacters. Pass the identical file list to the remote checks.
activation_command="bash -se -- '$VPS_PATH' '$RELEASE_ID'"
for file in "${required_files[@]}"; do
  activation_command+=" '$file'"
done
# GNU mv -T replaces the link itself atomically on the same filesystem.
ssh -F "$ssh_dir/config" deploy-vps "$activation_command" <<'REMOTE'
set -euo pipefail
base=$1
release_id=$2
release="$base/releases/$release_id"
shift 2
for file in "$@"; do
  test -s "$release/$file"
done
test -d "$release/assets"

next="$base/.current-$release_id"
ln -s "releases/$release_id" "$next"
mv -Tf "$next" "$base/current"
printf 'Activated release %s\n' "$release_id"
REMOTE

