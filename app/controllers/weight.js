'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');

//============================================Add user weight============================================/////////////////
exports.addweight = function(req, res) {
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

					var sql = "INSERT INTO weight (userID, scaleDate, weightQty, height, weightUnitID,deviceStatus, unit , notes , deviceuuid , deviceid) values ";

					for (var i = 0; i < total - 1; i++) {
						var scaleDate = data1[i].scaleDate;
						var Qty = data1[i].Qty;
						var height = data1[i].height;
						var deviceStatus = data1[i].deviceStatus;
						var unit = data1[i].unit;
						var notes = data1[i].notes;
						var deviceuuid = data1[i].deviceuuid;
						var deviceid = data1[i].deviceid;
                        //deviceid
                        if (deviceid == '' || deviceid === undefined) {
							deviceid = '';
						}
						if (unit == '' || unit === undefined) {
							unit = 'kg';
						}

						if (notes == '' || notes === undefined) {
							notes = '';
						}

                        if (height == '' || height === undefined) {
							height = '';
						}
						if (deviceuuid == '' || deviceuuid === undefined) {
							deviceuuid = '';
						}


						array_dateTime += "'" + scaleDate + "',";

						sql += "('" + userid + "','" + scaleDate + "','" + Qty + "','" + height + "','" + 1 + "','" + deviceStatus + "','" + unit + "','" + notes + "','" + deviceuuid + "', '"+deviceid+"'),";

						sql = sql.substr(0, sql.length);
					}
					var scaleDate = data1[total - 1].scaleDate;
					var Qty = data1[total - 1].Qty;
					var height = data1[total - 1].height;
					var deviceStatus = data1[total - 1].deviceStatus;
					var unit = data1[total - 1].unit;
					var notes = data1[total - 1].notes;
					var deviceuuid = data1[total - 1].deviceuuid;
					var deviceid = data1[total - 1].deviceid;	
                    
                    if (deviceid == '' || deviceid === undefined) {
						deviceid = '';
					}

					if (notes == '' || notes === undefined) {
						notes = '';
					}

					if (unit == '' || unit === undefined) {
						unit = 'kg';
					}

					if (height == '' || height === undefined) {
							height = '';
						}
					if (deviceuuid == '' || deviceuuid === undefined) {
							deviceuuid = '';
						}
	

					array_dateTime += "'" + scaleDate + "'";

					sql += "('" + userid + "','" + scaleDate + "','" + Qty + "','" + height + "','" + 1 + "','" + deviceStatus + "','" + unit + "','" + notes + "','" + deviceuuid + "', '"+deviceid+"')";



					/*********** Delete The Existing record ****************/
					sqlDelete = "DELETE FROM weight where scaleDate IN  (" + array_dateTime + ")";
					/********** End Delete *********************************/

					db.weight.delete_Weight(sqlDelete).then(function(response) {

						db.weight.addweight(sql).then(function(response) {
							/*
							 **get last inserted id,s
							 */
							var lastinsertid = response;
							db.weight.lastAddIDs(lastinsertid).then(function(response) {

								data["error"] = 0;
								data["authResponse"] = "weight Added Successfully";
								data['id'] = response;
								res.json(data);
							}).error(function(err) {
								res.json(err);
							});



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

///////////////========================Get user weight Data=================================================/////////////////

exports.getweight = function(req, res) {
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
					db.weight.getweight(userid).then(function(response) {
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

//============================================Update user weight============================================/////////////////
exports.updateweight = function(req, res) {

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

					var email = response;

					for (var i = 0; i < total - 1; i++) {
						var scaleDate = data1[i].scaleDate;
						var Qty = data1[i].Qty;
						var id = data1[i].id;

						var sql = "UPDATE weight SET scaleDate='" + scaleDate + "', weightQty='" + Qty + "' WHERE weightID='" + id + "' AND deviceStatus='0' ; ";
						db.weight.updateweight(sql).then(function(response) {}).error(function(err) {
							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}
					var scaleDate = data1[total - 1].scaleDate;
					var Qty = data1[total - 1].Qty;
					var id = data1[total - 1].id;

					var sql = "UPDATE weight SET scaleDate='" + scaleDate + "', weightQty='" + Qty + "' WHERE weightID='" + id + "' AND deviceStatus='0'; ";
					db.weight.updateweight(sql).then(function(response) {}).error(function(err) {
						res.json(err);
					});

					data["error"] = 0;
					data["authResponse"] = "weight Updated Successfully";
					res.json(data);


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

//============================================Delete user weight============================================/////////////////

exports.deleteweight = function(req, res) {

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

					var email = response[0].email;

					//var sql = " ";

					for (var i = 0; i < total - 1; i++) {

						var id = data1[i].id;
						//var sql = "DELETE FROM weight WHERE weightID='"+id+"' ;";
						var sql = "UPDATE weight SET isdeleted='1' WHERE weightID='" + id + "' AND deviceStatus='0'; ";
						db.weight.deleteweight(sql).then(function(response) {}).error(function(err) {
							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}

					var id = data1[total - 1].id;

					var sql = "UPDATE weight SET isdeleted='1' WHERE weightID='" + id + "' AND deviceStatus='0'; ";
					//var sql = "DELETE FROM weight WHERE weightID='"+id+"' ;";

					db.weight.deleteweight(sql).then(function(response) {}).error(function(err) {
						res.json(err);
					});


					data["error"] = 0;
					data["authResponse"] = "Weight Deleted Successfully";
					res.json(data);
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