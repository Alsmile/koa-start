#!/usr/bin/env node
 
var path = require('path');
var babelCliDir = require('babel-cli/lib/babel/dir');
require('colors');
console.log('[DEBUG]: Compiling...'.green);
babelCliDir({ outDir: 'compiled', retainLines: true, sourceMaps: true }, ['src/']); 

try {
  require(path.join(__dirname, '../compiled/app'));
} catch (e) {
  if (e && e.code === 'MODULE_NOT_FOUND') {
    console.log('[DEBUG]: Compile fail: Did not find module!');
    process.exit(1);
  }
  console.log('[DEBUG]: Error and exited'.red, e);
  process.exit(1);
}

console.log('[DEBUG]: Run in debug mode'.green);