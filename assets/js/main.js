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
  // query
  const sidebarControl = document.querySelector(".js-sidebar-control");

  // init swiper
  new Swiper(".js-mainvisual-swiper", {
    loop: true,
    effect: "fade",
    allowTouchMove: false,
    autoplay: {
      delay: 7000,
      disableOnInteraction: false,
    },
    speed: 2000,
  });

  const shipsSwiper = new Swiper(".js-ships-swiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    speed: 1200,
    breakpoints: {
      0: {
        allowTouchMove: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      1024: {
        allowTouchMove: false,
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
    },
    on: {
      init: (sw) => {
        if (sw.realIndex === 0 && window.innerWidth < 1024) {
          sidebarControl.classList.add("hide");
        }
      },
    },
  });

  // enter slide
  const dressBtn = document.querySelector("#js-dress");
  const casualBtn = document.querySelector("#js-casual");
  dressBtn.addEventListener("click", () => {
    shipsSwiper.slideNext();
  });
  casualBtn.addEventListener("click", () => {
    if (window.innerWidth > 1023) {
      shipsSwiper.slideTo(11, 1200);
    } else {
      shipsSwiper.slideTo(10, 1200);
    }
  });

  // slideChange
  if (window.innerWidth < 1024) {
    shipsSwiper.on("slideChange", function (sw) {
      if (sw.realIndex === 0) {
        sidebarControl.classList.add("hide");
      } else {
        sidebarControl.classList.remove("hide");
      }
    });
  }

  // back to top
  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("js-backtotop")) {
      window.innerWidth > 1023
        ? shipsSwiper.slideTo(2, 1200)
        : shipsSwiper.slideTo(1, 1200);
    }
  });
};

window.onload = () => {
  document.body.classList.remove("fadeout");
  appHeight();
  main();
};
