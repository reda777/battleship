import { main } from "./events.js";

(function gameLoop() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    // dark mode
    document.body.classList.replace("lightTheme", "darkTheme");
  }
  main();
})();
