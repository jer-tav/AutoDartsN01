(async () => {
  // Load all keys from chrome.storage.local and copy them into localStorage so the content script
  // can synchronously read them as before. Then patch Storage.setItem/removeItem/clear to persist
  // changes back to chrome.storage.local.
  try {
    const stored = await new Promise((res) => chrome.storage.local.get(null, res));
    if (stored && typeof stored === 'object') {
      for (const [k, v] of Object.entries(stored)) {
        try {
          // store strings only to match previous behavior
          localStorage.setItem(k, typeof v === 'string' ? v : String(v));
        } catch (e) {
          // ignore quota or access errors
        }
      }
    }
  } catch (e) {
    // ignore
  }

  // Patch Storage.prototype methods so writes are mirrored to chrome.storage.local
  try {
    const origSet = Storage.prototype.setItem;
    const origRemove = Storage.prototype.removeItem;
    const origClear = Storage.prototype.clear;

    Storage.prototype.setItem = function (key, value) {
      try {
        // Keep original behavior first
        const result = origSet.call(this, key, value);
        // Mirror to chrome.storage.local asynchronously
        try {
          const obj = { [key]: String(value) };
          chrome.storage.local.set(obj);
        } catch (e) {
          // ignore
        }
        return result;
      } catch (e) {
        // If original throws, still attempt to persist
        try { chrome.storage.local.set({ [key]: String(value) }); } catch (e2) {}
      }
    };

    Storage.prototype.removeItem = function (key) {
      try {
        const result = origRemove.call(this, key);
        try { chrome.storage.local.remove(key); } catch (e) {}
        return result;
      } catch (e) {
        try { chrome.storage.local.remove(key); } catch (e2) {}
      }
    };

    Storage.prototype.clear = function () {
      try {
        const result = origClear.call(this);
        try { chrome.storage.local.clear(); } catch (e) {}
        return result;
      } catch (e) {
        try { chrome.storage.local.clear(); } catch (e2) {}
      }
    };
  } catch (e) {
    // If patching fails, proceed without mirrored persistence
  }
})();
