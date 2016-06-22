var grep = require('shelljs').grep;
var path = require('path');

module.exports = function(dir) {
  var packageJson = path.resolve(dir, 'package.json');
  var match = grep(/metalsmith/g, packageJson).split('\n');
  return !!match.filter(function(str) { return !!str }).length;
};
