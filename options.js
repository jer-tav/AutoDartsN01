const BOARD_URL_KEY = "n01-sink:bridge-url";
const addressInput = document.querySelector("#board-address");
const settingsForm = document.querySelector("#settings");
const status = document.querySelector("#status");

function normalizeBoardUrl(value) {
  const address = value.trim().replace(/^https?:\/\//i, "").replace(/\/+$/, "");
  const match = /^(\d{1,3}(?:\.\d{1,3}){3}):3180$/.exec(address);
  if (match === null || match[1].split(".").some((part) => Number(part) > 255)) return undefined;
  return `http://${address}`;
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
  if (typeof savedUrl === "string") addressInput.value = savedUrl.replace(/^https?:\/\//i, "");
});

settingsForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const boardUrl = normalizeBoardUrl(addressInput.value);
  if (boardUrl === undefined) {
    showStatus("Use an IPv4 address ending in :3180.", true);
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
