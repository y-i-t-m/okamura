const fixButton = document.getElementById("fix-button");
const fadeHeader = document.getElementById("fade_header");

export default function observerjs() {
  const options = {
    root: null,
    rootMargin: "-50% 0px",
    threshold: 0
  };
// observerのcallback関数の作成
  const callback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        //  ここに要素が交差した際の動作を記述
        fixButton.classList.remove("-active")
        fadeHeader.classList.remove("-active")
        entry.target.setAttribute("aria-hidden", "true")
      } else {
        fixButton.classList.add("-active")
        fadeHeader.classList.add("-active")
        entry.target.setAttribute("aria-hidden", "false")
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  const el = document.querySelector(".observer-el");
  observer.observe(el);
}
// observer.unobserve(entry.target);
