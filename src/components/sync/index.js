import lodash from "lodash-es";
import item from "./sync.css";
import help from "../common/help";
console.log("async", help.version);
const syncCss = function() {
  console.log("sync");
  // document.getElementById("app").innerHTML = `<h1 class="${
  //   item.test
  // }">Webpack</h1>`;
  fetch("/api/test")
    .then(res => {
      res.json();
    })
    .then(data => {
      console.log(data);
    });
};
syncCss();
// import $ from "jquery";
// import { getName } from "./getName";
const sync = function() {
  console.log("sync");
};
const isArray = function(args) {
  console.log(lodash.isArray(args));
  // console.log($);
  // getName();
};
export { sync, isArray };
