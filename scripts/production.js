#!/usr/bin/env node
var path = require('path');

try {
  require(path.join(__dirname, '../compiled/app'));
} catch (e) {
   if (e && e.code === 'MODULE_NOT_FOUND') {
    console.log('[production]: Compile fail: Did not find module!');
    process.exit(1);
  }
  console.log('[production]: Error and exited'.red, e);
  process.exit(1);
}

console.log('Run in production mode');