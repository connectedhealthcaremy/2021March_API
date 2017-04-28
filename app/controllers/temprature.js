'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');
var nodemailer = require("nodemailer");

//============================================Add user temprature============================================/////////////////
exports.addtemprature = function(req, res) {
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
					var firstName = response[0].firstName;
					var lastName = response[0].lastName;

					var sql = "INSERT INTO temperature (user , temperaturelevel, recordDateTime, temprature_celcius, temprature_foreignheight, unit, notes,deviceStatus) values ";

					for (var i = 0; i < total - 1; i++) {
						var temperaturelevel = data1[i].temperaturelevel;
						var recordDateTime = data1[i].recordDateTime;
						var c_unit = data1[i].unit;
						var notes = data1[i].notes;
						var deviceStatus = data1[i].deviceStatus;

						if (c_unit == 'c') {
							var celcius = temperaturelevel;
							var foreinheight = (temperaturelevel * 9 / 5) + 32;
						} else {
							var foreinheight = temperaturelevel;
							var celcius = (temperaturelevel - 32) * 5 / 9;
						}
						sql += "('" + email + "','" + temperaturelevel + "','" + recordDateTime + "','" + celcius + "','" + foreinheight + "','" + c_unit + "','" + notes + "','" + deviceStatus + "'),";
                       
                       temprature_alert(userid, email, firstName, lastName, temperaturelevel, recordDateTime);

						sql = sql.substr(0, sql.length);
					}

					var temperaturelevel = data1[total - 1].temperaturelevel;
					var recordDateTime = data1[total - 1].recordDateTime;
					var c_unit = data1[total - 1].unit;
					var notes = data1[total - 1].notes;
					var deviceStatus = data1[total - 1].deviceStatus;

					if (c_unit == 'c') {
						var celcius = temperaturelevel;
						var foreinheight = (temperaturelevel * 9 / 5) + 32;
					} else {
						var foreinheight = temperaturelevel;
						var celcius = (temperaturelevel - 32) * 5 / 9;
					}
					sql += "('" + email + "','" + temperaturelevel + "','" + recordDateTime + "','" + celcius + "','" + foreinheight + "','" + c_unit + "','" + notes + "','" + deviceStatus + "')";
                    
                    temprature_alert(userid, email, firstName, lastName, temperaturelevel, recordDateTime);

					db.temperature.addtemperature(sql).then(function(response) {
						
						 ///last insert id 
						
						var lastid = response;
						db.temperature.lastAddsID(lastid).then(function(response) {
							data["error"] = 0;
							data["authResponse"] = "Body Temprature inserted Successfully";
							data["id"] = response;
							res.json(data);
						}).error(function(err) {
							res.json(err);
						});


					}).error(function(err) {
						res.json(err);
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

///////////////========================Oxygen Alert for measurement=================================================/////////////////
function temprature_alert(userid, email, firstName, lastName, temperaturelevel, recordDateTime) {



	db.temperature.temprature_goal(userid).then(function(response) {

		if (response != '' && response) {

			var goalBodyTemperature_start = response[0].goalBodyTemperature_start;
			var goalBodyTemperature_end = response[0].goalBodyTemperature_end;

			if (temperaturelevel < goalBodyTemperature_start || temperaturelevel > goalBodyTemperature_end) {
				temprature_email_alert(email, firstName, lastName, temperaturelevel, recordDateTime,goalBodyTemperature_start, goalBodyTemperature_end );

				///get all next of kin
				db.bp.getfamilyEmails(userid).then(function(response) {


					response.forEach(function(response, index) {
						///Send Emails To Next Of Kin
						temprature_email_alert(response.email, firstName, lastName, temperaturelevel, recordDateTime,goalBodyTemperature_start, goalBodyTemperature_end);

					});

				}).error(function(err) {
					res.json(err);
				});

			}

		} else {
			var goalBodyTemperature_start = 36;
			var goalBodyTemperature_end = 37;

			if (temperaturelevel < goalBodyTemperature_start || temperaturelevel > goalBodyTemperature_end) {
				temprature_email_alert(email, firstName, lastName, temperaturelevel, recordDateTime,goalBodyTemperature_start, goalBodyTemperature_end );
			}

		}


	}).error(function(err) {
		res.json(err);
	});

}

///////////////==========================Send Email ALerts for oxyge measurements============================/////////////

function temprature_email_alert(email, firstName, lastName, temperaturelevel, recordDateTime,goalBodyTemperature_start, goalBodyTemperature_end ) {


	var date_time = recordDateTime.split(' ');
	var date = date_time[0].split('-');
	var record_time = date[2] + "-" + date[1] + "-" + date[0] + " " + date_time[1];

	/***********************
	 **Email Notification
	 *************************/
	var smtpTransport = nodemailer.createTransport("SMTP", {
		service: "Gmail", // sets automatically host, port and connection security settings
		auth: {
			user: "chief.umch@gmail.com",
			pass: "umch1328"
		}
	});
	smtpTransport.sendMail({ //email options
		from: "No-Reply <chief.umch@gmail.com>", // sender address.  Must be the same as authenticated user if using GMail.
		to: email, // receiver 
		subject: "Health Alert : " + firstName + " " + lastName + " has abnormal Body Temperature at " + record_time, // subject
		html: firstName + " " + lastName + " body temperature Readings are not in control:<br><b>Body Temperature </b> : " + temperaturelevel + " °C  <br><br>Recommended body temperature range: <br><b>Body Temperature (°C)</b> :  " + goalBodyTemperature_start + " - " + goalBodyTemperature_end + "<br><br>Best Regards <br>CHIEF Support<br><br><hr><br>This message was sent to " + email + ". If you don't want to receive these emails from CHIEF in the future, please update your notification settings." // body
	}, function(error, response) { //callback
		if (error) {
			console.log(error);
		} else {
			console.log("Message sent: " + response.message);
		}

		smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
	});

	/*********************
	 **End email 
	 ********************/


}

///////////////========================Gettemprature Data=================================================/////////////////

exports.gettemprature = function(req, res) {
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
					var userid = response[0].email;
					//res.json(email);
					///Get user info
					db.temperature.gettemperature(userid).then(function(response) {
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

///////////////========================Update Temprature Data=================================================/////////////////
exports.updatetemprature = function(req, res) {

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
						var temperaturelevel = data1[i].temperaturelevel;
						var recordDateTime = data1[i].recordDateTime;
						var c_unit = data1[i].unit;
						var notes = data1[i].notes;
						var id = data1[i].id;
						if (c_unit == 'c') {
							var celcius = temperaturelevel;
							var foreinheight = (temperaturelevel * 9 / 5) + 32;
						} else {
							var foreinheight = temperaturelevel;
							var celcius = (temperaturelevel - 32) * 5 / 9;
						}

						var sql = "UPDATE temperature SET temperaturelevel ='" + temperaturelevel + "' ,recordDateTime = '" + recordDateTime + "' ,temprature_celcius= '" + celcius + "' ,temprature_foreignheight='" + foreinheight + "', unit='" + c_unit + "'  , notes = '" + notes + "' WHERE id='" + id + "' ;";
						db.temperature.updatetemperaturemain(sql).then(function(response) {


						}).error(function(err) {
							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}

					var temperaturelevel = data1[total - 1].temperaturelevel;
					var recordDateTime = data1[total - 1].recordDateTime;
					var c_unit = data1[total - 1].unit;
					var notes = data1[total - 1].notes;
					var id = data1[total - 1].id;

					if (c_unit == 'c') {
						var celcius = temperaturelevel;
						var foreinheight = (temperaturelevel * 9 / 5) + 32;
					} else {
						var foreinheight = temperaturelevel;
						var celcius = (temperaturelevel - 32) * 5 / 9;
					}

					var sql = "UPDATE temperature SET temperaturelevel ='" + temperaturelevel + "' ,recordDateTime = '" + recordDateTime + "' ,temprature_celcius= '" + celcius + "' ,temprature_foreignheight='" + foreinheight + "', unit='" + c_unit + "'  , notes = '" + notes + "' WHERE id='" + id + "' ; ";

					db.temperature.updatetemperaturemain(sql).then(function(response) {



					}).error(function(err) {
						res.json(err);
					});

					data["error"] = 0;
					data["authResponse"] = "Body Temprature Updated Successfully";
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

//////////////=============================Delete Temprature Data===========================================//////////////////////

exports.deletetemprature = function(req, res) {



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


						var sql = "UPDATE temperature SET isdeleted='1'  WHERE id='" + id + "' ;";

						db.temperature.deletetemperaturemain(sql).then(function(response) {}).error(function(err) {
							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}

					var id = data1[total - 1].id;


					var sql = "UPDATE temperature SET isdeleted='1'  WHERE id='" + id + "' ; ";

					db.temperature.deletetemperaturemain(sql).then(function(response) {}).error(function(err) {
						res.json(err);
					});


					data["error"] = 0;
					data["authResponse"] = "Body Temprature Deleted Successfully";
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