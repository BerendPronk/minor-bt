'use strict';

var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app
  .use('/static', express.static(path.join(__dirname, 'public')))
  .use(bodyParser.urlencoded({extended: true}))
  .get('/', function(req, res) {
    respond(res, {
      page: '/'
    });
  })
  .post('/list', function(req, res) {

    var products = req.body.product;

    respond(res, {
      page: 'list',
      products: products
    });
  })
  .get('/list/clear', function(req, res) {
    res.redirect('/');
  });

function respond(res, data, err) {

  function getProducts(products) {
    function checkList(toCheck) {
      if (products === undefined) {
        return '';
      }

      if (typeof products === 'string') {
          if (products.indexOf(',') === -1) {
            products = [products];
          } else {
            products = products.split(',');
          }
      }

      for (var i = 0; i < products.length; i++) {
        if (products[i].toLowerCase().replace(/ /g, '') === toCheck) {
          return 'active';
        }
      }
    }

    return [
      '<label draggable="true" class="' + checkList('milk') + '">',
        'Milk',
        '<input type="checkbox" name="product" value="milk">',
      '</label>',
      '<label draggable="true" class="' + checkList('brownies') + '">',
        'Brownies',
        '<input type="checkbox" name="product" value="brownies">',
      '</label>',
      '<label draggable="true" class="' + checkList('cheese') + '">',
        'Cheese',
        '<input type="checkbox" name="product" value="cheese">',
      '</label>',
      '<label draggable="true" class="' + checkList('bread') + '">',
        'Bread',
        '<input type="checkbox" name="product" value="bread">',
      '</label>',
      '<label draggable="true" class="' + checkList('ham') + '">',
        'Ham',
        '<input type="checkbox" name="product" value="ham">',
      '</label>',
      '<label draggable="true" class="' + checkList('ketchup') + '">',
        'Ketchup',
        '<input type="checkbox" name="product" value="ketchup">',
      '</label>',
    '</div>'
    ].join('\n');
  }

  function getList(page, products) {
    if (products === undefined) {
      return [
          '<ul>',
          '</ul>',
          '<p>Nothing added yet.</p>'
      ].join('\n');
    }

    if (page === 'list') {
      function renderList() {
        if (typeof products === 'string') {
          if (products.indexOf(',') === -1) {
            products = [products];
          } else {
            products = products.split(',');
          }
        }

        var productList = [];

        products.map(function(item) {
          productList.push([
            '<li>',
              item,
            '</li>'
          ].join('\n'));
        });

        return productList.join('\n');
      }

      return [
          '<ul>',
              renderList(),
          '</ul>',
          '<a href="/list/clear">Clear list</a>'
      ].join('\n');
    } else {
      return [
          '<ul>',
          '</ul>',
          '<p>Nothing added yet.</p>'
      ].join('\n');
    }
  }

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
      '<div id="feedback">Your browser unfortunately does not support drag and drop features. You can still add your groceries the old-fashioned way, though!</div>',
      '<div class="article">',
        '<div class="header">',
          '<h1>Grocery list</h1>',
          '<p>You said you wanted to create a delicious grilled cheese sandwich.<br>What do you think you need in order to make one?</p>',
        '</div>',
        '<div id="list" class="section">',
          '<h2>Things to get:</h2>',
          getList(data.page, data.products),
        '</div>',
        '<div id="options" class="section">',
          '<h2>Available products</h2>',
            '<form action="/list" method="POST">',
              '<div class="section">',
              getProducts(data.products),
              '<div class="section">',
              '<input id="submit" type="submit" value="Update">',
            '</div>',
          '</form>',
        '</div>',
      '</div>',
      '<script src="/static/js/script.js"></script>',
    '</body>',
    '</html>'
  ].join('\n'));
};

app.listen(2000, function() {
    console.log('App started!');
});
