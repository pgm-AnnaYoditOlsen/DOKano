import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const fadeUp = () => {
  const $fade = document.querySelectorAll(".fade-up");

  gsap.set($fade, { opacity: 0, y: 200 });

  $fade.forEach((element) => {
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.3,
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom 100%",
        toggleActions: "play none none none",
        // markers: true,
      },
    });
  });
};

export default fadeUp;
