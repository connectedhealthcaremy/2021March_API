'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');
var nodemailer = require("nodemailer");
var FCM = require('fcm-node');

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

	var userController = require('../../app/controllers/user');
	userController.recordRawData(userid, "insertBloodOxygenLevelData", "data : "+req.body.data+", parameters : []");



	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					var email = response[0].email;
					var firstName = response[0].firstName;
					var lastName = response[0].lastName;


                    var sqlDelete ="";
					var array_dateTime = '';  
					var sql = "Insert into oxygen(user,recordDateTime,pulse,oxygenlevel,notes,deviceStatus,deviceuuid, deviceid) values "; 

					for (var i = 0; i < total - 1; i++) {
						var record_date_time = data1[i].record_date_time;
						var oxygenlevel = data1[i].oxygenlevel;
						var pulse = data1[i].pulse;
						var notes = data1[i].notes;
						var deviceStatus = data1[i].deviceStatus;
                        var deviceuuid = data1[i].deviceuuid;
                        var deviceid = data1[i].deviceid;
                        if(deviceid == '' || deviceid === undefined){deviceid='';}
                        if(deviceuuid == '' || deviceuuid === undefined){deviceuuid='';}

                        array_dateTime+= "'"+record_date_time+"',";
						sql += "('" + email + "','" + record_date_time + "','" + pulse + "','" + oxygenlevel + "','" + notes + "','" + deviceStatus + "','" + deviceuuid + "', '"+deviceid+"'),";

						/////oxygen_alert(userid, email, firstName, lastName, oxygenlevel, pulse, record_date_time);

						sql = sql.substr(0, sql.length);
					}
					var record_date_time = data1[total - 1].record_date_time;
					var oxygenlevel = data1[total - 1].oxygenlevel;
					var pulse = data1[total - 1].pulse;
					var notes = data1[total - 1].notes;
					var deviceStatus = data1[total - 1].deviceStatus;
					var deviceuuid = data1[total - 1].deviceuuid;
					var deviceid = data1[total - 1].deviceid;
                    if(deviceid == '' || deviceid === undefined){deviceid='';}
                    if(deviceuuid == '' || deviceuuid === undefined){deviceuuid='';}


                    array_dateTime+= "'"+record_date_time+"'";
					sql += "('" + email + "','" + record_date_time + "','" + pulse + "','" + oxygenlevel + "','" + notes + "','" + deviceStatus + "','" + deviceuuid + "', '"+deviceid+"')";

					///////oxygen_alert(userid, email, firstName, lastName, oxygenlevel, pulse, record_date_time);
                    
                    /*********** Delete The Existing record ****************/
                    sqlDelete = "DELETE FROM oxygen where recordDateTime IN  ("+array_dateTime+")";
                    /********** End Delete *********************************/ 
                    
                    ///db.oxygen.delete_oxygen(sqlDelete).then(function(response) {

					db.oxygen.addoxygen(sql).then(function(response) {

						var lastid = response;
						db.oxygen.lastAddsID(lastid).then(function(response) {

							data["error"] = 0;
							data["authResponse"] = "Blood oxygen save Successfully";
							data["id"] = response;
							/////////send alert if the reading is abnormal
							///post_oxygen_alert(response);
                            ///remove_duplicate_oxygen();
                            
							res.json(data);
						}).error(function(err) {
							res.json(err);
						});


					}).error(function(err) {
						res.json(err);
					});

				///});///End Delete here


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

function remove_duplicate_oxygen(){   

	var runner = require("child_process");
	var phpScriptPath = __dirname+"/../phpFiles/remove_oxygen.php";   
	var argsString = "1"+","+"1";
	runner.exec("php " + phpScriptPath + " " +argsString, function(err, phpResponse, stderr) {
	if(err) console.log(err); /* log error */
	console.log( phpResponse );
	});

}

///////////////====================Get Details based on IDs and Post Oxygen alert ==================================================//////////////////
function post_oxygen_alert(id_array){


		id_array.forEach(function(value) {
         
         db.oxygen.getoxygenPostDetails(value.id).then(function(response){
   
         	oxygen_alert(response[0].userID,
         	         response[0].email,
         	         response[0].firstName,
         	         response[0].lastName,
         	         response[0].oxygenlevel,
         	         response[0].pulse,
         	         response[0].recordDateTime);   

         }).error(function(err) {
				  console.log(err);
		 });

		});

}

///////////////========================Oxygen Alert for measurement=================================================/////////////////
function oxygen_alert(userid, email, firstName, lastName, oxygenlevel, pulse, record_date_time) {

    var moment = require('moment');
    record_date_time=moment.utc(record_date_time).format("YYYY-MM-DD HH:mm:ss");
    
	db.oxygen.checkgoaloxygen(userid).then(function(response) {

		if (response != '' && response) {

			var goalOxygen_Start = response[0].goalOxygen_Start;
			var goalOxygen_End = response[0].goalOxygen_End;

			if (oxygenlevel < goalOxygen_Start || oxygenlevel > goalOxygen_End) {
				oxygen_email_alert(email, firstName, lastName, oxygenlevel, pulse, record_date_time, goalOxygen_Start, goalOxygen_End);
				sendAndroidNotification(email);
				///get all next of kin
				db.bp.getfamilyEmails(userid).then(function(response) {


					response.forEach(function(response, index) {
						///Send Emails To Next Of Kin
						oxygen_email_alert(response.email, firstName, lastName, oxygenlevel, pulse, record_date_time, goalOxygen_Start, goalOxygen_End);
						sendAndroidNotification(response.email);

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
				sendAndroidNotification(email);

				///get all next of kin
				db.bp.getfamilyEmails(userid).then(function(response) { 


					response.forEach(function(response, index) {
						///Send Emails To Next Of Kin
						oxygen_email_alert(response.email, firstName, lastName, oxygenlevel, pulse, record_date_time, goalOxygen_Start, goalOxygen_End);
						sendAndroidNotification(response.email);

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

///////////////==========================Send Email ALerts for oxyge measurements============================/////////////

function oxygen_email_alert(email, firstName, lastName, oxygenlevel, pulse, record_date_time, goalOxygen_Start, goalOxygen_End) {

	var date_time = record_date_time.split(' ');
	var date = date_time[0].split('-');
	var record_time = date[2] + "-" + date[1] + "-" + date[0] + " " + date_time[1];

	add_notification_db_next_kin(email, firstName, lastName, oxygenlevel, pulse, record_date_time, goalOxygen_Start, goalOxygen_End);

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

///////////////========================Add Notification to database for Next Of Kin===========================================================//////////////////////

function add_notification_db_next_kin(email, firstName, lastName, oxygenlevel, pulse, record_date_time, goalOxygen_Start, goalOxygen_End) {

	///8022=chief team userid 
	db.user.checkByname(email).then(function(response) {
			var userids = response[0].userID;

			var sub = "Health Alert : " + firstName + " " + lastName + " has abnormal Blood Oxygen at " + record_date_time; 
			var body = firstName + " " + lastName + " Blood oxygen Readings are not in control:<br><b>Blood Oxygen </b> : " + oxygenlevel + " % <br><b>pulse : </b>" + pulse + " bpm <br><br>Recommended blood oxygen range: <br><b>Blood oxygen (%)</b> :  " + goalOxygen_Start + " - " + goalOxygen_End + "<br>";
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

///////////////========================Push Notification For Abnormal Blood Oxygen=================================================/////////////////
function sendAndroidNotification(email) {

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

					var subject = response[0].firstName + ' ' + response[0].lastName + " has abnormal Blood Oxygen.";

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