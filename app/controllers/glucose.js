'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');
var nodemailer = require("nodemailer");
var FCM = require('fcm-node');
var moment = require('moment');

//============================================Add user Glucose goal============================================/////////////////
exports.addglucosegoal = function(req, res) {

	var userid = req.body.userid;
	var token = req.body.token;

	var data1 = req.body.data;
	data1 = JSON.parse(data1);
	var total = data1.length;
	var data = {
		"error": 0,
		"authResponse": ""
	}


	if(total>0){
		db.user.authUser(token).then(function(response) {
				if (!!token) {
					if (response != '' && response != null) {

						db.glucose_goal.checkgoal(userid).then(function(response) {

							if (response != '' && response != null) {


								var id = response[0].id;

								if (!!id) {

									/************************
									 ***Update Glucose Values
									*************************/
									var sql = "UPDATE glucose_goal SET ";


									for (var i = 0; i < total - 1; i++) {
										var goalBloodGlucose_Start_BM = data1[i].goalBloodGlucose_Start_BM;
										var goalBloodGlucose_Start_AM = data1[i].goalBloodGlucose_Start_AM;
										var goalBloodGlucose_Start_BT = data1[i].goalBloodGlucose_Start_BT;
										var goalBloodGlucose_End_BM = data1[i].goalBloodGlucose_End_BM;
										var goalBloodGlucose_End_AM = data1[i].goalBloodGlucose_End_AM;
										var goalBloodGlucose_End_BT = data1[i].goalBloodGlucose_End_BT;
										var notification = data1[i].notification;
										//sql += "('" + userid + "','" + goalBloodGlucose_Start_BM + "','" + goalBloodGlucose_Start_AM + "','" + goalBloodGlucose_Start_BT + "','" + goalBloodGlucose_End_BM + "','" + goalBloodGlucose_End_AM + "','" + goalBloodGlucose_End_BT + "'),";

										sql = sql.substr(0, sql.length);
									}

									var goalBloodGlucose_Start_BM = data1[total - 1].goalBloodGlucose_Start_BM;
									var goalBloodGlucose_Start_AM = data1[total - 1].goalBloodGlucose_Start_AM;
									var goalBloodGlucose_Start_BT = data1[total - 1].goalBloodGlucose_Start_BT;
									var goalBloodGlucose_End_BM = data1[total - 1].goalBloodGlucose_End_BM;
									var goalBloodGlucose_End_AM = data1[total - 1].goalBloodGlucose_End_AM;
									var goalBloodGlucose_End_BT = data1[total - 1].goalBloodGlucose_End_BT;
									var notification = data1[total - 1].notification;

									sql += "goalBloodGlucose_Start_BM='" + goalBloodGlucose_Start_BM + "',goalBloodGlucose_Start_AM='" + goalBloodGlucose_Start_AM + "',goalBloodGlucose_Start_BT='" + goalBloodGlucose_Start_BT + "',goalBloodGlucose_End_BM='" + goalBloodGlucose_End_BM + "',goalBloodGlucose_End_AM='" + goalBloodGlucose_End_AM + "',goalBloodGlucose_End_BT='" + goalBloodGlucose_End_BT + "',notification='" + notification + "'  WHERE id='" + id + "'; ";


									db.glucose_goal.updateglucosegoal(sql).then(function(response) {

										data["error"] = 0;
										data["authResponse"] = "Glucose goal Updated Successfully";
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
								var sql = "INSERT INTO glucose_goal (userID,goalBloodGlucose_Start_BM,goalBloodGlucose_Start_AM, goalBloodGlucose_Start_BT, goalBloodGlucose_End_BM, goalBloodGlucose_End_AM, goalBloodGlucose_End_BT, notification) values ";

								for (var i = 0; i < total - 1; i++) {
									var goalBloodGlucose_Start_BM = data1[i].goalBloodGlucose_Start_BM;
									var goalBloodGlucose_Start_AM = data1[i].goalBloodGlucose_Start_AM;
									var goalBloodGlucose_Start_BT = data1[i].goalBloodGlucose_Start_BT;
									var goalBloodGlucose_End_BM = data1[i].goalBloodGlucose_End_BM;
									var goalBloodGlucose_End_AM = data1[i].goalBloodGlucose_End_AM;
									var goalBloodGlucose_End_BT = data1[i].goalBloodGlucose_End_BT;
									var notification= data1[i].notification;
									sql += "('" + userid + "','" + goalBloodGlucose_Start_BM + "','" + goalBloodGlucose_Start_AM + "','" + goalBloodGlucose_Start_BT + "','" + goalBloodGlucose_End_BM + "','" + goalBloodGlucose_End_AM + "','" + goalBloodGlucose_End_BT + "','"+notification+"'),";

									sql = sql.substr(0, sql.length);
								}

								var goalBloodGlucose_Start_BM = data1[total - 1].goalBloodGlucose_Start_BM;
								var goalBloodGlucose_Start_AM = data1[total - 1].goalBloodGlucose_Start_AM;
								var goalBloodGlucose_Start_BT = data1[total - 1].goalBloodGlucose_Start_BT;
								var goalBloodGlucose_End_BM = data1[total - 1].goalBloodGlucose_End_BM;
								var goalBloodGlucose_End_AM = data1[total - 1].goalBloodGlucose_End_AM;
								var goalBloodGlucose_End_BT = data1[total - 1].goalBloodGlucose_End_BT;
								var notification = data1[total - 1].notification;
								sql += "('" + userid + "','" + goalBloodGlucose_Start_BM + "','" + goalBloodGlucose_Start_AM + "','" + goalBloodGlucose_Start_BT + "','" + goalBloodGlucose_End_BM + "','" + goalBloodGlucose_End_AM + "','" + goalBloodGlucose_End_BT + "','"+notification+"')";


								db.glucose_goal.addglucosegoal(sql).then(function(response) {

									data["error"] = 0;
									data["authResponse"] = "Glucose goal Added Successfully";
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

	}else{
		data["error"] = 0;
		data["authResponse"] = "No data is sent. data1.length : ${total}";
		res.json(data);
		return res;
	}
};

///////////====================================Update Glucose goal=======================================////////////////////////

exports.updateglucosegoal = function(req, res) {
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

					//var email=response;

					for (var i = 0; i < total - 1; i++) {
						var glucose_form = data1[i].glucose_form;
						var glucose_to = data1[i].glucose_to;
						var id = data1[i].id;

						var sql = "UPDATE glucose_goal SET glucose_from='" + glucose_form + "',glucose_to='" + glucose_to + "' WHERE id='" + id + "'; ";
						db.glucose_goal.updateglucosegoal(sql).then(function(response) {

						}).error(function(err) {
							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}
					var glucose_form = data1[total - 1].glucose_form;
					var glucose_to = data1[total - 1].glucose_to;
					var id = data1[total - 1].id;


					var sql = "UPDATE glucose_goal SET glucose_from='" + glucose_form + "',glucose_to='" + glucose_to + "' WHERE id='" + id + "'; ";

					db.glucose_goal.updateglucosegoal(sql).then(function(response) {

					}).error(function(err) {
						res.json(err);
					});

					data["error"] = 0;
					data["authResponse"] = "Glucose goal Updated Successfully";
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

///////////===================================Delete Glucose Goal=======================================///////////////////////
exports.deleteglucosegoal = function(req, res) {
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

					//var email=response;

					for (var i = 0; i < total - 1; i++) {
						var id = data1[i].id;

						var sql = "DELETE FROM glucose_goal  WHERE id='" + id + "'; ";
						db.glucose_goal.deleteglucosegoal(sql).then(function(response) {

						}).error(function(err) {
							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}

					var id = data1[total - 1].id;


					var sql = "DELETE FROM glucose_goal WHERE id='" + id + "'; ";

					db.glucose_goal.deleteglucosegoal(sql).then(function(response) {

					}).error(function(err) {
						res.json(err);
					});

					data["error"] = 0;
					data["authResponse"] = "Glucose goal Updated Successfully";
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

///////////////========================Get Glucose goal Data=================================================/////////////////

exports.getglucosegoal = function(req, res) {
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
					db.glucose_goal.getglucosegoal(userid).then(function(response) {
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

//============================================Add user Glucose ============================================/////////////////
exports.addglucose = function(req, res) {
	console.log("Enter addglucose controller");
	var userid = req.body.userid;
	var token = req.body.token;
	var data1 = req.body.data;
	var data = {
		"error": 0,
		"authResponse": ""
	}
	console.log("addglucose's data1 : ", data1);
	console.log("addglucose's typeof data1 : ", typeof data1);


	if(data1.length > 0){
		var userController = require('../../app/controllers/user');
		userController.recordRawData(userid, "insertBloodGlucoseLevel", "data : "+req.body.data+", parameters : []");


		if(typeof data1 == "undefined" || data1 == undefined){
			console.log("skip -> data1 : ", data1);

			data["error"] = 0 ;
			data["authResponse"] = "No data is sent";
			res.json(data);
			return res;
		}else{
			

		data1 = JSON.parse(data1);
		var total = data1.length;

			db.user.authUser(token).then(function(response) {
					if (!!token) {
						if (response != '' && response != null) {

							var email = response[0].email;
							var username = response[0].username;

							var firstName = response[0].firstName;
							var lastName = response[0].lastName;


							var sqlDelete ="";
							var array_dateTime = '';
							var sql = "INSERT INTO glucose(user,glucoselevel,recordDateTime,mealtype,notes,deviceStatus,unit,deviceuuid,deviceid)  values ";
							console.log("before enter for loop");
							for (var i = 0; i < total - 1; i++) {
								var glucose_level = data1[i].glucose_level;
								console.log("GlucoseLvl : " + glucose_level);
								glucose_level = Math.round(glucose_level * 100) / 100;
								var record_datetime = data1[i].record_datetime;
								var meal_type = data1[i].meal_type;
								var notes = data1[i].notes;
								var deviceStatus = data1[i].deviceStatus;
								var unit = data1[i].unit;
								var deviceuuid = data1[i].deviceuuid;
								var deviceid = data1[i].deviceid;

								if(unit == '' || unit === undefined){unit='mmol/L';} 
								if(deviceuuid == '' || deviceuuid === undefined){deviceuuid='';} 
								if(deviceid == '' || deviceid === undefined){deviceid='';} 
								
								array_dateTime+= "'"+record_datetime+"',";
								sql += "('" + username + "','" + glucose_level + "','" + record_datetime + "','" + meal_type + "','" + notes + "','" + deviceStatus + "','" + unit + "','" + deviceuuid + "','" + deviceid + "'),";

								///bg_alert(userid, email, firstName, lastName, glucose_level, record_datetime, meal_type); 

								sql = sql.substr(0, sql.length);
							}
							var glucose_level = data1[total - 1].glucose_level;
							glucose_level = Math.round(glucose_level * 100) / 100;
							var record_datetime = data1[total - 1].record_datetime;
							var meal_type = data1[total - 1].meal_type;
							var notes = data1[total - 1].notes;
							var deviceStatus = data1[total - 1].deviceStatus;
							var unit = data1[total - 1].unit;
							var deviceuuid = data1[total - 1].deviceuuid;
							var deviceid = data1[total - 1].deviceid;

							if(unit == '' || unit === undefined){unit='mmol/L';}
							if(deviceuuid == '' || deviceuuid === undefined){deviceuuid='';} 
							if(deviceid == '' || deviceid === undefined){deviceid='';} 

							array_dateTime+= "'"+record_datetime+"'";
							sql += "('" + username + "','" + glucose_level + "','" + record_datetime + "','" + meal_type + "','" + notes + "','" + deviceStatus + "','" + unit + "','" + deviceuuid + "','" + deviceid + "')";

							///bg_alert(userid, email, firstName, lastName, glucose_level, record_datetime, meal_type);
							
							
							/*********** Delete The Existing record ****************/
							sqlDelete = "DELETE FROM glucose where recordDateTime IN  ("+array_dateTime+")";
							/********** End Delete *********************************/ 
						// db.glucose.delete_Glucose(sqlDelete).then(function(response) {
								
							db.glucose.addglucose(sql).then(function(response) {
							///get last inserted ids

								var lastinsertid = response;
								db.glucose.lastaddIDs(lastinsertid).then(function(response) { 

									data["error"] = 0;
									data["authResponse"] = "Glucose Added Successfully";
									data['id'] = response;

									///post_bg_alert(response);
									///remove_duplicate_glucose();
									
									res.json(data);
								}).error(function(err) {
									res.json(err);
								});


							}).error(function(err) {
								res.json(err);
							});

						//}); ////End Delete operation



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
		}



		return res;
	
	}
}


function remove_duplicate_glucose(){   
console.log(':::::::::::::::::::: Glucose Removal Working');
	var runner = require("child_process");
	var phpScriptPath = __dirname+"/../phpFiles/remove_glucose.php";   
	var argsString = "1"+","+"1";
	runner.exec("php " + phpScriptPath + " " +argsString, function(err, phpResponse, stderr) {
	if(err) console.log(err); /* log error */
	console.log( phpResponse );
	});

}

///////////////====================Get Details based on IDs and Post Blood glucose alert ==================================================//////////////////
function post_bg_alert(id_array){


		id_array.forEach(function(value) {
         
         db.glucose.getBGPostDetails(value.id).then(function(response){
   
         	bg_alert(response[0].userID,
         	         response[0].email,
         	         response[0].firstName,
         	         response[0].lastName,
         	         response[0].glucoselevel,
         	         response[0].recordDateTime,
         	         response[0].mealtype);   

         }).error(function(err) {
				  console.log(err);
		 });

		});

}

///////////////========================Alert For Blood Glucose=================================================/////////////////

function bg_alert(userid, user_email, firstName, lastName, glucose_level, record_datetime, meal_type) {

	if (meal_type == 'Fasting' || meal_type == 'BeforeMeal') {
		///Before Meal or fasting  check the goals
		db.glucose_goal.checkgoal(userid).then(function(response) {

			if (response != '' && response) {
				var goalBloodGlucose_Start_BM = (response[0].goalBloodGlucose_Start_BM == '0.00') ? 4.40 : response[0].goalBloodGlucose_Start_BM;
				var goalBloodGlucose_End_BM = (response[0].goalBloodGlucose_End_BM == '0.00') ? 7.00 : response[0].goalBloodGlucose_End_BM;
				var goalBloodGlucose_Start_AM = (response[0].goalBloodGlucose_Start_AM == '0.00') ? 4.40 : response[0].goalBloodGlucose_Start_AM;
				var goalBloodGlucose_End_AM = (response[0].goalBloodGlucose_End_AM == '0.00') ? 8.50 : response[0].goalBloodGlucose_End_AM;


				if (parseFloat(glucose_level) < parseFloat(goalBloodGlucose_Start_BM) || parseFloat(glucose_level) > parseFloat(goalBloodGlucose_End_BM)) {
					///send email to user himself
					bg_email_alert(user_email, firstName, lastName, record_datetime, glucose_level, goalBloodGlucose_Start_BM, goalBloodGlucose_End_BM, goalBloodGlucose_Start_AM, goalBloodGlucose_End_AM, meal_type);
					/////send push notification
					sendAndroidNotification(user_email);
					///add notifications to database
					add_notification_db(userid, user_email, firstName, lastName, record_datetime, glucose_level, goalBloodGlucose_Start_BM, goalBloodGlucose_End_BM, goalBloodGlucose_Start_AM, goalBloodGlucose_End_AM, meal_type)

					///get user Family Emails Emails
					db.bp.getfamilyEmails(userid).then(function(response) {


						response.forEach(function(response, index) {
							///Send Emails To Next Of Kin
							bg_email_alert(response.email, firstName, lastName, record_datetime, glucose_level, goalBloodGlucose_Start_BM, goalBloodGlucose_End_BM, goalBloodGlucose_Start_AM, goalBloodGlucose_End_AM, meal_type);
							/////send push notification
							sendAndroidNotification(response.email);
						});

					}).error(function(err) {
						res.json(err);
					});

				}


			} else {

				var goalBloodGlucose_Start_BM = 4.40;
				var goalBloodGlucose_End_BM = 7.00;
				var goalBloodGlucose_Start_AM = 4.40;
				var goalBloodGlucose_End_AM = 8.50;

				if (parseFloat(glucose_level) < parseFloat(goalBloodGlucose_Start_BM) || parseFloat(glucose_level) > parseFloat(goalBloodGlucose_End_BM)) {
					///no Next of kin found and send email to user himself
					bg_email_alert(user_email, firstName, lastName, record_datetime, glucose_level, goalBloodGlucose_Start_BM, goalBloodGlucose_End_BM, goalBloodGlucose_Start_AM, goalBloodGlucose_End_AM, meal_type);
					/////send push notification
					sendAndroidNotification(user_email);
					///add notifications to database
					add_notification_db(userid, user_email, firstName, lastName, record_datetime, glucose_level, goalBloodGlucose_Start_BM, goalBloodGlucose_End_BM, goalBloodGlucose_Start_AM, goalBloodGlucose_End_AM, meal_type)

					///get user Emails of next of kin
					db.bp.getfamilyEmails(userid).then(function(response) {


						response.forEach(function(response, index) {
							///Send Emails To Next Of Kin
							bg_email_alert(response.email, firstName, lastName, record_datetime, glucose_level, goalBloodGlucose_Start_BM, goalBloodGlucose_End_BM, goalBloodGlucose_Start_AM, goalBloodGlucose_End_AM, meal_type);
							/////send push notification
							sendAndroidNotification(response.email);
							////Add notification database for next of kin
							add_notification_db_next_kin(response.email, firstName, lastName, record_datetime, glucose_level, goalBloodGlucose_Start_BM, goalBloodGlucose_End_BM, goalBloodGlucose_Start_AM, goalBloodGlucose_End_AM, meal_type);
						});

					}).error(function(err) {
						res.json(err);
					});
				}

			}


		}).error(function(err) {
			res.json(err);
		});


	} else {

		///After Meal or Pre Bed
		db.glucose_goal.checkgoal(userid).then(function(response) {

			if (response != '' && response) {
				var goalBloodGlucose_Start_BM = (response[0].goalBloodGlucose_Start_BM == '0.00') ? 4.40 : response[0].goalBloodGlucose_Start_BM;
				var goalBloodGlucose_End_BM = (response[0].goalBloodGlucose_End_BM == '0.00') ? 7.00 : response[0].goalBloodGlucose_End_BM;
				var goalBloodGlucose_Start_AM = (response[0].goalBloodGlucose_Start_AM == '0.00') ? 4.40 : response[0].goalBloodGlucose_Start_AM;
				var goalBloodGlucose_End_AM = (response[0].goalBloodGlucose_End_AM == '0.00') ? 8.50 : response[0].goalBloodGlucose_End_AM;

				if (parseFloat(glucose_level) < parseFloat(goalBloodGlucose_Start_AM) || parseFloat(glucose_level) > parseFloat(goalBloodGlucose_End_AM)) {


					///send email to user himself
					bg_email_alert(user_email, firstName, lastName, record_datetime, glucose_level, goalBloodGlucose_Start_BM, goalBloodGlucose_End_BM, goalBloodGlucose_Start_AM, goalBloodGlucose_End_AM, meal_type);
					/////send push notification
					sendAndroidNotification(user_email);
					///add notifications to database
					add_notification_db(userid, user_email, firstName, lastName, record_datetime, glucose_level, goalBloodGlucose_Start_BM, goalBloodGlucose_End_BM, goalBloodGlucose_Start_AM, goalBloodGlucose_End_AM, meal_type)

					///get user Emails
					db.bp.getfamilyEmails(userid).then(function(response) {


						response.forEach(function(response, index) {
							///Send Emails To Next Of Kin
							bg_email_alert(response.email, firstName, lastName, record_datetime, glucose_level, goalBloodGlucose_Start_BM, goalBloodGlucose_End_BM, goalBloodGlucose_Start_AM, goalBloodGlucose_End_AM, meal_type);
							/////send push notification
							sendAndroidNotification(response.email);
							////Add notification database for next of kin
							add_notification_db_next_kin(response.email, firstName, lastName, record_datetime, glucose_level, goalBloodGlucose_Start_BM, goalBloodGlucose_End_BM, goalBloodGlucose_Start_AM, goalBloodGlucose_End_AM, meal_type);
						});

					}).error(function(err) {
						res.json(err);
					});

				}

			} else {
				/////////////User don't have nay goal

				var goalBloodGlucose_Start_BM = 4.40;
				var goalBloodGlucose_End_BM = 7.00;
				var goalBloodGlucose_Start_AM = 4.40;
				var goalBloodGlucose_End_AM = 8.50;

				if (parseFloat(glucose_level) < parseFloat(goalBloodGlucose_Start_AM) || parseFloat(glucose_level) > parseFloat(goalBloodGlucose_End_AM)) {
					///no Next of kin found and send email to user himself
					bg_email_alert(user_email, firstName, lastName, record_datetime, glucose_level, goalBloodGlucose_Start_BM, goalBloodGlucose_End_BM, goalBloodGlucose_Start_AM, goalBloodGlucose_End_AM, meal_type);
					/////send push notification
					sendAndroidNotification(user_email);
					///add notifications to database
					add_notification_db(userid, user_email, firstName, lastName, record_datetime, glucose_level, goalBloodGlucose_Start_BM, goalBloodGlucose_End_BM, goalBloodGlucose_Start_AM, goalBloodGlucose_End_AM, meal_type)

					///get user Emails of next of kin
					db.bp.getfamilyEmails(userid).then(function(response) {


						response.forEach(function(response, index) {
							///Send Emails To Next Of Kin
							bg_email_alert(response.email, firstName, lastName, record_datetime, glucose_level, goalBloodGlucose_Start_BM, goalBloodGlucose_End_BM, goalBloodGlucose_Start_AM, goalBloodGlucose_End_AM, meal_type);
							/////send push notification
							sendAndroidNotification(response.email);
							////Add notification database for next of kin
							add_notification_db_next_kin(response.email, firstName, lastName, record_datetime, glucose_level, goalBloodGlucose_Start_BM, goalBloodGlucose_End_BM, goalBloodGlucose_Start_AM, goalBloodGlucose_End_AM, meal_type);
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

	/**************************
	 ***New Code End
	 **************************/



}
///////////////========================Add Notification to database for Next Of Kin===========================================================//////////////////////

function add_notification_db_next_kin(email, firstName, lastName, record_datetime, glucose_level, goalBloodGlucose_Start_BM, goalBloodGlucose_End_BM, goalBloodGlucose_Start_AM, goalBloodGlucose_End_AM, meal_type) {

	///8022=chief team userid
	db.user.checkByname(email).then(function(response) {
			var userids = response[0].userID;

			var sub = "Health Alert : " + firstName + " " + lastName + " has abnormal BG at " + record_datetime;
			var body = firstName + " " + lastName + " Blood Glucose Readings are not in control:<br><b>Blood Glucose  </b> : " + glucose_level + " mmol/L - " + meal_type + "   <br><br>Recommended Blood Glucose Control <br><b> Pre-meal (mmol/L): </b> " + goalBloodGlucose_Start_BM + " - " + goalBloodGlucose_End_BM + "<br><b>post-meal (mmol/L):</b> : " + goalBloodGlucose_Start_AM + " - " + goalBloodGlucose_End_AM + "<br>";

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

function add_notification_db(userid, user_email, firstName, lastName, record_datetime, glucose_level, goalBloodGlucose_Start_BM, goalBloodGlucose_End_BM, goalBloodGlucose_Start_AM, goalBloodGlucose_End_AM, meal_type) {

	///8022=chief team userid

	var sub = "Health Alert : " + firstName + " " + lastName + " has abnormal BG at " + record_datetime;
	var body = firstName + " " + lastName + " Blood Glucose Readings are not in control:<br><b>Blood Glucose  </b> : " + glucose_level + " mmol/L - " + meal_type + "   <br><br>Recommended Blood Glucose Control <br><b> Pre-meal (mmol/L): </b> " + goalBloodGlucose_Start_BM + " - " + goalBloodGlucose_End_BM + "<br><b>post-meal (mmol/L):</b> : " + goalBloodGlucose_Start_AM + " - " + goalBloodGlucose_End_AM + "<br>";

	var sql = "INSERT INTO notification (`fromUserID`, `toUserID`, `subject`, `details`) VALUES ('8022', '" + userid + "', '" + sub + "', '" + body + "')";

	db.bp.addbp(sql).then(function(response) {

	}).error(function(err) {
		//res.json(err);
	});

}

///////////////========================Email Sending Blood Glucose=================================================/////////////////
function bg_email_alert(email, firstName, lastName, record_datetime, glucose_level, goalBloodGlucose_Start_BM, goalBloodGlucose_End_BM, goalBloodGlucose_Start_AM, goalBloodGlucose_End_AM, meal_type) {


	//var date_time = record_datetime.split(' ');
	//var date = date_time[0].split('-');
	//var record_time = date[2] + "-" + date[1] + "-" + date[0] + " " + date_time[1];
    var record_time=moment.utc(record_datetime).format("YYYY-MM-DD HH:mm:ss");
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
		subject: "Health Alert : " + firstName + " " + lastName + " has abnormal BG at " + record_time, // subject 
		html: firstName + " " + lastName + " Blood Glucose Readings are not in control:<br><b>Blood Glucose  </b> : " + glucose_level + " mmol/L - " + meal_type + "   <br><br>Recommended Blood Glucose Control <br><b> Pre-meal (mmol/L): </b> " + goalBloodGlucose_Start_BM + " - " + goalBloodGlucose_End_BM + "<br><b>post-meal (mmol/L):</b> : " + goalBloodGlucose_Start_AM + " - " + goalBloodGlucose_End_AM + "<br><br>Best Regards <br>CHIEF Support<br><br><hr><br>This message was sent to " + email + ". If you don't want to receive these emails from CHIEF in the future, please update your notification settings." // body
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

///////////////========================Push Notification For Abnormal Blood Glucose=================================================/////////////////
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

					var subject = response[0].firstName + ' ' + response[0].lastName + " Blood Glucose Readings are not in control";

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


///////////////========================Get Glucose  Data=================================================/////////////////

exports.getglucose = function(req, res) {
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
					db.glucose.getglucose(userid).then(function(response) {
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

//============================================Update user Glucose ============================================/////////////////
exports.updateglucose = function(req, res) {
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
						var glucose_level = data1[i].glucose_level;
						var record_datetime = data1[i].record_datetime;
						var meal_type = data1[i].meal_type;
						var notes = data1[i].notes;
						var id = data1[i].id;

						var sql = "UPDATE glucose SET glucoselevel='" + glucose_level + "',recordDateTime='" + record_datetime + "',mealtype='" + meal_type + "',notes='" + notes + "' WHERE id='" + id + "'; ";
						db.glucose.updateglucose(sql).then(function(response) {}).error(function(err) {
							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}
					var glucose_level = data1[total - 1].glucose_level;
					var record_datetime = data1[total - 1].record_datetime;
					var meal_type = data1[total - 1].meal_type;
					var notes = data1[total - 1].notes;
					var id = data1[total - 1].id;
					//sql += "('" + email + "','" + glucose_level + "','" + record_datetime + "','" + meal_type + "','" + notes + "')";
					var sql = "UPDATE glucose SET glucoselevel='" + glucose_level + "',recordDateTime='" + record_datetime + "',mealtype='" + meal_type + "',notes='" + notes + "' WHERE id='" + id + "'; ";

					db.glucose.updateglucose(sql).then(function(response) {}).error(function(err) {
						res.json(err);
					});
					data["error"] = 0;
					data["authResponse"] = "Glucose Updated Successfully";
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

///=======================================Delete user glucose ===========================================/////////////////////
exports.deleteglucose = function(req, res) {
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

						var sql = "UPDATE glucose SET isdeleted='1' WHERE id='" + id + "'; ";
						db.glucose.deleteglucose(sql).then(function(response) {}).error(function(err) {
							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}

					var id = data1[total - 1].id;
					//sql += "('" + email + "','" + glucose_level + "','" + record_datetime + "','" + meal_type + "','" + notes + "')";
					var sql = "UPDATE glucose SET isdeleted='1' WHERE id='" + id + "'; ";

					db.glucose.deleteglucose(sql).then(function(response) {}).error(function(err) {
						res.json(err);
					});
					data["error"] = 0;
					data["authResponse"] = "Glucose Deleted Successfully";
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
