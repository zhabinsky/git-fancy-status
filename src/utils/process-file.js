const fs = require("fs");

const processFile = ({ fileIn, fileOut, processors }) => {
  let fileContent = fs.readFileSync(fileIn, {
    encoding: "utf8",
  });
  processors.forEach((processor) => {
    fileContent = processor(fileContent);
  });
  fs.writeFileSync(fileOut, fileContent);
};

module.exports = processFile;
