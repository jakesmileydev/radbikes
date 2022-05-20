const slider = function () {
    const slides = document.querySelectorAll(".slide");
    const btnLeft = document.querySelector(".slider__btn--left");
    const btnRight = document.querySelector(".slider__btn--right");

    let curSlide = 0;
    const maxSlide = slides.length;

    const goToSlide = function (slide) {
        slides.forEach(
            (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
        );
    };

    const nextSlide = function () {
        const width = document.body.clientWidth;
        if (curSlide === 0) {
            btnLeft.classList.add("slider__btn--usable");
        }
        if (curSlide === maxSlide - (width > 976 ? 4 : 2)) {
            btnRight.classList.remove("slider__btn--usable");
        }
        if (curSlide === maxSlide - (width > 976 ? 3 : 1)) {
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

    goToSlide(0);

    // Event handlers
    btnRight.addEventListener("click", nextSlide);
    btnLeft.addEventListener("click", prevSlide);

    document.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") prevSlide();
        e.key === "ArrowRight" && nextSlide();
    });
};

