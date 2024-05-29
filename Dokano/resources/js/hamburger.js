(() => {
  const app = {
      initialize() {
          this.cacheElements();
          this.registerListeners();
      },
      cacheElements() {
          this.$button = document.querySelector("#hamburger");
          this.$menu = document.querySelector("#hamburgerMenu");
          this.$closeBtn = document.querySelector("#closeBtn");
      },
      registerListeners() {
          this.$button.addEventListener("click", () => {
              this.$menu.classList.remove("hidden");
          });
          this.$closeBtn.addEventListener("click", () => {
              this.$menu.classList.add("hidden");
          });
      }
  };

  app.initialize();
})();
