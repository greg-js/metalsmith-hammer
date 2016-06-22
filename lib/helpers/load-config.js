var path = require('path');
var extend = require('extend');

module.exports = function(rootDir, fallback) {
  var config = null;

  try {
    config = extend(fallback, require(path.resolve(rootDir, '.hammer.json')));
  } catch (e) {
    config = fallback;
  }

  return config;
};
