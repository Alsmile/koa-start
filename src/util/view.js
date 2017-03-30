import Path from 'path';
import xtpl from 'xtpl/lib/xtpl';
import lodash, { defaultsDeep } from 'lodash';

import config from './config';

function xtplRender(path, data, option) {
  return () => {
    return new Promise( (resolve, reject) => {
      data.config = config.view;
      xtpl.render(path, data, option, (error, content) => {
        if (error) reject(error);
        else resolve(content);
      });
    });
  };
}

// option.views
// option.extname
export default (option) => {
    option = option || {};
    let views = option.views || '';
    let extname = option.extname || 'xtpl';

    async function render(path, data, opt) {
      let filePath;
      if (path.charAt(0) === '/') filePath = path;
      else filePath = Path.resolve(views, path + '.' + extname);

      var html = await xtplRender(filePath, defaultsDeep.apply(lodash, [data, this.state]), option)();
      if (!opt || opt.write !== false) {
        this.type = 'html';
        this.body = html;
      }
      return html;
    }

    return (ctx, next) => {
      ctx.render = render;
      return next();
    }
};
