import { gsap } from "gsap";

const loadingAnimation = (callback) => {
  const $loadingContainer = document.getElementById("loading");
  const $image = document.querySelector("[data-animation='loadingImage']");

  const timeline = gsap.timeline({
    onComplete: () => {
      callback();
      console.log("animation complete");
    },
  });

  gsap.set($image, { x: -1000 });

  timeline
    .to($image, {
      x: 0,
      duration: 1,
    })
    .to($image, {
      x: 1000,
      duration: 1,
    })
    .to($loadingContainer, {
      y: 2000,
      duration: 1,
    });
};

export default loadingAnimation;
