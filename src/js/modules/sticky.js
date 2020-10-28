import Stickyfill from "stickyfilljs";
const element = document.getElementById("fix-button");

const sticky = () => {
  Stickyfill.add(element);
}

export default sticky;