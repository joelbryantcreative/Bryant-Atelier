/* Bryant Atelier: site behaviour. No dependencies. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var saveData = navigator.connection && navigator.connection.saveData;

  /* ---------------------------------------------------------------------
     Vimeo helpers (postMessage API, no SDK needed)
  --------------------------------------------------------------------- */
  function vimeoSrc(id, params) {
    var q = Object.assign({ dnt: 1, title: 0, byline: 0, portrait: 0 }, params || {});
    return "https://player.vimeo.com/video/" + encodeURIComponent(id) + "?" +
      Object.keys(q).map(function (k) { return k + "=" + q[k]; }).join("&");
  }
  function vimeoIframe(id, params, title) {
    var f = document.createElement("iframe");
    f.src = vimeoSrc(id, params);
    f.allow = "autoplay; fullscreen; picture-in-picture";
    f.setAttribute("allowfullscreen", "");
    f.title = title || "Video";
    return f;
  }
  function vimeoPost(iframe, method, value) {
    if (!iframe || !iframe.contentWindow) return;
    var msg = value === undefined ? { method: method } : { method: method, value: value };
    iframe.contentWindow.postMessage(JSON.stringify(msg), "https://player.vimeo.com");
  }
  // Call handlers[event] when the given iframe reports it.
  function vimeoListen(iframe, handlers) {
    function onMessage(e) {
      if (e.source !== iframe.contentWindow) return;
      var data;
      try { data = typeof e.data === "string" ? JSON.parse(e.data) : e.data; } catch (err) { return; }
      if (!data || !data.event) return;
      if (data.event === "ready") {
        Object.keys(handlers).forEach(function (ev) { if (ev !== "ready") vimeoPost(iframe, "addEventListener", ev); });
      }
      if (handlers[data.event]) handlers[data.event](data);
    }
    window.addEventListener("message", onMessage);
    return function () { window.removeEventListener("message", onMessage); };
  }

  /* ---------------------------------------------------------------------
     Header: solid on scroll, mobile menu
  --------------------------------------------------------------------- */
  var header = document.querySelector("[data-header]");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 24); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var toggle = document.querySelector("[data-nav-toggle]");
  var mobileNav = document.querySelector("[data-mobile-nav]");
  if (toggle && mobileNav) {
    var setOpen = function (open) {
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.querySelector(".visually-hidden").textContent = open ? "Close menu" : "Menu";
    };
    toggle.addEventListener("click", function () { setOpen(!document.body.classList.contains("nav-open")); });
    mobileNav.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("nav-open")) { setOpen(false); toggle.focus(); }
    });
    window.matchMedia("(min-width: 60rem)").addEventListener("change", function (m) { if (m.matches) setOpen(false); });
  }

  /* ---------------------------------------------------------------------
     Hero: muted looping Vimeo over a poster still.
     Skipped for reduced motion / data saver: the poster stays.
  --------------------------------------------------------------------- */
  var heroSlot = document.querySelector("[data-hero-video]");
  if (heroSlot && !reduceMotion && !saveData) {
    var heroFrame = vimeoIframe(heroSlot.getAttribute("data-hero-video"),
      { background: 1, autoplay: 1, loop: 1, muted: 1, autopause: 0, controls: 0 }, "Bryant Atelier reel");
    heroFrame.className = "hero__video";
    heroFrame.setAttribute("tabindex", "-1");
    heroFrame.setAttribute("aria-hidden", "true");
    vimeoListen(heroFrame, { play: function () { heroFrame.classList.add("is-ready"); } });
    heroSlot.replaceWith(heroFrame);
  }

  /* ---------------------------------------------------------------------
     Work tiles: Vimeo preview on first hover (desktop only)
  --------------------------------------------------------------------- */
  if (finePointer && !reduceMotion && !saveData) {
    document.querySelectorAll("[data-preview]").forEach(function (tile) {
      var frame = null;
      function ensure() {
        if (frame) return;
        frame = vimeoIframe(tile.getAttribute("data-preview"),
          { background: 1, autoplay: 1, loop: 1, muted: 1, autopause: 0 }, "");
        frame.className = "work-card__preview";
        frame.setAttribute("tabindex", "-1");
        frame.setAttribute("aria-hidden", "true");
        vimeoListen(frame, { play: function () { if (tile.matches(":hover")) tile.classList.add("is-previewing"); } });
        tile.insertBefore(frame, tile.querySelector(".work-card__scrim"));
      }
      tile.addEventListener("mouseenter", function () {
        ensure();
        vimeoPost(frame, "play");
        if (frame.dataset.played) tile.classList.add("is-previewing");
        frame.dataset.played = "1";
      });
      tile.addEventListener("mouseleave", function () {
        tile.classList.remove("is-previewing");
        vimeoPost(frame, "pause");
      });
    });
  }

  /* ---------------------------------------------------------------------
     Reels: tap to play inline, tap again to pause, back to poster at end.
     Only one plays at a time.
  --------------------------------------------------------------------- */
  var activeReel = null;
  function stopReel(reel) {
    if (!reel || !reel._restore) return;
    reel._restore();
  }
  document.querySelectorAll("[data-reel]").forEach(function (reel) {
    var btn = reel.querySelector(".reel__btn");
    btn.addEventListener("click", function () {
      if (activeReel && activeReel !== reel) stopReel(activeReel);
      activeReel = reel;
      var frame = vimeoIframe(reel.getAttribute("data-reel"), { autoplay: 1, controls: 0, playsinline: 1 }, btn.getAttribute("aria-label").replace("Play ", ""));
      var pause = document.createElement("button");
      pause.type = "button";
      pause.className = "reel__pause";
      pause.setAttribute("aria-label", "Pause");
      pause.innerHTML = '<span class="play-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 4.5v15l12.5-7.5z"/></svg></span>';
      var paused = false;
      pause.addEventListener("click", function () {
        paused = !paused;
        vimeoPost(frame, paused ? "pause" : "play");
        pause.classList.toggle("is-paused", paused);
        pause.setAttribute("aria-label", paused ? "Play" : "Pause");
      });
      var unlisten = vimeoListen(frame, {
        play: function () { paused = false; pause.classList.remove("is-paused"); pause.setAttribute("aria-label", "Pause"); },
        pause: function () { paused = true; pause.classList.add("is-paused"); pause.setAttribute("aria-label", "Play"); },
        ended: function () { stopReel(reel); }
      });
      reel._restore = function () {
        unlisten();
        frame.remove();
        pause.remove();
        btn.hidden = false;
        reel._restore = null;
        if (activeReel === reel) activeReel = null;
      };
      btn.hidden = true;
      reel.appendChild(frame);
      reel.appendChild(pause);
      pause.focus({ preventScroll: true });
    });
  });

  /* ---------------------------------------------------------------------
     Project hero film: poster until clicked, then full player.
  --------------------------------------------------------------------- */
  document.querySelectorAll("[data-film]").forEach(function (film) {
    var btn = film.querySelector(".film__btn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var frame = vimeoIframe(film.getAttribute("data-film"), { autoplay: 1 }, film.getAttribute("data-title") || "Film");
      film.appendChild(frame);
      btn.remove();
      frame.focus();
    });
  });

  /* ---------------------------------------------------------------------
     /work filters (also driven by ?type=)
  --------------------------------------------------------------------- */
  var filterBar = document.querySelector("[data-filters]");
  if (filterBar) {
    var items = document.querySelectorAll("[data-cats]");
    var groups = document.querySelectorAll("[data-filter-group]");
    var applyFilter = function (key, push) {
      filterBar.querySelectorAll("button").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-filter") === key));
      });
      items.forEach(function (el) {
        var cats = (el.getAttribute("data-cats") || "").split(" ");
        el.hidden = key !== "all" && cats.indexOf(key) === -1;
      });
      groups.forEach(function (g) {
        g.hidden = !g.querySelector("[data-cats]:not([hidden])");
      });
      var count = document.querySelector("[data-filter-count]");
      if (count) {
        var n = Array.prototype.filter.call(items, function (el) { return !el.hidden; }).length;
        count.textContent = n + (n === 1 ? " piece" : " pieces");
      }
      if (push) {
        var url = new URL(window.location.href);
        if (key === "all") url.searchParams.delete("type"); else url.searchParams.set("type", key);
        history.replaceState(null, "", url);
      }
    };
    filterBar.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-filter]");
      if (b) applyFilter(b.getAttribute("data-filter"), true);
    });
    var initial = new URLSearchParams(window.location.search).get("type");
    var valid = filterBar.querySelector('[data-filter="' + initial + '"]');
    applyFilter(valid ? initial : "all", false);
  }

  /* ---------------------------------------------------------------------
     Frames lightbox (keyboard, swipe)
  --------------------------------------------------------------------- */
  var frames = document.querySelectorAll("[data-frame]");
  var lb = document.querySelector("[data-lightbox]");
  if (frames.length && lb) {
    var lbImg = lb.querySelector("img");
    var lbCount = lb.querySelector("[data-lb-count]");
    var idx = 0;
    var lastFocus = null;
    var show = function (i) {
      idx = (i + frames.length) % frames.length;
      var f = frames[idx];
      lbImg.src = f.getAttribute("data-frame");
      lbImg.alt = f.querySelector("img").alt;
      lbCount.textContent = (idx + 1) + " / " + frames.length;
    };
    var open = function (i) {
      lastFocus = document.activeElement;
      show(i);
      lb.hidden = false;
      requestAnimationFrame(function () { lb.classList.add("is-open"); });
      document.body.style.overflow = "hidden";
      lb.querySelector("[data-lb-close]").focus();
    };
    var close = function () {
      lb.classList.remove("is-open");
      document.body.style.overflow = "";
      setTimeout(function () { lb.hidden = true; }, 260);
      if (lastFocus) lastFocus.focus();
    };
    frames.forEach(function (f, i) { f.addEventListener("click", function () { open(i); }); });
    lb.querySelector("[data-lb-close]").addEventListener("click", close);
    lb.querySelector("[data-lb-prev]").addEventListener("click", function () { show(idx - 1); });
    lb.querySelector("[data-lb-next]").addEventListener("click", function () { show(idx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb || e.target.classList.contains("lightbox__stage")) close(); });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(idx - 1);
      else if (e.key === "ArrowRight") show(idx + 1);
      else if (e.key === "Tab") {
        var focusables = lb.querySelectorAll("button");
        var first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    var touchX = null;
    lb.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1));
      touchX = null;
    });
  }

  /* ---------------------------------------------------------------------
     Contact form: Formsubmit AJAX, success in place.
     Without JS the form posts normally and Formsubmit redirects back.
  --------------------------------------------------------------------- */
  document.querySelectorAll("[data-contact-form]").forEach(function (form) {
    var success = form.parentNode.querySelector("[data-form-success]");
    var status = form.querySelector("[data-form-status]");
    form.addEventListener("submit", function (e) {
      if (!form.checkValidity()) return; // let the browser show messages
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var label = btn.innerHTML;
      btn.disabled = true;
      btn.textContent = "Sending…";
      status.textContent = "";
      var body = new FormData(form);
      var interests = body.getAll("interest");
      body.delete("interest");
      if (interests.length) body.append("interest", interests.join(", "));
      fetch(form.action.replace("formsubmit.co/", "formsubmit.co/ajax/"), {
        method: "POST", body: body, headers: { Accept: "application/json" }
      })
        .then(function (res) { return res.json().then(function (d) { return { ok: res.ok, data: d }; }); })
        .then(function (r) {
          if (r.ok && r.data && (r.data.success === true || r.data.success === "true")) {
            form.hidden = true;
            success.hidden = false;
            success.focus();
          } else { throw new Error("not ok"); }
        })
        .catch(function () {
          btn.disabled = false;
          btn.innerHTML = label;
          var email = document.querySelector('a[href^="mailto:"]');
          status.textContent = "Something went wrong sending your message. Please try again, or email me directly at " +
            (email ? email.textContent : "us") + ".";
        });
    });
  });

  // /review/?offer=story preselects the offer
  var offerParam = new URLSearchParams(window.location.search).get("offer");
  if (offerParam) {
    var radio = document.querySelector('[data-offer="' + offerParam + '"]');
    if (radio) radio.checked = true;
  }

  // Formsubmit no-JS redirect lands on ?sent=1
  if (/[?&]sent=1/.test(window.location.search)) {
    var s = document.querySelector("[data-form-success]");
    var f = document.querySelector("[data-contact-form]");
    if (s && f) { f.hidden = true; s.hidden = false; }
  }
})();
