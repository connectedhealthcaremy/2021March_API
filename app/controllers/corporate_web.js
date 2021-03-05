'use strict';
/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');
var randtoken = require('rand-token');
var moment = require('moment');

//============================================Add Corporate Employee============================================/////////////////
exports.addemployee = function(req, res) {

	var professionalID = req.body.user_id;
	var token = req.body.token;
	var data1 = req.body.data;
	var currentDateTime = new moment().format("Y-MM-DD HH:mm:ss");

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {


					var email = response;
					var emp_data = '';
					for (var i = 0, len = data1.length; i < len; i++) {
						emp_data = data1[i].split(',');
						//console.log(emp_data);
						add_corporate_employee(emp_data[0], emp_data[1], emp_data[2], emp_data[3], emp_data[4], emp_data[5], professionalID);
					}
                    
					data["error"] = 0;
					data["authResponse"] = "Invitation sent successfully.";
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



exports.addDietationMember = function (req, res) {

    var professionalID = req.body.user_id;
    var token = req.body.token;
    var data1 = req.body.data;
    var currentDateTime = new moment().format("Y-MM-DD HH:mm:ss");

    var data = {
        "error": 0,
        "authResponse": ""
    }

    db.user.authUser(token).then(function (response) {
        if (!!token) {
            if (response != '' && response != null) {


                var email = response;
                var emp_data = '';
                for (var i = 0, len = data1.length; i < len; i++) {
                    emp_data = data1[i].split(',');
                    //console.log(emp_data);
                    add_Dietation_Member(emp_data[0], emp_data[1], emp_data[2], emp_data[3], emp_data[4], emp_data[5], professionalID);
                }

                data["error"] = 0;
                data["authResponse"] = "Invitation sent successfully.";
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
        .error(function (err) {
            res.json(err);
        });



    return res;
};





function add_Dietation_Member(email, emp_name, phone, employee_id, branch, department, professionalID) {
	//console.log('email==>'+email+"===name===>"+name+"====phone====>"+phone+"====Employee ID ==>"+employee_id+"==branch===>"+branch+"==department==>"+department+"--"+professionalID);

	var email = email;
	var code = randtoken.generate(12);
	var professionalID = professionalID;
    var emailSentDatTime = new moment().format("Y-MM-DD HH:mm:ss");
	var phone = phone;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!email) {
		//////get doctor details
		var doctor_name = '';
		db.user.checkByuserid(professionalID).then(function(response) {
			doctor_name = response[0].firstName + ' ' + response[0].lastName;

			///Authinticate user
			db.user.checkByname(email).then(function(response) {
					if (response != '' && response != null) {
						//console.log('Already Employee'); return false;
						//res.json(response);
						var lastID = '';
						var name = response[0].firstName + ' ' + response[0].lastName;
						var userID = response[0].userID;
						var token = response[0].token;
						/****************
						 **Create user email status with doctor
						 *******************/
                        var sql = "INSERT INTO professionalInvitation  (`professionalID`, `email`, `name`, `phone`, `emailSentDatTime` , `auth_code`, `RefId`) VALUES ('" + professionalID + "', '" + email + "', '" + emp_name + "', '" + phone + "','" + emailSentDatTime + "', '" + code + "', '" + employee_id + "');";

						db.userillness.adduserillness(sql).then(function(response) {
								data["error"] = 0;
								data["authResponse"] = "User Invitation Added";
								var lastID = response;
								var url = "http://www.umchtech.com/chief/accept_invitation.php?pi_id=" + lastID + "";

                                /***************************
								 **Add Corporate Employee
								 **************************/
								//var sql = "INSERT INTO corporateCompanyEmployee  (`professionalInvitationID`, `companyID`, `employeeID`,`branch`,`department`) VALUES ('" + lastID + "', '1', '" + employee_id + "', '" + branch + "', '" + department + "');";
								//db.userillness.adduserillness(sql).then(function(response) {}).error(function(err) {
								//	console.log("Error in corporateCompanyEmployee =>"+err);
								//});

								/***********************
								 **Email Notification
								 *************************/

								var nodemailer = require("nodemailer");

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
									subject: "Invitation For Health Monitoring From " + doctor_name, // subject
									html: "Hi " + name + "<br><br>This is invitation for Dietition Health monitoring from " + doctor_name + ". <br><br><b>Follow The Link To Complete Registration Process</b><br><br><strong>Url: <a href=" + url + ">Click Here</a></strong><br><strong>Authentication Code:</strong>" + code + "<br><br>Note: If your computer is unable to access umchtech.com (Access Denied), please forward this email to your personal / Gmail account and access the link from your smartphone.<br><br>Best Regards <br>UMCH Support" // body
								}, function(error, response) { //callback
									if (error) {
										console.log(error +'With Email => '+email);
									} else {
										console.log("Message sent : "+ response.message); 
									}

									smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
								});

								/*********************
								 **End email
								 ********************/

                            //Send Notification 
                           var message_body= "Hi " + name + "<br><br>This is invitation for Health monitoring from " + doctor_name + ". <br><br><b>Follow The Link To Complete Registration Process</b><br><br><strong>Url: <a href=" + url + ">Click Here</a></strong><br><strong>Authentication Code:</strong>" + code + "<br><br>Note: If your computer is unable to access umchtech.com (Access Denied), please forward this email to your personal / Gmail account and access the link from your smartphone.<br><br>Best Regards <br>UMCH Support";

                            var sql_notification1 = "INSERT INTO notification(fromUserID,toUserID,subject, details,insertionDateTime) values ('" + professionalID + "','" + userID + "','" + message_subject + "','" + message_body + "','" + emailSentDatTime + "')";
                            db.userillness.adduserillness(sql_notification1).then(function (responsein2) {

                                // Send Sms to USer Starts
                                if (phone != "" && phone != null) {
                                    var message_body = doctor_name + ` invited you as For Dietition Health Monitoring`;
                                    const request = require('request');
                                    request(`http://api.silverstreet.com/send.php?username=umch&password=tvrtrTfS&destination=` + phone + `&sender=Google&senderton=5&sendernpi=0&body=` + message_body,
                                        function (error, response, body) {
                                            if (!error && response.statusCode == 200) {
                                                console.log(body);
                                            }
                                        });
                                }
                               //Send SMS to USer Ends


                            }).error(function (err) {
                                res.json(err);
                            });

                            //Send Notificatuion Ends

								console.log(data)
							})
							.error(function(err) {
								console.log("Error In Email corporate Employee => "+err);
							});


						/***************
						 **End Create user status with doctor
						 ****************/
						//console.log(name+"------------"+email+"-----------------"+userID+"================="+token);



					} else {

						var name = emp_name;
                        //console.log("inside employee name is ==>"+name); return false;
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
								/***************************
								 **Add Corporate Employee
								 **************************/
								//var sql = "INSERT INTO corporateCompanyEmployee  (`professionalInvitationID`, `companyID`, `employeeID`,`branch`,`department`) VALUES ('" + lastID + "', '1', '" + employee_id + "', '" + branch + "', '" + department + "');";
								//db.userillness.adduserillness(sql).then(function(response) {}).error(function(err) {
								//	res.json(err);
								//});
								/***********************
								 **Email Notification
								 *************************/

								var nodemailer = require("nodemailer");

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
									subject: "Invitation For Health Monitoring From " + doctor_name, // subject
									html: "Hi <br><br>This is invitation for Health monitoring on behalf of " + doctor_name + ". <br><br><b>Follow The Link To Complete Registration Process</b><br><br><strong>Url: <a href=" + url + ">Click Here</a></strong><br><strong>Authentication Code:</strong>" + code + "<br><br>Best Regards <br>UMCH Support" // body
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

								console.log("corporate Email Sent => "+data);
							})
							.error(function(err) {
								console.log("Error on Corporate Employee Email =>"+err);
							});


						/***************
						 **End Create user status with doctor
						 ****************/

					}
				})
				.error(function(err) {
					console.log(err);
				});

		}).error(function(err) {
			console.log(err);
		});


	} else {
		data["error"] = 1;
		data["authResponse"] = "Please provide all required data (i.e : token, password  etc)";
		console.log(data);
		//connection.end()
	}

	return 'success';
}






function add_corporate_employee(email, emp_name, phone, employee_id, branch, department, professionalID) {
    //console.log('email==>'+email+"===name===>"+name+"====phone====>"+phone+"====Employee ID ==>"+employee_id+"==branch===>"+branch+"==department==>"+department+"--"+professionalID);

    var email = email;
    var code = randtoken.generate(12);
    var professionalID = professionalID;
    var emailSentDatTime = new moment().format("Y-MM-DD HH:mm:ss");
    var phone = phone;

    var data = {
        "error": 0,
        "authResponse": ""
    }
    if (!!email) {
        //////get doctor details
        var doctor_name = '';
        db.user.checkByuserid(professionalID).then(function (response) {
            doctor_name = response[0].firstName + ' ' + response[0].lastName;

            ///Authinticate user
            db.user.checkByname(email).then(function (response) {
                if (response != '' && response != null) {
                    //console.log('Already Employee'); return false;
                    //res.json(response);
                    var lastID = '';
                    var name = response[0].firstName + ' ' + response[0].lastName;
                    var userID = response[0].userID;
                    var token = response[0].token;
                    /****************
                     **Create user email status with doctor
                     *******************/
                    var sql = "INSERT INTO professionalInvitation  (`professionalID`, `email`, `name`, `phone`, `emailSentDatTime` , `auth_code`) VALUES ('" + professionalID + "', '" + email + "', '" + name + "', '" + phone + "','" + emailSentDatTime + "', '" + code + "');";

                    db.userillness.adduserillness(sql).then(function (response) {
                        data["error"] = 0;
                        data["authResponse"] = "User Invitation Added";
                        var lastID = response;
                        var url = "http://www.umchtech.com/chief/accept_invitation.php?pi_id=" + lastID + "";
                        /***************************
                         **Add Corporate Employee
                         **************************/
                        var sql = "INSERT INTO corporateCompanyEmployee  (`professionalInvitationID`, `companyID`, `employeeID`,`branch`,`department`) VALUES ('" + lastID + "', '1', '" + employee_id + "', '" + branch + "', '" + department + "');";
                        db.userillness.adduserillness(sql).then(function (response) { }).error(function (err) {
                            console.log("Error in corporateCompanyEmployee =>" + err);
                        });

                        /***********************
                         **Email Notification
                         *************************/

                        var nodemailer = require("nodemailer");

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
                            subject: "Invitation For Health Monitoring From " + doctor_name, // subject
                            html: "Hi " + name + "<br><br>This is invitation for Health monitoring on behalf of " + doctor_name + ". <br><br><b>Follow The Link To Complete Registration Process</b><br><br><strong>Url: <a href=" + url + ">Click Here</a></strong><br><strong>Authentication Code:</strong>" + code + "<br><br>Note: If your computer is unable to access umchtech.com (Access Denied), please forward this email to your personal / Gmail account and access the link from your smartphone.<br><br>Best Regards <br>UMCH Support" // body
                        }, function (error, response) { //callback
                            if (error) {
                                console.log(error + 'With Email => ' + email);
                            } else {
                                console.log("Message sent : " + response.message);
                            }

                            smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
                        });

                        /*********************
                         **End email
                         ********************/

                        console.log(data)
                    })
                        .error(function (err) {
                            console.log("Error In Email corporate Employee => " + err);
                        });


                    /***************
                     **End Create user status with doctor
                     ****************/
                    //console.log(name+"------------"+email+"-----------------"+userID+"================="+token);



                } else {

                    var name = emp_name;
                    //console.log("inside employee name is ==>"+name); return false;
                    var lastID = '';

                    /****************
                     **Create user email status with doctor
                     *******************/
                    var sql = "INSERT INTO professionalInvitation  (`professionalID`, `email`, `name`, `phone`, `emailSentDatTime` , `auth_code`) VALUES ('" + professionalID + "', '" + email + "', '" + name + "', '" + phone + "','" + emailSentDatTime + "', '" + code + "');";

                    db.userillness.adduserillness(sql).then(function (response) {
                        data["error"] = 0;
                        data["authResponse"] = "User Invitation Added";
                        var lastID = response;
                        var url = "http://www.umchtech.com/chief/accept_invitation.php?pi_id=" + lastID + "";
                        /***************************
                         **Add Corporate Employee
                         **************************/
                        var sql = "INSERT INTO corporateCompanyEmployee  (`professionalInvitationID`, `companyID`, `employeeID`,`branch`,`department`) VALUES ('" + lastID + "', '1', '" + employee_id + "', '" + branch + "', '" + department + "');";
                        db.userillness.adduserillness(sql).then(function (response) { }).error(function (err) {
                            res.json(err);
                        });
                        /***********************
                         **Email Notification
                         *************************/

                        var nodemailer = require("nodemailer");

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
                            subject: "Invitation For Health Monitoring From " + doctor_name, // subject
                            html: "Hi <br><br>This is invitation for Health monitoring on behalf of " + doctor_name + ". <br><br><b>Follow The Link To Complete Registration Process</b><br><br><strong>Url: <a href=" + url + ">Click Here</a></strong><br><strong>Authentication Code:</strong>" + code + "<br><br>Best Regards <br>UMCH Support" // body
                        }, function (error, response) { //callback
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

                        console.log("corporate Email Sent => " + data);
                    })
                        .error(function (err) {
                            console.log("Error on Corporate Employee Email =>" + err);
                        });


                    /***************
                     **End Create user status with doctor
                     ****************/

                }
            })
                .error(function (err) {
                    console.log(err);
                });

        }).error(function (err) {
            console.log(err);
        });


    } else {
        data["error"] = 1;
        data["authResponse"] = "Please provide all required data (i.e : token, password  etc)";
        console.log(data);
        //connection.end()
    }

    return 'success';
}



//============================================Add Corporate Employee============================================/////////////////
exports.addemployee1 = function(req, res) {

	var professionalID = req.body.user_id;
	var token = req.body.token;
	var data1 = req.body.data;
	var currentDateTime = new moment().format("Y-MM-DD HH:mm:ss");

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {


					var email = response;
					var emp_data = '';
					for (var i = 0, len = data1.length; i < len; i++) {
						emp_data = data1[i].split(',');
						//console.log(emp_data);
						add_corporate_employee1(emp_data[0], emp_data[1], emp_data[2], emp_data[3], emp_data[4], emp_data[5], professionalID);
					}
                    
					data["error"] = 0;
					data["authResponse"] = "Invitation sent successfully.";
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

function add_corporate_employee1(email, emp_name, phone, employee_id, branch, department, professionalID) {
	//console.log('email==>'+email+"===name===>"+name+"====phone====>"+phone+"====Employee ID ==>"+employee_id+"==branch===>"+branch+"==department==>"+department+"--"+professionalID);

	var email = email;
	var code = randtoken.generate(12);
	var professionalID = professionalID;
	var emailSentDatTime = new moment().format("Y-MM-DD HH:mm:ss");
	var phone = phone;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!email) {
		//////get doctor details
		var doctor_name = '';
		db.user.checkByuserid(professionalID).then(function(response) {
			doctor_name = response[0].firstName + ' ' + response[0].lastName;

			///Authinticate user
			db.user.checkByname(email).then(function(response) {
					if (response != '' && response != null) {
						//console.log('Already Employee'); return false;
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
								var url = "http://www.ourcheckup.com/accept_invitation.php?pi_id=" + lastID + "";
								/***************************
								 **Add Corporate Employee
								 **************************/
								var sql = "INSERT INTO corporateCompanyEmployee  (`professionalInvitationID`, `companyID`, `employeeID`,`branch`,`department`) VALUES ('" + lastID + "', '1', '" + employee_id + "', '" + branch + "', '" + department + "');";
								db.userillness.adduserillness(sql).then(function(response) {}).error(function(err) {
									console.log("Error in corporateCompanyEmployee =>"+err);
								});

								/***********************
								 **Email Notification
								 *************************/

								var nodemailer = require("nodemailer");

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
									subject: "Invitation For Health Monitoring From " + doctor_name, // subject
									html: "Hi " + name + "<br>This is invitation for Health monitoring on behalf of " + doctor_name + ". <br><br><b>Follow The Link To Complete Registration Process</b><br><br><strong>Url: <a href=" + url + ">Click Here</a></strong><br><strong>Authentication Code:</strong>" + code + "<br><br>Best Regards <br>UMCH Support" // body
								}, function(error, response) { //callback
									if (error) {
										console.log(error +'With Email => '+email);
									} else {
										console.log("Message sent : "+ response.message); 
									}

									smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
								});

								/*********************
								 **End email
								 ********************/

								console.log(data)
							})
							.error(function(err) {
								console.log("Error In Email corporate Employee => "+err);
							});


						/***************
						 **End Create user status with doctor
						 ****************/
						//console.log(name+"------------"+email+"-----------------"+userID+"================="+token);



					} else {

						var name = emp_name;
                        //console.log("inside employee name is ==>"+name); return false;
						var lastID = '';

						/****************
						 **Create user email status with doctor
						 *******************/
						var sql = "INSERT INTO professionalInvitation  (`professionalID`, `email`, `name`, `phone`, `emailSentDatTime` , `auth_code`) VALUES ('" + professionalID + "', '" + email + "', '" + name + "', '" + phone + "','" + emailSentDatTime + "', '" + code + "');";

						db.userillness.adduserillness(sql).then(function(response) {
								data["error"] = 0;
								data["authResponse"] = "User Invitation Added";
								var lastID = response;
								var url = "http://www.ourcheckup.com/accept_invitation.php?pi_id=" + lastID + "";
								/***************************
								 **Add Corporate Employee
								 **************************/
								var sql = "INSERT INTO corporateCompanyEmployee  (`professionalInvitationID`, `companyID`, `employeeID`,`branch`,`department`) VALUES ('" + lastID + "', '1', '" + employee_id + "', '" + branch + "', '" + department + "');";
								db.userillness.adduserillness(sql).then(function(response) {}).error(function(err) {
									res.json(err);
								});
								/***********************
								 **Email Notification
								 *************************/

								var nodemailer = require("nodemailer");

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
									subject: "Invitation For Health Monitoring From " + doctor_name, // subject
									html: "Hi <br>This is invitation for Health monitoring on behalf of " + doctor_name + ". <br><br><b>Follow The Link To Complete Registration Process</b><br><br><strong>Url: <a href=" + url + ">Click Here</a></strong><br><strong>Authentication Code:</strong>" + code + "<br><br>Best Regards <br>UMCH Support" // body
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

								console.log("corporate Email Sent => "+data);
							})
							.error(function(err) {
								console.log("Error on Corporate Employee Email =>"+err);
							});


						/***************
						 **End Create user status with doctor
						 ****************/

					}
				})
				.error(function(err) {
					console.log(err);
				});

		}).error(function(err) {
			console.log(err);
		});


	} else {
		data["error"] = 1;
		data["authResponse"] = "Please provide all required data (i.e : token, password  etc)";
		console.log(data);
		//connection.end()
	}

	return 'success';
}


///////////////========================Get corporate users ids=================================================/////////////////

exports.getcorporateuserIDlist = function(req, res) {
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
				

					db.allergy.get_corporate_users(userid).then(function(response) {
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

///////////////========================Get corporate users health details=================================================/////////////////

exports.get_corporate_users_details = function(req, res) {
	var userid = req.query.userid;
	var email_ids = req.query.email;
	var token = req.query.token;
	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function(response) {
				if (response != '' && response != null) {

					db.allergy.get_corporate_users_details(userid, email_ids).then(function(response) {
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

//////////////////////////==========Get corporate user summary ==================////////////////////////////////////
exports.get_corporate_users_health_summary = function(req, res) {
	var userid = req.query.userid;
	var email_ids = req.query.email;
	var token = req.query.token;
	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function(response) {
				if (response != '' && response != null) {

					db.allergy.get_corporate_users_health_summary(userid, email_ids).then(function(response) {
						 
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

//////////////////////////==========Get corporate user sleep details ==================////////////////////////////////////
exports.get_corporate_users_sleep = function(req, res) {
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

					db.allergy.get_corporate_users_sleep(userid).then(function(response) {
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

//////////////////////////==========setting corporate user care plan ==================////////////////////////////////////
exports.careplansetting_corporate = function(req, res) {

	var id = req.body.userid;
	var token = req.body.token;
	var viewOrder = req.body.viewOrder;
	var viewStatus = req.body.viewStatus;
	var portal_type = req.body.portal_type;
     
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
						var sqlinsert = "INSERT INTO carePlanSettings (`professionalID`, `viewOrder`, `viewStatus`, `portal_type`) VALUES ('" + id + "' ,'" + viewOrder + "', '" + viewStatus + "', '"+portal_type+"')";

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

////////////////////////===================== getting corporate user care plan ==========/////////////////////////////////////
exports.getcareplandisplay_corporate = function(req, res) {
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

////////////////////////===================== getting corporate user food intake summary  ==========/////////////////////////////////////
exports.get_corporate_users_food = function(req, res) {
	var userid = req.query.userid;
	var token = req.query.token;
	var dateTo = moment().format('YYYY-MM-DD');
    var dateFrom = moment().subtract(7,'d').format('YYYY-MM-DD');
    

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var email = response[0].email;

			if (!!token) {
				if (response != '' && response != null) {

					db.allergy.get_corporate_users_food(userid, dateFrom, dateTo).then(function(response) {

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

////////////////////////===================== getting corporate Rewards  ==========/////////////////////////////////////
exports.get_corporate_rewards = function(req, res) {
	var userid = req.query.userid;
	var token = req.query.token;
	var dateTo = moment().format('YYYY-MM-DD');
    var dateFrom = moment().subtract(7,'d').format('YYYY-MM-DD');
    

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var email = response[0].email;

			if (!!token) {
				if (response != '' && response != null) {

					db.allergy.get_rewards_details(userid).then(function(response) {

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

////////////////////////===================== getting corporate Rewards Activities  ==========/////////////////////////////////////
exports.get_rewards_activity = function(req, res) {
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

					db.allergy.get_rewards_activity().then(function(response) {

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



////////////////////////===================== update admin daily record ==========/////////////////////////////////////
exports.admin_deaily_records = function(req, res) {

    

	var data = {
		"error": 0,
		"authResponse": "Request Working"
	}

   
   res.json(data);
   return res;
};

////////////////////////===================== getting  reward_challangeActivityDetails Activities  ==========/////////////////////////////////////
exports.reward_challangeActivityDetails = function(req, res) {
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

					db.allergy.reward_challangeActivityDetails().then(function(response) {

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

//________________ Count target challange score______________________________________////
exports.countTargetChallengeScore = function(req, res) {
	var userid = req.query.userid;
	var token = req.query.token;
    var c_date=req.query.c_date;

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var email = response[0].email;
            var target_activity=5000;

			if (!!token) {
				if (response != '' && response != null) {
            var date = moment(c_date);
			var start_date=moment(date).isoWeekday(1).format("Y-MM-DD"); // Monday
            var end_date=moment(date).isoWeekday(7).format("Y-MM-DD");
             
             //console.log(start_date+' ------- '+end_date);
             db.allergy.countTargetChallengeSteps(start_date,end_date,userid).then(function(response) {
						var steps_taken=response[0].steps;
						console.log(steps_taken);
                        res.json(steps_taken+' ===> incomplete');
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




////////////////////////===================== getting  challengeScore Activities  ==========/////////////////////////////////////
exports.challengeScore = function(req, res) {
	var userid = req.query.userid;
	var token = req.query.token;
	var challenge_id=req.query.challenge_id;
    

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var email = response[0].email;

			if (!!token) {
				if (response != '' && response != null) {

					db.allergy.challengeScore(userid,challenge_id).then(function(response) {

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


exports.challengeScoreFinal = function(req, res) {
	var userid = req.query.userid;
	var token = req.query.token;
	var challenge_id=req.query.challenge_id;
    

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {

			var email = response[0].email;

			if (!!token) {
				if (response != '' && response != null) {

					db.allergy.challengeScoreFinal(userid,challenge_id).then(function(response) {

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
