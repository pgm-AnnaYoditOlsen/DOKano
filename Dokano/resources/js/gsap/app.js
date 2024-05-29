
import loadingAnimation from "./loading.js";
import fadeUp from "./fadeUp.js";
// import mouse from "./mouse.js";
import listFader from "./listFade.js";
import listLeftFader from "./listFadeLeft.js";
import scale from "./scale.js";


const afterLoad = () => {
    fadeUp();
    listFader();
    scale();
    listLeftFader();
};
// mouse();

loadingAnimation(afterLoad);