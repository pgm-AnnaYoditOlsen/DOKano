document.addEventListener('DOMContentLoaded', () => {
    function setupCarousel(containerSelector, itemSelector, navPointSelector) {
      const carousel = document.querySelector(containerSelector);
      const items = document.querySelectorAll(itemSelector);
      let index = 0;

      function scrollCarousel() {
        index = (index + 1) % items.length;
        carousel.scrollTo({
          left: index * carousel.clientWidth,
          behavior: 'smooth'
        });
        updateNavPoints();
      }

      setInterval(scrollCarousel, 3000); // Change the interval as needed

      // Initial update for nav points
      updateNavPoints();
    }

    // Setup carousels
    setupCarousel('.gap-2.overflow-x-auto.flex.snap-x', '.gap-2.overflow-x-auto.flex.snap-x a', '.event-nav-point');
    setupCarousel('.activitys.gap-2.overflow-x-auto.flex.snap-x', '.activitys.gap-2.overflow-x-auto.flex.snap-x img', '.activity-nav-point');
    setupCarousel('.gap-2.overflow-x-auto.flex.snap-x', '.gap-2.overflow-x-auto.flex.snap-x img', '.carousel-nav-point');
  });