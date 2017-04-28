'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');
var nodemailer = require("nodemailer");

//============================================Add user hear rate============================================/////////////////
exports.addhearrate = function(req, res) {

	var userid = req.body.userid;
	var token = req.body.token;
	var data1 = req.body.data;
	data1 = JSON.parse(data1);
	var total = data1.length;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	//heartRateType 0=resting heart rate, 1= active heart rate


	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					var email = response[0].email;
					var firstName = response[0].firstName;
					var lastName = response[0].lastName;

					var sql = "INSERT INTO heartrate (userID , heartRateQty, recordTime,deviceStatus , notes, heartRateType ) values ";

					for (var i = 0; i < total - 1; i++) {
						var heartRateQty = data1[i].heartRateQty;
						var recordDateTime = data1[i].recordDateTime;
						var deviceStatus = data1[i].deviceStatus;
						var notes = data1[i].notes;
						if(notes =='' || notes==null){notes='';}
						var heartRateType = data1[i].heartRateType;


						sql += "('" + userid + "','" + heartRateQty + "','" + recordDateTime + "','" + deviceStatus + "','" + notes + "', '" + heartRateType + "'),";

						hrate_alert(userid, email, firstName, lastName, heartRateQty, recordDateTime);

						sql = sql.substr(0, sql.length);
					}

					var heartRateQty = data1[total - 1].heartRateQty;
					var recordDateTime = data1[total - 1].recordDateTime;
					var deviceStatus = data1[total - 1].deviceStatus;
					var notes = data1[total - 1].notes;
					if(notes =='' || notes==null){notes='';}
					var heartRateType = data1[total - 1].heartRateType;

					sql += "('" + userid + "','" + heartRateQty + "','" + recordDateTime + "','" + deviceStatus + "','" + notes + "', '" + heartRateType + "')";

					hrate_alert(userid, email, firstName, lastName, heartRateQty, recordDateTime);

					db.heartrate.addheartrate(sql).then(function(response) {

						var lastid = response;
						db.heartrate.lastAddsID(lastid).then(function(response) {

							data["error"] = 0;
							data["authResponse"] = "Heart Rate inserted Successfully";
							data['id'] = response;
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

///////////////========================Heart Rate Alert for measurement=================================================/////////////////
function hrate_alert(userid, email, firstName, lastName, heartRateQty, recordDateTime) {



	db.heartrate.checkgoalheartrate(userid).then(function(response) {

		if (response != '' && response) {

			var goalHeartRate_Start = response[0].goalHeartRate_Start;
			var goalHeartRate_End = response[0].goalHeartRate_End;

			if (heartRateQty < goalHeartRate_Start || heartRateQty > goalHeartRate_End) {

				hrate_email_alert(email, firstName, lastName, heartRateQty, recordDateTime, goalHeartRate_Start, goalHeartRate_End);

				///get all next of kin
				db.bp.getfamilyEmails(userid).then(function(response) {


					response.forEach(function(response, index) {
						///Send Emails To Next Of Kin
						hrate_email_alert(response.email, firstName, lastName, heartRateQty, recordDateTime, goalHeartRate_Start, goalHeartRate_End);

					});

				}).error(function(err) {
					res.json(err);
				});

			}

		} else {
			var goalHeartRate_Start = 60;
			var goalHeartRate_End = 100;

			if (heartRateQty < goalHeartRate_Start || heartRateQty > goalHeartRate_End) {

				hrate_email_alert(email, firstName, lastName, heartRateQty, recordDateTime, goalHeartRate_Start, goalHeartRate_End);

			}

		}


	}).error(function(err) {
		res.json(err);
	});

}

///////////////==========================Send Email ALerts for heart rate measurements============================/////////////

function hrate_email_alert(email, firstName, lastName, heartRateQty, recordDateTime, goalHeartRate_Start, goalHeartRate_End) {

   
   
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
		subject: "Health Alert : " + firstName + " " + lastName + " has abnormal Heart Rate at " + record_time, // subject
		html: firstName + " " + lastName + " heart rate readings are not in control:<br><b>Heart Rate </b> : " + heartRateQty + " bpm  <br><br>Recommended heart rate range: <br><b>Heart Rate (bpm)</b> :  " + goalHeartRate_Start + " - " + goalHeartRate_End + "<br><br>Best Regards <br>CHIEF Support<br><br><hr><br>This message was sent to " + email + ". If you don't want to receive these emails from CHIEF in the future, please update your notification settings." // body
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

///////////////========================Get hear rate Data=================================================/////////////////

exports.gethearrate = function(req, res) {
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
					//var userid=response[0].email;
					//res.json(email);
					///Get user info
					db.heartrate.getheartrate(userid).then(function(response) {
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

///////////////========================Update hearrate Data=================================================/////////////////
exports.updatehearrate = function(req, res) {

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
						var heartRateQty = data1[i].heartRateQty;
						var recordDateTime = data1[i].recordDateTime;
						var deviceStatus = data1[i].deviceStatus;
						var notes = data1[i].notes;
						var id = data1[i].id;

						var sql = "UPDATE heartrate SET heartRateQty='" + heartRateQty + "', recordTime='" + recordDateTime + "' , notes='" + notes + "' WHERE heartRateID='" + id + "'; ";
						db.heartrate.updateheartrate(sql).then(function(response) {}).error(function(err) {
							res.json(err);
						});
						sql = sql.substr(0, sql.length);
					}

					var heartRateQty = data1[total - 1].heartRateQty;
					var recordDateTime = data1[total - 1].recordDateTime;
					var deviceStatus = data1[total - 1].deviceStatus;
					var notes = data1[total - 1].notes;
					var id = data1[total - 1].id;
					var sql = "UPDATE heartrate SET heartRateQty='" + heartRateQty + "', recordTime='" + recordDateTime + "' , notes='" + notes + "' WHERE heartRateID='" + id + "'; ";
					//sql += "('" + userid + "','" + heartRateQty + "','" + recordDateTime + "','" + deviceStatus + "','" + notes + "')";

					db.heartrate.updateheartrate(sql).then(function(response) {}).error(function(err) {
						res.json(err);
					});
					data["error"] = 0;
					data["authResponse"] = "Heart Rate Updated Successfully";
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

//////////////=============================Delete hearrate Data===========================================//////////////////////

exports.deletehearrate = function(req, res) {



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


						var sql = "UPDATE heartrate SET isdeleted='1'  WHERE heartRateID='" + id + "' ;";

						db.temperature.deletetemperaturemain(sql).then(function(response) {}).error(function(err) {
							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}

					var id = data1[total - 1].id;


					var sql = "UPDATE heartrate SET isdeleted='1'  WHERE heartRateID='" + id + "' ; ";

					db.temperature.deletetemperaturemain(sql).then(function(response) {}).error(function(err) {
						res.json(err);
					});


					data["error"] = 0;
					data["authResponse"] = "Heart Rate Deleted Successfully";
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