const minify = require ('bash-minifier');
const uglify = require ('./uglify');
const fs = require ('fs');

const script = fs.readFileSync ('src/git-status.sh', {encoding: 'utf8'});

const uglified = uglify (script);
const minified = minify (uglified);

fs.writeFileSync ('bin/git-status.sh', minified);