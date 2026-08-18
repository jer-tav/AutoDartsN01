# Privacy Policy for autodarts -> n01

Effective date: August 18, 2026

## Overview

autodarts -> n01 is a browser extension that reads turn data from an AutoDarts board and enters scores into supported n01, nakka, or DartCounter game pages. This policy describes the data the extension handles and why.

## Data the extension accesses

On supported scoring pages, the extension accesses page information needed to display its sidebar and enter scores, including the active game state, remaining score, selected player or turn, and score-entry controls. It also reads board state from the AutoDarts board address you configure, including connection status, board status, detected darts, segments, scores, and optional dart coordinates.

The extension does not collect account credentials, payment information, browsing history, or data from pages outside its supported scoring sites.

## Local storage

The extension stores configuration locally in Chrome, including the configured board address, language, entry mode, panel state, panel appearance, and keyboard shortcuts.

To keep configuration available on supported scoring pages, the extension's storage bootstrap mirrors browser `localStorage` values written while the extension is running on those pages into `chrome.storage.local`. As a result, local-storage values produced by a supported page may be retained in the extension's local storage. This data stays on your device unless you export, synchronize, or otherwise share your browser profile yourself.

## Network communication

The extension communicates only with:

- Supported n01, nakka, and DartCounter pages to display the sidebar and submit scores.
- The configured AutoDarts board API, normally on your local network.

When you configure a custom board address, Chrome asks you to grant permission for that exact origin. The extension does not send data to a developer-operated server, analytics service, advertising network, or other third party.

## Data sharing and sale

The extension does not sell personal data. It does not share data with third parties, except for the normal communication with the scoring site and the AutoDarts board endpoint that you choose to use.

## Data retention and control

Configuration and mirrored local-storage data remain in Chrome's local extension storage until you clear extension data or uninstall the extension. You can remove the extension's data from Chrome's extension settings or by uninstalling the extension. You can also revoke a custom board host permission from the extension's site-access settings.

## Security

The extension uses the browser's extension storage and permission systems. However, local-network board traffic may use HTTP and is subject to the security characteristics of your local network.

## Changes to this policy

This policy may be updated when the extension's data handling changes. The effective date at the top of this document will be updated with any revision.

## Contact

For privacy questions, use the issue tracker or contact method provided with the extension listing.