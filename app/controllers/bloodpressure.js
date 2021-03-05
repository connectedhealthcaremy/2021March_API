'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');
var nodemailer = require("nodemailer");
var FCM = require('fcm-node');
var moment = require('moment');

//============================================Add user bp goal============================================/////////////////
exports.addbloodpressuregoal = function(req, res) {

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

					db.bp_goal.checkgoalbp(userid).then(function(response) {

						if (response != '' && response != null) {


							var id = response[0].id;

							if (!!id) {

								/************************
								 ***Update Glucose Values
								 *********** **************/
								var sql = "UPDATE bp_goal SET ";


								for (var i = 0; i < total - 1; i++) {
									var systolic_from = data1[i].goalSystolic_Start;
									var diastolic_from = data1[i].goalDiastolic_Start;
									var systolic_to = data1[i].goalSystolic_End;
									var diastolic_to = data1[i].goalDiastolic_End;
									var notification = data1[i].notification;


									sql = sql.substr(0, sql.length);
								}


								var systolic_from = data1[total - 1].goalSystolic_Start;
								var diastolic_from = data1[total - 1].goalDiastolic_Start;
								var systolic_to = data1[total - 1].goalSystolic_End;
								var diastolic_to = data1[total - 1].goalDiastolic_End;
								var notification = data1[total - 1].notification;


								sql += "systolic_from='" + systolic_from + "',diastolic_from='" + diastolic_from + "',systolic_to='" + systolic_to + "',diastolic_to='" + diastolic_to + "',notification='" + notification + "' WHERE id='" + id + "'; ";


								db.bp_goal.updatebpgoal(sql).then(function(response) {

									data["error"] = 0;
									data["authResponse"] = "Blood pressure goal Updated Successfully";
									res.json(data);

								}).error(function(err) {
									res.json(err);
								});

							} else {
								data["error"] = 0;
								data["authResponse"] = "Server Id Required !.";
								res.json(data);
							}

						} else {

							/************************
							 **** Add New Goal
							 *********************/
							var sql = "INSERT INTO bp_goal (userID,systolic_from,diastolic_from, systolic_to, diastolic_to, notification) values ";

							for (var i = 0; i < total - 1; i++) {
								var systolic_from = data1[i].goalSystolic_Start;
								var diastolic_from = data1[i].goalDiastolic_Start;
								var systolic_to = data1[i].goalSystolic_End;
								var diastolic_to = data1[i].goalDiastolic_End;
								var notification = data1[i].notification;

								sql += "('" + userid + "','" + systolic_from + "','" + diastolic_from + "','" + systolic_to + "','" + diastolic_to + "','" + notification + "'),";

								sql = sql.substr(0, sql.length);
							}


							var systolic_from = data1[total - 1].goalSystolic_Start;
							var diastolic_from = data1[total - 1].goalDiastolic_Start;
							var systolic_to = data1[total - 1].goalSystolic_End;
							var diastolic_to = data1[total - 1].goalDiastolic_End;
							var notification = data1[total - 1].notification;
							sql += "('" + userid + "','" + systolic_from + "','" + diastolic_from + "','" + systolic_to + "','" + diastolic_to + "','" + notification + "')";


							db.bp_goal.addbpgoal(sql).then(function(response) {

								data["error"] = 0;
								data["authResponse"] = "Blood Pressure goal Added Successfully";
								res.json(data);

							}).error(function(err) {
								res.json(err);
							});


						}

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

//============================================Update user bp goal============================================/////////////////
exports.updatebloodpressuregoal = function(req, res) {
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
						var systolic_form = data1[i].systolic_form;
						var systolic_to = data1[i].systolic_to;
						var diastolic_form = data1[i].diastolic_form;
						var diastolic_to = data1[i].diastolic_to;
						var id = data1[i].id;

						var sql = "UPDATE bp_goal SET systolic_from='" + systolic_form + "',systolic_to='" + systolic_to + "',diastolic_from='" + diastolic_form + "',diastolic_to='" + diastolic_to + "' WHERE id='" + id + "'; ";
						db.bp_goal.updatebpgoal(sql).then(function(response) {}).error(function(err) {
							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}
					var systolic_form = data1[total - 1].systolic_form;
					var systolic_to = data1[total - 1].systolic_to;
					var diastolic_form = data1[total - 1].diastolic_form;
					var diastolic_to = data1[total - 1].diastolic_to;
					var id = data1[total - 1].id;

					var sql = "UPDATE bp_goal SET systolic_from='" + systolic_form + "',systolic_to='" + systolic_to + "',diastolic_from='" + diastolic_form + "',diastolic_to='" + diastolic_to + "' WHERE id='" + id + "'; ";
					db.bp_goal.updatebpgoal(sql).then(function(response) {}).error(function(err) {
						res.json(err);
					});
					//sql += "('" + email + "','" + systolic_form + "','" + systolic_to + "','" + diastolic_form + "','" + diastolic_to + "')";



					data["error"] = 0;
					data["authResponse"] = "blood pressure goal updated Successfully";
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

//============================================Delete user bp goal============================================/////////////////
exports.deletebloodpressuregoal = function(req, res) {

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

						var sql = "DELETE FROM bp_goal WHERE id='" + id + "'; ";
						db.bp_goal.deletebpgoal(sql).then(function(response) {}).error(function(err) {
							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}

					var id = data1[total - 1].id;

					var sql = "DELETE FROM bp_goal WHERE id='" + id + "'; ";
					db.bp_goal.deletebpgoal(sql).then(function(response) {}).error(function(err) {
						res.json(err);
					});
					//sql += "('" + email + "','" + systolic_form + "','" + systolic_to + "','" + diastolic_form + "','" + diastolic_to + "')";



					data["error"] = 0;
					data["authResponse"] = "blood pressure goal Deleted Successfully";
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

///////////////========================Get bp goal Data=================================================/////////////////

exports.getbloodpressuregoal = function(req, res) {
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
					db.bp_goal.getbpgoal(userid).then(function(response) {
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

//============================================Add user bloodpressure for backup ============================================/////////////////
exports.addbloodpressure1 = function(req, res) {

	var userid = req.body.userid;
	var token = req.body.token;
	var data1 = req.body.data;


	console.log(req.body);

	var data = {
		"error": 0,
		"authResponse": ""
	}

	var userController = require('../../app/controllers/user');
	userController.recordRawData(userid, "addbloodpressure1", "data : "+req.body.data+", parameters : []");

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					var email = response[0].email;
					var firstName = response[0].firstName;
					var lastName = response[0].lastName;

					// data1=JSON.parse(data1);
					data1 = JSON.parse(data1);
					var total = data1.length;

					var sql = "INSERT INTO bp(userID,systolic,diastolic,recordTime,pulse,notes,deviceStatus,unit , deviceuuid, deviceid) values ";
					for (var i = 0; i < total - 1; i++) {
						var systolic = data1[i].systolic;
						var diastolic = data1[i].diastolic;
						var record_time = data1[i].record_time;
						var pulse = data1[i].pulserate;
						var notes = data1[i].notes;
						var deviceStatus = data1[i].deviceStatus;
						var unit = data1[i].unit;
						var deviceuuid = data1[i].deviceuuid;
						var deviceid = data1[i].deviceid;
						//deviceid
						if (unit == '' || unit === undefined) {
							unit = 'mmHg';
						}
						if (deviceuuid == '' || deviceuuid === undefined) {
							deviceuuid = '';
						}
						if (deviceStatus == '' || deviceStatus === undefined) {
							deviceStatus = '';
						}
						if (deviceid == '' || deviceid === undefined) {
							deviceid = '';
						}

						sql += "('" + email + "','" + systolic + "','" + diastolic + "','" + record_time + "','" + pulse + "','" + notes + "','" + deviceStatus + "','" + unit + "','" + deviceuuid + "','" + deviceid + "'),";

						///check alert for blood pressure
						///bp_alert(userid, email, firstName, lastName, systolic, diastolic, pulse, record_time);

						sql = sql.substr(0, sql.length);
					}

					var systolic = data1[total - 1].systolic;
					var diastolic = data1[total - 1].diastolic;
					var record_time = data1[total - 1].record_time;
					var pulse = data1[total - 1].pulserate;
					var notes = data1[total - 1].notes;
					var deviceStatus = data1[total - 1].deviceStatus;
					var unit = data1[total - 1].unit;
					var deviceuuid = data1[total - 1].deviceuuid;
					var deviceid = data1[total - 1].deviceid;

					if (unit == '' || unit === undefined) {
						unit = 'mmHg';
					}
					if (deviceuuid == '' || deviceuuid === undefined) {
						deviceuuid = '';
					}
					if (deviceStatus == '' || deviceStatus === undefined) {
						deviceStatus = '';
					}
					if (deviceid == '' || deviceid === undefined) {
						deviceid = '';
					}
					sql += "('" + email + "','" + systolic + "','" + diastolic + "','" + record_time + "','" + pulse + "','" + notes + "','" + deviceStatus + "','" + unit + "','" + deviceuuid + "','" + deviceid + "')";

					///check alert for blood pressure
					////bp_alert(userid, email, firstName, lastName, systolic, diastolic, pulse, record_time);

					db.bp.addbp(sql).then(function(response) {

						///get last inserted id,s

						var lastinsertid = response;

						db.bp.lastaddIDs(lastinsertid).then(function(response) {

							data["error"] = 0;
							data["authResponse"] = "blood pressure Added Successfully";
							data["id"] = response;
							/****
							 ** Send Bp alert
							 ***********/
							post_bp_alert(response);
							////remove_duplicate_bp();

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


function remove_duplicate_bp() {

	var  runner = require("child_process");
	var phpScriptPath = __dirname + "/../phpFiles/remove_bp.php";
	var argsString = "1" + "," + "1";
	runner.exec("php " + phpScriptPath + " " + argsString, function(err, phpResponse, stderr) {
		if (err) console.log(err); /* log error */
		console.log(phpResponse);
	});

}
//============================================Add user bp  ============================================/////////////////
exports.addbloodpressure2 = function(req, res) {

	var userid = req.body.userid;
	var token = req.body.token;
	var data1 = req.body.data;

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

					// data1=JSON.parse(data1);
					data1 = JSON.parse(data1);
					var total = data1.length;

					var sqlDelete = "";
					var array_dateTime = '';

					var sql = "INSERT INTO bp(userID,systolic,diastolic,recordTime,pulse,notes,deviceStatus,unit) values ";
					for (var i = 0; i < total - 1; i++) {
						var systolic = data1[i].systolic;
						var diastolic = data1[i].diastolic;
						var record_time = data1[i].record_time;
						var pulse = data1[i].pulserate;
						var notes = data1[i].notes;
						var deviceStatus = data1[i].deviceStatus;
						var unit = data1[i].unit;

						if (unit == '' || unit === undefined) {
							unit = 'mmHg';
						}

						array_dateTime += "'" + record_time + "',";

						sql += "('" + email + "','" + systolic + "','" + diastolic + "','" + record_time + "','" + pulse + "','" + notes + "','" + deviceStatus + "','" + unit + "'),";

						///check alert for blood pressure
						///bp_alert(userid, email, firstName, lastName, systolic, diastolic, pulse, record_time);

						sql = sql.substr(0, sql.length);
					}

					var systolic = data1[total - 1].systolic;
					var diastolic = data1[total - 1].diastolic;
					var record_time = data1[total - 1].record_time;
					var pulse = data1[total - 1].pulserate;
					var notes = data1[total - 1].notes;
					var deviceStatus = data1[total - 1].deviceStatus;
					var unit = data1[total - 1].unit;

					if (unit == '' || unit === undefined) {
						unit = 'mmHg';
					}

					array_dateTime += "'" + record_time + "'";

					sql += "('" + email + "','" + systolic + "','" + diastolic + "','" + record_time + "','" + pulse + "','" + notes + "','" + deviceStatus + "','" + unit + "')";

					///check alert for blood pressure
					////bp_alert(userid, email, firstName, lastName, systolic, diastolic, pulse, record_time);

					/*********** Delete The Existing record ****************/
					sqlDelete = "DELETE FROM bp where recordTime IN  (" + array_dateTime + ")";
					/********** End Delete *********************************/


					db.bp.deleteBloodPressure(sqlDelete).then(function(response) {
						///console.log(response); 

						db.bp.addbp(sql).then(function(response) {

							///get last inserted id,s

							var lastinsertid = response;

							db.bp.lastaddIDs(lastinsertid).then(function(response) {

								data["error"] = 0;
								data["authResponse"] = "blood pressure Added Successfully";
								data["id"] = response;
								/****
								 ** Send Bp alert
								 ***********/
								//post_bp_alert(response);

								res.json(data);
							}).error(function(err) {
								res.json(err);
							});


						}).error(function(err) {
							res.json(err);

						});


					}); ///end delete



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


///////////////====================Get Details based on IDs and Post Blood pressure alert ==================================================//////////////////
function post_bp_alert(id_array) {
        console.log("post_bp_alert->id_array : ",id_array);
        if(id_array.length>0){
	id_array.forEach(function(value) {

		db.bp.getBPPostDetails(value.id).then(function(response) {

                        console.log("post_bp_alert->response : ",response);
			console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<--------------------------- Blood Pressure Alert Sending ------------------------------------ >>>>>>>>>>>>>>>>>>>>>>>>>>>');

			if (response[0].deviceid == 'iChoice' && response[0].notification == 1) {} else {
				return false;
			}

			bp_alert(response[0].userID,
				response[0].email,
				response[0].firstName,
				response[0].lastName,
				response[0].systolic,
				response[0].diastolic,
				response[0].pulse,
				response[0].recordTime,
				response[0].phone);


		}).error(function(err) {
			console.log(err);
		});



	});
     }

}

///////////////========================Alert For Blood Pressure=================================================/////////////////

function bp_alert(userid, user_email, firstName, lastName, systolic, diastolic, pulse, record_time, phone) {

	/**
	 * Sending message to mobile
	 * @type {[type]}
    */

	//const request = require('request');
	//request(`http://api.silverstreet.com/send.php?username=umch&password=tvrtrTfS&destination=` + phone + `&sender=Google&senderton=5&sendernpi=0&body=UMCH Alert: SJ Teoh Blood Pressure Reading is not in control: Blood Pressure =` + systolic + `/` + diastolic + ` mmHg & Pulse = ` + pulse + ` bpm`,
	//	function(error, response, body) {
	//		if (!error && response.statusCode == 200) {
	//			console.log(body);
	//		}
   //       });

	record_time = moment.utc(record_time).format("YYYY-MM-DD HH:mm:ss")

	////check blood pressure goal
	db.bp_goal.checkgoalbp(userid).then(function(response) {
		if (response != '' && response) {
			var systolic_from = response[0].systolic_from;
			var systolic_to = response[0].systolic_to;
			var diastolic_from = response[0].diastolic_from;
			var diastolic_to = response[0].diastolic_to;

			if (systolic > systolic_to || diastolic > diastolic_to) {
				///send email to user himself
				bp_email_alert(user_email, firstName, lastName, record_time, systolic, diastolic, pulse, systolic_to, diastolic_to, systolic_from, diastolic_from);
				///send push notifications
				sendAndroidNotification(user_email);
				///add to notification database
				add_notification_db(userid, user_email, firstName, lastName, record_time, systolic, diastolic, pulse, systolic_to, diastolic_to, systolic_from, diastolic_from);

				///get user Emails

				db.bp.getfamilyEmails(userid).then(function(response) {


					response.forEach(function(response, index) {
						///Send Emails To Next Of Kin
						bp_email_alert(response.email, firstName, lastName, record_time, systolic, diastolic, pulse, systolic_to, diastolic_to, systolic_from, diastolic_from);
						///send push notifications
						sendAndroidNotification(response.email);
						///add notification in db for next of kin
						add_notification_db_next_kin(response.email, firstName, lastName, record_time, systolic, diastolic, pulse, systolic_to, diastolic_to, systolic_from, diastolic_from);

					});

				}).error(function(err) {
					res.json(err);
				});

			}


		} else {
			///////if user dont have any goal
			var systolic_from = 1;
			var systolic_to = 140;
			var diastolic_from = 1;
			var diastolic_to = 90;

			if (systolic > systolic_to || diastolic > diastolic_to) {
				///no Next of kin found and send email to user himself
				bp_email_alert(user_email, firstName, lastName, record_time, systolic, diastolic, pulse, systolic_to, diastolic_to, systolic_from, diastolic_from);
				///send push notifications
				sendAndroidNotification(user_email);
				///add to notification database
				add_notification_db(userid, user_email, firstName, lastName, record_time, systolic, diastolic, pulse, systolic_to, diastolic_to, systolic_from, diastolic_from);

				///get user Emails of next of kin

				db.bp.getfamilyEmails(userid).then(function(response) {


					response.forEach(function(response, index) {
						///Send Emails To Next Of Kin
						bp_email_alert(response.email, firstName, lastName, record_time, systolic, diastolic, pulse, systolic_to, diastolic_to, systolic_from, diastolic_from);
						///send push notifications
						sendAndroidNotification(response.email);
						///add notification in db for next of kin
						add_notification_db_next_kin(response.email, firstName, lastName, record_time, systolic, diastolic, pulse, systolic_to, diastolic_to, systolic_from, diastolic_from);

					});

				}).error(function(err) {
					res.json(err);
				});
			}


		}

	}).error(function(err) {
		res.json(err);
	});

}
///////////////========================Email Sending Blood Pressure=================================================/////////////////
function bp_email_alert(email, firstName, lastName, record_time, systolic, diastolic, pulse, systolic_to, diastolic_to, systolic_from, diastolic_from) {


	record_time = record_time;

	////email='anwaarnuml@gmail.com'; 
	/***********************
	 **Email Notification
	 *************************/
	var smtpTransport = nodemailer.createTransport("SMTP", {
		service: "Gmail", // sets automatically host, port and connection security settings
		auth: {
			user: "chief.umch@gmail.com",
			pass: "um1328ch"
		}
	});
	smtpTransport.sendMail({ //email options
		from: "No-Reply <chief.umch@gmail.com>", // sender address.  Must be the same as authenticated user if using GMail.
		to: email, // receiver 
		subject: "Health Alert : " + firstName + " " + lastName + " has abnormal BP at " + record_time, // subject
		html: firstName + " " + lastName + " Blood Pressure Readings are not in control:<br><b>Blood Pressure </b> : " + systolic + " / " + diastolic + " mmHg (Systolic/Diastolic) <br><b>pulse : </b>" + pulse + " bpm <br><br>Recommended blood pressure range: <br><b>Systolic</b> :  &#8804; " + systolic_to + "<br><b>Diastolic</b> : &#8804; " + diastolic_to + "<br><br>Best Regards <br>UMCH Support<br><br><hr><br>This message was sent to " + email + ". If you don't want to receive these emails from UMCH in the future, please update your notification settings." // body
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

///////////////========================Add Notification to database for Next Of Kin===========================================================//////////////////////

function add_notification_db_next_kin(email, firstName, lastName, record_time, systolic, diastolic, pulse, systolic_to, diastolic_to, systolic_from, diastolic_from) {

	///8022=chief team userid
	db.user.checkByname(email).then(function(response) {
			var userids = response[0].userID;

			var sub = "Health Alert : " + firstName + " " + lastName + " has abnormal BP at " + record_time;
			var body = firstName + " " + lastName + " Blood Pressure Readings are not in control:<br><b>Blood Pressure </b> : " + systolic + " / " + diastolic + " mmHg (Systolic/Diastolic) <br><b>pulse : </b>" + pulse + " bpm <br><br>Recommended blood pressure range: <br><b>Systolic</b> :  &#8804; " + systolic_to + "<br><b>Diastolic</b> : &#8804; " + diastolic_to + "<br>";

			var sql = "INSERT INTO notification (`fromUserID`, `toUserID`, `subject`, `details`) VALUES ('8022', '" + userids + "', '" + sub + "', '" + body + "')";

			db.bp.addbp(sql).then(function(response) {

			}).error(function(err) {
				//res.json(err);
			});


		})
		.error(function(err) {
			//res.json(err);
			data['push'] = err;
		});


}

///////////////========================Add Notification to database===========================================================//////////////////////

function add_notification_db(userid, user_email, firstName, lastName, record_time, systolic, diastolic, pulse, systolic_to, diastolic_to, systolic_from, diastolic_from) {

	///8022=chief team userid

	var sub = "Health Alert : " + firstName + " " + lastName + " has abnormal BP at " + record_time;
	var body = firstName + " " + lastName + " Blood Pressure Readings are not in control:<br><b>Blood Pressure </b> : " + systolic + " / " + diastolic + " mmHg (Systolic/Diastolic) <br><b>pulse : </b>" + pulse + " bpm <br><br>Recommended blood pressure range: <br><b>Systolic</b> :  &#8804; " + systolic_to + "<br><b>Diastolic</b> : &#8804; " + diastolic_to + "<br>";

	var sql = "INSERT INTO notification (`fromUserID`, `toUserID`, `subject`, `details`) VALUES ('8022', '" + userid + "', '" + sub + "', '" + body + "')";

	db.bp.addbp(sql).then(function(response) {

	}).error(function(err) {
		//res.json(err);
	});

};



exports.testNotify = function(req, res) {
	var pushtoken = 'fgPYzzjzVq0:APA91bGYDjCOJQAaF-GHSUQsueCVuOjxkgjT93cJfDxmqSyAMtfRqXWoiFB8SB4Xk4qQMIBttYRlzmypwJ0m9xEEw4r1lpWTJM12-DSU8jMnMTNcEoduwSRJwl6QXMNHKrCOT8WdPT0o';

				if (pushtoken != '' && pushtoken != null) {

					var subject = 'M2' + ' ' + 'Testgg' + " Blood Pressure Readings are not in control";

					var serverKey = 'AAAAz_fpkI4:APA91bFgvOvgp7Y4VxluMofV_UDSLVl_4a4kgP-cPCnAY1i7L_tckclMOtD67GjJWgIJ6lZ_42EWTAD20p-BjeGc_HrNSEj3stmUEcxoISF2NNbSwiboQywtwKnmmyhRh0_jqrGfjJzW';
					var fcm = new FCM(serverKey);

					var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
						to: pushtoken,
						//// collapse_key: 'your_collapse_key',
						priority: 'high',
						data: {
							title: subject,
							/// body: "<a href='http://58.26.233.115/IDAS/portal/read-notification.php?nid=" + lastid + "'>" + subject + "</a>"
						}
					};

					fcm.send(message, function(err, response) {
						if (err) {
							console.log(err);
							console.log("Something has gone wrong------------------------------------------------------------------FCM------------------------------!" + pushtoken);
						} else {
							console.log("FCM-----------------------Successfully sent with response: " + pushtoken + '----------------', response);
						}
					});

				}

			
};

///////////////========================Push Notification For Abnormal Blood Pressure=================================================/////////////////
function sendAndroidNotification(email) {
 console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Sending Notification To Android <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
	var data = {
		"error": 0,
		"authResponse": "",
		"push": ""
	}


	db.notificationDevices.getdevicebyuseremail(email).then(function(response) {
			if (response != '' && response != null) {

				data["error"] = 0;
				data["authResponse"] = "Action Successful";
				data['Data'] = response[0].deviceID;
				var pushtoken = response[0].deviceID;

				if (pushtoken != '' && pushtoken != null) {

					var subject = response[0].firstName + ' ' + response[0].lastName + " Blood Pressure Readings are not in control";

					var serverKey = 'AAAAz_fpkI4:APA91bFgvOvgp7Y4VxluMofV_UDSLVl_4a4kgP-cPCnAY1i7L_tckclMOtD67GjJWgIJ6lZ_42EWTAD20p-BjeGc_HrNSEj3stmUEcxoISF2NNbSwiboQywtwKnmmyhRh0_jqrGfjJzW';
					var fcm = new FCM(serverKey);

					var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
						to: pushtoken,
						//// collapse_key: 'your_collapse_key',
						priority: 'high',
						data: {
							title: subject,
							/// body: "<a href='http://58.26.233.115/IDAS/portal/read-notification.php?nid=" + lastid + "'>" + subject + "</a>"
						}
					};

					fcm.send(message, function(err, response) {
						if (err) {
							console.log("Something has gone wrong------------------------------------------------------------------FCM------------------------------!" + pushtoken);
						} else {
							console.log("FCM-----------------------Successfully sent with response: " + pushtoken + '----------------', response);
						}
					});

				}

			} else {

				data['push'] = 'No Registered For Push Notification';
				console.log(data);
			}

		})
		.error(function(err) {
			//res.json(err);
			data['push'] = err;
		});


	console.log(data);
}





///////////////========================Get bp  Data=================================================/////////////////

exports.getbloodpressure = function(req, res) {
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
					db.bp.getbp(userid).then(function(response) {
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


///////////==========================Update bp Data==========================================////////////////////////
exports.updatebloodpressure = function(req, res) {

	var userid = req.body.userid;
	var token = req.body.token;
	var data1 = req.body.data;
	var data = {
		"error": 0,
		"authResponse": ""
	}


	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					var email = response[0].email;

					// data1=JSON.parse(data1);
					data1 = JSON.parse(data1);
					var total = data1.length;


					for (var i = 0; i < total - 1; i++) {
						var systolic = data1[i].systolic;
						var diastolic = data1[i].diastolic;
						var record_time = data1[i].record_time;
						var pulse = data1[i].pulse;
						var notes = data1[i].notes;
						var id = data1[i].bpID;
						var sql = "UPDATE bp SET systolic='" + systolic + "',diastolic='" + diastolic + "',recordTime='" + record_time + "',pulse='" + pulse + "',notes='" + notes + "' WHERE bpID='" + id + "'; ";

						db.bp.updatebp(sql).then(function(response) {}).error(function(err) {
							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}

					var systolic = data1[total - 1].systolic;
					var diastolic = data1[total - 1].diastolic;
					var record_time = data1[total - 1].record_time;
					var pulse = data1[total - 1].pulse;
					var notes = data1[total - 1].notes;
					var id = data1[total - 1].bpID;
					//sql += "('" + email + "','" + systolic + "','" + diastolic + "','" + record_time + "','" + pulse + "','" + notes + "')";
					var sql = "UPDATE bp SET systolic='" + systolic + "',diastolic='" + diastolic + "',recordTime='" + record_time + "',pulse='" + pulse + "',notes='" + notes + "' WHERE bpID='" + id + "'; ";

					db.bp.updatebp(sql).then(function(response) {}).error(function(err) {
						res.json(err);
					});


					data["error"] = 0;
					data["authResponse"] = "blood pressure Updated Successfully";
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


////////===============================DELETE bp data=====================================//////////////////////////
exports.deletebloodpressure = function(req, res) {



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


						var sql = "UPDATE bp SET isdeleted='1'  WHERE bpID='" + id + "' ;";

						db.bp.deletebp(sql).then(function(response) {}).error(function(err) {
							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}

					var id = data1[total - 1].id;


					var sql = "UPDATE bp SET isdeleted='1'  WHERE bpID='" + id + "' ; ";

					db.bp.deletebp(sql).then(function(response) {}).error(function(err) {
						res.json(err);
					});


					data["error"] = 0;
					data["authResponse"] = "Blood Pressure Deleted Successfully";
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
