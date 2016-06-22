var table = require('text-table');

module.exports = function() {
  console.log('Usage: hammer [command]\n\nCommands:')
  console.log(table([
    ['edit [-f folder] [regex]', 'Edit a markdown file, using regex and other filters (alias: e)'],
    ['help', 'Prints this help message (alias: h)'],
    ['version', 'Prints the current version (alias: v)']
  ]));
  console.log('\nTo warp to a given point:\nwdn <point>');
  console.log('\nFull readme on GitHub: https://github.com/greg-js/wdn');
};
