'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');
var moment = require('moment');

//================================ NEW STEP API 25 AUG 2020 ==================================================//
exports.insertSteps = (req,res) => {
	var userid = req.body.userid;
	var token = req.body.token;

	var header_data = req.body.header_data;
	var data1 = req.body.data;

	console.log("header_data : ", header_data);
	console.log("data1 : ", data1);

	header_data = JSON.parse(header_data);
	data1 = JSON.parse(data1);
	var uuID = header_data[0].uuID;
	var startDate = header_data[0].startDate;
	if( uuID =="" || uuID == "undefined" || typeof uuID == null){ uuID = "NoUUID"; } 

	console.log("userid : ", userid);
	console.log("token : ", token);
	console.log("uuID : ", uuID);
	console.log("startDate : ",startDate);
	

	var data = {
		"error": 0,
		"authResponse": ""
	}
	var latestStepID = [];

	var userController = require('../../app/controllers/user');
	userController.recordRawData(userid, "AddSteps", "header_data : "+req.body.header_data+", data : "+req.body.data+", parameters : []");



	db.user.authUser(token).then((response) => {
		if (!!token) {
			if (response != '' && response != null) {
				//=========================   START   ===============================//
				
				var sqlInsertStep = "INSERT INTO step (activityID, userID, entryTypeID, startTime, stepQty, endTime,calories ,distance , uuID, isdeleted , deviceid) VALUES ";
				var sqlInsertStepNoData = "INSERT INTO step (activityID, userID, entryTypeID, startTime, stepQty, endTime,calories ,distance , uuID, isdeleted , deviceid) VALUES ";
				var insert_value = "";

				db.step.check_newDevice(userid,uuID,startDate).then( (checkResponse) =>{
					if(checkResponse == "" || checkResponse==null){//new device
						console.log('it is new device : checkResponse = ', checkResponse);
						for( var i = 0; i<data1.length; i++){
							var deviceID = data1[i].deviceid;

							if (typeof deviceID  == null || typeof deviceID === "undefined" || deviceID== '') { deviceID = 'NoDeviceID'; }
							if (typeof data1[i].deviceuuid  == null || typeof data1[i].deviceuuid === "undefined" || data1[i].deviceuuid == '') { data1[i].deviceuuid = 'NoUUID'; }
							if (data1[i].calorie == '') { data1[i].calorie = 0; }
							if (data1[i].distance == '') { data1[i].distance = 0; }

							insert_value =  "('" + data1[i].activityID + "','" + data1[i].userID + "','" + 1 + "','" + data1[i].startDateTime + "','" + data1[i].stepQty + "','" + data1[i].endDateTime + "','" + data1[i].calorie.toFixed(2) + "','" + data1[i].distance.toFixed(2) + "','" + data1[i].deviceuuid + "','0','" + deviceID + "'),";
							sqlInsertStep = sqlInsertStep + insert_value;
						}

						if(sqlInsertStep != sqlInsertStepNoData){
							sqlInsertStep = sqlInsertStep.slice(0, sqlInsertStep.length - 1) + ";";
							console.log("sqlInsertStep : ", sqlInsertStep);
							db.step.addSteps(sqlInsertStep).then( (response) =>{
								target_challenge_calculation(userid);
								let insertResponse = response;
								console.log("insertResponse : ",insertResponse);
							}).error( (err) => {
								return res.json(err);
								//return res;
							});
						}else{
							console.log("no new data to insert");	
							data["error"] = 0;
							data["authResponse"] = "No New Data To Insert";
							return res.status(200).json(data);		
							//return res;					
						}
							
					}else if(checkResponse !== "" || checkResponse !== null){//Existing Device
						console.log('it is existing device : checkResponse = ',checkResponse);
						db.step.latestData(userid, uuID).then((response) => { 
							console.log("response[0].maxTime : ",response[0].maxTime);
							console.log("data1[data1.length-1].startDateTime : ",data1[data1.length-1].startDateTime);
							let dateObj = response[0].maxTime;

							//Formating Date
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
							var maxTimeString = y+ "-" + m+ "-" + d+ " " + h+ ":" + i+ ":" + s;
							//var maxTimeStringJS = y+ "-" + m+ "-" + d+ "T" + h+ ":" + i+ ":" + s+".000z";

							console.log("month2 : ",m);
							console.log("dateObj : ", dateObj);
							console.log(" maxTimeString : ", maxTimeString);
							console.log("typeof maxTimeString : ", typeof maxTimeString);
							console.log("typeof response[0].maxTime : ", typeof response[0].maxTime);
							console.log("response[0].maxTime : ",  response[0].maxTime);

							var parsedMaxTime = Date.parse(response[0].maxTime);
							console.log("parsedMaxTime : ",  parsedMaxTime);

							db.step.latestDataID(userid, uuID, maxTimeString).then( response =>{
								console.log("response.length : ", response.length);
								if(response){
									console.log("latestStepID.length : ", latestStepID.length);
									for(var i=0; i<response.length; i++){
										console.log("stepID : ", response[i].stepID);
										latestStepID.push(response[i].stepID);
										console.log("latestStepID.length : ", latestStepID.length);
									} 
								}
								//startTimeString, userid, uuID 

								for( var i = 0; i<data1.length; i++){
									var deviceID = data1[i].deviceid;
		
									if (typeof deviceID  == null || typeof deviceID === "undefined" || deviceID== '') { deviceID = 'NoDeviceID'; }
									if (typeof data1[i].deviceuuid  == null || typeof data1[i].deviceuuid === "undefined" || data1[i].deviceuuid == '') { data1[i].deviceuuid = 'NoUUID'; }
									if (data1[i].calorie == '') { data1[i].calorie = 0; }
									if (data1[i].distance == '') { data1[i].distance = 0; }
		
									var datetimestr = data1[i].startDateTime;
									var dateStr = datetimestr.slice(0,10);
									var timeStr = datetimestr.slice(11,19);
									var formatedstartDateTime = Date.parse(dateStr+"T"+timeStr);
		
									if(parsedMaxTime<formatedstartDateTime ){
										insert_value =  "('" + data1[i].activityID + "','" + data1[i].userID + "','" + 1 + "','" + data1[i].startDateTime + "','" + data1[i].stepQty + "','" + data1[i].endDateTime + "','" + data1[i].calorie.toFixed(2) + "','" + data1[i].distance.toFixed(2) + "','" + data1[i].deviceuuid + "','0','" + deviceID + "'),";
										sqlInsertStep = sqlInsertStep + insert_value;
									
									}else if(parsedMaxTime==formatedstartDateTime ){
										insert_value =  "('" + data1[i].activityID + "','" + data1[i].userID + "','" + 1 + "','" + data1[i].startDateTime + "','" + data1[i].stepQty + "','" + data1[i].endDateTime + "','" + data1[i].calorie.toFixed(2) + "','" + data1[i].distance.toFixed(2) + "','" + data1[i].deviceuuid + "','0','" + deviceID + "'),";
										sqlInsertStep = sqlInsertStep + insert_value;
										//latestStepID.forEach(db.step.setIsDeletedByID);
										for(var j = 0; j<latestStepID.length;j++){
											db.step.setIsDeletedByID(latestStepID[j]).then(response=>{
												if(response){console.log("response : ", response);}
											}).error( err => {
												return res.json(err);
												//return res;
											});
										}

									}else{
										console.log("skip : { 'startTime' : "+ data1[i].startDateTime +" }");
										//console.log("parsedMaxTime' : "+ parsedMaxTime);
										//console.log("formatedstartDateTime' : "+ formatedstartDateTime);
									}
								}//end for loop
								//sqlInsertStep = sqlInsertStep.substr(0, sqlInsertStep.length);
								if(sqlInsertStep != sqlInsertStepNoData){

									sqlInsertStep = sqlInsertStep.slice(0, sqlInsertStep.length - 1) + ";";
									console.log("sqlInsertStep : ", sqlInsertStep);
									db.step.addSteps(sqlInsertStep).then( (response) =>{
										target_challenge_calculation(userid);
										let insertResponse = response;
										console.log("insertResponse : ",insertResponse);
										data["error"] = 0;
										data["authResponse"] = "Steps Added Successfully";
										return res.status(200).json(data);	
										//return res;
								
									}).error( (err) => {
										return res.status(400).json(err);
										//return res;
									});

								}else{
									console.log("no new data to insert");	
									data["error"] = 0;
									data["authResponse"] = "No New Data To Insert";
									return res.status(200).json(data);	
									//return res;
								}

							}).error( (err) => {
								return res.status(400).json(err);
								//return res;
							});

						}).error( (err) => {
							return res.status(400).json(err);
							//return res;
						});


					}

				}).error( (err) => {
					return res.status(400).json(err);
					//return res;
				});

				

				//=========================   END   =================================//
			} else {
				data["error"] = 1;
				data["authResponse"] = "Authentication Failed.";
				return res.status(200).json(data);
				//return res;
			}
		} else {
			data["error"] = 1;
			data["authResponse"] = "Token Required etc.";
			return res.status(200).json(data);
			//return res;
		}
	}).error( (err) => {
		return res.status(400).json(err);
		//return res;
	});
	//return res;
};

//============================================Add user Steps============================================/////////////////
exports.addSteps = function (req, res) {
	//console.log(req.body);  
	var data1 = req.body.data;
	var startDate = req.body.startDate;
	var deviceid = req.body.uuID;
	var userid = req.body.userid;
	var token = req.body.token;
	var header_data = req.body.header_data;
	header_data = JSON.parse(header_data);
	data1 = JSON.parse(data1);
	var total = data1.length;
	var header_total = header_data.length;

	var data = {
		"error": 0,
		"authResponse": ""
	}

	//Get current Date	
	var date = new Date();

	var hour = date.getHours();
	hour = (hour < 10 ? "0" : "") + hour;

	var min = date.getMinutes();
	min = (min < 10 ? "0" : "") + min;

	var sec = date.getSeconds();
	sec = (sec < 10 ? "0" : "") + sec;

	var year = date.getFullYear();

	var month = date.getMonth() + 1;
	month = (month < 10 ? "0" : "") + month;

	var day = date.getDate();
	day = (day < 10 ? "0" : "") + day;

	var current_date = year + ":" + month + ":" + day + " " + hour + ":" + min + ":" + sec;


	db.user.authUser(token).then(function (response) {
		if (!!token) {
			if (response != '' && response != null) {

				/**************
				 **Delete Duplicate Record of same uuid and date
				 ****************/
				for (var j = 0; j < header_total - 1; j++) {
					var startDate = header_data[j].startDate;
					var uuID = header_data[j].uuID;
					var sql = "update step set isdeleted='1' where userID='" + userid + "'  and YEAR(startTime)=YEAR('" + startDate + "') and MONTH(startTime)>=MONTH('" + startDate + "') and DAY(startTime)>=DAY('" + startDate + "') and uuID='" + uuID + "'";
					db.step.updateDuplicateData(userid, startDate, uuID).then(function (response) { }).error(function (err) {
						res.json(err);
					});
				}

				var startDate = header_data[header_total - 1].startDate;
				var uuID = header_data[header_total - 1].uuID;

				if (!!startDate && !!uuID) {

					var sql = "update step set isdeleted='1' where userID='" + userid + "'  and YEAR(startTime)=YEAR('" + startDate + "') and MONTH(startTime)>=MONTH('" + startDate + "') and DAY(startTime)>=DAY('" + startDate + "') and uuID='" + uuID + "'";

					////Last Update of data
					db.step.updateDuplicateData(userid, startDate, uuID).then(function (response) {

						///adding new steps
						var fres = add_new_steps(userid, current_date, data1, total, res);

						res.json(fres);

					}).error(function (err) {
						res.json(err);
					});

				} else {
					///adding new steps
					var fres = add_new_steps(userid, current_date, data1, total, res);
					res.json(fres);

				}

				/****************
				 **End Delete 
				 *******************/


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
	}).error(function (err) {
		res.json(err);
	});

	return res;
};


///////////////==========================function to add new steps======================================/////////////

function add_new_steps(userid, current_date, data1, total) {
	//console.log(data1); return false;

	var data = {
		"error": 0,
		"authResponse": ""
	}


	/*******
	 **Adding new records
	 ***********/

	// var email=response;

	var sql = "INSERT INTO step (activityID, userID, entryTypeID, startTime, stepQty  , endTime,calories ,distance , uuID, isdeleted , deviceid) values ";

	for (var i = 0; i < total - 1; i++) {
		var activityID = data1[i].activityID;
		var startTime = data1[i].startDateTime;


		var endTime = data1[i].endDateTime;
		var stepQty = data1[i].stepQty;
		var calories = data1[i].calorie;
		var distance = data1[i].distance;
		var uuID = data1[i].deviceuuid;
		var deviceid = data1[i].deviceid;
		///deviceid
		if (typeof deviceid === "undefined" || deviceid == '') { deviceid = ''; }
		if (endTime == '') { endTime = ''; }
		if (calories == '') { calories = 0; }
		if (distance == '') { distance = 0; }
		if (uuID == '') { uuID = 0; }

		sql += "('" + activityID + "','" + userid + "','" + 1 + "','" + startTime + "','" + stepQty + "','" + endTime + "','" + calories + "','" + distance + "','" + uuID + "','0','" + deviceid + "'),";

		sql = sql.substr(0, sql.length);
	}
	var activityID = data1[total - 1].activityID;
	var startTime = data1[total - 1].startDateTime;

	var endTime = data1[total - 1].endDateTime;
	var stepQty = data1[total - 1].stepQty;
	var calories = data1[total - 1].calorie;
	var distance = data1[total - 1].distance;
	var uuID = data1[total - 1].deviceuuid;
	var deviceid = data1[total - 1].deviceid;
	///deviceid
	if (typeof deviceid === "undefined" || deviceid == '') { deviceid = ''; }

	if (endTime == '') {
		endTime = '';
	}
	if (calories == '') {
		calories = 0;
	}
	if (distance == '') {
		distance = 0;
	}
	if (uuID == '') {
		uuID = 0;
	}

	sql += "('" + activityID + "','" + userid + "','" + 1 + "','" + startTime + "','" + stepQty + "','" + endTime + "','" + calories + "','" + distance + "','" + uuID + "','0','" + deviceid + "')";


	/***********
	 **Add new steps records
	 ****************/

	//console.log(sql);
	db.step.addSteps(sql).then(function (response) {

		target_challenge_calculation(userid);
		/////remove_duplicate_steps();

	})
		.error(function (err) {
			res.json(err);
		});

	data["error"] = 0;
	data["authResponse"] = "Steps Added Successfully";
	return data;



	/**************
	 **End adding record to step
	 ***************/

}

function remove_duplicate_steps() {

	var runner = require("child_process");
	var phpScriptPath = __dirname + "/../phpFiles/db_remove_steps_backup.php";
	var argsString = "1" + "," + "1";
	runner.exec("php " + phpScriptPath + " " + argsString, function (err, phpResponse, stderr) {
		if (err) console.log(err); /* log error */
		console.log(phpResponse);
	});

}


function target_challenge_calculation(userid) {
	var runner = require("child_process");
	var end_date = moment().format('YYYY-MM-DD');

	////////Start calculating challenge score
	var phpScriptPath1 = __dirname + "/../phpFiles/callenge_score_cal.php";
	var argsString1 = userid + "," + "1";
	runner.exec("php " + phpScriptPath1 + " " + argsString1, function (err, phpResponse, stderr) {
		if (err) console.log(err); /* log error */
		console.log(phpResponse);
		////call the final calculation on main score
		db.step.get_user_challennge_ids(userid, end_date).then(function (response) {
			var val = '';
			if (response.length) {

				for (var i in response) {
					val = response[i];

					var challengeID = val.challengeID;
					//console.log("challengeID====================>"+challengeID);  
					var phpScriptPath = __dirname + "/../phpFiles/challange_final_calc.php";
					var argsString = userid + "," + challengeID;
					runner.exec("php " + phpScriptPath + " " + argsString, function (err, phpResponse, stderr) {
						if (err) console.log(err); /* log error */
						console.log(phpResponse);
					});
				}
			}
		}).error(function (err) { res.json('Error on getting challenges IDS'); });

	});



}

exports.target_challenge_calculation_backup = function (req, res) {


	var userid = req.query.userid;
	var end_date = moment().format('YYYY-MM-DD');
	console.log("yeah its working fine => " + userid);
	////get user challeneges ID list
	db.step.get_user_challennge_ids(userid, end_date).then(function (response) {
		var val = '';
		if (response.length) {

			for (var i in response) {
				val = response[i];
				var challenge_id = val.challengeID;
				var challenge_startDate = val.startDate;

				///////////////////////Start calculating target Weekly challange///////////////////////////////////
				db.step.get_challenge_activities_detail(challenge_id).then(function (response) {
					var challanges_activity_final = response[0].challengeActivities.split(",");

					challanges_activity_final = challanges_activity_final[0];
					var consective_number_days = response[0].consective_number_days;
					var consective_number_weeks = response[0].consective_number_weeks;
					var challengeID = response[0].challengeID;

					db.step.count_activity_points(challanges_activity_final).then(function (response) {
						//////calculating the target
						var steps_points_final = response[0].points;
						var target_activity = response[0].target;
						///console.log(target_activity+'-----------  days='+consective_number_days);
						//change calculation if number of days is zero
						if (consective_number_days == 0) {
							consective_number_days = 7;
							target_activity = (consective_number_days * target_activity);
							///console.log("steps_points_final="+steps_points_final+'-consective_number_days='+consective_number_days+'--consective_number_weeks='+consective_number_weeks);
							var target_points = steps_points_final * consective_number_days * consective_number_weeks;
							//console.log("0--target Points => "+target_points);
						}
						else {
							target_activity = (consective_number_days * target_activity);
							// calculate target based of activity points * consective_days* consective Weeks
							if (consective_number_weeks == 0) { consective_number_weeks = 1; }
							var target_points = steps_points_final * consective_number_days * consective_number_weeks;
							//console.log("target Points => "+target_points);

						}


						//get todays date
						var challenge_week_start_date = challenge_startDate;
						var count_current_week_date = moment(moment().format('YYYY-MM-DD'), "YYYY-MM-DD");
						//////console.log(count_current_week_date.diff(date, "challenge_week_start_date")    + "weeks"); // weeks 
						//////console.log("target Points => "+target_points);
						var no_of_weeks = count_current_week_date.diff(challenge_week_start_date, "weeks");
						//console.log('no_of_weeks=======>'+no_of_weeks);

						// no_of_weeks=4; 
						if (no_of_weeks > 0) {
							var curent_date_check = moment().format('YYYY-MM-DD');

							for (var i = 1; i <= no_of_weeks; i++) {
								var date = moment(challenge_week_start_date);
								var week_start = moment(date).add(i, 'weeks').startOf('isoWeek');
								var week_end = moment(date).add(i, 'weeks').endOf('isoWeek');
								week_start = week_start.format('YYYY-MM-DD');
								week_end = week_end.format('YYYY-MM-DD');

								console.log(curent_date_check + '-----' + userid + "-----" + week_start + '---------Week Ends====>' + week_end);

								if (curent_date_check > week_end) {///perform steps calculation of = userid
									///userid=147;
									db.step.count_challenge_steps(userid, week_start, week_end).then(function (response) {


										if (response.length > 0 && response[0].steps != null) {
											var steps_taken = response[0].steps;
											var steps_taken_week_date = moment(response[0].week_date).format('YYYY-MM-DD');

											var date_1 = moment(steps_taken_week_date);
											var week_end_1 = date_1.endOf('isoWeek');
											week_start = steps_taken_week_date;
											week_end = week_end_1.format('YYYY-MM-DD');


											if (steps_taken >= target_activity) { ///current week goal achieved

												db.step.check_previous_calc_date(userid, week_start, week_end).then(function (response) {

													var score_achieved = steps_points_final * consective_number_days;

													// console.log("steps_taken_week_date:::"+steps_taken_week_date); 
													// console.log("week_start::::"+week_start+'---------Week Ends====>'+week_end);  
													// console.log("steps_taken:"+steps_taken+":: target_activity:"+target_activity);
													// return false; 

													if (response.length == 0) {//No records found , proceed the insertion for record
														//userid=631;
														var sql = `INSERT INTO challengeScore (challengeID, userID, achievedScore, TagetScore , startDate , endDate  ,
                                     	 isConsecutive , isAchieved , calculationDate, weekStartDate, weekEndDate, status, achievedPoints , totalPoints)
				                         VALUES ('`+ challengeID + `', '` + userid + `', '` + steps_taken + `', '` + target_activity + `', '` + week_start + `', '` + week_end + `', '1', '1',
				                         '`+ curent_date_check + `', '` + week_start + `', '` + week_end + `', '1', '` + score_achieved + `' , '` + target_points + `')`;

														// db.step.add_challenge_score(sql).then(function(response){
														// 	console.log('challenge Score Added Successfully');
														// }).error(function(err) {res.json('Error on adding challenge Score');});

													} else {
														console.log('Record Found and skip this insertion !');
													}
												}).error(function (err) { res.json('Error on checking previous records'); });

											}

										}
										else {
											console.log('0 Steps Found.');
										}
									}).error(function (err) { res.json('Error on counting Steps'); });


								}///end current date 

							}////End for loop of array
							//console.log('Outside of Fore Loop ==========================>'+__dirname);
							//////call the final calculation on main score
							//                var runner = require("child_process");
							//                var phpScriptPath = __dirname+"/../phpFiles/challange_final_calc.php";   
							// var argsString = userid+","+challengeID;
							// runner.exec("php " + phpScriptPath + " " +argsString, function(err, phpResponse, stderr) {
							//  if(err) console.log(err); /* log error */
							// console.log( phpResponse );
							// });

						}
						///////////////////////End calculating target Weekly challange///////////////////////////////////

					}).error(function (err) { res.json('Error on counting target activity'); });

				}).error(function (err) { res.json('Error on counting target'); });

			}

		}
		else {
			console.log('No challenge found related to this user');
		}

	}).error(function (err) {
		//res.json(err);
		res.json('Error on getting challenges IDS');
	});

}

///////////////========================Get Steps Data=================================================/////////////////

exports.getSteps = function (req, res) {
	var userid = req.query.userid;
	var token = req.query.token;

	var startDate = moment().subtract(90, 'days').format('YYYY-MM-DD')
	var endDate = moment().format('YYYY-MM-DD');

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function (response) {
			if (response != '' && response != null) {
				var email = response;
				//res.json(email);
				///Get user info

				db.step.getSteps(userid, startDate, endDate).then(function (response) {
					data["error"] = 0;
					data["authResponse"] = "Action Successful";
					data['Data'] = response;
					res.json(data);

				})
					.error(function (err) {
						res.json(err);
					});

			} else {
				data["error"] = 1;
				data["authResponse"] = "Authentication Failed.";
				res.json(data);

			}
		})
			.error(function (err) {
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