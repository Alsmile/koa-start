import fs from 'fs';
import lodash, { isPlainObject, defaultsDeep } from 'lodash';

const configPath = '../config/';
import defaultConfig from '../config/default';

const cfgs = [];
fs.readdirSync(__dirname + '/' + configPath).map(filename => {
  if (filename === 'default.js') return false;

  try {
    const cfg = require(configPath + filename);
    if (isPlainObject(cfg)) {
      cfgs.push(cfg);
    }
  } catch (e) {}
});

cfgs.push(defaultConfig);
const config = defaultsDeep.apply(lodash, cfgs);
export default config;
