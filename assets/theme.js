(function () {
  var root = document.documentElement;
  var buttons = document.querySelectorAll("[data-theme-toggle]");

  function getTheme() {
    return root.dataset.theme === "light" ? "light" : "dark";
  }

  function setTheme(theme) {
    var safeTheme = theme === "light" ? "light" : "dark";
    root.classList.add("theme-transition");
    root.dataset.theme = safeTheme;

    try {
      localStorage.setItem("theme", safeTheme);
    } catch (error) {
      // Theme still applies for the current page when storage is unavailable.
    }

    window.setTimeout(function () {
      root.classList.remove("theme-transition");
    }, 620);
  }

  function updateButtons() {
    var theme = getTheme();
    var nextTheme = theme === "dark" ? "light" : "dark";
    var label = nextTheme === "light" ? "Light" : "Dark";

    buttons.forEach(function (button) {
      var labelElement = button.querySelector("[data-theme-label]");
      button.setAttribute("aria-label", "Switch to " + nextTheme + " theme");
      button.setAttribute("aria-pressed", theme === "light" ? "true" : "false");

      if (labelElement) {
        labelElement.textContent = label;
      }
    });
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      setTheme(getTheme() === "dark" ? "light" : "dark");
      updateButtons();
    });
  });

  updateButtons();
}());
