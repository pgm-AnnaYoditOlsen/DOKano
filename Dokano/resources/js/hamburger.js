/* start IEFE */

(() => {
  const app = {
    initialize() {
      this.cacheElements();
      this.registerListeners();
      this.closeMenu();
    },
    cacheElements() {
      this.$button = document.querySelector("#hamburger");
      this.$menu = document.querySelector("#hamburgerMenu");
      this.$closeBtn = document.querySelector("#closeBtn");
    },
    registerListeners() {
      this.$button.addEventListener("click", (e) => {
          this.$menu.classList.add("open");
      });
    },
    closeMenu() {
      this.$closeBtn.addEventListener("click", (e) => {
          this.$menu.classList.remove("open")
      });
    },
  };

  app.initialize()
  })();