import { sync } from "./components/sync";
sync();
import(/* webpackChunkName: "async-test" */ "./components/async/index.js").then(
  _ => {
    _.default.init();
  }
);
console.log("hello");
