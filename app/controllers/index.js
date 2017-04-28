'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');

exports.main = function(req, res) {
	console.log('Inside Controller');
	
   /* res.render('index', {
        user: req.r ? JSON.stringify(req.user) : "null"
    });*/
};
exports.getLatestProducts = function(req, res) {

    //var brand = db.Brand.build(req.body);

/*    if(brand.brandId > 0)
    {
      db.Product.getProductsByBrand(brand.brandId).then(function(response){
            res.json(response);
            })
      .error(function(err){
            res.json(err);
      });

    }
    else {*/

      db.Product.getLatestProducts().then(function(response){
	
            res.json(response);
            })
      .error(function(err){
            res.json(err);
      });

   // }

    return res;
};
