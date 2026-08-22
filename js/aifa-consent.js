/* AIFA cookie consent — PECR / UK GDPR
 * Necessary cookies only until the visitor chooses.
 * Marketing (GTM, Meta Pixel, chat) loads only after "Accept all".
 */
(function () {
  "use strict";
  var KEY = "aifa_cookie_consent";
  var GTM_ID = "GTM-5JSZNZ4Q";
  var PIXEL_ID = "630094975903061";

  function getChoice() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }

  function setChoice(value) {
    try {
      localStorage.setItem(KEY, value);
    } catch (e) {}
    window.dispatchEvent(new CustomEvent("aifa-consent-changed", { detail: value }));
  }

  function allowsMarketing() {
    return getChoice() === "all";
  }

  function loadGtm() {
    if (window.__aifaGtmLoaded) return;
    window.__aifaGtmLoaded = true;
    window.dataLayer = window.dataLayer || [];
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      var f = d.getElementsByTagName(s)[0];
      var j = d.createElement(s);
      var dl = l !== "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", GTM_ID);
  }

  function loadPixel() {
    if (window.__aifaPixelLoaded) return;
    window.__aifaPixelLoaded = true;
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", PIXEL_ID);
    window.fbq("track", "PageView");
  }

  function loadMarketing() {
    loadGtm();
    loadPixel();
  }

  function injectStyles() {
    if (document.getElementById("aifa-consent-css")) return;
    var css = document.createElement("style");
    css.id = "aifa-consent-css";
    css.textContent =
      "#aifa-consent{position:fixed;z-index:2147483000;left:1rem;right:1rem;bottom:1rem;max-width:640px;margin:0 auto;padding:1.15rem 1.25rem;background:#141424;color:#f8fafc;border:1px solid rgba(255,122,203,.28);border-radius:14px;box-shadow:0 18px 50px rgba(0,0,0,.45);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif}" +
      "#aifa-consent p{margin:0 0 .9rem;font-size:.9rem;line-height:1.55;color:#d5deec}" +
      "#aifa-consent a{color:#ff7acb}" +
      "#aifa-consent .aifa-consent-actions{display:flex;flex-wrap:wrap;gap:.55rem}" +
      "#aifa-consent button{min-height:42px;border:0;border-radius:8px;padding:0 1rem;font:inherit;font-weight:750;cursor:pointer}" +
      "#aifa-consent .aifa-consent-accept{background:linear-gradient(135deg,#e60ba0,#7c3aed);color:#fff}" +
      "#aifa-consent .aifa-consent-reject{background:rgba(255,255,255,.08);color:#f8fafc;border:1px solid rgba(255,255,255,.12)}" +
      ".aifa-skip-link{position:absolute;left:-999px;top:auto;width:1px;height:1px;overflow:hidden;z-index:2147483646;background:#e60ba0;color:#fff;padding:.7rem 1rem;font-weight:800;text-decoration:none;border-radius:0 0 8px 0}" +
      ".aifa-skip-link:focus{left:0;top:0;width:auto;height:auto}";
    document.head.appendChild(css);
  }

  function hideBanner() {
    var el = document.getElementById("aifa-consent");
    if (el) el.remove();
  }

  function showBanner() {
    if (document.getElementById("aifa-consent")) return;
    if (!document.body) {
      document.addEventListener("DOMContentLoaded", showBanner);
      return;
    }
    injectStyles();
    var bar = document.createElement("div");
    bar.id = "aifa-consent";
    bar.setAttribute("role", "dialog");
    bar.setAttribute("aria-label", "Cookie consent");
    bar.innerHTML =
      "<p>We use cookies for the website to work, and — only if you agree — for analytics, advertising, and the chat widget. " +
      'Read the <a href="/privacy-policy-aifa.html#cookies">cookie policy</a>.</p>' +
      '<div class="aifa-consent-actions">' +
      '<button type="button" class="aifa-consent-accept">Accept all</button>' +
      '<button type="button" class="aifa-consent-reject">Necessary only</button>' +
      "</div>";
    document.body.appendChild(bar);
    bar.querySelector(".aifa-consent-accept").addEventListener("click", function () {
      setChoice("all");
      loadMarketing();
      hideBanner();
    });
    bar.querySelector(".aifa-consent-reject").addEventListener("click", function () {
      setChoice("necessary");
      hideBanner();
    });
  }

  window.aifaConsent = {
    get: getChoice,
    allowsMarketing: allowsMarketing,
    set: setChoice,
    show: showBanner,
    loadMarketing: loadMarketing
  };

  window.aifaWhenMarketing = function (fn) {
    if (allowsMarketing()) {
      fn();
      return;
    }
    window.addEventListener("aifa-consent-changed", function handler(e) {
      if (e.detail === "all") {
        window.removeEventListener("aifa-consent-changed", handler);
        fn();
      }
    });
  };

  if (allowsMarketing()) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", loadMarketing);
    } else {
      loadMarketing();
    }
  } else if (!getChoice()) {
    showBanner();
  }
})();
