var chalk = require('chalk');

module.exports = function() {
  console.log('gold v' + chalk.gray(require('../package.json').version));
};
