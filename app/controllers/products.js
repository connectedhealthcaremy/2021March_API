'use strict';

/**
 * Module dependencies.
 */
var db = require('../../config/sequelize');

exports.getLatestProducts = function(req, res) {

    var brand = db.Brand.build(req.body);

    if(brand.brandId > 0)
    {
      db.Product.getProductsByBrand(brand.brandId).then(function(response){
            res.json(response);
            })
      .error(function(err){
            res.json(err);
      });

    }
    else {

      db.Product.getLatestProducts().then(function(response){
	
            res.json(response);
            })
      .error(function(err){
            res.json(err);
      });

    }

    return res;
};

exports.getLatestProductsByBrand = function(req, res, next, id) {

  console.log('brandId => ' + id);

  db.Product.getProductsByBrand(id).then(function(response){
        res.json(response);
        })
  .error(function(err){
        res.json(err);
  });

    return res;
};

exports.showAll = function(req, res) {

  db.Product.getLatestProducts().then(function(response){
        res.json(response);
        })
  .error(function(err){
        res.json(err);
  });

    return res;
};

exports.showByBrand = function(req, res) {
    return res.jsonp(req.getLatestProductsByBrand);
};
