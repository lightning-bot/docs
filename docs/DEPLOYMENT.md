# Deploy lightningbot.app to the shared VPS

This uses the same [deployment interface as the portfolio](https://github.com/celveren/portfolio/blob/master/.github/workflows/deploy-vps.yml): pushes to `master` and manual Actions runs build the site, report GitHub deployment states, upload a new release over SSH, and atomically replace `current`. Lightning uses its own account and directory on the shared VPS.

| Setting | Lightning value |
| --- | --- |
| Public URL | `https://lightningbot.app` |
| Repository / branch | `lightning-bot/docs` / `master` |
| GitHub environment | `production` |
| Deployment user | `deploy-lightning` |
| Deployment base | `/var/www/lightning-docs` |
| Nginx root | `/var/www/lightning-docs/current` |

The runner uses Node 22, runs the website and deployment-helper tests, and builds the prerendered Vite site. Only `dist/` is uploaded. The Linux VPS needs Bash, GNU coreutils, OpenSSH, rsync, and native Nginx. Routine deployment needs no sudo, Docker, Node, or Nginx reload. Docker Compose remains available for local use.

## 1. Provision the deployment account

Run these once as the VPS administrator (Debian/Ubuntu example; skip package/account creation when already present):

```sh
sudo apt-get update
sudo apt-get install -y rsync
sudo adduser --disabled-password --gecos '' deploy-lightning
sudo install -d -o deploy-lightning -g deploy-lightning -m 0755 /var/www/lightning-docs
sudo install -d -o deploy-lightning -g deploy-lightning -m 0755 /var/www/lightning-docs/releases
sudo install -d -o deploy-lightning -g deploy-lightning -m 0700 /home/deploy-lightning/.ssh
```

Give this account ownership only of its home and Lightning deployment directories. It needs no sudo or Docker membership. Leave the portfolio's account, directories, Nginx configuration, and certificates in place. Parent directories must allow traversal by the deployment account and Nginx worker; uploaded directories are mode `0755`, files `0644`.

On your trusted computer, generate a dedicated key:

```sh
ssh-keygen -t ed25519 -f ~/.ssh/lightning-actions -C lightning-github-actions -N ''
```

Install the public key in `/home/deploy-lightning/.ssh/authorized_keys`, with this prefix:

```text
restrict ssh-ed25519 AAAA... lightning-github-actions
```

As the administrator, set its owner to `deploy-lightning:deploy-lightning` and mode to `0600`. `restrict` disables forwarding and PTY allocation; it still permits deployment shell commands as this account. Keep the private key off the VPS and out of Git.

## 2. Configure GitHub

In `lightning-bot/docs`, create **Settings → Environments → production** and allow the `master` branch. Protect workflow/script changes through branch review rules.

Add these environment variables:

| Variable | Value |
| --- | --- |
| `VPS_HOST` | The shared VPS's runner-reachable DNS name or IPv4 address, without a URL scheme; use its origin SSH address, not a Cloudflare-proxied website hostname |
| `VPS_USER` | `deploy-lightning` |
| `VPS_PORT` | Optional; defaults to `22` |
| `VPS_PATH` | Optional; defaults to `/var/www/lightning-docs` (the base, not `current`) |
| `DEPLOYMENT_URL` | Optional; defaults to `https://lightningbot.app` |
| `CLOUDFLARE_PURGE_ENABLED` | Set to `true` to enable hostname cache refresh; otherwise it is skipped |
| `CLOUDFLARE_ZONE_ID` | If enabled, zone ID for `lightningbot.app` |
| `CLOUDFLARE_HOSTNAME` | Optional; defaults to `lightningbot.app` |

Add these environment secrets:

| Secret | Value |
| --- | --- |
| `VPS_SSH_KEY` | Full dedicated private key, including BEGIN/END lines |
| `VPS_KNOWN_HOSTS` | Verified SSH host-key entry for the shared VPS |
| `CLOUDFLARE_API_TOKEN` | If enabled, token with Zone → Cache Purge permission limited to the Lightning zone |

The same verified host key can be reused from the portfolio when `VPS_HOST` and port match. Use a separate deployment private key. From a trusted VPS console, inspect `/etc/ssh/ssh_host_ed25519_key.pub` and its fingerprint with `ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub`. Format the secret as:

```text
your-vps.example.com ssh-ed25519 AAAA...verified-host-key...
```

For a custom port use `[your-vps.example.com]:2222` in the first field. Do not accept unverified `ssh-keyscan` output. The script enforces host verification. Ensure the SSH endpoint is reachable under your existing firewall/network policy.

GitHub uses the built-in `GITHUB_TOKEN` with `contents: read` and `deployments: write`. It reports `pending`, `in_progress`, `success`, `failure`, or `error` for cancellation and links to the Actions run. `environment.deployment: false` prevents duplicate automatic deployment records; custom GitHub App deployment protection rules are incompatible with that option. See [GitHub's environment behavior](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/control-deployments#using-environments-without-deployments).

Cloudflare refresh purges only the configured hostname, including its cached HTML, CSS, JavaScript, and images. It never purges the entire zone. A purge failure keeps the activated release and reports a warning while deployment remains successful. An intentionally skipped purge is not a failure. See [hostname purging](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-hostname/). This does not clear visitors' browser caches.

## 3. Upload the first release

After the account and GitHub configuration are ready, push the workflow and scripts to `master`, or select **Actions → Deploy website to VPS → Run workflow → master**. A successful run creates `/var/www/lightning-docs/current` without modifying Nginx.

Check access using the actual Nginx worker account (`nginx` or `www-data`, depending on the server):

```sh
sudo -u nginx test -r /var/www/lightning-docs/current/index.html
sudo -u nginx test -r /var/www/lightning-docs/current/docs/index.html
sudo -u nginx test -r /var/www/lightning-docs/current/guide/modlog/index.html
```

## 4. Add the Lightning Nginx virtual host

Use a separate server block for `lightningbot.app` in the shared VPS's actual enabled configuration layout. Point DNS at this VPS and provision a certificate covering `lightningbot.app` using the existing certificate workflow. Preserve the portfolio's server blocks and the server's established HTTP/HTTPS listener arrangement.

In Lightning's HTTPS server block, retain the appropriate TLS/listen directives and add:

```nginx
server_name lightningbot.app;
root /var/www/lightning-docs/current;
index index.html;
server_tokens off;
open_file_cache off;

add_header X-Content-Type-Options nosniff always;
add_header Cache-Control "no-cache" always;

location / {
    try_files $uri $uri/ =404;
}

error_page 404 /404.html;
```

This is a fragment for the Lightning server block, not a replacement for the shared Nginx configuration. Directory indexes serve prerendered articles, and unknown routes retain HTTP 404. Allow the `current` symlink under any `disable_symlinks` policy. Serve `current`, never the base directory containing release history. The included `nginx.conf` is for Docker and has a different root.

Back up the affected configuration outside the enabled include directories, then validate and reload as administrator:

```sh
sudo nginx -t && sudo systemctl reload nginx
```

Check `https://lightningbot.app/`, `/docs`, `/guide/modlog`, a generated CSS/JavaScript asset, and an unknown nested URL (which must return 404). Verify the portfolio still responds normally. GitHub reports release activation, not DNS/TLS readiness or live-site health; no live HTTP check or automatic rollback is performed.

## Rollback and retention

Failed tests/builds/uploads leave `current` untouched. Releases have unique `COMMIT_SHA-RUN_ID-ATTEMPT` names; rerun a failed Actions job to get a new attempt. Previous and incomplete releases remain on disk. Monitor usage and remove only inactive releases, keeping a known-good rollback target.

Pause deployments and wait for an active run to finish. As `deploy-lightning`, select a complete known-good release and switch back:

```sh
cd /var/www/lightning-docs
ln -s releases/REPLACE_WITH_KNOWN_GOOD_RELEASE current-rollback
mv -Tf current-rollback current
```

Verify the website and refresh the Lightning Cloudflare cache if enabled. Manual rollback does not update GitHub's deployment history. Revert the faulty source change before deploying again. A request spanning the atomic switch, or an already-open browser tab, can request an old Vite asset that is absent in the new release; refreshing loads the current page and assets.

API outages or runner termination can leave stale GitHub statuses; a reporting failure after activation does not undo the release. Changes to DNS, certificates, GitHub settings, and the VPS are separate setup steps and are not performed by these repository files.
