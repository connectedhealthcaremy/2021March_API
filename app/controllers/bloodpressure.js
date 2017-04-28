'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');
var nodemailer = require("nodemailer");

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


									sql = sql.substr(0, sql.length);
								}


								var systolic_from = data1[total - 1].goalSystolic_Start;
								var diastolic_from = data1[total - 1].goalDiastolic_Start;
								var systolic_to = data1[total - 1].goalSystolic_End;
								var diastolic_to = data1[total - 1].goalDiastolic_End;


								sql += "systolic_from='" + systolic_from + "',diastolic_from='" + diastolic_from + "',systolic_to='" + systolic_to + "',diastolic_to='" + diastolic_to + "' WHERE id='" + id + "'; ";


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
							var sql = "INSERT INTO bp_goal (userID,systolic_from,diastolic_from, systolic_to, diastolic_to) values ";

							for (var i = 0; i < total - 1; i++) {
								var systolic_from = data1[i].goalSystolic_Start;
								var diastolic_from = data1[i].goalDiastolic_Start;
								var systolic_to = data1[i].goalSystolic_End;
								var diastolic_to = data1[i].goalDiastolic_End;

								sql += "('" + userid + "','" + systolic_from + "','" + diastolic_from + "','" + systolic_to + "','" + diastolic_to + "'),";

								sql = sql.substr(0, sql.length);
							}


							var systolic_from = data1[total - 1].goalSystolic_Start;
							var diastolic_from = data1[total - 1].goalDiastolic_Start;
							var systolic_to = data1[total - 1].goalSystolic_End;
							var diastolic_to = data1[total - 1].goalDiastolic_End;
							sql += "('" + userid + "','" + systolic_from + "','" + diastolic_from + "','" + systolic_to + "','" + diastolic_to + "')";


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

//============================================Add user bp ============================================/////////////////
exports.addbloodpressure1 = function(req, res) {

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

					var sql = "INSERT INTO bp(userID,systolic,diastolic,recordTime,pulse,notes,deviceStatus) values ";
					for (var i = 0; i < total - 1; i++) {
						var systolic = data1[i].systolic;
						var diastolic = data1[i].diastolic;
						var record_time = data1[i].record_time;
						var pulse = data1[i].pulserate;
						var notes = data1[i].notes;
						var deviceStatus = data1[i].deviceStatus;
						sql += "('" + email + "','" + systolic + "','" + diastolic + "','" + record_time + "','" + pulse + "','" + notes + "','" + deviceStatus + "'),";

						///check alert for blood pressure
						bp_alert(userid, email, firstName, lastName, systolic, diastolic, pulse, record_time);

						sql = sql.substr(0, sql.length);
					}

					var systolic = data1[total - 1].systolic;
					var diastolic = data1[total - 1].diastolic;
					var record_time = data1[total - 1].record_time;
					var pulse = data1[total - 1].pulserate;
					var notes = data1[total - 1].notes;
					var deviceStatus = data1[i].deviceStatus;
					sql += "('" + email + "','" + systolic + "','" + diastolic + "','" + record_time + "','" + pulse + "','" + notes + "','" + deviceStatus + "')";

					///check alert for blood pressure
					bp_alert(userid, email, firstName, lastName, systolic, diastolic, pulse, record_time);

					db.bp.addbp(sql).then(function(response) {

						///get last inserted id,s

						var lastinsertid = response;

						db.bp.lastaddIDs(lastinsertid).then(function(response) {

							data["error"] = 0;
							data["authResponse"] = "blood pressure Added Successfully";
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

///////////////========================Alert For Blood Pressure=================================================/////////////////
 
function bp_alert(userid, user_email, firstName, lastName, systolic, diastolic, pulse, record_time) {

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
				///get user Emails

				db.bp.getfamilyEmails(userid).then(function(response) {


					response.forEach(function(response, index) {
						///Send Emails To Next Of Kin
						bp_email_alert(response.email, firstName, lastName, record_time, systolic, diastolic, pulse, systolic_to, diastolic_to, systolic_from, diastolic_from);

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
		}


		}
    
	}).error(function(err) {
		res.json(err);
	});

}
///////////////========================Email Sending Blood Pressure=================================================/////////////////
function bp_email_alert(email, firstName, lastName, record_time, systolic, diastolic, pulse, systolic_to, diastolic_to, systolic_from, diastolic_from) {
	var date_time = record_time.split(' ');
	var date = date_time[0].split('-');
	record_time = date[2] + "-" + date[1] + "-" + date[0] + " " + date_time[1];

///console.log('email:'+email+' Name:'+firstName+lastName+' recordTime:'+record_time+' systolic:'+systolic+'diastolic:'+diastolic+' pulse:'+pulse+' systolic_to:'+systolic_to+' diastolic_to:'+diastolic_to+' systolic_from:'+systolic_from+' diastolic_from:'+diastolic_from);

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
		subject: "Health Alert : " + firstName + " " + lastName + " has abnormal BP at " + record_time, // subject
		html: firstName + " " + lastName + " Blood Pressure Readings are not in control:<br><b>Blood Pressure </b> : " + systolic + " / " + diastolic + " mmHg (Systolic/Diastolic) <br><b>pulse : </b>" + pulse + " bpm <br><br>Recommended blood pressure range: <br><b>Systolic</b> :  ≤ " + systolic_to + "<br><b>Diastolic</b> : ≤ "  + diastolic_to + "<br><br>Best Regards <br>CHIEF Support<br><br><hr><br>This message was sent to " + email + ". If you don't want to receive these emails from CHIEF in the future, please update your notification settings." // body
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