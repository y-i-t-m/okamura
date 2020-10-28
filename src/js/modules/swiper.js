import Swiper from 'swiper';

export const slider = () => {
  let mySwiper = new Swiper('.slider01', {
    slidesPerView: 3.4,
    // direction: 'horizontal',
    loopPreventsSlide: false,
    freeMode: true,
    speed: 15000,
    centeredSlides : true,
    autoplay: {
      delay: 0,
    },
    loop: true,
  });
  mySwiper.on('slideChangeTransitionEnd', function (swiper) {
    mySwiper.autoplay.start();
  });
}
