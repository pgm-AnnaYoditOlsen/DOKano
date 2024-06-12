  document.addEventListener('DOMContentLoaded', () => {
    // Function to setup a carousel with navigation points
    function setupCarousel(containerSelector, itemSelector, navPointSelector) {
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
      }


      setInterval(scrollCarousel, 3000); // Automatically scroll every 3 seconds
    }


    // Setup carousels with navigation points
    setupCarousel('.gap-2.overflow-x-auto.flex.snap-x', '.gap-2.overflow-x-auto.flex.snap-x a', '.event-nav-point');
    setupCarousel('.activitys.gap-2.overflow-x-auto.flex.snap-x', '.activitys.gap-2.overflow-x-auto.flex.snap-x img', '.activity-nav-point');
    setupCarousel('.gap-2.overflow-x-auto.flex.snap-x', '.gap-2.overflow-x-auto.flex.snap-x img', '.carousel-nav-point');
    setupCarousel('.pb-10.gap-2.overflow-x-auto.flex.snap-x', '.pb-10.gap-2.overflow-x-auto.flex.snap-x a');
  });
