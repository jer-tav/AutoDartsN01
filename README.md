# autodarts → n01 (bridge)

**Version:** 0.0.1

Content script conversion of the original TamperMonkey userscript. This browser extension reads the AutoDarts board and enters turns into n01 or DartCounter automatically.

---

## Table of contents
- About
- Features
- Supported sites
- Installation (End user)
- Development (Load unpacked / test locally)
- File layout
- Permissions
- Configuration
- Usage
- Troubleshooting
- Contributing
- License

## About

This project is a browser extension (Manifest V3) that bridges AutoDarts board data into n01 (and DartCounter) web apps by injecting content scripts on supported pages and syncing required data. It started as a conversion of a TamperMonkey userscript into a proper extension.

## Features

- Automatically reads turns from the AutoDarts board
- Enters turns into n01 or DartCounter web UI
- Runs as a content script at `document_idle` for minimal page interference
- Background service worker to support any required background tasks and storage sync

## Supported sites

The extension injects scripts on the following host patterns (from the manifest):

- `https://n01darts.com/n01/web/*`
- `https://n01darts.com/n01/online/n01.php*`
- `https://n01darts.com/n01/tournament/n01_live.php*`
- `https://n01darts.com/n01/tournament/n01_online.php*`
- `https://n01darts.com/n01/league/n01_live.php*`
- `https://n01darts.com/n01/league/n01_online.php*`
- `https://nakka.com/n01/web/*`
- `https://nakka.com/n01/online/n01.php*`
- `https://nakka.com/n01/tournament/n01_live.php*`
- `https://nakka.com/n01/tournament/n01_online.php*`
- `https://nakka.com/n01/league/n01_live.php*`
- `https://nakka.com/n01/league/n01_online.php*`
- `https://app.dartcounter.net/*`

## Installation (End user)

1. Download or clone the repository to your local machine.
2. Open Chrome/Edge (or any Chromium-based browser).
3. Open `chrome://extensions` (or `edge://extensions`).
4. Enable "Developer mode".
5. Click "Load unpacked" and select the project folder (the folder that contains `manifest.json`).
6. The extension will appear in the extensions list. Visit a supported site above to verify it runs.

## Development (Load unpacked / test locally)

- Make code changes to the content scripts in the project folder.
- Reload the extension from the extensions page after edits (click the reload icon).
- Open the devtools on the target site to inspect console logs from content scripts and the background service worker.
- The content scripts run at `document_idle` to ensure page elements are present before interacting.

## File layout

Key files in the repository:

- [manifest.json](C:/Projects/AutoDartsN01/manifest.json) — extension manifest (manifest_version: 3)
- [background.js](C:/Projects/AutoDartsN01/background.js) — service worker (background) script (if present)
- [bootstrap_storage_sync.js](C:/Projects/AutoDartsN01/bootstrap_storage_sync.js) — storage/bootstrap helper used by content scripts
- [contentScript-full.js](C:/Projects/AutoDartsN01/contentScript-full.js) — main content script that performs board reading and input

(If any of the files above don't exist in the repo root, adjust paths accordingly.)

## Permissions

From the manifest:

- `storage` — for persisting settings or syncing data.
- host permissions for supported URLs (and `app.dartcounter.net`) — needed to inject scripts on those sites.

## Configuration

The extension panel appears as a right-hand sidebar on supported n01, nakka, and DartCounter pages. The page uses the remaining two-thirds of the browser while the sidebar is open; use the `-` button in the panel header to minimize it and restore the page to full width.

1. Reload the target game page after installing or reloading the extension.
2. In the sidebar, enter the AutoDarts board address in the address field. Use a full URL such as `http://192.168.1.50:3180`, then press `Enter` to save it. The extension attempts to find a local board automatically at `http://127.0.0.1:3180` when no address has been saved.
3. Leave the panel in **PREVIEW** mode while confirming that board events and detected darts are correct. Preview mode never enters scores into the game.
4. Press **START** only when ready to enter scores automatically. Press **STOP** or `Ctrl+Shift+X` to return immediately to preview mode.
5. Open the settings button to configure:
  - When turns are entered: automatically when darts are removed, or only after confirmation.
  - Panel size and opacity.
  - Keyboard shortcuts for confirming a turn and correcting each dart.
6. In confirmation mode, use the configured confirm shortcut (default: `Enter`) to send the shown turn. The default dart-correction shortcuts are `F1`, `F2`, and `F3`.

The sidebar stores its board address, language, entry mode, panel state, appearance settings, position preferences, and shortcuts in browser storage for the current site.

## Usage

1. Install and configure the extension as described above.
2. Open or reload a supported site and start or join a game on the n01/nakka or DartCounter interface.
3. Confirm the sidebar reports that it is connected to the AutoDarts board and shows the expected darts.
4. Press **START** when ready for the extension to enter turns into the web UI.
5. Use the browser devtools Console to inspect logs when troubleshooting.

## Troubleshooting

- Extension doesn't run on a supported page:
  - Confirm page URL matches one of the host patterns in Supported sites.
  - Open DevTools console to check for errors.
  - Ensure extension is enabled and reloaded (in `chrome://extensions`).
- Symptoms of missing functionality:
  - Confirm scripts are present in the extension folder and the manifest references them (see File layout).
  - Check for CSP issues or site changes — sites occasionally change layout or JS APIs which can break automated input flows.
- For development debugging:
  - Use `console.log` and breakpoints in the content script.
  - Inspect the background service worker via `chrome://extensions` → Inspect views (service worker).

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repo.
2. Make changes on a feature branch.
3. Test locally by loading the unpacked extension.
4. Open a pull request with a clear description of changes and testing steps.

If you change manifest host permissions, scripts, or behavior that affects privacy or host access, call that out clearly in the PR description.

## License

This repository does not include a license file by default. If you want to make this project open source, consider adding an OSI-approved license such as MIT. Add a `LICENSE` file to the repo and update this section.

## Acknowledgements

- This project converts functionality originally implemented as a TamperMonkey userscript.
- Thanks to the maintainers/users of AutoDarts, n01, and DartCounter for the web UIs used as targets.

## Contact

For questions, issues, or feature requests, open an issue in this repository.

---

_Note: This README was generated from the project's manifest (see [manifest.json](C:/Projects/AutoDartsN01/manifest.json)). If there are additional project details (author, contributing guidelines, license) that should be included, provide them and the README can be updated._