function boardOriginPattern(value) {
  try {
    const url = new URL(value);
    if ((url.protocol !== 'http:' && url.protocol !== 'https:') || url.hostname === '' || url.username !== '' || url.password !== '') return undefined;
    return `${url.origin}/*`;
  } catch {
    return undefined;
  }
}

// background service worker: handles board access and gmFetch requests from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message && message.type === 'requestBoardPermission') {
    const origin = boardOriginPattern(message.url);
    if (origin === undefined) {
      sendResponse({ granted: false, detail: 'invalid board address' });
      return;
    }
    chrome.permissions.request({ origins: [origin] }, (granted) => {
      sendResponse({ granted, detail: chrome.runtime.lastError?.message });
    });
    return true;
  }
  if (!message || message.type !== 'gmFetch') return;
  const call = message.call || {};
  (async () => {
    try {
      const controller = new AbortController();
      let timeoutId;
      if (typeof call.timeout === 'number' && call.timeout > 0) {
        timeoutId = setTimeout(() => controller.abort(), call.timeout);
      }
      const headers = new Headers(call.headers || {});
      const init = {
        method: call.method || 'GET',
        headers,
        body: call.data || null,
        signal: controller.signal,
        // credentials: 'omit' // default
      };
      const resp = await fetch(call.url, init);
      const text = await resp.text();
      const headerPairs = [];
      resp.headers.forEach((v, k) => headerPairs.push(`${k}: ${v}`));
      const responseObj = {
        status: resp.status,
        statusText: resp.statusText,
        finalUrl: resp.url,
        responseText: text,
        responseHeaders: headerPairs.join('\r\n')
      };
      if (timeoutId) clearTimeout(timeoutId);
      sendResponse(responseObj);
    } catch (e) {
      // on error or abort return undefined to match previous gmFetch void behavior
      sendResponse(void 0);
    }
  })();
  // indicate we will call sendResponse asynchronously
  return true;
});
