'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');
var nodemailer = require("nodemailer");
var FCM = require('fcm-node');

//============================================Add user hear rate============================================/////////////////
exports.addhearrate = function(req, res) {
	console.log("_____________________________________  Heart Rate Sync  _________________________________________");
	//console.log("heartrate data 1 : ", req.body.data);
	console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>_________________________>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
   var moment = require('moment');
   var current_date_time = new moment ().format("YYYY-MM-DD HH:mm:ss");
   var email_sent_time_difference=60;

	var userid = req.body.userid;
	var token = req.body.token;
	var data1 = req.body.data;
	console.log("userid : ",userid);
	console.log("token : ", token);
	//console.log("data1 : ", data1);
	data1 = JSON.parse(data1);
	var uuid = data1[0].deviceuuid;
	var total = data1.length;
	var startDate = data1[0].recordDateTime;
	var data = {
		"error": 0,
		"authResponse": ""
	}
	if(uuid ==null || typeof uuid =="undefined"){
		uuid = "NoUUID";
	}
	console.log("uuid : ", uuid );

	var userController = require('../../app/controllers/user');
	//userController.recordRawData(userid, "addheartrate", "data : "+req.body.data+", parameters : []");




	//heartRateType 0=resting heart rate, 1= active heart rate
	// heartrate data 1 : 

	//[{"deviceid":"Postman","devicetype":19,"deviceuuid":"Postman","email":"","entryType":1,"heartRateID":5185756,"heartRateQty":79,"heartRateType":0,"isUploadedToWeb":0,"notes":"","recordDate":"","recordDateTime":"2020-09-17 11:00:00","sectionheader":false,"serverid":0,"userID":12844},{"deviceid":"Postman","devicetype":19,"deviceuuid":"Postman","email":"","entryType":1,"heartRateID":5185757,"heartRateQty":59,"heartRateType":0,"isUploadedToWeb":0,"notes":"","recordDate":"","recordDateTime":"2020-09-17 12:00:00","sectionheader":false,"serverid":0,"userID":12856}]


	db.user.authUser(token).then(function(response) {
		if (!!token) {
			if (response != '' && response != null) {

					var email = response[0].email;
					var firstName = response[0].firstName;
					var lastName = response[0].lastName;
                    
                    var array_dateTime = '';
                    var sqlDelete ="";
					var sql = "INSERT INTO heartrate (userID , heartRateQty, recordTime,deviceStatus , notes, heartRateType , deviceuuid , deviceid ) values ";
					var sequal = "INSERT INTO heartrate (userID , heartRateQty, recordTime,deviceStatus , notes, heartRateType , deviceuuid , deviceid ) values ";

					
				db.heartrate.check_newDevice(userid,uuid).then( (checkResponse) =>{
					if(checkResponse.length == 0){//new device
						console.log("heart rate - new device");
						console.log("checkResponse : ", checkResponse);
						console.log("checkResponse.length : ", checkResponse.length);


						for (var i = 0; i < total; i++) {
							var datetimestr = data1[i].recordDateTime;
							var dateStr = datetimestr.slice(0,10);
							var timeStr = datetimestr.slice(11,19);
							var formatedstartDateTime = Date.parse(dateStr+"T"+timeStr);

								var heartRateQty = data1[i].heartRateQty;
								var recordDateTime = data1[i].recordDateTime;
								var deviceStatus = data1[i].deviceStatus;
								if(typeof deviceStatus === 'undefined' || deviceStatus=='' || deviceStatus== null){deviceStatus='';}
								var notes = data1[i].notes;
								if(notes =='' || notes==null){notes='';}
								var heartRateType = data1[i].heartRateType;
								var deviceuuid = data1[i].deviceuuid;
								if(deviceuuid =='' || deviceuuid==null){deviceuuid='NoUUID';}
								var deviceid = data1[i].deviceid;
								if(deviceid =='' || deviceid==null){deviceid='NoDeviceID';}
								//deviceid

								array_dateTime+= "'"+recordDateTime+"',";
								sql += "('" + userid + "','" + heartRateQty + "','" + recordDateTime + "','" + deviceStatus + "','" + notes + "', '" + heartRateType + "', '" + deviceuuid + "', '"+deviceid+"'),";
							
								sql = sql.substr(0, sql.length);

						}

						var notify_sql="INSERT INTO heart_rate_notify_check (userID , first_request, last_request,first_last_request_time_difference , sent) values ('" + userid + "','"+current_date_time+"','"+current_date_time+"','0','1')";
					

						db.heartrate.checkheart_rate_notify_check(userid).then(function(response){
						
							if(response==''){
								
								///no previous record

								db.heartrate.addheartrate(notify_sql).then(function(response) {
							
								}).error(function(err) {
									res.json(err);
								});

								/////Email Notification Send
								//hrate_alert(userid, email, firstName, lastName, heartRateQty, recordDateTime);
							

							}
							else
							{

								var diff_in_seconds=response[0].diff;
							
								//console.log(diff_in_seconds+"======in seconds======");
						
								if(diff_in_seconds < email_sent_time_difference)
								{

									var update_Request_sql="UPDATE heart_rate_notify_check SET last_request='"+current_date_time+"' where userID='"+userid+"' ";

									db.heartrate.update_last_request(update_Request_sql).then(function(response) {
									}).error(function(err) {
									res.json(err);
									});


								}
								else
								{
								////sent email if the difference is greater then 60

								///hrate_alert(userid, email, firstName, lastName, heartRateQty, recordDateTime);

								}

							}

						}).error(function(err) {
								res.json(err);
						});


						/*********** Delete The Existing record ****************/
						//sqlDelete = "DELETE FROM heartrate where recordTime IN  ("+array_dateTime+")";
						/********** End Delete *********************************/ 
					
						/****************
						**start insertion data 
						*****************/
						console.log("sql ; ", sql);
						console.log("sequal : ", sequal);
						if(sql != sequal){
							sql = sql.slice(0, sql.length - 1)+";";
							console.log("2. sql : ", sql);
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
						}



					}else {
					// existing device
					console.log("heart rate - existing device");
					db.heartrate.getLatestRecord(userid,uuid).then((getLatestRecordResponse) => {
						var maxTime = getLatestRecordResponse[0].maxTime;

						console.log("getLatestRecordResponse[0].maxTime : ", getLatestRecordResponse[0].maxTime);

							let dateObj = maxTime;
							var parsedMaxTime = Date.parse(dateObj);

							console.log("dateObj : ", dateObj);

							//Formating Date
							dateObj = new Date(dateObj);
							var y = dateObj.getFullYear();
							var m = dateObj.getMonth()+1;
							console.log("month1 : ",m);
							if(m<"10"){m='0'+m;}
							var d = dateObj.getDate();
							if(d<"10"){d='0'+d;}
							var h = dateObj.getHours();
							if(h<"10"){h='0'+h;}
							var i = dateObj.getMinutes();
							if(i<"10"){i='0'+i;}
							var s = dateObj.getSeconds();
							if(s<"10"){s='0'+s;}
							var maxTimeString = y + "-" + m + "-" + d + " " + h + ":" + i + ":" + s;

						for (var i = 0; i < total; i++) {
							var datetimestr = data1[i].recordDateTime;
							var dateStr = datetimestr.slice(0,10);
							var timeStr = datetimestr.slice(11,19);
							var formatedstartDateTime = Date.parse(dateStr+"T"+timeStr);

							//console.log("parsedMaxTime : "+parsedMaxTime+" < formatedstartDateTime : "+formatedstartDateTime);
							if(parsedMaxTime < formatedstartDateTime){
								var heartRateQty = data1[i].heartRateQty;
								var recordDateTime = data1[i].recordDateTime;
								var deviceStatus = data1[i].deviceStatus;
								if(typeof deviceStatus === 'undefined' || deviceStatus=='' || deviceStatus== null){deviceStatus='';}
								var notes = data1[i].notes;
								if(notes =='' || notes==null){notes='';}
								var heartRateType = data1[i].heartRateType;
								var deviceuuid = data1[i].deviceuuid;
								if(deviceuuid =='' || deviceuuid==null){deviceuuid='NoUUID';}
								var deviceid = data1[i].deviceid;
								if(deviceid =='' || deviceid==null){deviceid='NoDeviceID';}
								//deviceid

								array_dateTime+= "'"+recordDateTime+"',";
								sql += "('" + userid + "','" + heartRateQty + "','" + recordDateTime + "','" + deviceStatus + "','" + notes + "', '" + heartRateType + "', '" + deviceuuid + "', '"+deviceid+"'),";
							
								sql = sql.substr(0, sql.length);

							}else{
								//console.log(" HeartRate - skip : { 'recordDateTime' : '"+data1[i].recordDateTime+"' } , ");
							}
						}

						/****************
						**start insertion data 
						*****************/
						console.log("sql ; ", sql);
						console.log("sequal : ", sequal);
						if(sql != sequal){
							sql = sql.slice(0, sql.length - 1)+";";
							console.log("2. sql : ", sql);
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
						}
						

						/*
						var heartRateQty = data1[total - 1].heartRateQty;
						var recordDateTime = data1[total - 1].recordDateTime;
						var deviceStatus = data1[total - 1].deviceStatus;

						if(typeof deviceStatus === 'undefined' || deviceStatus=='' || deviceStatus== null){deviceStatus='';}
						var notes = data1[total - 1].notes;
						if(typeof notes === 'undefined' || notes =='' || notes==null){notes='';}

						var heartRateType = data1[total - 1].heartRateType;
						var deviceuuid = data1[total - 1].deviceuuid;
						if(typeof deviceuuid === 'undefined' || deviceuuid =='' || deviceuuid==null){deviceuuid='NoUUID';}
						var deviceid = data1[total - 1].deviceid;
						if(deviceid =='' || deviceid==null){deviceid='NoDeviceID';}
						
						array_dateTime+= "'"+recordDateTime+"'";
						sql += "('" + userid + "','" + heartRateQty + "','" + recordDateTime + "','" + deviceStatus + "','" + notes + "', '" + heartRateType + "', '" + deviceuuid + "','"+deviceid+"')";

						///request check to control bulk email notifications

					
						////console.log("current_date_time:"+current_date_time+"::===>Time Difference:"+email_sent_time_difference);
						*/

						


						//}); //// End Delete existing record

					}).error(function(err) {
						res.json(err);
					});

				}
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

function remove_duplicate_heartrate(){   
console.log(':::::::::::::::::::: Heart Rate Removal Working');
	var runner = require("child_process");
	var phpScriptPath = __dirname+"/../phpFiles/remove_hearRate.php";   
	var argsString = "1"+","+"1";
	runner.exec("php " + phpScriptPath + " " +argsString, function(err, phpResponse, stderr) {
	if(err) console.log(err); /* log error */
	console.log( phpResponse );
	});

}

///////////////====================Get Details based on IDs and Post Heart Rate alerts ==================================================//////////////////
function post_hr_alert(id_array){


		id_array.forEach(function(value) {
         
         db.heartrate.getHRPostDetails(value.id).then(function(response){
   
         	hrate_alert(response[0].userID,
         	            response[0].email,
         	            response[0].firstName,
         	            response[0].lastName,
         	            response[0].heartRateQty,
         	            response[0].recordTime 
         	            );    

         }).error(function(err) {
				  console.log(err);
		 });

		});

}

///////////////========================Heart Rate Alert for measurement=================================================/////////////////
function hrate_alert(userid, email, firstName, lastName, heartRateQty, recordDateTime) {

     var moment = require('moment');
     recordDateTime=moment.utc(recordDateTime).format("YYYY-MM-DD HH:mm:ss"); 

	db.heartrate.checkgoalheartrate(userid).then(function(response) {

		if (response != '' && response) {

			var goalHeartRate_Start = response[0].goalHeartRate_Start;
			var goalHeartRate_End = response[0].goalHeartRate_End;

			if (heartRateQty < goalHeartRate_Start || heartRateQty > goalHeartRate_End) {

				hrate_email_alert(email, firstName, lastName, heartRateQty, recordDateTime, goalHeartRate_Start, goalHeartRate_End);
				sendAndroidNotification(email);

				///get all next of kin
				db.bp.getfamilyEmails(userid).then(function(response) {


					response.forEach(function(response, index) {
						///Send Emails To Next Of Kin
						hrate_email_alert(response.email, firstName, lastName, heartRateQty, recordDateTime, goalHeartRate_Start, goalHeartRate_End);
						sendAndroidNotification(response.email);

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
				sendAndroidNotification(email);

				///get all next of kin
				db.bp.getfamilyEmails(userid).then(function(response) {


					response.forEach(function(response, index) {
						///Send Emails To Next Of Kin
						hrate_email_alert(response.email, firstName, lastName, heartRateQty, recordDateTime, goalHeartRate_Start, goalHeartRate_End);
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

///////////////==========================Send Email ALerts for heart rate measurements============================/////////////

function hrate_email_alert(email, firstName, lastName, heartRateQty, recordDateTime, goalHeartRate_Start, goalHeartRate_End) {

   
   add_notification_db_next_kin(email, firstName, lastName, heartRateQty, recordDateTime, goalHeartRate_Start, goalHeartRate_End);

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
			pass: "um1328ch"
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

///////////////========================Add Notification to database for Next Of Kin===========================================================//////////////////////

function add_notification_db_next_kin(email, firstName, lastName, heartRateQty, recordDateTime, goalHeartRate_Start, goalHeartRate_End) {

	///8022=chief team userid
	db.user.checkByname(email).then(function(response) {
			var userids = response[0].userID;

			var sub = "Health Alert : " + firstName + " " + lastName + " has abnormal Heart Rate at " + recordDateTime; 
			var body = firstName + " " + lastName + " heart rate readings are not in control:<br><b>Heart Rate </b> : " + heartRateQty + " bpm  <br><br>Recommended heart rate range: <br><b>Heart Rate (bpm)</b> :  " + goalHeartRate_Start + " - " + goalHeartRate_End + "<br>";
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

///////////////========================Push Notification For Abnormal Heart Rate=================================================/////////////////
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

					var subject = response[0].firstName + ' ' + response[0].lastName + " has abnormal Heart Rate.";

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
