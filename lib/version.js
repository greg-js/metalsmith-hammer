var chalk = require('chalk');

module.exports = function() {
  console.log('hammer v' + chalk.gray(require('../package.json').version));
};
