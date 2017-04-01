
const fs = require('fs');

function addMapping(router, mapping) {
  for (var url in mapping) {
    if (url.startsWith('GET ')) {
      var path = url.substring(4);
      router.get(path, mapping[url]);
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('POST ')) {
      var path = url.substring(5);
      router.post(path, mapping[url]);
      console.log(`register URL mapping: POST ${path}`);
    } else if (url.startsWith('PUT ')) {
      var path = url.substring(4);
      router.put(path, mapping[url]);
      console.log(`register URL mapping: PUT ${path}`);
    } else if (url.startsWith('DELETE ')) {
      var path = url.substring(7);
      router.del(path, mapping[url]);
      console.log(`register URL mapping: DELETE ${path}`);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  }
}

export default function (dir) {
  let controllersDir = dir || '../controllers';
  let router = require('koa-router')();

  fs.readdirSync(__dirname + '/' + controllersDir).filter((f) => {
    return f.endsWith('.js');
  }).forEach((f) => {
    console.log(`process controller: ${f}...`);
    addMapping(router, require(__dirname + '/' + controllersDir + '/' + f));
  });
  return router.routes();
};
