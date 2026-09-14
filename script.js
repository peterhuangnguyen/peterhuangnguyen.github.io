(function () {
        try {
          var savedTheme = localStorage.getItem("cv-theme");
          var theme = savedTheme;
          if (!theme) {
            var h = new Date().getHours();
            theme = h >= 6 && h < 18 ? "light" : "dark";
          }
          document.documentElement.setAttribute("data-theme", theme);
          var savedLang = localStorage.getItem("cv-lang") || "vi";
          document.documentElement.setAttribute("lang", savedLang);
        } catch (e) {
          document.documentElement.setAttribute("data-theme", "dark");
        }
      })();