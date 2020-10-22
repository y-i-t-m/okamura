import Stickyfill from "stickyfilljs";
const element = document.getElementById("return-button");

const sticky = () => {
  Stickyfill.add(element);
}

export default sticky;