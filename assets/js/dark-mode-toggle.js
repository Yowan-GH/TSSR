(function () {
    const toggle = document.createElement("button");
    toggle.textContent = "🌙";
    toggle.id = "dark-mode-toggle";
    document.body.appendChild(toggle);
  
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
    const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    toggle.textContent = isDark ? "☀️" : "🌙";
  
    toggle.onclick = function () {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      toggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
    };
  })();