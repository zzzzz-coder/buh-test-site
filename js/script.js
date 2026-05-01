document.addEventListener("DOMContentLoaded", () => {
    const sliderLent = document.querySelector(".presentation__slider-lent");
    const slides = document.querySelectorAll(".presentation__slider-image");
    const dotsContainer = document.querySelector(".presentation__slides-viever");

    const btnLeft = document.querySelector(".presentation__controllers-buttons-button_left");
    const btnRight = document.querySelector(".presentation__controllers-buttons-button_right");

    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlide;

    const form = document.querySelector(".connest__form");
    const popup = document.getElementById("popupSuccess");
    const popupClose = document.getElementById("popupClose");

    if (form) {
        form.addEventListener("submit", function(e) {

            popup.classList.add("active");

            form.reset();
        });
    }

    if (popupClose) {
        popupClose.addEventListener("click", function() {
            popup.classList.remove("active");
        });
    }

    popup.addEventListener("click", function(e) {
        if (e.target === popup) {
            popup.classList.remove("active");
        }
    });

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("div");
        dot.classList.add("presentation__dot");

        if (i === 0) dot.classList.add("active");

        dot.addEventListener("click", () => {
            currentSlide = i;
            updateSlider();
            restartAutoSlide();
        });

        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll(".presentation__dot");

    function updateSlider() {
        sliderLent.style.transform = `translateX(-${currentSlide * 25}%)`;

        dots.forEach(dot => dot.classList.remove("active"));
        dots[currentSlide].classList.add("active");

        if (currentSlide === 0) {
            btnLeft.disabled = true;
            btnLeft.style.opacity = "0.2";
        } else {
            btnLeft.disabled = false;
            btnLeft.style.opacity = "1";
        }

        if (currentSlide === totalSlides - 1) {
            btnRight.disabled = true;
            btnRight.style.opacity = "0.2";
        } else {
            btnRight.disabled = false;
            btnRight.style.opacity = "1";
        }
    }

    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        updateSlider();
    }

    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    }

    btnLeft.addEventListener("click", () => {
        prevSlide();
        restartAutoSlide();
    });

    btnRight.addEventListener("click", () => {
        nextSlide();
        restartAutoSlide();
    });

    function startAutoSlide() {
        autoSlide = setInterval(nextSlide, 4000);
    }

    function restartAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    updateSlider();
    startAutoSlide();
});

