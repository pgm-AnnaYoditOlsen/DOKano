

gsap.registerPlugin(ScrollTrigger);

export const listFader = () => {
  // Select the elements you want to animate
  const $list = document.querySelectorAll(".list__items");
  const $stagger = document.querySelectorAll(".list__highlight");

  // Set initial properties
  gsap.set($list, { opacity: 0, y: 100 });

  $stagger.forEach((element) => {
    const $fadeElements = element.querySelectorAll(".list__items");

    gsap.to($fadeElements, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.3,
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom bottom",
        toggleActions: "restart none none reverse",
        // markers: true,
      },
    });
  });
};

export default listFader;
