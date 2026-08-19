const BOARD_URL_KEY = "n01-sink:bridge-url";
const DEFAULT_BOARD_ADDRESS = "127.0.0.1:3180";
const addressInput = document.querySelector("#board-address");
const settingsForm = document.querySelector("#settings");
const testButton = document.querySelector("#test-connection");
const status = document.querySelector("#status");

function normalizeBoardUrl(value) {
  const trimmed = value.trim();
  const address = (trimmed === "" ? DEFAULT_BOARD_ADDRESS : trimmed).replace(/^https?:\/\//i, "").replace(/\/+$/, "");
  const match = /^(\d{1,3}(?:\.\d{1,3}){3})(?::(\d+))?$/.exec(address);
  if (match === null || match[1].split(".").some((part) => Number(part) > 255)) return undefined;
  if (match[2] !== undefined && match[2] !== "3180") return undefined;
  return `http://${match[1]}:3180`;
}

function showStatus(message, isError = false) {
  status.textContent = message;
  status.classList.toggle("error", isError);
}

function requestBoardPermission(boardUrl) {
  const origin = `${new URL(boardUrl).origin}/*`;
  return new Promise((resolve) => {
    chrome.permissions.request({ origins: [origin] }, (granted) => {
      resolve(granted && chrome.runtime.lastError === undefined);
    });
  });
}

chrome.storage.local.get(BOARD_URL_KEY, (stored) => {
  const savedUrl = stored[BOARD_URL_KEY];
  addressInput.value = typeof savedUrl === "string" ? savedUrl.replace(/^https?:\/\//i, "") : DEFAULT_BOARD_ADDRESS;
});

settingsForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const boardUrl = normalizeBoardUrl(addressInput.value);
  if (boardUrl === undefined) {
    showStatus("Use an IPv4 address, optionally ending in :3180.", true);
    addressInput.focus();
    return;
  }

  if (!(await requestBoardPermission(boardUrl))) {
    showStatus("Board access was not granted.", true);
    return;
  }

  chrome.storage.local.set({ [BOARD_URL_KEY]: boardUrl }, () => {
    if (chrome.runtime.lastError !== undefined) {
      showStatus(chrome.runtime.lastError.message, true);
      return;
    }
    addressInput.value = boardUrl.replace(/^https?:\/\//i, "");
    showStatus("Saved. Reload an open scoring page to use it.");
  });
});

testButton.addEventListener("click", async () => {
  const boardUrl = normalizeBoardUrl(addressInput.value);
  if (boardUrl === undefined) {
    showStatus("Use an IPv4 address, optionally ending in :3180.", true);
    addressInput.focus();
    return;
  }

  if (!(await requestBoardPermission(boardUrl))) {
    showStatus("Board access was not granted.", true);
    return;
  }

  showStatus("Testing connection\u2026");
  try {
    const response = await fetch(`${boardUrl}/api/host`, {
      signal: AbortSignal.timeout(3000),
      headers: { accept: "application/json" }
    });
    if (!response.ok) {
      showStatus(`Board answered with HTTP ${response.status}.`, true);
      return;
    }
    const body = await response.json();
    const hostname = typeof body.hostname === "string" ? body.hostname : "unknown";
    const version = typeof body.clientVersion === "string" ? body.clientVersion : "unknown";
    showStatus(`Connected to ${hostname} (v${version}).`);
  } catch {
    showStatus("Could not reach the board at that address.", true);
  }
});
