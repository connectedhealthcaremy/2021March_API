'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');
var nodemailer = require("nodemailer");

//============================================Add oxygen density============================================/////////////////
exports.addoxygen = function(req, res) {
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



					var sql = "Insert into oxygen(user,recordDateTime,pulse,oxygenlevel,notes,deviceStatus) values ";

					for (var i = 0; i < total - 1; i++) {
						var record_date_time = data1[i].record_date_time;
						var oxygenlevel = data1[i].oxygenlevel;
						var pulse = data1[i].pulse;
						var notes = data1[i].notes;
						var deviceStatus = data1[i].deviceStatus;

						sql += "('" + email + "','" + record_date_time + "','" + pulse + "','" + oxygenlevel + "','" + notes + "','" + deviceStatus + "'),";

						oxygen_alert(userid, email, firstName, lastName, oxygenlevel, pulse, record_date_time);

						sql = sql.substr(0, sql.length);
					}
					var record_date_time = data1[total - 1].record_date_time;
					var oxygenlevel = data1[total - 1].oxygenlevel;
					var pulse = data1[total - 1].pulse;
					var notes = data1[total - 1].notes;
					var deviceStatus = data1[i].deviceStatus;

					sql += "('" + email + "','" + record_date_time + "','" + pulse + "','" + oxygenlevel + "','" + notes + "','" + deviceStatus + "')";

					oxygen_alert(userid, email, firstName, lastName, oxygenlevel, pulse, record_date_time);

					db.oxygen.addoxygen(sql).then(function(response) {

						var lastid = response;
						db.oxygen.lastAddsID(lastid).then(function(response) {

							data["error"] = 0;
							data["authResponse"] = "Blood oxygen save Successfully";
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
function oxygen_alert(userid, email, firstName, lastName, oxygenlevel, pulse, record_date_time) {



	db.oxygen.checkgoaloxygen(userid).then(function(response) {

		if (response != '' && response) {

			var goalOxygen_Start = response[0].goalOxygen_Start;
			var goalOxygen_End = response[0].goalOxygen_End;

			if (oxygenlevel < goalOxygen_Start || oxygenlevel > goalOxygen_End) {
				oxygen_email_alert(email, firstName, lastName, oxygenlevel, pulse, record_date_time, goalOxygen_Start, goalOxygen_End);

				///get all next of kin
				db.bp.getfamilyEmails(userid).then(function(response) {


					response.forEach(function(response, index) {
						///Send Emails To Next Of Kin
						oxygen_email_alert(response.email, firstName, lastName, oxygenlevel, pulse, record_date_time, goalOxygen_Start, goalOxygen_End);

					});

				}).error(function(err) {
					res.json(err);
				});

			}

		} else {
			var goalOxygen_Start = 95;
			var goalOxygen_End = 100;

			if (oxygenlevel < goalOxygen_Start || oxygenlevel > goalOxygen_End) {
				oxygen_email_alert(email, firstName, lastName, oxygenlevel, pulse, record_date_time, goalOxygen_Start, goalOxygen_End);
			}

		}


	}).error(function(err) {
		res.json(err);
	});

}

///////////////==========================Send Email ALerts for oxyge measurements============================/////////////

function oxygen_email_alert(email, firstName, lastName, oxygenlevel, pulse, record_date_time, goalOxygen_Start, goalOxygen_End) {

	var date_time = record_date_time.split(' ');
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
		subject: "Health Alert : " + firstName + " " + lastName + " has abnormal Blood Oxygen at " + record_time, // subject
		html: firstName + " " + lastName + " Blood oxygen Readings are not in control:<br><b>Blood Oxygen </b> : " + oxygenlevel + " % <br><b>pulse : </b>" + pulse + " bpm <br><br>Recommended blood oxygen range: <br><b>Blood oxygen (%)</b> :  " + goalOxygen_Start + " - " + goalOxygen_End + "<br><br>Best Regards <br>CHIEF Support<br><br><hr><br>This message was sent to " + email + ". If you don't want to receive these emails from CHIEF in the future, please update your notification settings." // body
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

///////////////========================Get Oxygen Data=================================================/////////////////

exports.getoxygen = function(req, res) {
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
					db.oxygen.getoxygen(userid).then(function(response) {

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

///////////////========================Update Oxygen Data=================================================/////////////////
exports.updateoxygen = function(req, res) {

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



					for (var i = 0; i < total - 1; i++) {
						var record_date_time = data1[i].record_date_time;
						var oxygenlevel = data1[i].oxygenlevel;
						var pulse = data1[i].pulse;
						var notes = data1[i].notes;
						var id = data1[i].id;

						var sql = "UPDATE oxygen SET recordDateTime='" + record_date_time + "' ,pulse='" + pulse + "',oxygenlevel='" + oxygenlevel + "',notes='" + notes + "' WHERE id='" + id + "' ;";
						db.oxygen.updateoxygen(sql).then(function(response) {}).error(function(err) {
							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}
					var record_date_time = data1[total - 1].record_date_time;
					var oxygenlevel = data1[total - 1].oxygenlevel;
					var pulse = data1[total - 1].pulse;
					var notes = data1[total - 1].notes;
					var id = data1[total - 1].id;

					var sql = "UPDATE oxygen SET recordDateTime='" + record_date_time + "' ,pulse='" + pulse + "',oxygenlevel='" + oxygenlevel + "',notes='" + notes + "' WHERE id='" + id + "' ; ";
					db.oxygen.updateoxygen(sql).then(function(response) {}).error(function(err) {
						res.json(err);
					});


					data["error"] = 0;
					data["authResponse"] = "Blood oxygen Updated Successfully";
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

//////////////=============================Delete Oxygen Data===========================================//////////////////////

exports.deleteoxygen = function(req, res) {


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


					for (var i = 0; i < total - 1; i++) {

						var id = data1[i].id;

						var sql = "UPDATE oxygen SET isdeleted='1' WHERE id='" + id + "' ;";

						db.oxygen.deleteoxygen(sql).then(function(response) {}).error(function(err) {
							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}


					var id = data1[total - 1].id;

					var sql = "UPDATE oxygen SET isdeleted='1' WHERE id='" + id + "' ; ";

					db.oxygen.deleteoxygen(sql).then(function(response) {}).error(function(err) {
						res.json(err);
					});


					data["error"] = 0;
					data["authResponse"] = "Blood oxygen Deleted Successfully";
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