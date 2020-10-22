export default function observerjs() {

  const options = {
    root: null,
    rootMargin: "-50% 0px",
    threshold: 0
  };
  const returnButton = document.getElementById("return-button");
  const header = document.getElementById("header");

// observerのcallback関数の作成
  const callback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        //  ここに要素が交差した際の動作を記述
        console.log("こんにちは");
        returnButton.classList.remove("-show");
        header.classList.remove("-show");
      } else {
        // ここに要素が交差から外れた場合の記述
        console.log("さようなら");
        returnButton.classList.add("-show");
        header.classList.add("-show");
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);
  const el = document.querySelector(".target");
  observer.observe(el);

}