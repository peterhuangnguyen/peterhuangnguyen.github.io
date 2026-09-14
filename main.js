(function () {
        var root = document.documentElement;
        var themeBtn = document.getElementById("themeToggle");
        var langBtn = document.getElementById("langToggle");

        function applyTheme(theme) {
          root.setAttribute("data-theme", theme);
          themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
          try {
            localStorage.setItem("cv-theme", theme);
          } catch (e) {}
        }

        function applyLang(lang) {
          root.setAttribute("lang", lang);
          langBtn.textContent = lang === "vi" ? "EN" : "VI";
          var nodes = document.querySelectorAll("[data-vi][data-en]");
          nodes.forEach(function (el) {
            var val =
              lang === "vi"
                ? el.getAttribute("data-vi")
                : el.getAttribute("data-en");
            if (val.indexOf("<") !== -1) {
              el.innerHTML = val;
            } else {
              el.textContent = val;
            }
          });
          var cvFile =
            lang === "en"
              ? "./CV-Ha-Nam-Huynh-Nguyen_En.pdf"
              : "./CV-Ha-Nam-Huynh-Nguyen.pdf";

          document.querySelectorAll(".cv-download").forEach(function (link) {
            link.href = cvFile;
            link.download = cvFile.split("/").pop();
          });
          try {
            localStorage.setItem("cv-lang", lang);
          } catch (e) {}
        }

        var currentTheme = root.getAttribute("data-theme") || "dark";
        applyTheme(currentTheme);

        var currentLang = root.getAttribute("lang") || "vi";
        applyLang(currentLang);

        themeBtn.addEventListener("click", function () {
          var next =
            root.getAttribute("data-theme") === "dark" ? "light" : "dark";
          applyTheme(next);
        });

        langBtn.addEventListener("click", function () {
          var next = root.getAttribute("lang") === "vi" ? "en" : "vi";
          applyLang(next);
        });

        var navHeader = document.querySelector("header.nav");
        function updateHeaderOnScroll() {
          navHeader.classList.toggle("is-scrolled", window.scrollY > 3);
        }

        window.addEventListener("scroll", updateHeaderOnScroll, {
          passive: true,
        });
        updateHeaderOnScroll();
        var menuBtn = document.getElementById("menuToggle");
        if (menuBtn && navHeader) {
          menuBtn.addEventListener("click", function () {
            var isOpen = navHeader.classList.toggle("open");
            menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
          });
          document.querySelectorAll(".nav-links a").forEach(function (link) {
            link.addEventListener("click", function () {
              navHeader.classList.remove("open");
              menuBtn.setAttribute("aria-expanded", "false");
            });
          });
        }

        if ("IntersectionObserver" in window) {
          var revealEls = document.querySelectorAll(".reveal");
          var io = new IntersectionObserver(
            function (entries) {
              entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                  entry.target.classList.add("in-view");
                  io.unobserve(entry.target);
                }
              });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
          );
          revealEls.forEach(function (el) {
            io.observe(el);
          });
        } else {
          document.querySelectorAll(".reveal").forEach(function (el) {
            el.classList.add("in-view");
          });
        }
      })();