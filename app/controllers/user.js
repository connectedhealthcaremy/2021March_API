'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');
var randtoken = require('rand-token');
var md5 = require('md5');
var nodemailer = require('nodemailer');

/////================================Login========================================================//////
exports.login = function(req, res) {
	var username = req.body.email;
	var password = req.body.password;
	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!username && !!password) {

		password = md5(password);

		db.user.login(username, password).then(function(response) {

				if (response != '' && response != null) {
					data["error"] = 0;
					data["authResponse"] = "Login Successfully";
					data['data'] = response;
					res.json(data);
				} else {
					data["error"] = 1;
					data["authResponse"] = "No Record Found";
					res.json(data);
				}
			})
			.error(function(err) {
				res.json(err);
			});
	} else {
		data["error"] = 1;
		data["authResponse"] = "Please provide all required data (i.e : email, Password)";
		res.json(data);

	}

	return res;
};

//============================================Log out user============================================/////////////////

exports.GetUserlogout = function(req, res) {
	var userid = req.body.userid;
	var token = req.body.token;
	var macAddress = req.body.macAddress;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function(response) {
				if (response != '' && response != null) {
					var email = response;
					userid = response[0].userID;

					data["error"] = 0;
					data["authResponse"] = "User Logout Successfully";
					//data['Data']=response;
					res.json(data);

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


//============================================Get user data============================================/////////////////

exports.GetUserData = function(req, res) {
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
					userid = response[0].userID;

					//res.json(email);
					///Get user info
					db.user.getUser(userid, token).then(function(response) {
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



//============================================Get user data by user id============================================/////////////////

exports.GetUserDatabyID = function(req, res) {
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

					db.user.getuserDetails(userid).then(function(response) {

							res.json(response);

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


//============================================Update user data============================================/////////////////


exports.UpdateUserInfo = function(req, res) {


	var userid = req.body.userID;
	var token = req.body.token;
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var gender = req.body.gender;
	var birthDate = req.body.birthDate;
	var height = req.body.height;
	var weight = req.body.weight;
	var address = req.body.address;
	var town = req.body.town;
	var state = req.body.state;
	var country = req.body.country;
	var postCode = req.body.postCode;
	var phone = req.body.mobileNumber;


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
					db.user.updateUser(userid, firstName, lastName, gender, birthDate, height, weight, address, town, state, country, postCode, phone).then(function(response) {
							data["error"] = 0;
							data["authResponse"] = "Record Sucessfully updated.";
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

//============================================Update user Tokens============================================/////////////////


exports.updateDeviceToken = function(req, res) {
	var userid = req.body.userID;
	var token = req.body.token;
	var deviceID = req.body.deviceID;



	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!userid && !!token ) {
		///Authinticate user
		db.user.authUser(token).then(function(response) {
				if (response != '' && response != null) {

					var sql="UPDATE user SET deviceID='"+deviceID+"' WHERE userID='"+userid+"'";

					db.user.updateDeiveToken(sql).then(function(response) {
								data["error"] = 0;
								data["authResponse"] = "Device Token updated Sucessfully.";
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
		data["authResponse"] = "Please provide all required data (i.e : token, password  etc)";
		res.json(data);
		//connection.end()
	}

	return res;
};


//============================================Update user Password============================================/////////////////


exports.updatePasssword = function(req, res) {
	var userid = req.body.userID;
	var token = req.body.token;
	var password = req.body.password;
	var confirm_password = req.body.confirm_password;


	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!userid && !!token && !!password && !!confirm_password) {
		///Authinticate user
		db.user.authUser(token).then(function(response) {
				if (response != '' && response != null) {
					var email = response;
					if (password == confirm_password) {

						password = md5(password);

						db.user.updateUserPassword(userid, password).then(function(response) {
								data["error"] = 0;
								data["authResponse"] = "Password updated Sucessfully.";
								res.json(data);

							})
							.error(function(err) {
								res.json(err);
							});
					} else {
						data["error"] = 1;
						data["authResponse"] = "Password and Confirm password must same.";
						res.json(data);
					}

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
		data["authResponse"] = "Please provide all required data (i.e : token, password  etc)";
		res.json(data);
		//connection.end()
	}

	return res;
};

///===========================================Forgot Password=============================================//////////////////////
exports.forgotPasssword = function(req, res) {
	var email = req.body.email;



	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!email) {
		///Authinticate user
		db.user.checkByname(email).then(function(response) {
				if (response != '' && response != null) {
					//res.json(response);

					var name = response[0].firstName + ' ' + response[0].lastName;
					var email = response[0].email;
					var userID = response[0].userID;
					var token = response[0].token;

					//console.log(name+"------------"+email+"-----------------"+userID+"================="+token);

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
		subject: "Password Recovery", // subject
		html: 'Hi <b>' + name + ' </b>' + '<br><br> We received a request for password recovery.Please Click on below <a href="http://www.umchtech.com/chief/resetpassword.php?ts=' + userID + '&&token=' + token + '">link</a> to reset password.<br><br><h4><a href="http://www.umchtech.com/chief/resetpassword.php?ts=' + userID + '&&token=' + token + '">Click Here</a><h4><br><br><br>Regards <br>   Support CHIEF Team' // body
	}, function(error, response) { //callback
		if (error) {
			console.log(error);
		} else {
			console.log("Message sent: " + response.message);
			data["authResponse"] = 'Success';
          res.json(data);
		}

		smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
	});

	/*********************
	 **End email
	 ********************/

/*
					var transport = nodemailer.createTransport();

					var transport = nodemailer.createTransport("direct", {
						debug: true
					});

					var mail = require("nodemailer").mail;
					var mailOptions = {
						from: '"Support CHIEF"<isehat@umchtech.com>', // sender address
						to: email, // list of receivers
						subject: 'Password Recovery ', // Subject line
						//text: 'Hello world', // plaintext body
						html: 'Hi <b>' + name + ' </b>' + '<br><br> We received a request for password recovery.Please Click on below <a href="http://www.umchtech.com/chief/resetpassword.php?ts=' + userID + '&&token=' + token + '">link</a> to reset password.<br><br><h4><a href="http://www.umchtech.com/chief/resetpassword.php?ts=' + userID + '&&token=' + token + '">Click Here</a><h4><br><br><br>Regards <br>   Support CHIEF Team' // html body
					};


					transport.sendMail(mailOptions, function(error, response) {
						if (error) {
							console.log(error);
							return;
						}

						// response.statusHandler only applies to 'direct' transport
						response.statusHandler.once("failed", function(data) {
							console.log(
								"Permanently failed delivering message to %s with the following response: %s",
								data.domain, data.response);
							data["error"] = 1;
							data["authResponse"] = 'failed';

							res.json(data);
						});

						response.statusHandler.once("requeue", function(data) {
							console.log("Temporarily failed delivering message to %s", data.domain);
						});

						response.statusHandler.once("sent", function(data) {
							console.log("Message was accepted by %s", data.domain);
							data["error"] = 0;
							//data["authResponse"] = 'failed';
							data["authResponse"] = 'Success';

							res.json(data);
						});
					});

*/

				} else {
					data["error"] = 1;
					data["authResponse"] = "No Record Found.Try with different one.";
					res.json(data);

				}
			})
			.error(function(err) {
				res.json(err);
			});
	} else {
		data["error"] = 1;
		data["authResponse"] = "Please provide all required data (i.e : token, password  etc)";
		res.json(data);
		//connection.end()
	}

	return res;
};

///========================================Social Login===================================================//////////////////////
exports.socialLogin = function(req, res) {

	var username = req.body.email;
	var servicename = req.body.servicename;
	var servicetoken = req.body.servicetoken;
	var token = randtoken.generate(32);
	var deviceID = req.body.deviceID;
	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!username) {

		db.user.socialLoginCheck(username).then(function(response) {

				if (response != '' && response != null) {
					data["error"] = 0;
					data["authResponse"] = "Login Successfully";
					data['data'] = response;
					res.json(data);
				} else {
					var email = username;
					if (servicename == 'facebook') { ////facebook
						var sql = "INSERT INTO user (username, email, facebook, token, deviceID) VALUES ('" + username + "', '" + email + "', '" + servicetoken + "', '" + token + "', '" + deviceID + "')";

						db.user.socialregister(sql).then(function(response) {
								var id = response;
								//login
								db.user.loginSocial(id).then(function(response) {
										data["error"] = 0;
										data["authResponse"] = "Login Successfully";
										data['data'] = response;
										res.json(data)
									})
									.error(function(err) {
										res.json(err);
									});

							})
							.error(function(err) {
								res.json(err);
							});


					} else if (servicename == 'twitter') { ///twitter
						var sql = "INSERT INTO user (username, email, twitter, token, deviceID) VALUES ('" + username + "', '" + email + "', '" + servicetoken + "', '" + token + "', '" + deviceID + "')";

						db.user.socialregister(sql).then(function(response) {
								var id = response;
								//login
								db.user.loginSocial(id).then(function(response) {
										data["error"] = 0;
										data["authResponse"] = "Login Successfully";
										data['data'] = response;
										res.json(data)
									})
									.error(function(err) {
										res.json(err);
									});

							})
							.error(function(err) {
								res.json(err);
							});

					} else if (servicename == 'googleplus') { ////Google
						var sql = "INSERT INTO user (username, email, googleplus,token, deviceID) VALUES ('" + username + "', '" + email + "', '" + servicetoken + "', '" + token + "', '" + deviceID + "')";

						db.user.socialregister(sql).then(function(response) {

								var id = response;
								//login
								db.user.loginSocial(id).then(function(response) {
										data["error"] = 0;
										data["authResponse"] = "Login Successfully";
										data['data'] = response;
										res.json(data)
									})
									.error(function(err) {
										res.json(err);
									});

							})
							.error(function(err) {
								res.json(err);
							});

					} else {
						data["error"] = 1;
						data["authResponse"] = "Service Name Not Valid.Please Contact With Admin.";
						res.json(data);
					}

					/*data["error"]=1;
					data["authResponse"] = "No Record Found";
					res.json(data);*/
				}
			})
			.error(function(err) {
				res.json(err);
			});
	} else {
		data["error"] = 1;
		data["authResponse"] = "Please provide all required data (i.e : email, Password)";
		res.json(data);

	}

	return res;
};



//============================================Add User Questionaire============================================/////////////////

exports.questionuseradd = function(req, res) {
	// console.log(req.body);
	var userid = req.body.userid;
	var token = req.body.token;
	var disease = req.body.disease;
	var dietcontrol = req.body.dietcontrol;
	var oralantidiabetics = req.body.oralantidiabetics;
	var insulin = req.body.insulin;
	var notcontrolledtreatment = req.body.notcontrolledtreatment;
	var wellcontrolled = req.body.wellcontrolled;

	if (disease == '') {
		disease = 0;
	}
	if (dietcontrol == '') {
		dietcontrol = 0;
	}
	if (oralantidiabetics == '') {
		oralantidiabetics = 0;
	}
	if (insulin == '') {
		insulin = 0;
	}
	if (notcontrolledtreatment == '') {
		notcontrolledtreatment = 0;
	}
	if (wellcontrolled == '') {
		wellcontrolled = 0;
	}

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token && !!userid) {
		///Authinticate user
		db.user.authUser(token).then(function(response) {
				if (response != '' && response != null) {


					db.userillness.getuserillness(userid).then(function(response) {

							if (response != '' && response != null) { // record found


								var sql = "UPDATE userillness SET disease='" + disease + "',dietControl='" + dietcontrol + "', oralAntidiabetics='" + oralantidiabetics + "', insulin='" + insulin + "',notControlledTreatment='" + notcontrolledtreatment + "',wellControlled ='" + wellcontrolled + "' WHERE userID='" + userid + "'";

								db.userillness.updateuserillness(sql).then(function(response) {
										data["error"] = 0;
										data["authResponse"] = "User Illness Successfully Updated";
										data['data'] = response;
										res.json(data)
									})
									.error(function(err) {
										res.json(err);
									});

							} else { ///no record found

								var sql = "INSERT INTO userillness (userID, disease,dietControl, oralAntidiabetics, insulin,notControlledTreatment,wellControlled) VALUES ('" + userid + "', '" + disease + "','" + dietcontrol + "', '" + oralantidiabetics + "', '" + insulin + "', '" + notcontrolledtreatment + "', '" + wellcontrolled + "') ";
								db.userillness.adduserillness(sql).then(function(response) {
										data["error"] = 0;
										data["authResponse"] = "User Illness Successfully Saved";
										data['data'] = response;
										res.json(data)
									})
									.error(function(err) {
										res.json(err);
									});

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


//============================================Get user Quetionaire Data============================================/////////////////

exports.GetUserQuestionnaire = function(req, res) {
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

					db.userillness.getuserillness(userid).then(function(response) {
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

function getOperatorUUID(operatorid, length ,data ,output)
{
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
		host     : "chat.umchtech.com",
		user     : "umch",
		password : "umch!@#$",
		database : "ppmessage"
	});

	connection.connect();

	var user_name = "'"+operatorid+"'";

	connection.query("SELECT * FROM `device_users` WHERE user_name = "+user_name+"", function (error, results, fields) {
		if (error) throw error;

		// console.log('The device uuid is: ', results[0].uuid);
		// output(results[0].uuid);
		// return results[0].uuid;
		data[results[0].uuid] = {};
		output(data,length);

	});

	connection.end();
}

///===========================================Get User Chat List ==============================================///////////////////////
exports.GetChatPartners = function(req, res) {
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

																	db.userillness.getProfessionalList(userid).then(function(response) {

																			var output = JSON.parse("{}");

																			for (var i = 0; i < response.length; i++) {

																				var operatorid = response[i].operatorid;

																				var uuid = getOperatorUUID(operatorid, response.length, output, function (dt,length) {

																						var size = Object.keys(dt).length;
																						// console.log('length: ', size);

																					if(size== length)
																					{
																					// console.log('The data return is: ', data);
																					var key = "5cebae78-29d8-11e7-9f68-82f2b4d1d44d"; //chief support

																					output[key] = {};
																					
																					data["error"] = 0;
																					data["authResponse"] = "Action Successful";
																					data['Data'] = JSON.stringify(output);
																					res.json(data);
																					}

																				});

																			}

																		});


																	// response = {"1758e22a-2552-11e7-9f68-82f2b4d1d44d":"uuid","0b2b3aac-2552-11e7-9f68-82f2b4d1d44d":"uuid"};
																	//
																	// var obj1 = {"1758e22a-2552-11e7-9f68-82f2b4d1d44d":"uuid"};
																	//
																	// var obj2 = {"0b2b3aac-2552-11e7-9f68-82f2b4d1d44d":"uuid"};
																	//
																	// var response = JSON.parse("{}");
																	//
																	// var key = "5cebae78-29d8-11e7-9f68-82f2b4d1d44d"; //chief support
																	//
																	// response[key] = {};
																	//
																	// key = "1758e22a-2552-11e7-9f68-82f2b4d1d44d"; //dr moy
																	//
																	// response[key] = {};
																	//
																	// key = "0b2b3aac-2552-11e7-9f68-82f2b4d1d44d"; //dr ardina
																	//
																	// response[key] = {};
																	// data["error"] = 0;
																	// data["authResponse"] = "Action Successful";
																	// data['Data'] = JSON.stringify(response);
																	// res.json(data);


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


///===========================================Send Email to Patient=============================================//////////////////////
exports.addnewPatientByDoctor = function(req, res) {
	var email = req.body.email;
	var code = randtoken.generate(12);
	var professionalID = req.body.professionalID;
	var emailSentDatTime = req.body.emailSentDatTime;

	var phone=req.body.phone;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!email) {
		///Authinticate user
		db.user.checkByname(email).then(function(response) {
				if (response != '' && response != null) {
					//res.json(response);
					var lastID = '';
					var name = response[0].firstName + ' ' + response[0].lastName;
					var userID = response[0].userID;
					var token = response[0].token;
					/****************
					 **Create user email status with doctor
					 *******************/
					var sql = "INSERT INTO professionalInvitation  (`professionalID`, `email`, `name`, `phone`, `emailSentDatTime` , `auth_code`) VALUES ('" + professionalID + "', '" + email + "', '" + name + "', '" + phone + "','" + emailSentDatTime + "', '" + code + "');";

					db.userillness.adduserillness(sql).then(function(response) {
							data["error"] = 0;
							data["authResponse"] = "User Invitation Added";
							var lastID = response;
							var url = "http://www.umchtech.com/chief/accept_invitation.php?pi_id=" + lastID + "";
							/***********************
							 **Email Notification
							 *************************/

							var nodemailer = require("nodemailer");

							var smtpTransport = nodemailer.createTransport("SMTP", {
								service: "Gmail", // sets automatically host, port and connection security settings
								auth: {
									user: "chief.umch@gmail.com",
									pass: "umch1328"
								}
							});
							smtpTransport.sendMail({ //email options
								from: "CHIEF", // sender address.  Must be the same as authenticated user if using GMail.
								to: email, // receiver
								subject: "Invitation For Monitring", // subject
								html: "Hi " + name + "<br>Below are the Credentials. <br><br><b>Follow The Link To Complete Registration Process</b><br><br><strong>Url: <a href=" + url + ">Click Here</a></strong><br><strong>Authentication Code:</strong>" + code + "<br><br>Best Regards <br>CHIEF Support" // body
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

							res.json(data)
						})
						.error(function(err) {
							res.json(err);
						});


					/***************
					 **End Create user status with doctor
					 ****************/
					//console.log(name+"------------"+email+"-----------------"+userID+"================="+token);



				} else {

                var name=req.body.name;

					var lastID = '';

					/****************
					 **Create user email status with doctor
					 *******************/
					var sql = "INSERT INTO professionalInvitation  (`professionalID`, `email`, `name`, `phone`, `emailSentDatTime` , `auth_code`) VALUES ('" + professionalID + "', '" + email + "', '" + name + "', '" + phone + "','" + emailSentDatTime + "', '" + code + "');";

					db.userillness.adduserillness(sql).then(function(response) {
							data["error"] = 0;
							data["authResponse"] = "User Invitation Added";
							var lastID = response;
							var url = "http://www.umchtech.com/chief/accept_invitation.php?pi_id=" + lastID + "";
							/***********************
							 **Email Notification
							 *************************/

							var nodemailer = require("nodemailer");

							var smtpTransport = nodemailer.createTransport("SMTP", {
								service: "Gmail", // sets automatically host, port and connection security settings
								auth: {
									user: "chief.umch@gmail.com",
									pass: "umch1328"
								}
							});
							smtpTransport.sendMail({ //email options
								from: "CHIEF", // sender address.  Must be the same as authenticated user if using GMail.
								to: email, // receiver
								subject: "Invitation For Monitring", // subject
								html: "Hi <br>Below are the Credentials. <br><br><b>Follow The Link To Complete Registration Process</b><br><br><strong>Url: <a href=" + url + ">Click Here</a></strong><br><strong>Authentication Code:</strong>" + code + "<br><br>Best Regards <br>CHIEF Support" // body
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

							res.json(data)
						})
						.error(function(err) {
							res.json(err);
						});


					/***************
					 **End Create user status with doctor
					 ****************/

				}
			})
			.error(function(err) {
				res.json(err);
			});
	} else {
		data["error"] = 1;
		data["authResponse"] = "Please provide all required data (i.e : token, password  etc)";
		res.json(data);
		//connection.end()
	}

	return res;
};
