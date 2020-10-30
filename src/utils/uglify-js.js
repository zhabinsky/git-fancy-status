const Terser = require("terser");

module.exports = async (text) => {
  const result = await Terser.minify(text);
  return result.code;
};
