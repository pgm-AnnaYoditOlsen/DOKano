import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

export const listLeftFader = () => {
  // Select the elements you want to animate
  const $list = document.querySelectorAll(".list__items__canoes");
  const $stagger = document.querySelectorAll(".list__canoes");

  // Set initial properties
  gsap.set($list, { opacity: 0, x: -100 });

  $stagger.forEach((element) => {
    const $fadeElements = element.querySelectorAll(".list__items__canoes");

    gsap.to($fadeElements, {
      x: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.3,
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom bottom",
        toggleActions: "restart none none reverse",
        markers: true,
      }
    });
  });
};

export default listLeftFader;
