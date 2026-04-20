/* AIFA Analytics — GA4 key event tracking via dataLayer
 * Fires: book_call_click, form_submit, video_play, scroll_90
 * Works with GTM-5JSZNZ4Q container (GTM forwards dataLayer events to GA4).
 * Load with: <script defer src="/js/aifa-analytics.js"></script>
 */
(function () {
  "use strict";
  window.dataLayer = window.dataLayer || [];

  function push(eventName, params) {
    try {
      window.dataLayer.push(Object.assign({ event: eventName }, params || {}));
    } catch (e) {
      // fail silently — analytics must never break the page
    }
  }

  // ───────────────────────────────────────────────────────────
  // 1. BOOK A CALL CLICKS
  // ───────────────────────────────────────────────────────────
  // Tracks any anchor that leads to the LeadConnector booking widget,
  // or has text containing "Book" and points to our booking URLs.
  function isBookCallAnchor(a) {
    if (!a || a.tagName !== "A") return false;
    var href = (a.getAttribute("href") || "").toLowerCase();
    var text = (a.textContent || "").toLowerCase().trim();
    if (href.indexOf("leadconnectorhq.com/widget/booking") !== -1) return true;
    if (href.indexOf("#book-a-call") !== -1) return true;
    if (text.indexOf("book a call") !== -1) return true;
    if (text.indexOf("book a free") !== -1) return true;
    if (text.indexOf("book a platform tour") !== -1) return true;
    if (text.indexOf("book a strategy call") !== -1) return true;
    if (text.indexOf("book a workflow audit") !== -1) return true;
    return false;
  }

  document.addEventListener(
    "click",
    function (e) {
      var target = e.target;
      // Walk up from target in case an inner <span> was clicked
      for (var n = 0; n < 4 && target; n++) {
        if (target.tagName === "A") break;
        target = target.parentElement;
      }
      if (isBookCallAnchor(target)) {
        push("book_call_click", {
          cta_text: (target.textContent || "").trim().slice(0, 80),
          cta_url: target.getAttribute("href") || "",
          page_path: window.location.pathname,
          page_title: document.title,
        });
      }
    },
    { capture: true, passive: true }
  );

  // ───────────────────────────────────────────────────────────
  // 2. FORM SUBMISSIONS
  // ───────────────────────────────────────────────────────────
  document.addEventListener(
    "submit",
    function (e) {
      var form = e.target;
      if (!form || form.tagName !== "FORM") return;
      var formName =
        form.getAttribute("name") ||
        form.getAttribute("id") ||
        form.getAttribute("action") ||
        "unnamed";
      push("form_submit", {
        form_name: formName,
        form_id: form.getAttribute("id") || "",
        page_path: window.location.pathname,
        page_title: document.title,
      });
    },
    { capture: true, passive: true }
  );

  // ───────────────────────────────────────────────────────────
  // 3. YOUTUBE IFRAME PLAY
  // ───────────────────────────────────────────────────────────
  // YouTube iframes send a postMessage when state changes.
  // We listen and fire video_play once per video per page view.
  var playedVideos = {};
  window.addEventListener(
    "message",
    function (e) {
      if (!e.data) return;
      var data;
      try {
        data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      } catch (err) {
        return;
      }
      if (!data || data.event !== "infoDelivery" || !data.info) return;
      // playerState 1 = playing
      if (data.info.playerState === 1) {
        var id = data.id || "unknown";
        if (playedVideos[id]) return;
        playedVideos[id] = true;
        push("video_play", {
          video_provider: "youtube",
          video_player_id: id,
          page_path: window.location.pathname,
          page_title: document.title,
        });
      }
    },
    false
  );

  // Enable JS API on all YouTube iframes we find on page so they send messages
  function enableYouTubeAPI() {
    var iframes = document.querySelectorAll('iframe[src*="youtube"]');
    iframes.forEach(function (f, i) {
      var src = f.src;
      if (src.indexOf("enablejsapi=1") !== -1) return;
      var separator = src.indexOf("?") === -1 ? "?" : "&";
      f.src = src + separator + "enablejsapi=1";
      if (!f.id) f.id = "yt-player-" + i;
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enableYouTubeAPI);
  } else {
    enableYouTubeAPI();
  }

  // ───────────────────────────────────────────────────────────
  // 4. SCROLL DEPTH — 90% milestone
  // ───────────────────────────────────────────────────────────
  // Fires once per page view when user scrolls past 90% of page height.
  var scrollFired = false;
  function checkScroll() {
    if (scrollFired) return;
    var scrolled = window.scrollY + window.innerHeight;
    var fullHeight = document.documentElement.scrollHeight;
    if (fullHeight <= window.innerHeight) return; // page shorter than viewport
    var percent = (scrolled / fullHeight) * 100;
    if (percent >= 90) {
      scrollFired = true;
      push("scroll_90", {
        page_path: window.location.pathname,
        page_title: document.title,
      });
    }
  }
  // Throttle with requestAnimationFrame
  var scrollTicking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (scrollTicking) return;
      scrollTicking = true;
      window.requestAnimationFrame(function () {
        checkScroll();
        scrollTicking = false;
      });
    },
    { passive: true }
  );
})();
