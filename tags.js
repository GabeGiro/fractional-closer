// Ad measurement tags beyond Google Ads: GA4, Meta Pixel, LinkedIn Insight Tag.
// GA4 loads always (Consent Mode keeps it cookieless until Accept).
// Meta and LinkedIn load only after Accept. Empty id = tag not loaded.
// Never pass personal data (no advanced matching): thanks.html must stay email-free.
var FC_TAGS = {
  ga4: "",        // "G-XXXXXXXXXX"
  metaPixel: "",  // "123456789012345"
  linkedin: ""    // Insight Tag partner id, "1234567"
};

window.fcTrack = function (metaEvent, ga4Event) {
  if (ga4Event && FC_TAGS.ga4 && typeof gtag === "function") gtag("event", ga4Event, { source: ((window.fcSource || {}).last || {}).utm_source || "direct" });
  if (metaEvent && typeof fbq === "function") fbq("track", metaEvent);
};

(function () {
  // gtag.js is already on the page for Google Ads; one library serves both ids.
  if (FC_TAGS.ga4 && typeof gtag === "function") gtag("config", FC_TAGS.ga4);

  var loaded = false;
  window.fcLoadAdTags = function () {
    if (loaded) return;
    loaded = true;
    if (FC_TAGS.metaPixel) {
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
      document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq("init", FC_TAGS.metaPixel);
      fbq("track", "PageView");
    }
    if (FC_TAGS.linkedin) {
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(FC_TAGS.linkedin);
      var l = document.createElement("script");
      l.async = true;
      l.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
      document.head.appendChild(l);
    }
  };

  var consent = null;
  try { consent = localStorage.getItem("fc-consent"); } catch (e) {}
  if (consent === "granted") window.fcLoadAdTags();
})();
