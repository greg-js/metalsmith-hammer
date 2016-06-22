var grep = require('shelljs').grep;
var path = require('path');
var ls = require('shelljs').ls;

module.exports = function(dir) {
  var packageJson = null;

  // root dir without a package.json can't be a metalsmith dir
  if (ls(dir).indexOf('package.json') === -1) {
    return false;
  }

  packageJson = path.resolve(dir, 'package.json');

  // check for metalsmith occurences in package.json
  var match = grep(/metalsmith/g, packageJson).split('\n');
  // filter for empty strings to eliminate false positives
  return !!match.filter(function(str) { return !!str }).length;
};
