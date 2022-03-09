"use strict";

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === 0) {
      btnLeft.classList.add("slider__btn--usable");
    }
    if (curSlide === maxSlide - 4) {
      btnRight.classList.remove("slider__btn--usable");
    }
    if (curSlide === maxSlide - 3) {
      return;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 1) {
      btnLeft.classList.remove("slider__btn--usable");
    }
    if (curSlide === maxSlide - 3) {
      btnRight.classList.add("slider__btn--usable");
    }
    if (curSlide === 0) {
      return;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  const init = function () {
    goToSlide(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });
};
slider();

const footerMobileBtns = document.querySelectorAll(".footer-mobile-btn");
const array = Array.from(footerMobileBtns);
console.log(footerMobileBtns);
console.log(array);
array.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    btn
      .closest(".column-wrapper")
      .querySelector(".column")
      .classList.toggle("column--open");
  });
});
