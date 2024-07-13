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
  const swiperShips = new Swiper(".js-ships-swiper", {
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
};

window.onload = () => {
  document.body.classList.remove("fadeout");
  appHeight();
  main();
};
