// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export const fadeUp = () => {
  console.log("fadeUp function started");
  // Select the elements you want to animate
  const $fade = document.querySelectorAll(".fade-up");

  // Set initial properties
  gsap.set($fade, { opacity: 0, y: 200 });

  // Create the fade-in-up animation for each element
  $fade.forEach((element) => {
    console.log(element);
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.5,
      scrollTrigger: {
        trigger: element,
        start: "-20% bottom",
        end: "bottom 100%",
        toggleActions: "restart none none reverse",
        // markers: true,
      },
    });
  });
  console.log("fadeUp function completed");
};

export default fadeUp;
