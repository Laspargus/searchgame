import "../sass/styles.scss";
import routes from "./route";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import PlatformSelect from "./PlatformSelect";
import PageForm from "./PageForm";

let pageArgument;
const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  pageArgument = path[1] || "";

  var pageContent = document.getElementById("pageContent");
  routes[path[0]](pageArgument);

  console.log(path[0]);
  if (path[0] == "" || path[0] == "pagelist") {
    PageForm();
    PlatformSelect(pageArgument);
  }
  return true;
};

window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());
