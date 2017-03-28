'use strict';

var path = require('path');
var express = require('express');
var app = express();

app
  .use('/static', express.static(path.join(__dirname, 'public')))
  .get('/', function(req, res) {
    respond(res);
    console.log('just home');
  })
  .get('/list/:products', function(req, res) {
    respond(res);
    console.log('list');
  });

function respond(res, err) {

    res.set('Content-Type', 'text/html');
    res.end([
      '<html>',
      '<head>',
        '<meta charset="UTF-8">',
        '<meta name="viewport" content="width=device-width">',
        '<title>Browser Technologies - Week 3: Drag \'n Drop Grocery list</title>',
        '<link rel="stylesheet" href="/static/css/style.css">',
      '</head>',
      '<body>',
        '<form action="/list/?products=value" method="GET">',
          '<fieldset>',
            '<label>',
              'Milk',
              '<input type="checkbox" name="product" value="milk">',
            '</label>',
            '<label>',
              'Brownies',
              '<input type="checkbox" name="product" value="brownies">',
            '</label>',
            '<label>',
              'Cheese',
              '<input type="checkbox" name="product" value="cheese">',
            '</label>',
            '<label>',
              'Bread',
              '<input type="checkbox" name="product" value="bread">',
            '</label>',
            '<label>',
              'Ham',
              '<input type="checkbox" name="product" value="ham">',
            '</label>',
            '<label>',
              'Ketchup',
              '<input type="checkbox" name="product" value="ketchup">',
            '</label>',
          '</fieldset>',
          '<fieldset>',
            '<input type="submit" value="Update">',
          '</fieldset>',
        '</form>',
        '<script src="/static/js/script.js"></script>',
      '</body>',
      '</html>'
    ].join('\n'));
};

app.listen(2000, function() {
    console.log('App started!');
});
