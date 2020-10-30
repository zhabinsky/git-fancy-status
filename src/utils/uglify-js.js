const { minify } = require("uglify-js");

module.exports = (text) => {
  return minify(text).code;
};
