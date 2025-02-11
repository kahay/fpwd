document.addEventListener("DOMContentLoaded", function () {

    const thumbSwiper = new Swiper(".swiper-thumbs", {
        direction: "vertical",
        slidesPerView: 6,
        spaceBetween: 8,
        freeMode: true,
        mousewheel: true,
        watchSlidesProgress: true,
    });

    const mainSwiper = new Swiper(".swiper-main", {
        slidesPerView: 1,
        thumbs: {
            swiper: thumbSwiper,
        },
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
    });

	const defaultOption = document.querySelector('input[name="options"]:checked');
	if (defaultOption) {
			document.getElementById('selectedValue').textContent = defaultOption.value;
	}

	document.getElementById('saveButton').addEventListener('click', function() {
			const selectedOption = document.querySelector('input[name="options"]:checked');
			if (selectedOption) {
					document.getElementById('selectedValue').textContent = selectedOption.value;
					let offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('offcanvasSize'));
					offcanvas.hide();
			}
	});

});

