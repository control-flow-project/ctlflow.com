let storedTheme;
try { storedTheme = localStorage.getItem("ctlflow-theme"); } catch { storedTheme = null; }
document.documentElement.dataset.theme = storedTheme === "light" ? "light" : "dark";
