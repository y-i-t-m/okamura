const tabA = document.getElementById("button_a");
const tabB = document.getElementById("button_b");
const sceneA = document.getElementById("scene_image_a");
const sceneB = document.getElementById("scene_image_b");
const tabPanelA = document.getElementById("tab_a");
const tabPanelB = document.getElementById("tab_b");
// const imageA = document.getElementById("scene_a_link");
// const imageB = document.getElementById("scene_b_link");

const tabButtons = document.querySelectorAll(".tabjs");
export const tab = () => {
  tabButtons.forEach(tabButton => {
    tabButton.addEventListener("click", () => {
      if (tabA.classList.contains("-active") === true) {
        tabA.classList.remove("-active");
        tabPanelA.classList.remove("-active");
        sceneA.setAttribute("src","./img/a-gray.png");
        tabB.classList.add("-active");
        tabPanelB.classList.add("-active");
        sceneB.setAttribute("src","./img/b-black.png");
      } else {
        tabA.classList.add("-active");
        tabPanelA.classList.add("-active");
        sceneA.setAttribute("src","./img/a-black.png");
        tabB.classList.remove("-active");
        tabPanelB.classList.remove("-active");
        sceneB.setAttribute("src","./img/b-gray.png");
      }
    });
  });
}