// ============================================================
// Serene Yoga — Shared behaviour: sticky header, mobile nav,
// smooth-scroll with scroll-spy active state.
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  var header = document.querySelector(".site-header");
  var hamburger = document.querySelector(".hamburger");
  var navMenu = document.querySelector(".nav-menu");
  var navLinks = document.querySelectorAll(".nav-menu a[data-section]");
  var sections = document.querySelectorAll("main section[id]");

  // Sticky header background on scroll
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Scroll-spy: highlight the nav link for the section in view
    if (sections.length) {
      var scrollPos = window.scrollY + 120;
      var currentId = "";
      sections.forEach(function (section) {
        if (scrollPos >= section.offsetTop) {
          currentId = section.id;
        }
      });
      navLinks.forEach(function (link) {
        link.classList.toggle("active", link.getAttribute("data-section") === currentId);
      });
    }
  }
  window.addEventListener("scroll", onScroll);
  onScroll();

  // Mobile hamburger toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("open");
      navMenu.classList.toggle("open");
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        hamburger.classList.remove("open");
        navMenu.classList.remove("open");
      });
    });
  }

  // Simple reveal-on-scroll animation
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }
});
