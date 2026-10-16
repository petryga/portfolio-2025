// Removes utm_* params from the address bar once analytics has recorded the visit.
// Umami wraps history.replaceState and would log a second pageview, so call the
// native prototype method instead.
export function stripTrackingParams() {
  const url = new URL(window.location.href);
  const keys = [...url.searchParams.keys()].filter((k) => k.startsWith("utm_"));
  if (keys.length === 0) return;
  keys.forEach((k) => url.searchParams.delete(k));
  History.prototype.replaceState.call(
    window.history,
    window.history.state,
    "",
    url.pathname + url.search + url.hash,
  );
}

// Waits until after load so the analytics pageview has captured the full URL.
export function stripTrackingParamsAfterLoad(delayMs = 1500) {
  const run = () => setTimeout(stripTrackingParams, delayMs);
  if (document.readyState === "complete") run();
  else window.addEventListener("load", run, { once: true });
}
