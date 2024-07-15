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

// ===== query =====
const sidebar = document.querySelector(".js-sidebar");
const sidebarControl = document.querySelector(".js-sidebar-control");
const sidebarStyleDress = document.querySelector(".js-sidebar-dress");
const sidebarStyleCasual = document.querySelector(".js-sidebar-casual");
const groupPrevBtn = document.querySelector(".custom-prev-btn");
const firstviewPrevBtn = document.querySelector(".custom-prev-firstview");

// ===== main =====
const main = () => {
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

  const groupSwiper = new Swiper(".js-group-swiper", {
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
      slideChange: (sw) => {
        const index_currentSlide = sw.realIndex;
        const currentSlide = sw.slides[index_currentSlide];

        // ====
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
        // ====
        if (index_currentSlide === 0) {
          groupPrevBtn.style.display = "none";
          firstviewPrevBtn.style.display = "block";
        } else {
          groupPrevBtn.style.display = "block";
          firstviewPrevBtn.style.display = "none";
        }
      },
    },
  });

  const shipsSwiper = new Swiper(".js-ships-swiper", {
    navigation: {
      nextEl: null,
      prevEl: null,
    },
    speed: 1200,
    breakpoints: {
      0: {
        allowTouchMove: false,
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      1024: {
        allowTouchMove: false,
        slidesPerView: 1,
        slidesPerGroup: 1,
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
    shipsSwiper.slideTo(1, 600);
    setTimeout(() => {
      groupSwiper.slideTo(4, 1200);
    }, 500);
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

  // event next/prev
  const prevs = document.querySelector(".custom-prev-firstview");
  prevs.addEventListener("click", () => {
    shipsSwiper.slidePrev();
  });

  // back to top
  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("js-backtotop")) {
      groupSwiper.slideTo(0, 1200);
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
  sidebar.classList.remove("--hide");
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
      sidebar.classList.add("--hide");
      popupElement.classList.add("--show");
    }
  });
});

window.onload = () => {
  document.body.classList.remove("fadeout");
  appHeight();
  main();
};
