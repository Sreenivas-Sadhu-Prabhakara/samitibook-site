/* SamitiBook explainer — tiny interactions, no dependencies.
   1) Sticky nav shadow on scroll
   2) Smooth-scroll for in-page anchors (with reduced-motion respect)
   3) Animated collection-% counter + bar when the hero card is seen
   4) Defaulter "Remind" -> drops a WhatsApp reminder into the outbox
*/
(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- 1. sticky nav shadow ---- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- 2. smooth scroll for same-page links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });
    });
  });

  /* ---- 3. animated collection counter ---- */
  var counter = document.getElementById("collectionCounter");
  var bar = document.getElementById("collectionBar");
  function animateCounter() {
    if (!counter) return;
    var target = parseInt(counter.getAttribute("data-target"), 10) || 0;
    if (reduceMotion) {
      counter.textContent = String(target);
      if (bar) bar.style.width = target + "%";
      return;
    }
    var start = null, dur = 1200;
    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      counter.textContent = String(Math.round(eased * target));
      if (bar) bar.style.width = (eased * target) + "%";
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  var heroCard = document.querySelector(".hero-card");
  if (heroCard && "IntersectionObserver" in window) {
    var seen = false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && !seen) { seen = true; animateCounter(); io.disconnect(); }
      });
    }, { threshold: 0.4 });
    io.observe(heroCard);
  } else {
    animateCounter();
  }

  /* ---- 4. defaulter reminders -> WhatsApp outbox ---- */
  var defList = document.getElementById("defList");
  var outbox = document.getElementById("outbox");
  var outboxEmpty = document.getElementById("outboxEmpty");
  var outboxCount = document.getElementById("outboxCount");
  var queued = 0;

  function timeNow() {
    var d = new Date();
    var h = d.getHours(), m = d.getMinutes();
    var ap = h >= 12 ? "PM" : "AM";
    h = h % 12; if (h === 0) h = 12;
    return h + ":" + (m < 10 ? "0" + m : m) + " " + ap;
  }

  if (defList && outbox) {
    defList.addEventListener("click", function (e) {
      var btn = e.target.closest('[data-action="remind"]');
      if (!btn || btn.classList.contains("sent")) return;
      var li = btn.closest("li");
      var name = li.getAttribute("data-name") || "Resident";
      var flat = li.getAttribute("data-flat") || "";
      var amtEl = li.querySelector(".d-amt");
      var amt = amtEl ? amtEl.textContent.split("·")[0].trim() : "";

      btn.classList.add("sent");
      btn.textContent = "Sent ✓";

      if (outboxEmpty) outboxEmpty.style.display = "none";

      var msg = document.createElement("div");
      msg.className = "wa-msg";
      msg.innerHTML =
        '<span class="wa-to">To: ' + name + " · " + flat + "</span>" +
        "Namaste, gentle reminder from Green Meadows CHS: maintenance of <strong>" +
        amt + "</strong> is pending for flat " + flat +
        ". Kindly clear at your convenience. Thank you!" +
        '<span class="wa-time">' + timeNow() + " ✓✓</span>";
      outbox.appendChild(msg);

      queued++;
      if (outboxCount) outboxCount.textContent = queued + (queued === 1 ? " queued" : " queued");
    });
  }
})();
