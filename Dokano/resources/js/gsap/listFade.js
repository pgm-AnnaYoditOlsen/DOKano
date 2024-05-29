import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const listFader = () => {
  const $stagger = document.querySelectorAll(".teams");

  if ($stagger.length > 0) {
    $stagger.forEach((element) => {
      const $fadeElements = element.querySelectorAll(".flex");

      if ($fadeElements.length > 0) {

        gsap.fromTo($fadeElements, {
          x: -100, 
          opacity: 0,
        }, {
          x: 0, 
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom bottom",
            toggleActions: "play none none none",
          },
        });
      }
    });
  }
};

export default listFader;