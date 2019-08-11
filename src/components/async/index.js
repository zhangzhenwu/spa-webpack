import help from "../common/help";
console.log("async", help.version);
const asyncTest = {
  init() {
    console.log("test");
  }
};

export default asyncTest;
