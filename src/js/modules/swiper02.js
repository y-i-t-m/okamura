import Swiper from "swiper";

export const slider2 = () => {
  let mySwiper02 = new Swiper('.slider02', {
    slidesPerView: 2,
    centeredSlides : true,
    spaceBetween: 64,
    loop: true,
    autoplay: {
      delay: 2000,
    },
    navigation: {
      nextEl: '.button-next',
      prevEl: '.button-prev',
    },
  });
}