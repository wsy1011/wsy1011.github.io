(() => {
  const root = document.documentElement;

  if (!root.dataset.theme) {
    try {
      const savedTheme = localStorage.getItem("site-theme");
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.dataset.theme = savedTheme || (prefersDark ? "dark" : "light");
    } catch {
      root.dataset.theme = "light";
    }
  }

  const buttons = [...document.querySelectorAll("[data-site-theme-toggle]")];
  if (!buttons.length) return;

  const updateButtons = () => {
    const isDark = root.dataset.theme === "dark";
    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(isDark));
      button.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = nextTheme;
      try {
        localStorage.setItem("site-theme", nextTheme);
      } catch {
        // Private browsing modes may block localStorage.
      }
      updateButtons();
    });
  });

  updateButtons();
})();
