  document.addEventListener('DOMContentLoaded', () => {
    // Function to setup a carousel with navigation points
    function setupCarouselWithNavPoints(containerSelector, itemSelector, navPointSelector) {
      const carousel = document.querySelector(containerSelector);
      const items = document.querySelectorAll(itemSelector);
      const navPoints = document.querySelectorAll(navPointSelector);
      let index = 0;

      function scrollCarousel() {
        index = (index + 1) % items.length;
        carousel.scrollTo({
          left: index * carousel.clientWidth,
          behavior: 'smooth'
        });
        updateNavPoints();
      }

      function updateNavPoints() {
        navPoints.forEach((navPoint, idx) => {
          if (idx === index) {
            navPoint.classList.add('bg-DOKano-lightblue');
          } else {
            navPoint.classList.remove('bg-DOKano-lightblue');
          }
        });
      }

      setInterval(scrollCarousel, 3000); // Automatically scroll every 3 seconds

      navPoints.forEach((navPoint, idx) => {
        navPoint.addEventListener('click', () => {
          index = idx;
          carousel.scrollTo({
            left: index * carousel.clientWidth,
            behavior: 'smooth'
          });
          updateNavPoints();
        });
      });

      updateNavPoints(); // Initial update
    }

    // Function to setup a carousel without navigation points
    function setupCarouselWithoutNavPoints(containerSelector, itemSelector) {
      const carousel = document.querySelector(containerSelector);
      const items = document.querySelectorAll(itemSelector);
      let index = 0;

      function scrollCarousel() {
        index = (index + 1) % items.length;
        carousel.scrollTo({
          left: index * carousel.clientWidth,
          behavior: 'smooth'
        });
      }

      setInterval(scrollCarousel, 3000); // Automatically scroll every 3 seconds
    }

    // Setup carousels with navigation points
    setupCarouselWithNavPoints('.gap-2.overflow-x-auto.flex.snap-x', '.gap-2.overflow-x-auto.flex.snap-x a', '.event-nav-point');
    setupCarouselWithNavPoints('.activitys.gap-2.overflow-x-auto.flex.snap-x', '.activitys.gap-2.overflow-x-auto.flex.snap-x img', '.activity-nav-point');
    setupCarouselWithNavPoints('.gap-2.overflow-x-auto.flex.snap-x', '.gap-2.overflow-x-auto.flex.snap-x img', '.carousel-nav-point');

    // Setup carousels without navigation points
    setupCarouselWithoutNavPoints('.pb-10.gap-2.overflow-x-auto.flex.snap-x', '.pb-10.gap-2.overflow-x-auto.flex.snap-x a');
  });
