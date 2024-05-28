document.addEventListener("DOMContentLoaded", function() {
    // Function to observe and set active navigation points
    const observeAndSetActivePoints = (itemSelector, navPointSelector, activeClass) => {
      const items = document.querySelectorAll(itemSelector);
      const navPoints = document.querySelectorAll(navPointSelector);
  
      const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5 // Adjust this threshold as needed
      };
  
      const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Array.from(items).indexOf(entry.target);
            setActivePoint(index, navPoints, activeClass);
          }
        });
      };
  
      const observer = new IntersectionObserver(observerCallback, observerOptions);
      items.forEach(item => observer.observe(item));
    };
  
    const setActivePoint = (activeIndex, navPoints, activeClass) => {
      navPoints.forEach((point, index) => {
        if (index === activeIndex) {
          point.classList.add(activeClass);
          point.classList.remove("bg-standards-grey");
        } else {
          point.classList.remove(activeClass);
          point.classList.add("bg-standards-grey");
        }
      });
    };
  
    // Observe and set active points for event items
    observeAndSetActivePoints("[id^='event']", ".event-nav-point", "bg-DOKano-lightblue");
  
    // Observe and set active points for activity items
    observeAndSetActivePoints("[id^='activity']", ".activity-nav-point", "bg-DOKano-lightblue");
  
    // Observe and set active points for carousel items
    observeAndSetActivePoints("[id^='carousel']", ".carousel-nav-point", "bg-DOKano-lightblue");
  });
  