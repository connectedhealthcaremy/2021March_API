'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');
var nodemailer = require("nodemailer");
var moment = require('moment');

/******
 ** User Professional    
 *******/
//============================================Get user 2registration request============================================/////////////////
exports.getregiterrequest = function(req, res) {

	var token = req.query.token;
	var pid = req.query.pid;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var userid = response[0].userID;

			if (!!userid && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getregistrationReq(pid).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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

//============================================Get user 2registration request============================================/////////////////
exports.previewdoctorreport = function(req, res) {

	var token = req.query.token;
	var id = req.query.id;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var userid = response[0].userID;

			if (!!userid && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.previewdoctorreport(id).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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

//============================================Get tele consultation report request============================================/////////////////
exports.previewTeleConsultation = function(req, res) {

	var token = req.query.token;
	var id = req.query.id;

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var userid = response[0].userID;

			if (!!userid && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.previewTeleConsultation(id).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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


//============================================Get user 2registration request============================================/////////////////
exports.getrejectedrequest = function(req, res) {

	var token = req.query.token;
	var pid = req.query.pid;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var userid = response[0].userID;

			if (!!userid && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getrejectedReq(pid).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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


//============================================Get Count user registration request============================================/////////////////
exports.getcountregister = function(req, res) {

	var token = req.query.token;
	var pid = req.query.pid;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var userid = response[0].userID;

			if (!!userid && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getCountregistrationReq(pid).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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
exports.getglobalsettings = function(req,res) {

   var token = req.query.token;
   var pid = req.query.pid;
   var data = {
		"error": 0,
		"authResponse": ""
	}


   db.user.authUser(token).then(function(response) {

			var userid = response[0].userID;

			if (!!userid && !!token) {
                                db.userProfessionalRegistration.getglobalsettings("").then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

					}).error(function(err) {
						res.json(err);
					});
                               
				/*if (response != '' && response != null) {
                                       var sql = "";
                                       console.log(sql);
					

				} else {
					data["error"] = 1;
					data["authResponse"] = "Authentication Failed.";
					res.json(data);
				}*/
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

//============================================Get Count user Diabetes request============================================/////////////////
exports.getcountDiabetesUser = function(req, res) {

	var token = req.query.token;
	var pid = req.query.pid;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var userid = response[0].userID;

			if (!!userid && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getCountDiabetesReq(pid).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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

//============================================Get Count user Hypertension request============================================/////////////////
exports.getcountHypertensionUser = function(req, res) {

	var token = req.query.token;
	var pid = req.query.pid;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var userid = response[0].userID;

			if (!!userid && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getCountHypertensionReq(pid).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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

//============================================Get Count user Diabetes & Hypertension request============================================/////////////////
exports.getcountBothUser = function(req, res) {

	var token = req.query.token;
	var pid = req.query.pid;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var userid = response[0].userID;

			if (!!userid && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getCountBothReq(pid).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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

///========================================================Accept Request By Doctor===========================================================/////////////////

exports.acceptRequest = function(req, res) {

	var id = req.body.id;
	var token = req.body.token;
	var from = req.body.from;
	var to = req.body.to;
	var data = {
		"error": 0,
		"authResponse": ""
	}



	db.user.authUser(token).then(function(response) {
			if (!!id && !!token) {
				if (response != '' && response != null) {

					var firstName = response[0].firstName;
					var lastName = response[0].lastName;

					var doctorName = firstName + ' ' + lastName;

					if (!!from && !!to) {

						var sql1 = "INSERT INTO notification (`fromUserID`, `toUserID`, `subject`, `details`) values ";
						sql1 += "('" + from + "','" + to + "','Request Approved','Congratulations,Your Registration Confirmed.')";

						notification_sent(sql1);

						var body = 'Congratulations,Your Registration Confirmed by ' + doctorName;
						email_notification(to, body);

					}

					////////create measurement plan user
					measurement_plan_setup(to); 

					var email = response;

					var sql = "UPDATE userProfessionalRegistration SET status='2' WHERE id='" + id + "'";


					db.userProfessionalRegistration.acceptRequest(sql).then(function(response) {
						data["error"] = 0;
						data["authResponse"] = "Request Succesfully Accepted";
						data['id'] = response;
						res.json(data);
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

///========================================================Accept Request By Corporate Manager===========================================================/////////////////

exports.acceptRequestCorporate = function(req, res) {

	var id = req.body.id;
	var token = req.body.token;
	var from = req.body.from;
	var to = req.body.to;
	var data = {
		"error": 0,
		"authResponse": ""
	}



	db.user.authUser(token).then(function(response) {
			if (!!id && !!token) {
				if (response != '' && response != null) {

					var firstName = response[0].firstName;
					var lastName = response[0].lastName;

					var doctorName = firstName + ' ' + lastName;
                   
					if (!!from && !!to) {

						var sql1 = "INSERT INTO notification (`fromUserID`, `toUserID`, `subject`, `details`) values ";
                        sql1 += "('" + from + "','" + to + "','Request Approved','Congratulations! Your registration is confirmed for health monitoring by '" + doctorName+"' !.')";

						notification_sent(sql1);

						var body = `Hi<br><br>Congratulations! Your registration is confirmed!<br><br>
						            You’ve successfully completed registration for health monitoring application.
						             `;
						email_notification_corporate(to, body); 

					}

					////////create measurement plan user
					measurement_plan_setup(to); 

					var email = response;

					var sql = "UPDATE userProfessionalRegistration SET status='2' WHERE id='" + id + "'";


					db.userProfessionalRegistration.acceptRequest(sql).then(function(response) {
						data["error"] = 0;
						data["authResponse"] = "Request Succesfully Accepted";
						data['id'] = response;
						res.json(data);
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

///========================================================Automatic Measurement Plan setup By Doctor===================================================/////////////////
function measurement_plan_setup(user_id) {

	var currentDate = moment().format('YYYY-MM-DD');
	var futureMonth = moment(currentDate).add(12, 'M');
	var futureMonthEnd = moment(futureMonth).endOf('month');

	var start_date=currentDate; 
	var end_date=futureMonth.format('YYYY-MM-DD');

	var arr_days='monday,tuesday,wednesday,thrusday,friday,saturday,sunday';


	if (!!user_id) {

		//db.userProfessionalRegistration.user_illness_status_check(user_id).then(function(response) { 

			
				var values = "VALUES ('" + user_id + "' ,'1', '1', '1', '0', '1', '0', '1', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '" + start_date + "', '" + end_date + "', '" + arr_days + "', '1', '0', '" + start_date + "', '" + end_date + "', '" + arr_days + "', '0', '0', '0', '0', '0', '0')";
				var sql = "INSERT INTO userillnessMeasurements (userID, diet_only_breakfast_pre, diet_only_breakfast_post, diet_only_lunch_pre, diet_only_lunch_post, diet_only_dinner_pre, diet_only_dinner_post, oad_breakfast_pre, oad_breakfast_post, oad_lunch_pre, oad_lunch_post, oad_dinner_pre, oad_dinner_post,insulin_breakfast_pre, insulin_breakfast_post, insulin_lunch_pre, insulin_lunch_post, insulin_dinner_pre, insulin_dinner_post, from_diabetes, to_diabetes, diabetes_day_measurement, not_controlled_treatment, well_controlled, from_hypertension, to_hypertension, hypertension_day_measurement, diet_only_fasting, oad_fasting, insulin_fasting, diet_only_pre_bed, oad_pre_bed, insulin_pre_bed ) " + values + "";

 
				db.userProfessionalRegistration.measurement_plan_setup_user(sql).then(function(response) {}).error(function(err) {
					res.json(err);
				});

			

		///});

	}

}


///========================================================reject Request By Doctor===========================================================/////////////////

exports.rejectRequest = function(req, res) {

	var id = req.body.id;
	var token = req.body.token;
	var from = req.body.from;
	var to = req.body.to;

	var data = {
		"error": 0,
		"authResponse": ""
	}



	db.user.authUser(token).then(function(response) {
			if (!!id && !!token) {
				if (response != '' && response != null) {

					var firstName = response[0].firstName;
					var lastName = response[0].lastName;

					var doctorName = firstName + ' ' + lastName;

					if (!!from && !!to) {

						var sql1 = "INSERT INTO notification (`fromUserID`, `toUserID`, `subject`, `details`) values ";
						sql1 += "('" + from + "','" + to + "','Request rejected','Your Registration Rejected.')";
						notification_sent(sql1);
						var body = 'Your Registration Rejected by ' + doctorName;
						email_notification(to, body);


					}

					var email = response;

					var sql = "UPDATE userProfessionalRegistration SET status='3' WHERE id='" + id + "'";


					db.userProfessionalRegistration.acceptRequest(sql).then(function(response) {
						data["error"] = 0;
						data["authResponse"] = "Request Succesfully Rejected";
						data['id'] = response;
						res.json(data);
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

/////=====================================================Notification by email==========================================================///////////////////

function email_notification(to, body) {

	var email = '';
	db.user.checkByuserid(to).then(function(response) {
		email = response[0].email;
               

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
			subject: body, // subject
			html: body + "<br><br>Best Regards <br>UMCH Support<br><br><hr><br>This message was sent to " + email + ". If you don't want to receive these emails from UMCH in the future, please update your notification settings." // body
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


	}).error(function(err) {
		res.json(err);
	});



}


function email_notification_corporate(to, body) {

	var email = '';
	db.user.checkByuserid(to).then(function(response) {
		email = response[0].email;


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
			subject: 'Congratulations! Your registration is confirmed', // subject
			html: body + "<br><br>Best Regards <br>UMCH Support<br><br><hr><br>This message was sent to " + email + ". If you don't want to receive these emails from UMCH in the future, please update your notification settings." // body
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


	}).error(function(err) {
		res.json(err);
	});



}

///========================================================Remove User Registration===========================================================/////////////////

exports.removeRegistration = function(req, res) {

	var id = req.body.id;
	var token = req.body.token;
	var data = {
		"error": 0,
		"authResponse": ""
	}



	db.user.authUser(token).then(function(response) {
			if (!!id && !!token) {
				if (response != '' && response != null) {


					var email = response;

					var sql = "DELETE FROM userProfessionalRegistration WHERE id='" + id + "'";


					db.userProfessionalRegistration.removeRegistraion(sql).then(function(response) {
						data["error"] = 0;
						data["authResponse"] = "User Registration Removed. ";
						res.json(data);
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

//============================================Send notification===========================================/////////////////

function notification_sent(sql) {



	db.notification.addnotification(sql).then(function(response) {

		var lastid = response;
		/***************
		 **notification to mobile devices
		 ******************/

		///var resf = sendAndroidNotification(userid, name, subject, lastid);
		console.log('Noty sent');

	}).error(function(err) {
		console.log(err);
	});


}


//============================================Get All Patients============================================/////////////////
exports.getregiterrequestPatients = function(req, res) {

	var token = req.query.token;
	var pid = req.query.pid;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var userid = response[0].userID;

			if (!!userid && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getallpatients(pid).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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

//============================================Get Diabetes Patients============================================/////////////////
exports.getdiabetsePatients = function(req, res) {

	var token = req.query.token;
	var pid = req.query.pid;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var userid = response[0].userID;

			if (!!userid && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getdiabetesepatients(pid).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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

//============================================Get hypertension Patients============================================/////////////////
exports.gethypertensionPatients = function(req, res) {

	var token = req.query.token;
    var pid = req.query.pid;

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var userid = response[0].userID;

			if (!!userid && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.gethypertensionpatients(pid).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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

//============================================Get Diabetese And Hypertension Patients============================================/////////////////
exports.getdiabetseandhypertensionPatients = function(req, res) {

	var token = req.query.token;
	var pid = req.query.pid;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var userid = response[0].userID;

			if (!!userid && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.gethmpatients(pid).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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

/****************
 **Payment Pakages
 ****************/

//============================================Get All Pakages============================================/////////////////
exports.getPakages = function(req, res) {

	var token = req.query.token;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var userid = response[0].userID;

			if (!!userid && !!token) {
				if (response != '' && response != null) {

					db.pakages.getpakages().then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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


///========================================================Accept Request By Doctor===========================================================/////////////////

exports.addpakage = function(req, res) {

	var pakage_id = req.body.pakage_id;
	var userid = req.body.userid;
	var token = req.body.token;

	var data = {
		"error": 0,
		"authResponse": ""
	}



	db.user.authUser(token).then(function(response) {
			if (!!pakage_id && !!userid && !!token) {
				if (response != '' && response != null) {
					var email = response;

					////Check Pakages
					db.pakages.checkCurrentPakage(userid, pakage_id).then(function(response) {

							if (response == '') {
								var sql = "INSERT INTO pakageDoctor (professionalID, pakageID) VALUES (" + userid + ", " + pakage_id + ")";


								db.pakages.acceptpakage(sql).then(function(response) {
									data["error"] = 0;
									data["authResponse"] = "Pakage Added Successfully To Your Account";
									res.json(data);
								}).error(function(err) {
									res.json(err);
								});
							} else {
								data["error"] = 1;
								data["authResponse"] = "You Already Subscribed This Pakage.";
								res.json(data);

							}

						})
						.error(function(err) {
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

//============================================Get All Pakages============================================/////////////////
exports.getdoctorpakages = function(req, res) {
	var userid = req.query.userid;
	var token = req.query.token;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			//var userid=response[0].userID;

			if (!!userid && !!token) {
				if (response != '' && response != null) {

					db.pakages.getdoctorpakages(userid).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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


///========================================================Delete Doctor Pakage===========================================================/////////////////

exports.deletedoctorpakage = function(req, res) {
	var id = req.body.pakage_id;
	var token = req.body.token;

	var data = {
		"error": 0,
		"authResponse": ""
	}



	db.user.authUser(token).then(function(response) {
			if (!!id && !!token) {
				if (response != '' && response != null) {
					var email = response;
					db.pakages.deleteDoctorPakage(id).then(function(response) {
						data["error"] = 0;
						data["authResponse"] = "Pakage Deleted Successfully";
						data['id'] = response;
						res.json(data);
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

/**********************
 ***Get Diabetse Detail patients
 ***********************/

//============================================Get Diabetes Diet Control Patients============================================/////////////////
exports.getDiabetesPatientDietControl = function(req, res) {
	var token = req.query.token;
	var pid = req.query.pid;
	var dh = req.query.dh;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var userid = response[0].userID;

			if (!!userid && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getdiabetesDietControl(pid, dh).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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

//============================================Get Diabetes Diet Control Detail Patients============================================/////////////////
exports.getDiabetesDietControlDetail = function(req, res) {
	var token = req.query.token;
	var userid = req.query.userid;
	var data = {
		"error": 0,
		"authResponse": "",
		"Data": "",
		"userDetail": ""
	}

	db.user.authUser(token).then(function(response) {

			//var userid=response[0].userID;

			if (!!userid && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getdiabetesDietControlDetails(userid).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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

//============================================Get Diabetes OAD Patients============================================/////////////////
exports.getdiabetesPateintsOAD = function(req, res) {

	var token = req.query.token;
	var pid = req.query.pid;
	var dh = req.query.dh;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var userid = response[0].userID;

			if (!!userid && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getdiabetesOAD(pid, dh).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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

//============================================Get Diabetes OAD Detail Patients============================================/////////////////
exports.getDiabetesOADDetail = function(req, res) {
	var token = req.query.token;
	var userid = req.query.userid;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			//var userid=response[0].userID;

			if (!!userid && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getdiabetesOADDetails(userid).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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


//============================================Get Diabetes Insulin Patients============================================/////////////////
exports.getdiabestPatientsInsulin = function(req, res) {

	var token = req.query.token;
	var pid = req.query.pid;
	var dh = req.query.dh;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var userid = response[0].userID;

			if (!!userid && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getdiabetesInsulin(pid, dh).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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

//============================================Get Diabetes Insulin Detail Patients============================================/////////////////
exports.getDiabetesInsulinDetail = function(req, res) {
	var token = req.query.token;
	var userid = req.query.userid;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			//var userid=response[0].userID;

			if (!!userid && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getDiabetesInsulinDetail(userid).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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

/**************************
 **Hypertension Details
 ****************************/


//============================================Get Hypertension not controlled Patients============================================/////////////////
exports.getHypertensionNotControlled = function(req, res) {

	var token = req.query.token;
	var pid = req.query.pid;
	var dh = req.query.dh;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var userid = response[0].userID;

			if (!!userid && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.gethypertensionpatientsNotControlled(pid, dh).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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

//============================================Get Hypertension Systolic not controlled Detail Patients============================================/////////////////
exports.getHypertensionNotControlledDetailPateintsSystolic = function(req, res) {

	var token = req.query.token;
	var pid = req.query.pid;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			var userid = response[0].userID;
			var email = response[0].email;
                        var username = response[0].username;
			if (!!userid && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.gethypertensionpatientsNotControlledDetailSystolic(username).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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

//============================================Get Hypertension Diastolic not controlled Detail Patients============================================/////////////////
exports.GetHypertensionNotControlledDetailDiastolic = function(req, res) {

	var token = req.query.token;
	var pid = req.query.pid;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			var userid = response[0].userID;
			var email = response[0].email;
                        var username = response[0].username;
			if (!!userid && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.gethypertensionpatientsDetailDiastolic(username).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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

//============================================Get Hypertension Well controlled Patients============================================/////////////////
exports.getHypertensionwellcontrolled = function(req, res) {

	var token = req.query.token;
	var pid = req.query.pid;
	var dh = req.query.dh;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var userid = response[0].userID;

			if (!!userid && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.gethypertensionpatientsWellControlled(pid, dh).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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


//============================================Get Hypertension Well controlled Morning Details Patients============================================/////////////////
exports.getHypertensionwellcontrolledDetailsMorning = function(req, res) {

	var token = req.query.token;

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var email = response[0].email;
                        var username = response[0].username;
			if (!!email && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.gethypertensionpatientsWellControlledMorningDetails(username).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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

//============================================Get Hypertension Well controlled Evening Details Patients============================================/////////////////
exports.getHypertensionwellcontrolledDetailsEvening = function(req, res) {

	var token = req.query.token;

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var email = response[0].email;
                          var username = response[0].username;
			if (!!email && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.gethypertensionpatientsWellControlledEveningDetails(username).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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


//============================================Get Appointments Details Patients============================================/////////////////
exports.getAppointmentsDetasils = function(req, res) {

	var token = req.query.token;

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var email = response[0].email;
                        
			var userid = response[0].userID;
			if (!!email && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getappointmentdate(userid).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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


//============================================Get Medicine Lists for Patients============================================/////////////////
exports.getMedicineListDetasils = function(req, res) {
	var pid = req.query.pid;
	var token = req.query.token;

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var email = response[0].email;
			var userid = response[0].userID;
			if (!!email && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getpatientmedicine(pid).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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

//============================================Get Medicine Status for Patients============================================/////////////////
exports.getMedicineDetasilsStatus = function(req, res) {
	var pid = req.query.pid;
	var token = req.query.token;
	var mid = req.query.mid;

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var email = response[0].email;
			var userid = response[0].userID;
			if (!!email && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getpatientmedicienStatus(mid, pid).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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

///========================================================Save Control Settings By Doctor===========================================================/////////////////

exports.saveUserIllnessControl = function(req, res) {

	var id = req.body.id;
        var professionalId = req.body.professionalid;
	var token = req.body.token;
	var diabetes_pre_control_from = req.body.diabetes_pre_control_from;
	var diabetes_pre_control_to = req.body.diabetes_pre_control_to;
	var diabetes_post_control_from = req.body.diabetes_post_control_from;
	var diabetes_post_control_to = req.body.diabetes_post_control_to;
	var SBP = req.body.SBP;
	var DBP = req.body.DBP;
	var bp_id = req.body.bp_id;
	var glucose_id = req.body.glucose_id;

	var diet_only_fasting = req.body.diet_only_fasting;
	var oad_fasting = req.body.oad_fasting;
	var insulin_fasting = req.body.insulin_fasting;
	var diet_only_pre_bed = req.body.diet_only_pre_bed;
	var oad_pre_bed = req.body.oad_pre_bed;
	var insulin_pre_bed = req.body.insulin_pre_bed;

	var diet_only_breakfast_pre = req.body.diet_only_breakfast_pre;
	var diet_only_breakfast_post = req.body.diet_only_breakfast_post;
	var diet_only_lunch_pre = req.body.diet_only_lunch_pre;
	var diet_only_lunch_post = req.body.diet_only_lunch_post;
	var diet_only_dinner_pre = req.body.diet_only_dinner_pre;
	var diet_only_dinner_post = req.body.diet_only_dinner_post;
	var oad_breakfast_pre = req.body.oad_breakfast_pre;
	var oad_breakfast_post = req.body.oad_breakfast_post;
	var oad_lunch_pre = req.body.oad_lunch_pre;
	var oad_lunch_post = req.body.oad_lunch_post;
	var oad_dinner_pre = req.body.oad_dinner_pre;
	var oad_dinner_post = req.body.oad_dinner_post;
	var insulin_breakfast_pre = req.body.insulin_breakfast_pre;
	var insulin_breakfast_post = req.body.insulin_breakfast_post;
	var insulin_lunch_pre = req.body.insulin_lunch_pre;
	var insulin_lunch_post = req.body.insulin_lunch_post;
	var insulin_dinner_pre = req.body.insulin_dinner_pre;
	var insulin_dinner_post = req.body.insulin_dinner_post;
	var from_diabetes = req.body.from_diabetes;
	var to_diabetes = req.body.to_diabetes;
	var arrdiabetes = req.body.diabetes_day_measurement;
	var not_controlled_treatment = req.body.not_controlled_treatment;
	var well_controlled = req.body.well_controlled;
	var from_hypertension = req.body.from_hypertension;
	var to_hypertension = req.body.to_hypertension;
	var arrhypertension = req.body.hypertension_day_measurement;

	var disease_select = req.body.disease_select;
	var dietControl = req.body.dietControl;
	var oralAntidiabetics = req.body.oralAntidiabetics;
	var insulin = req.body.insulin;
	var notControlledTreatment = req.body.notControlledTreatment;
	var wellControlled = req.body.wellControlled;

	var data = {
		"error": 0,
		"authResponse": ""
	}


 
	db.user.authUser(token).then(function(response) {
			if (!!id && !!token) {
				if (response != '' && response != null) {


                                        console.log("disease_select "+disease_select);
					var email = response;
					/************************
					 **For Blood Pressure
					 ***************************/
					if (!!bp_id) { ///update bp vlaues
                                           if(disease_select != 0 && (disease_select==3 || disease_select == 2)) {
						var updatesqlillness = "UPDATE  bp_goal SET systolic_to='" + SBP + "', diastolic_to='" + DBP + "' WHERE userID='" + id + "'";

						db.userProfessionalRegistration.updatesaveuserillnesscontrol(updatesqlillness).then(function(response) {}).error(function(err) {
							res.json(err);
						});
                                              }

					} else {
                                             if(disease_select!= 0 && (disease_select==3 || disease_select == 2)) {
						var updatesqlillness = "INSERT INTO bp_goal (`userID`, `systolic_to`, `diastolic_to`) VALUES ('" + id + "', '" + SBP + "','" + DBP + "' )";

						db.userProfessionalRegistration.updatesaveuserillnesscontrol(updatesqlillness).then(function(response) {}).error(function(err) {
							res.json(err);
						});
                                             }

					}

					/***************
					 **for blood glucose
					 ***************/
					if (!!glucose_id) { ///update bg vlaues
                                   
                                         if(disease_select!== '0' && (disease_select==='3' || disease_select==='1')) {
						var updatesqlillness = "UPDATE  glucose_goal SET goalBloodGlucose_Start_BM='" + diabetes_pre_control_from + "', goalBloodGlucose_End_BM='" + diabetes_pre_control_to + "',goalBloodGlucose_Start_AM='" + diabetes_post_control_from + "', goalBloodGlucose_End_AM='" + diabetes_post_control_to + "' WHERE userID='" + id + "'";

						db.userProfessionalRegistration.updatesaveuserillnesscontrol(updatesqlillness).then(function(response) {}).error(function(err) {
							res.json(err);
						});
                                       }

					} else {
                                        if(disease_select!== '0' && (disease_select==='3' || disease_select==='1')) {

						var updatesqlillness = "INSERT INTO glucose_goal (`userID`, `goalBloodGlucose_Start_BM`, `goalBloodGlucose_End_BM`, `goalBloodGlucose_Start_AM`, `goalBloodGlucose_End_AM`) VALUES ('" + id + "', '" + diabetes_pre_control_from + "','" + diabetes_pre_control_to + "','" + diabetes_post_control_from + "','" + diabetes_post_control_to + "' )";

						db.userProfessionalRegistration.updatesaveuserillnesscontrol(updatesqlillness).then(function(response) {}).error(function(err) {
							res.json(err);
						});
}

					}

					/************
					 **update disease of user
					 ***************/
					var updatesqlillness = "DELETE FROM userillness WHERE userID='" + id + "'";

					db.userProfessionalRegistration.updatesaveuserillnesscontrol(updatesqlillness).then(function(response) {
						/////insert new control
						var sqlinsert = "INSERT INTO userillness (`userID`, `disease`, `dietControl`, `oralAntidiabetics`,`insulin`, `notControlledTreatment`, `wellControlled` ) VALUES ('" + id + "' ,'" + disease_select + "', '" + dietControl + "', '" + oralAntidiabetics + "', '" + insulin + "', '" + notControlledTreatment + "', '" + wellControlled + "')";

						db.userProfessionalRegistration.saveuserillnesscontrol(sqlinsert).then(function(response) {

						}).error(function(err) {
							res.json(err);
						});

					}).error(function(err) {
						res.json(err);
					});



					////to keep recored of previous control
					var updatesql = "UPDATE userillnessTargetControl SET isdeleted='1' WHERE userID='" + id + "'";

					db.userProfessionalRegistration.updatesaveuserillnesscontrol(updatesql).then(function(response) {
						/////insert new control
						var sql = "INSERT INTO userillnessTargetControl (userID, diabetesPremealFrom, diabetesPremealTo, diabetesPostmealFrom, diabetesPostmealTo, SBP, DBP) VALUES ('" + id + "' ,'" + diabetes_pre_control_from + "', '" + diabetes_pre_control_to + "', '" + diabetes_post_control_from + "', '" + diabetes_post_control_to + "', '" + SBP + "', '" + DBP + "')";

						db.userProfessionalRegistration.saveuserillnesscontrol(sql).then(function(response) {

							////to keep recored of previous user measurements
							var updatesql = "UPDATE userillnessMeasurements SET isdeleted='1' WHERE userID='" + id + "'";

							db.userProfessionalRegistration.updatesaveuserillnesscontrol(updatesql).then(function(response) {

								/////insert new measurements
								var values = "VALUES ('" + id + "' ,'" + diet_only_breakfast_pre + "', '" + diet_only_breakfast_post + "', '" + diet_only_lunch_pre + "', '" + diet_only_lunch_post + "', '" + diet_only_dinner_pre + "', '" + diet_only_dinner_post + "', '" + oad_breakfast_pre + "', '" + oad_breakfast_post + "', '" + oad_lunch_pre + "', '" + oad_lunch_post + "', '" + oad_dinner_pre + "', '" + oad_dinner_post + "', '" + insulin_breakfast_pre + "', '" + insulin_breakfast_post + "', '" + insulin_lunch_pre + "', '" + insulin_lunch_post + "', '" + insulin_dinner_pre + "', '" + insulin_dinner_post + "', '" + from_diabetes + "', '" + to_diabetes + "', '" + arrdiabetes + "', '" + not_controlled_treatment + "', '" + well_controlled + "', '" + from_hypertension + "', '" + to_hypertension + "', '" + arrhypertension + "', '" + diet_only_fasting + "', '" + oad_fasting + "', '" + insulin_fasting + "', '" + diet_only_pre_bed + "', '" + oad_pre_bed + "', '" + insulin_pre_bed + "')";
								var sql = "INSERT INTO userillnessMeasurements (userID, diet_only_breakfast_pre, diet_only_breakfast_post, diet_only_lunch_pre, diet_only_lunch_post, diet_only_dinner_pre, diet_only_dinner_post, oad_breakfast_pre, oad_breakfast_post, oad_lunch_pre, oad_lunch_post, oad_dinner_pre, oad_dinner_post,insulin_breakfast_pre, insulin_breakfast_post, insulin_lunch_pre, insulin_lunch_post, insulin_dinner_pre, insulin_dinner_post, from_diabetes, to_diabetes, diabetes_day_measurement, not_controlled_treatment, well_controlled, from_hypertension, to_hypertension, hypertension_day_measurement, diet_only_fasting, oad_fasting, insulin_fasting, diet_only_pre_bed, oad_pre_bed, insulin_pre_bed ) " + values + "";

								db.userProfessionalRegistration.saveuserillnesscontrol(sql).then(function(response) {

									data["error"] = 0;
									data["authResponse"] = "Changes Saved Successfully";
									data['id'] = response;
									res.json(data);
                console.log("professionalId:"+professionalId+"id:"+id);
                                                                        
                if (!!professionalId && !!id) {

						var sql1 = "INSERT INTO notification (`fromUserID`, `toUserID`, `subject`, `details`) values ";
                        sql1 += "('" + professionalId + "','" + id + "','Care Plan','Your Care Plan(Target Control & Measurement Settings) is updated by the doctor.')";
                        console.log(sql1);
						notification_sent(sql1);

		}



								}).error(function(err) {
									res.json(err);
								});

							}).error(function(err) {
								res.json(err);
							});


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

//============================================Get Measurement Control for Patients============================================/////////////////
exports.getmeasurementcontrol = function(req, res) {
	var pid = req.query.pid;
	var token = req.query.token;

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var email = response[0].email;
			var userid = response[0].userID;
			if (!!email && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getmeasurementcontrol(pid).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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

//============================================Get Measurement Settings for Patients============================================/////////////////
exports.getmeasurementsettings = function(req, res) {
	var pid = req.query.pid;
	var token = req.query.token;


	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var email = response[0].email;
			var userid = response[0].userID;
			if (!!email && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getmeasurementsettings(pid).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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

//============================================Get illness of Patients============================================/////////////////
exports.getuserillnesscheck = function(req, res) {
	var pid = req.query.pid;
	var token = req.query.token;


	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var email = response[0].email;
			var userid = response[0].userID;
			if (!!email && !!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getuserillnesscheck(pid).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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


///========================================================Display care plan By Doctor===========================================================/////////////////

exports.careplansetting = function(req, res) {

	var id = req.body.userid;
	var token = req.body.token;
	var viewOrder = req.body.viewOrder;
	var viewStatus = req.body.viewStatus;

	var data = {
		"error": 0,
		"authResponse": ""
	}



	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {
					var email = response;

					////add order
					var updatesqlillness = "DELETE FROM carePlanSettings WHERE professionalID='" + id + "'";

					db.userProfessionalRegistration.updatesaveuserillnesscontrol(updatesqlillness).then(function(response) {
						/////insert new control
						var sqlinsert = "INSERT INTO carePlanSettings (`professionalID`, `viewOrder`, `viewStatus`) VALUES ('" + id + "' ,'" + viewOrder + "', '" + viewStatus + "')";

						db.userProfessionalRegistration.saveuserillnesscontrol(sqlinsert).then(function(response) {

							data["error"] = 0;
							data["authResponse"] = "Care Plan Display Order Saved Successfully.";
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

//============================================Get illness of Patients============================================/////////////////
exports.getcareplandisplay = function(req, res) {
	var userid = req.query.userid;
	var token = req.query.token;


	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var email = response[0].email;

			if (!!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getcareplansettings(userid).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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

//============================================get careplan SMBG============================================/////////////////
exports.getcareplanSMBG = function(req, res) {
	var userid = req.query.userid;
	var token = req.query.token;
	var date = req.query.date;

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var email = response[0].email;
                        var username = response[0].username;
			if (!!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getcareplanSMBG(username, date).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data["c_date"] = date;
						data['Data'] = response;
						res.json(data);

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

///========================================================Add Care Plan Reviews By Doctor===========================================================/////////////////

exports.careplanReview = function(req, res) {
	var userID = req.body.userid;
	var token = req.body.token;
	var professionalID = req.body.professionalID;
	var comment = req.body.comment;
	var SMBGVal = req.body.SMBGVal;
	var SMBPVal = req.body.SMBPVal;
	var commentSMBG= req.body.commentSMBG;
	var commentSMBP= req.body.commentSMBP;
	var reviewedDate = req.body.current_date;
	var review_report = req.body.pdf_name;
	var recordDateTime=req.body.recordDateTime;

	var data = {
		"error": 0,
		"authResponse": ""
	}



	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					/******************
					 **NOTIFICATION TO USER  
					 *****************/
					email_web_notification(professionalID, userID, SMBGVal, SMBPVal , commentSMBG , commentSMBP);
					/****************
					 **End Notification to user
					 *****************/

					var email = response;
					///delete current day user
					var sql = "DELETE FROM carePlanreviewedPatients WHERE `professionalID` = '" + professionalID + "'AND `userID`='" + userID + "' AND `reviewedDate`='" + reviewedDate + "'";

					db.userProfessionalRegistration.removeRegistraion(sql).then(function(response) {
                                            
                                            	///add user to reviewed list
					var sql = "INSERT INTO carePlanreviewedPatients (`professionalID`, `userID`, `reviewedDate`) VALUES ('" + professionalID + "' ,'" + userID + "', '" + reviewedDate + "')";

					db.userProfessionalRegistration.saveuserillnesscontrol(sql).then(function(response) {
                                            /////Add revies
					var sqlinsert = "INSERT INTO carePlanreview (`professionalID`, `userID`, `comment`, `SMBGVal`, `SMBPVal`, `review_report`, `recordDateTime`) VALUES ('" + professionalID + "' ,'" + userID + "', '" + comment + "', '" + SMBGVal + "', '" + SMBPVal + "', '" + review_report + "', '" + recordDateTime + "')";
 
					db.userProfessionalRegistration.saveuserillnesscontrol(sqlinsert).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Comment Saved Successfully.";
						res.json(data);

					}).error(function(err) {
						res.json(err);
					});
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

//------------------ Consultation Review --------------------------------// cy added
exports.teleConsultationReview =  function(req,res) {
	var userID = req.body.userid;
	var token = req.body.token;
	var professionalID = req.body.professionalID;
	var comment = req.body.comment;
	var SMBGVal = req.body.SMBGVal;
	var SMBPVal = req.body.SMBPVal;
	var commentSMBG= req.body.commentSMBG;
	var commentSMBP= req.body.commentSMBP;
	var reviewedDate = req.body.current_date;
	var review_report = req.body.pdf_name;
	var recordDateTime=req.body.recordDateTime;

	var drName = req.body.drName;
	var subject = "Tele-Consultation Review";
	var details = "You had completed the tele-consultation with "+ drName+" on "+reviewedDate;

	var rowID = req.body.rowID;

	var data = {
        "error": 0,
        "authResponse": ""
    }


	db.user.authUser(token).then(function(response) {
		if (!!token) {
			if (response != '' && response != null) {

				/******************
				 **NOTIFICATION TO USER  
				 *****************/
				email_web_notification(professionalID, userID, SMBGVal, SMBPVal , commentSMBG , commentSMBP);
				/****************
				 **End Notification to user
				 *****************/

				var email = response;
				/*
				///delete current day user
				var sql = "DELETE FROM carePlanreviewedPatients WHERE `professionalID` = '" + professionalID + "'AND `userID`='" + userID + "' AND `reviewedDate`='" + reviewedDate + "'";

				db.userProfessionalRegistration.removeRegistraion(sql).then(function(response) {
										
				///add user to reviewed list
				var sql = "INSERT INTO carePlanreviewedPatients (`professionalID`, `userID`, `reviewedDate`) VALUES ('" + professionalID + "' ,'" + userID + "', '" + reviewedDate + "')";

				db.userProfessionalRegistration.saveuserillnesscontrol(sql).then(function(response) {
				*/

				/////Add reviews
				var sqlinsert = "INSERT INTO teleConsultationReview (`professionalID`, `userID`, `comment`, `recordDateTime`, `review_report`) VALUES ('" + professionalID + "' ,'" + userID + "', '" + comment + "' , '" + recordDateTime + "' , '" + review_report + "')";

				db.userProfessionalRegistration.saveuserillnesscontrol(sqlinsert).then(function(response) {
				
				//push notification
				var sqlinsert = " INSERT INTO notification(`fromUserID`, `toUserID`, `subject`, `details`) VALUES('"+professionalID+"','"+userID+"','"+subject+"','"+details+"')";

				db.userProfessionalRegistration.pushNotification(sqlinsert).then(function(response) {

				// update tele consultation status
				var sqlinsert = "UPDATE userProfessionalAppointment SET status = '6' WHERE id ='"+rowID+"'";

				db.userProfessionalRegistration.updateTeleConsultationStatus(sqlinsert).then(function(response) {
				
					data["error"] = 0;
					data["authResponse"] = "Comment Saved Successfully.";
					res.json(data);

				}).error(function(err) {
					res.json(err);
				});
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


//---------------------------- Dietitian Plan Review ----------------------------------//
exports.DietplanReview = function (req, res) {
    var userID = req.body.userid;
    var token = req.body.token;
    var professionalID = req.body.professionalID;
    var comment = req.body.comment;
    var reviewedDate = req.body.current_date;
    var review_report = req.body.pdf_name;
    var recordDateTime = req.body.recordDateTime;

    var Member_Personal_Data_note = req.body.Member_Personal_Data_note;
    var socialreligion = req.body.socialreligion;
    var Member_BiomedicalNote = req.body.Member_BiomedicalNote;
    var Member_PhysicalApperance = req.body.Member_PhysicalApperance;
    var Member_KnowledgeBeleive = req.body.Member_KnowledgeBeleive;
    var Member_Cooperative_Standard = req.body.Member_Cooperative_Standard;

    
    var diet = "diet";


    var data = {
        "error": 0,
        "authResponse": ""
    }

    db.user.authUser(token).then(function (response) {
        if (!!token) {
            if (response != '' && response != null) {

                /******************
                 **NOTIFICATION TO USER  
                 *****************/
               // email_web_notification(professionalID, userID, SMBGVal, SMBPVal, commentSMBG, commentSMBP);
                /****************
                 **End Notification to user
                 *****************/

                var email = response;
                ///delete current day user
                var sql = "DELETE FROM carePlanreviewedPatients WHERE `professionalID` = '" + professionalID + "'AND `userID`='" + userID + "' AND `reviewedDate`='" + reviewedDate + "'";

                db.userProfessionalRegistration.removeRegistraion(sql).then(function (response) { }).error(function (err) {
                    res.json(err);
                });
                ///add user to reviewed list
                var sql = "INSERT INTO carePlanreviewedPatients (`professionalID`, `userID`, `reviewedDate`) VALUES ('" + professionalID + "' ,'" + userID + "', '" + reviewedDate + "')";

                db.userProfessionalRegistration.saveuserillnesscontrol(sql).then(function (response) { }).error(function (err) {
                    res.json(err);
                });
                /////Add reviews

                var sqlinsert = "INSERT INTO carePlanreview (`professionalID`, `userID`, `comment`, `SMBGVal`, `SMBPVal`, `review_report`,`DitietionReview`, `recordDateTime`) VALUES ('" + professionalID + "' ,'" + userID + "', '" + comment + "', '" + "" + "', '" + "" + "', '" + review_report + "',    '" + diet + "'        , '" + recordDateTime + "')";

                var sqlinsert_DietAssesment = "INSERT INTO DietAssesment (`MemberPersonalDataNote`, `MemberSocialHistory`, `MemberBiomedicalNote`, `MemberPhysicalApperance`, `MemberKnowledgeBeleive`, `MemberComparativeStandard`,`userid`, `AssessmentBy`, `inserdatetime`) VALUES ('" + Member_Personal_Data_note + "' ,'" + socialreligion + "', '" + Member_BiomedicalNote + "', '" + Member_PhysicalApperance + "', '" + Member_KnowledgeBeleive + "', '" + Member_Cooperative_Standard + "',    '" + userID + "' ,'" + userID + "'       , '" + recordDateTime + "')";

                db.userProfessionalRegistration.saveuserillnesscontrol(sqlinsert_DietAssesment).then(function (response) {
                    data["error"] = 0;
                    data["authResponse"] = "Comment Saved Successfully.";
                    res.json(data);

                }).error(function (err) {
                    alert(err);
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
		.error(function (err) {
		    res.json(err);
		});



    return res;
};

//=============================================notification to user by email and portal============================///////////////
function email_web_notification(professionalID, userID, SMBGVal, SMBPVal , commentSMBG , commentSMBP) {

	var email = '';
        console.log(SMBGVal);
	if (SMBGVal == 'Make an appointment to see your doctor For SMBG.' || SMBGVal == 'Continue monitoring as planned For SMBG.') {
                
		///add notification to web
		var sql = "INSERT INTO notification (`fromUserID`, `toUserID`, `subject`, `details`) values ";
		sql += "('" + professionalID + "','" + userID + "','" + SMBGVal + "','" + SMBGVal +' '+commentSMBG + "')";
		db.notification.addnotification(sql).then(function(response) {

		}).error(function(err) {
			res.json(err);
		});

	}

	if (SMBPVal == 'Make an appointment to see your doctor For SMBP.' || SMBPVal == 'Continue monitoring as planned For SMBP.') {

		///add notification to web
		var sql = "INSERT INTO notification (`fromUserID`, `toUserID`, `subject`, `details`) values ";
		sql += "('" + professionalID + "','" + userID + "','" + SMBPVal + "','" + SMBPVal + ' ' +commentSMBP + "')";
		db.notification.addnotification(sql).then(function(response) {

		}).error(function(err) {
			res.json(err);
		});

	}

	if (SMBGVal == 'Make an appointment to see your doctor For SMBG.' || SMBPVal == 'Make an appointment to see your doctor For SMBP.') {
		db.user.checkByuserid(userID).then(function(response) {

			email = response[0].email;

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
				subject: "Health Alert :  Make an appointment to see your doctor", // subject
				html: SMBGVal + " " + SMBPVal + " <br><br>Best Regards <br>UMCH Support<br><br><hr><br>This message was sent to " + email + ". If you don't want to receive these emails from UMCH in the future, please update your notification settings." // body
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



		}).error(function(err) {
			res.json(err);
		});

	}

}

//============================================getrequirereviewsPatients============================================/////////////////
exports.getrequirereviewsPatients = function(req, res) {
	var userid = req.query.userid;
	var token = req.query.token;


	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var email = response[0].email;

			if (!!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getrequirereviewsPatients(userid).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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


//============================================getreviewedPatients============================================/////////////////
exports.getreviewedPatients = function(req, res) {
	var userid = req.query.userid;
	var token = req.query.token;


	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var email = response[0].email;

			if (!!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getreviewedPatients(userid).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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

//============================================getTodayTasksDiabetes============================================/////////////////
exports.getTodayTasksDiabetes = function(req, res) {
	var userid = req.query.userid;
	var token = req.query.token;
	var day = req.query.day;

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var email = response[0].email;

			if (!!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getTodayTasksDiabetes(userid, day).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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

//============================================getTodayTasksHypertension============================================/////////////////
exports.getTodayTasksHypertension = function(req, res) {
	var userid = req.query.userid;
	var token = req.query.token;
	var day = req.query.day;

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var email = response[0].email;

			if (!!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getTodayTasksHypertension(userid, day).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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


//============================================getTodayTasksMedication============================================/////////////////
exports.getTodayTasksMedication = function(req, res) {
	var userid = req.query.userid;
	var token = req.query.token;
	var day = req.query.day;
	//monday,tuesday,wednesday,thrusday,friday,saturday,sunday
	////sun,mon,tue,wed,thr,fri,sat
	if (day == 'monday') {
		day = 'mon';
	}
	if (day == 'tuesday') {
		day = 'tue';
	}
	if (day == 'wednesday') {
		day = 'wed';
	}
	if (day == 'thrusday') {
		day = 'thr';
	}
	if (day == 'friday') {
		day = 'fri';
	}
	if (day == 'saturday') {
		day = 'sat';
	}
	if (day == 'sunday') {
		day = 'sun';
	}
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var email = response[0].email;

			if (!!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getTodayTasksMedication(userid, day).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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

//============================================getTasksDiabetes============================================/////////////////
exports.getTasksDiabetes = function(req, res) {
	var userid = req.query.userid;
	var token = req.query.token;


	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var email = response[0].email;

			if (!!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getTasksDiabetes(userid).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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


//============================================getTasksHypertension============================================/////////////////
exports.getTasksHypertension = function(req, res) {
	var userid = req.query.userid;
	var token = req.query.token;


	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var email = response[0].email;

			if (!!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getTasksHypertension(userid).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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


//============================================getTasksMedication============================================/////////////////
exports.getTasksMedication = function(req, res) {
	var userid = req.query.userid;
	var token = req.query.token;


	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var email = response[0].email;

			if (!!token) {
				if (response != '' && response != null) {

					db.userProfessionalRegistration.getTasksMedication(userid).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						res.json(data);

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
