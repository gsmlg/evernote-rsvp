var compileES6 = require('broccoli-babel-transpiler');
var pickFiles = require('broccoli-static-compiler');

// create tree for files in the app folder
var app = 'src';
app = pickFiles(app, {
  srcDir: '/',
  destDir: '' // move under appkit namespace
});

// Transpile ES6 modules and concatenate them,
// recursively including modules referenced by import statements.
var app = compileES6(app, {
  modules: 'common',
});

module.exports = app;

