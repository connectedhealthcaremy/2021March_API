'use strict';

/**
* Module dependencies.
*/
var products = require('../../app/controllers/products');

module.exports = function(app) {

// Product Routes
app.route('/products')
    ///.post(products.getLatestProducts)
    .get(products.showAll);

app.route('/products/:brandId')
    .get(products.showByBrand);

// Finish with setting up the brandId param
// Note: the products.getLatestProductsByBrand function will be called everytime then it will call the next function.
app.param('brandId', products.getLatestProductsByBrand);

};
