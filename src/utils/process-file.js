const fs = require("fs");

const processFile = async ({ fileIn, fileOut, processors }) => {
  let fileContent = fs.readFileSync(fileIn, {
    encoding: "utf8",
  });

  for (let i = 0; i < processors.length; i++) {
    const processor = processors[i];
    fileContent = await processor(fileContent);
  }
  fs.writeFileSync(fileOut, fileContent);
};

module.exports = processFile;
