// import "@babel/polyfill";
import 'swiper/css/swiper.min.css';
import "../scss/style.scss";

import picturefill from "picturefill";
import whatInput from 'what-input';

import smoothScroll from "./modules/smoothscroll";
import {slider} from "./modules/swiper";
import {slider2} from "./modules/swiper02";
import observerjs from "./modules/observer";
import {tab} from "./modules/tab";
import sticky from "./modules/sticky";

// import {dom, library} from '@fortawesome/fontawesome-svg-core';
// import {faMapMarkerAlt, faChevronRight} from '@fortawesome/free-solid-svg-icons';
// import {faInstagram} from "@fortawesome/free-brands-svg-icons"
// import {faComments} from '@fortawesome/free-regular-svg-icons';


// 使いたいFontAwesomeアイコンをimport文 => {} 内に記述してください。
// その後,↓library.add内にも記述し、htmlに<i>タグで記述してください。
// library.add(faMapMarkerAlt, faInstagram, faChevronRight);
//
// dom.i2svg();

window.addEventListener("DOMContentLoaded", () => {
  smoothScroll();
  picturefill();
  slider();
  observerjs();
  slider2();
  tab();
  sticky();
});

const scrollAnimationElm = document.querySelectorAll('.sa');
const scrollAnimationFunc = function () {
  for (let i = 0; i < scrollAnimationElm.length; i++) {
    let triggerMargin = 300;
    if (window.innerHeight > scrollAnimationElm[i].getBoundingClientRect().top + triggerMargin) {
      scrollAnimationElm[i].classList.add('show');
    }
  }
};
window.addEventListener('load', scrollAnimationFunc);
window.addEventListener('scroll', scrollAnimationFunc);

