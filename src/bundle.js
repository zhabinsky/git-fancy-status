const processFile = require("./utils/process-file");
const uglifyBash = require("./utils/uglify-bash");
const uglifyJs = require("./utils/uglify-js");

/** gs - git status */
processFile({
  fileIn: "src/scripts/git-status.sh",
  fileOut: "bin/git-status",
  processors: [uglifyBash, (t) => `#!/usr/bin/env bash\n${t}`],
});

/** gs - git commit */
processFile({
  fileIn: "src/scripts/git-commit.js",
  fileOut: "bin/git-commit",
  processors: [uglifyJs, (t) => `#!/usr/bin/env node\n${t}`],
});
