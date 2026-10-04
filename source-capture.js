// Source capture: remembers which ad brought the visitor and passes it on to Calendly,
// so every booked call shows its source (Calendly stores utm_* on the booking).
// No cookies: one localStorage entry per touch, never any personal data.
(function () {
  var KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  var CLICK_IDS = ["gclid", "fbclid", "li_fat_id"];
  var MAX_AGE = 90 * 24 * 3600 * 1000;

  function read(key) {
    try {
      var v = JSON.parse(localStorage.getItem(key) || "null");
      return v && Date.now() - v.ts < MAX_AGE ? v : null;
    } catch (e) { return null; }
  }
  function write(key, v) {
    try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) {}
  }

  var params = new URLSearchParams(location.search), touch = { ts: Date.now(), landing: location.pathname }, found = false;
  KEYS.concat(CLICK_IDS).forEach(function (k) {
    var v = params.get(k);
    if (v) { touch[k] = v.slice(0, 100); found = true; }
  });
  if (found) {
    // A click id with no utm_source still names the network.
    if (!touch.utm_source) touch.utm_source = touch.gclid ? "google" : touch.fbclid ? "meta" : touch.li_fat_id ? "linkedin" : "";
    if (!read("fc-src-first")) write("fc-src-first", touch);
    write("fc-src-last", touch);
  }

  var last = read("fc-src-last");
  window.fcSource = { first: read("fc-src-first"), last: last };
  if (!last) return;

  document.querySelectorAll('a[href*="calendly.com"]').forEach(function (a) {
    var url = new URL(a.href);
    KEYS.forEach(function (k) { if (last[k]) url.searchParams.set(k, last[k]); });
    a.href = url.toString();
  });
})();
