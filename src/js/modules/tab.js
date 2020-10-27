const tabA = document.getElementById("button_a");
const tabB = document.getElementById("button_b");

const tabButtons = document.querySelectorAll(".tab-button");

export const tab = () => {
  tabButtons.forEach(tabButton =>{
    tabButton.addEventListener("click", ()=>{
      if(tabButton.className === "-active") {
        tabButton.classList.remove("-active");
      }else {
        tabButton.classList.add("-active");
      }
    });
  });
}