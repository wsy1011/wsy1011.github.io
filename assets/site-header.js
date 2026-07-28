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

  requestAnimationFrame(() => document.body.classList.add("site-page-enter"));

  document.querySelectorAll("a.home-blog-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = new URL(link.href, window.location.href);
      if (target.protocol !== window.location.protocol || target.pathname === window.location.pathname) return;
      event.preventDefault();
      if (document.body.classList.contains("site-page-leaving")) return;
      document.body.classList.remove("site-page-enter");
      document.body.classList.add("site-page-leaving");
      window.setTimeout(() => { window.location.href = target.href; }, 240);
    });
  });

  const datasetContent = document.querySelector(".dataset-content, .article");
  if (datasetContent && document.querySelector(".dataset-source-links, .source-links")) {
    const parts = window.location.pathname.split("/").filter(Boolean);
    const slug = parts[parts.length - 2];
    const script = document.createElement("script");
    script.src = "../../../assets/dataset-details.js";
    script.onload = () => {
      const detail = window.DATASET_DETAILS && window.DATASET_DETAILS[slug];
      if (!detail || datasetContent.querySelector(".dataset-detail-table")) return;
      const wrap = document.createElement("div");
      wrap.className = "dataset-table-wrap dataset-detail-table";
      wrap.innerHTML = `<table class="dataset-table"><caption>${detail.title}</caption><thead><tr>${detail.columns.map((column) => `<th>${column}</th>`).join("")}</tr></thead><tbody>${detail.rows.map((row) => `<tr>${row.map((cell, index) => `<td>${index === 0 ? `<strong>${cell}</strong>` : cell}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
      const sources = datasetContent.querySelector(".dataset-source-links, .source-links");
      sources.parentNode.insertBefore(wrap, sources);
    };
    document.head.appendChild(script);
  }
})();
