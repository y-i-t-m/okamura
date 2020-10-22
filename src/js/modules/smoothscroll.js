import SmoothScroll from "smooth-scroll";

function smoothScroll() {
  var scroll = new SmoothScroll('a[href*="#"]', {
    speedAsDuration: true,
    speed: 1000,
    easing: 'easeInOutQuint'
  });
}

export default smoothScroll;