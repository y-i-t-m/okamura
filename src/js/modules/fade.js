export default function fadeObserver() {
  const option = {
    root: null,
    rootMargin: "-50% 0px",
    threshold: 0
  }

  const cb = () =>{

  }

  const fade = new IntersectionObserver(cb,option);
  const fadeEl = document.querySelectorAll(".fade-el");
  fade.observe(fadeEl);
}