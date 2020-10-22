import Swiper from 'swiper';

export const slider = () => {
  let mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 5,
    direction: 'horizontal',
    loopPreventsSlide: false,
    freeMode: true,
    speed: 15000,
    autoplay: {
      delay: 0,
    },
    loop: true,
  });
  mySwiper.on('slideChangeTransitionEnd', function (swiper) {
    mySwiper.autoplay.start();
  });
}