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
  const sidebarStyleDress = document.querySelector(".js-sidebar-dress");
  const sidebarStyleCasual = document.querySelector(".js-sidebar-casual");

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
      slideChange: (sw) => {
        const index_currentSlide = sw.realIndex;
        const currentSlide =
          index_currentSlide > 0
            ? sw.slides[index_currentSlide - 1]
            : sw.slides[index_currentSlide];

        if (currentSlide.classList.contains("js-style-casual")) {
          sidebarStyleDress.classList.remove("active");
          sidebarStyleCasual.classList.add("active");
        } else if (currentSlide.classList.contains("js-style-both")) {
          sidebarStyleDress.classList.add("active");
          sidebarStyleCasual.classList.add("active");
        } else {
          sidebarStyleDress.classList.add("active");
          sidebarStyleCasual.classList.remove("active");
        }
        //
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
    shipsSwiper.on("slideChange", (sw) => {
      if (sw.realIndex === 0) {
        sidebarControl.classList.add("hide");
      } else {
        sidebarControl.classList.remove("hide");
      }
    });
  }

  // back to top
  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("js-backtotop")) {
      window.innerWidth > 1023
        ? shipsSwiper.slideTo(2, 1200)
        : shipsSwiper.slideTo(1, 1200);
    }
  });
};

// ===== popup ====
// close
const closePopup = (popupId) => {
  const popup = document.getElementById(popupId);
  popup.classList.remove("--show");
};
const closePopupAll = () => {
  const popups = document.querySelectorAll(".popup");
  popups.forEach((item) => {
    item.classList.remove("--show");
  });
};

// show
const itemElements = document.querySelectorAll(".js-data-items");
itemElements.forEach((itemElement) => {
  const itemNumber = itemElement.getAttribute("data-items");
  const popupElement = document.getElementById("js-popup" + itemNumber);
  itemElement.addEventListener("click", () => {
    closePopupAll();
    if (popupElement) {
      popupElement.classList.add("--show");
    }
  });
});

window.onload = () => {
  document.body.classList.remove("fadeout");
  appHeight();
  main();
};
