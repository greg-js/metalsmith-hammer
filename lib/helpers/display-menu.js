var inquirer = require('inquirer');
var chalk = require('chalk');

module.exports = function(items, message, cb) {
  var ln = items.length;
  var entries = items.map(function(item, index) {
    return [ chalk.yellow('['), chalk.cyan(index + 1), '/', chalk.gray(ln), chalk.yellow(']'), ' ', item ].join('');
  });

  inquirer.prompt([{
    type: 'list',
    name: 'file',
    message: message,
    choices: entries
  }]).then(function(answer) {
    var pos = entries.indexOf(answer.file);
    var selected = entries[pos];

    if (selected) {
      cb(null, items[pos]);
    } else {
      cb('invalid choice', null);
    }
  }).catch(function(err) {
    console.error(err);
  });
};
