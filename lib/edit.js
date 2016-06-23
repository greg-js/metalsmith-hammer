var path = require('path');
var find = require('shelljs').find;

var displayMenu = require('./helpers/display-menu');
var openFile = require('./helpers/open-file');
var editor = process.env.EDITOR;

function filterOnType(items, type) {
  var typeRE = new RegExp('\.' + type + '$', 'i');

  return items.filter(function(item) {
    return typeRE.test(item);
  });
}

function filterOnSearchTerms(items, terms) {
  var termsRE = terms.map(function(term) {
    return new RegExp(term, 'i');
  });

  return items.filter(function(item) {
    return termsRE.every(function(termRE) {
      return termRE.test(item);
    });
  });
}

// instead of using the fs, just filter on /$source/$folder
function filterOnFolder(items, sources, folder) {
  var sourcesString = '(' + sources.join('|') + ')';
  var folderRE = new RegExp('\/' + sourcesString + '\/' + folder, 'i');

  return items.filter(function(item) {
    return folderRE.test(item);
  });
}

module.exports = function(rootDir, config, options) {
  var sources = [config.source].concat(config.sourceDirs);
  var workingDirs = sources.map(function(dir) {
    return path.resolve(rootDir, dir);
  });

  var searchTerms = options._;
  var folder = options.folder;
  var type = options.type || config.defaultType;
  var isGUI = options.gui || !editor;

  var files = find(workingDirs);

  // filter on type (required)
  files = filterOnType(files, type);

  // filter on search terms (optional)
  files = (searchTerms.length) ? filterOnSearchTerms(files, searchTerms) : files;

  // filter on folder (optional)
  files = (folder) ? filterOnFolder(files, sources, folder) : files;

  if (!files.length) {
    console.log('No files match your query');
    process.exit(1);
  } else if (files.length === 1) {
    openFile(files[0], isGUI, editor);
  } else {
    displayMenu(files, 'Select a file to edit', rootDir, function(err, file) {
      if (err) { throw err; }
      openFile(file, isGUI, editor);
    });
  }
};
