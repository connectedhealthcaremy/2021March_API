'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');

//============================================Add user bone density============================================/////////////////
exports.addfat = function(req, res) {
	console.log(req.body);
	var userid = req.body.userid;
	var token = req.body.token;
	var data1 = req.body.data;
	data1 = JSON.parse(data1);
	var total = data1.length;
	var data = {
		"error": 0,
		"authResponse": ""
	}



	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					var email = response;

					var sqlDelete = "";
					var array_dateTime = '';
					var sql = "INSERT INTO fat (userID, scaleDate, fatQty, fatUnitID) values ";

					for (var i = 0; i < total - 1; i++) {
						var scaleDate = data1[i].scaleDate;
						var Qty = data1[i].Qty;

						array_dateTime += "'" + scaleDate + "',";

						sql += "('" + userid + "','" + scaleDate + "','" + Qty + "','" + 0 + "'),";

						sql = sql.substr(0, sql.length);
					}
					var scaleDate = data1[total - 1].scaleDate;
					var Qty = data1[total - 1].Qty;

					array_dateTime += "'" + scaleDate + "'";

					sql += "('" + userid + "','" + scaleDate + "','" + Qty + "','" + 0 + "')";

					/*********** Delete The Existing record ****************/
					sqlDelete = "DELETE FROM fat where scaleDate IN  (" + array_dateTime + ")";
					/********** End Delete *********************************/

					db.fat.deletefat(sqlDelete).then(function(response) {

						db.fat.addfat(sql).then(function(response) {

							data["error"] = 0;
							data["authResponse"] = "Body Fat Added Successfully";
							res.json(data);

						}).error(function(err) {
							res.json(err);
						});

					});


				} else {
					data["error"] = 1;
					data["authResponse"] = "Authentication Failed.";
					res.json(data);
				}
			} else {
				data["error"] = 1;
				data["authResponse"] = "Token Required etc.";
				res.json(data);
			}
		})
		.error(function(err) {
			res.json(err);
		});



	return res;
};

///////////////========================Get bone density Data=================================================/////////////////

exports.getfat = function(req, res) {
	var userid = req.query.userid;
	var token = req.query.token;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function(response) {
				if (response != '' && response != null) {
					var email = response;
					//res.json(email);
					///Get user info
					db.fat.getfat(userid).then(function(response) {
							data["error"] = 0;
							data["authResponse"] = "Action Successful";
							data['Data'] = response;
							res.json(data);

						})
						.error(function(err) {
							res.json(err);
						});

				} else {
					data["error"] = 1;
					data["authResponse"] = "Authentication Failed.";
					res.json(data);

				}
			})
			.error(function(err) {
				res.json(err);
			});
	} else {
		data["error"] = 1;
		data["authResponse"] = "Please provide all required data (i.e : token etc)";
		res.json(data);
		//connection.end()
	}

	return res;
};