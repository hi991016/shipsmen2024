"use strict";

// ===== get height app =====
const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty(
    "--app-height",
    `${document.documentElement.clientHeight}px`
  );
};
window.addEventListener("resize", appHeight);

// ===== main =====
const main = () => {
  const jsSwiper = document.querySelector(".js-ships-swiper");

  const shipsSwiper = new Swiper(jsSwiper, {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    slidesPerView: "auto",
    speed: 1200,
    breakpoints: {
      0: {
        allowTouchMove: true,
        slidesPerGroup: 1,
      },
      1024: {
        allowTouchMove: false,
        slidesPerGroup: 2,
      },
    },
    on: {},
  });

  // back to top
  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("js-backtotop")) {
      shipsSwiper.slideTo(0, 1200);
    }
  });
};

window.onload = () => {
  document.body.classList.remove("fadeout");
  appHeight();
  main();
};
