import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const scale = () => {
  // Select the elements you want to animate
  const $activitys = document.querySelectorAll(".activitys");

  // Convert NodeList to an array
  const activitysArray = Array.from($activitys);

  // Set initial properties
  activitysArray.forEach((activity) => {
    gsap.set(activity, { scale: 0.2 });

    gsap.to(activity, {
      scale: 1,
      duration: 1,
      ease: "elastic.out(0.5, 0.3)",
      scrollTrigger: {
        trigger: activity,
        start: "top bottom",
        end: "bottom bottom",
        toggleActions: "play none none none",
      },
    });
  });
};

export default scale;
