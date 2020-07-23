const proxy = require('http-proxy-middleware');
const express = require('express');



// const server = require("./server/middleware");

const cwd = process.cwd();


module.exports = function (app) {

  const {
    API_ENDPOINT = 'http://localhost:4000',
  } = process.env;

  app.use(proxy('/api/', {
    target: API_ENDPOINT,
    ws: true,
    pathRewrite: {
      "^/api/": "/"
    }
  }));

  app.use(proxy('/images/', {
    target: API_ENDPOINT,
    pathRewrite: {
      "^/images/resized/([^/]+)/uploads/(.+)": "/images/$1/$2",
      "^/images/resized/([^/]+)/(.+)": "/images/$1/$2",
      "^/images/([^/]+)/uploads/(.+)": "/images/$1/$2",
    }
  }));

  app.use(express.static(cwd + '/shared')); //Serves resources from public folder

  app.get(["/static/js/voyager.worker.js", "/voyager.worker.js"], (req, res, next) => {
    res.sendFile(`${cwd}/node_modules/@prisma-cms/graphql-voyager/dist/voyager.worker.js`);
  });

};
