import Swiper from 'swiper';

let mySwiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  loopPreventsSlide: false,
  freeMode: true,
  speed: 5000,
  autoplay: {
    delay: 0,
  },
  loop: true,
});
mySwiper.on('slideChangeTransitionEnd', function(swiper){
  swiper.autoplay.start();
});
document.querySelector('.swiper-button-prev').addEventListener('click', function(e){
  mySwiper.slideTo(mySwiper.activeIndex -2, 1000);
});
document.querySelector('.swiper-button-next').addEventListener('click', function(e){
  mySwiper.slidePrev(1000);
  mySwiper.slideNext(1000);
});