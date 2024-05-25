export const mouse = () => {
  const $mouse = document.getElementById("mouse");
  const $hoverElements = document.querySelectorAll(".hover");

  gsap.set($mouse, {
    xPercent: -50,
    yPercent: -50,
    transformOrigin: "center",
  });

  const moveMouse = (x, y) => {
    gsap.to($mouse, {
      x: x,
      y: y,
      ease: "power3",
      delay: 0.1,
    });
  };

  const moveX = gsap.quickTo($mouse, "x", { duration: 0.5, ease: "power3" });
  const moveY = gsap.quickTo($mouse, "y", { duration: 0.5, ease: "power3" });

  // const screenWidth = window.innerWidth;
  // const screenHeight = window.innerHeight;

  window.addEventListener("mousemove", (e) => {
    moveX(e.clientX);
    moveY(e.clientY);
  });
};

export default mouse;