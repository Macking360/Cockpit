# Cockpit

## Purpose

This repository contains a static, read-only operator cockpit for the GitHub-backed worker layer.

It is meant to answer one operator question quickly:

> Are Acer and ProBook healthy enough to receive governed work right now?

The page is intentionally not a second control plane. It does not claim work, edit labels, execute worker jobs, call Slack, or change repo state.

## Files

- `index.html` - static page shell.
- `styles.css` - cockpit visual skin.
- `app.js` - browser renderer for the redacted snapshot.
- `data/status.sample.json` - committed sample data for safe preview.
- `data/status.json` - optional generated live snapshot, not required for local preview.

## Generate A Snapshot

From an approved runner or operator checkout:

```powershell
python -m command_centre.cli workers cockpit-snapshot --output data/status.json
```

The snapshot is redacted by design:

- no local filesystem paths
- no raw issue bodies
- no secrets
- no private client data
- no worker claims or side effects

## Preview

Serve the folder locally, then open it in a browser:

```powershell
Set-Location .
python -m http.server 8765
```

Then open:

```text
http://localhost:8765/
```

If `data/status.json` exists, the page renders it. Otherwise it falls back to `data/status.sample.json`.

Opening the HTML file directly may fall back to embedded sample data because some browsers block local JSON fetches from `file://` pages.

## GitHub Pages

This repo is meant to be the Pages source.

If Pages is configured to serve from the repository root, the cockpit path is the root URL of the Pages site.

Do not publish a live `status.json` unless the operator intentionally wants the redacted worker snapshot visible wherever the Pages site is available.

## Boundary

- Read-only static page only.
- No payment, CRM, outreach, voice, browser automation, or deployment side effects.
- No private data.
- No GitHub writes from the page.
- No Slack writes from the page.
