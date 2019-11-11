const proxy = require('http-proxy-middleware');



// const server = require("./server/middleware");

const cwd = process.cwd();


module.exports = function (app) {

  app.use(proxy('/api/', {
    target: 'http://localhost:4000/',
    ws: true,
    pathRewrite: {
      "^/api/": "/"
    }
  }));

  app.use(proxy('/images/', {
    target: 'http://localhost:4000/',
    pathRewrite: {
      "^/images/resized/([^/]+)/uploads/(.+)": "/images/$1/$2",
      "^/images/resized/([^/]+)/(.+)": "/images/$1/$2",
      "^/images/([^/]+)/uploads/(.+)": "/images/$1/$2",
    }
  }));


  app.get(["/static/js/voyager.worker.js", "/voyager.worker.js"], (req, res, next) => {
    res.sendFile(`${cwd}/node_modules/@prisma-cms/graphql-voyager/dist/voyager.worker.js`);
  });

};
