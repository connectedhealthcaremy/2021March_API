'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');
var moment = require('moment');

//============================================Add user Sleep============================================/////////////////
/*
exports.addSleep = function(req, res) {
	var userid=req.body.userid;
	var token=req.body.token;
	var data1=req.body.data;
		data1=JSON.parse(data1);
	var header_data=req.body.header_data;
	header_data=JSON.parse(header_data);
	var total=data1.length;
	var startTime=req.body.startTime;
	var endTime=req.body.endTime;
	 var header_total=header_data.length;

	var data={
		"error": 0 ,
		"authResponse":""
		}
		
	//Get current Date	
	var date = new Date();
	
	var hour = date.getHours();
	hour = (hour < 10 ? "0" : "") + hour;
	
	var min  = date.getMinutes();
	min = (min < 10 ? "0" : "") + min;
	
	var sec  = date.getSeconds();
	sec = (sec < 10 ? "0" : "") + sec;
	
	var year = date.getFullYear();
	
	var month = date.getMonth() + 1;
	month = (month < 10 ? "0" : "") + month;
	
	var day  = date.getDate();
	day = (day < 10 ? "0" : "") + day;

   var current_date=year + ":" + month + ":" + day + " " + hour + ":" + min + ":" + sec;	
		
		
		db.user.authUser(token).then(function(response){
		if(!!token)
		{
		if(response!='' && response!=null)
		{
		
		var email=response;
		
			   var email=response;
		
			db.sleep.getSleepID(userid).then(function(response){
				///For already record 
				if(response!='' && response!=null)
		         {
					 db.sleep.getprevSleepID(userid , startTime , endTime).then(function(response){
						 
						 var sleep_ids=response[0].sleepID;
						var sql = "INSERT INTO sleepstep (sleepID, userID, stepTime, stepQty) values ";
						
						for(var i=0; i< total-1 ; i++)
						{
						var stepTime=data1[i].stepTime;  
						var stepQty=data1[i].stepQty;  
						sql += "('" + sleep_ids + "','" + userid + "','" + stepTime + "','" + stepQty + "'),";
						
						sql = sql.substr(0,sql.length);
						}
						var stepTime=data1[total-1].stepTime;  
						var stepQty=data1[total-1].stepQty;   
						sql += "('" + sleep_ids + "','" + userid + "','" + stepTime + "','" + stepQty + "')";
						db.sleep.addSleepSteps(sql).then(function(response){
						data["error"] = 0;
						data["authResponse"] = "Sleep Data Added Successfully";
						res.json(data);
						}).error(function(err){
						res.json(err);
						});
						 
						 }).error(function(err){
				         res.json(err);
				         });
				 }
				 else
				 { ///For new record
				 var sql = "INSERT INTO sleep (userID, startTime, endTime) VALUES ('"+userid+"', '"+startTime+"', '"+endTime+"') ";
				 db.sleep.addSleep(sql).then(function(response){
					 var sleep_ids=response;
				var sql = "INSERT INTO sleepstep (sleepID, userID, stepTime, stepQty) values ";
				
				for(var i=0; i< total-1 ; i++)
				{
				var stepTime=data1[i].stepTime;  
				var stepQty=data1[i].stepQty;  
				sql += "('" + sleep_ids + "','" + userid + "','" + stepTime + "','" + stepQty + "'),";
				
				sql = sql.substr(0,sql.length);
				}
				var stepTime=data1[i].stepTime;  
				var stepQty=data1[i].stepQty;   
				sql += "('" + sleep_ids + "','" + userid + "','" + stepTime + "','" + stepQty + "')";
				db.sleep.addSleepSteps(sql).then(function(response){
				data["error"] = 0;
				data["authResponse"] = "Sleep Data Added Successfully";
				res.json(data);
					 }).error(function(err){
				res.json(err);
				});
				
				
					 }).error(function(err){
				res.json(err);
				});
					 }
				})
				.error(function(err){
				res.json(err);
				});
		
		
		}
		else
		{
		data["error"]=1;
		data["authResponse"] = "Authentication Failed.";
		res.json(data);
		}
		}
		else
		{
		data["error"]=1;
		data["authResponse"] = "Token Required etc.";
		res.json(data);
			}
		})
		.error(function(err){
		res.json(err);
		});
		
		
	
      return res;
};
*/
exports.postSleep = (req,res) => {
	var userid = req.body.userid;
	var token = req.body.token;
	var data1 = req.body.data;
	data1 = JSON.parse(data1);
	var header_data = req.body.header_data;
	header_data = JSON.parse(header_data);
	var sleepDate = header_data[0].startDate;
	var total = data1.length;
	var startTime = req.body.startTime;
	var endTime = req.body.endTime;
	var sleepstate = req.body.sleepstate;
	var deviceuuid = req.body.deviceuuid;
	var deviceid = req.body.deviceid;
	var header_total = header_data.length;
	var uuID = req.body.deviceuuid;
	if (typeof uuID !== 'undefined' && uuID) {
		uuID = uuID;
	} else {
		uuID = "NoUUID";
	}
	var data={ "error": 0 , "authResponse":""}

	console.log('header_data : ', req.body.header_data );
	console.log('data1 : ', req.body.data );
	console.log("data1.length : ", data1.length);

	if (typeof sleepstate !== 'undefined' && sleepstate) { sleepstate = sleepstate; } else { sleepstate = "";}
	// header_data :  [{"sleepstate":1,"startDate":"2020-09-13","uuID":"C4:A6:25:72:6E:EC"}] 

	var userController = require('../../app/controllers/user');
	userController.recordRawData(userid, "AddSleep", "header_data : "+req.body.header_data+", data : "+req.body.data+", parameters : [{ startTime : "+req.body.startTime+", endTime : "+req.body.endTime+",  sleepstate : "+req.body.sleepstate+", deviceuuid : "+req.body.deviceuuid+" , deviceid : "+req.body.deviceid+" }]");

	var insertSleepStep = "INSERT INTO sleepstep (sleepID, userID, stepTime, stepQty, sleepState) values ";
	db.user.authUser(token).then( authResponse =>{
		if (token) {
			if (authResponse != '' && authResponse != null) {
				db.sleep.check_newRecord(userid, uuID, startTime).then( checkResponse => {
					console.log('checkResponse[0] : ', checkResponse[0]);
					if (checkResponse == '' || checkResponse == null || checkResponse == [] ) {
						console.log('___________________________________  it is a new Record !!  __________________________________________________');
						///for header data, newer device
						var sql = "INSERT INTO sleep (userID, startTime, endTime, uuID, sleepstate , deviceid, sleepDate) VALUES ('" + userid + "','" + startTime + "','" + endTime + "','" + uuID + "','"+sleepstate+"' , '"+deviceid+"' , '"+sleepDate+"');";
						console.log("sql : ", sql);
						db.sleep.addSleep(sql).then(function(response) {
							var sleep_ids = response;

							///for data1, older device
							if(data1.length >0 && typeof data1.length != "undefined"){
								for(var i = 0 ; i<data1.length ; i++ ){
									if (data1[i].stepTime !== null && typeof data1[i].stepTime !== 'undefined' && data1[i].stepTime) {var stepTime = data1[i].stepTime;} else {var stepTime = 0;}
									var stepQty = data1[i].stepQty;
									if (typeof stepQty !== 'undefined' && stepQty) {stepQty = stepQty;} else {stepQty = 0;}
									var sleepState = data1[i].sleepState;
									if (typeof sleepState !== 'undefined' && sleepState) {
										sleepState = sleepState;
									} else {
										sleepState = 0; 
									}
									insertSleepStep = insertSleepStep + "('" + sleep_ids + "','" + userid + "','" + stepTime + "','" + stepQty + "','" + sleepState + "'),";
								}
								//sleepstep insert here
								insertSleepStep = insertSleepStep.slice(0, insertSleepStep.length - 1) + ";";

								db.step.addSleepSteps(insertSleepStep).then( (sleepRowID) => { 

								}).error(err => {
									return err;
								});
							}
						}).error(err => {  
							return err;
						});

						//return data;
						

					} else if(checkResponse != '' && checkResponse != null) {
						console.log('___________________________________  it is an existing Device !!  ________________________________');
						console.log('checkResponse[0] : ', checkResponse[0]);
						console.log("startTime : ", startTime);
						console.log("sleep API End");
						//return data;
						/*
						db.sleep.getLatestRecord(userid,deviceuuid).then( lastRecord => {
							console.log("lastRecord : ",lastRecord);
							var maxTime = lastRecord[0].maxTime;
							console.log("lastRecord[0].maxTime : ", lastRecord[0].maxTime);

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

							if (typeof uuID !== 'undefined' && uuID) {
								uuID = uuID;
							} else {
								uuID = 0;
							}
							
							///for header data, newer device 
							

									//var datetimestr = header_data[0].startTime;
									console.log(" header_data : " , header_data);
									console.log("startTime : ", startTime);
									var dateStr = startTime.slice(0,10);
									console.log("dateStr : ", dateStr);
									var timeStr = startTime.slice(11,19);
									var formatedstartDateTime = Date.parse(dateStr+"T"+timeStr);
									console.log('timeStr : ', timeStr);
									var sql = "INSERT INTO sleep (userID, startTime, endTime, uuID, sleepstate , deviceid) VALUES ('" + userid + "', '" + startTime + "', '" + endTime + "','" + uuID + "', '"+sleepstate+"' , '"+deviceid+"') ";
									console.log("sql : ", sql);

									if(parsedMaxTime < formatedstartDateTime){
										console.log("condition more than");
										console.log("sql : ", sql);
										db.sleep.addSleep(sql).then(function(response) {
											var sleep_ids = response;
											for(var i = 0;i<total;i++){
												insertSleepStep = insertSleepStep + "('" + sleep_ids + "','" + userid + "','" + stepTime + "','" + stepQty + "','" + sleepState + "'),";
											}
										}).error(err => {  
											return err;
										});
									//}
									/*
									else if(parsedMaxTime == formatedstartDateTime){
										console.log("condition equal");
										console.log("sql : ", sql);
										//db.sleep.setIsDeleted(userid,uuID,maxTimeString).then( deletedID => {
											db.sleep.addSleep(sql).then(function(response) {
												var sleep_ids = response;
												for(var i = 0;i<total;i++){
													insertSleepStep = insertSleepStep + "('" + sleep_ids + "','" + userid + "','" + stepTime + "','" + stepQty + "','" + sleepState + "'),";
												}
											}).error(err => {  
												return err;
											});
										//}).error(err => {  
										//	return err; 
										//});
									*/
									/*
									}else{
										console.log(" sleep - skip : '"+startTime+"'");
										if(data1.length!=0){
											console.log(" sleep - skip : '"+JSON.stringify(data1[i])+"'  ");
										}
									}

								///for data1, older device
								if(data1.length != 0 || data1.length != "undefined" || data1 == []){
									for(var i = 0; i<data1.length; i++){
										
										if (data1[i].stepTime !== null && typeof data1[i].stepTime !== 'undefined' && data1[i].stepTime) {
											var stepTime = data1[i].stepTime;
										} else {
											var stepTime = 0;
										}

										var stepQty = data1[i].stepQty;
										if (typeof stepQty !== 'undefined' && stepQty) {
											stepQty = stepQty;
										} else {
											stepQty = 0;
										}
										var sleepState = data1[i].sleepState;
										if (typeof sleepState !== 'undefined' && sleepState) {
											sleepState = sleepState;
										} else {
											sleepState = 0; 
										}
	
										var datetimestr = data1[i].startTime;
										var dateStr = datetimestr.slice(0,10)
										var timeStr = datetimestr.slice(11,19)
										var formatedstartDateTime = Date.parse(dateStr+"T"+timeStr);
	
										if(parsedMaxTime < formatedstartDateTime){
											insertSleepStep = insertSleepStep + "('" + sleep_ids + "','" + userid + "','" + stepTime + "','" + stepQty + "','" + sleepState + "'),";
										}else if(parsedMaxTime == formatedstartDateTime){
											//insertSleepStep = insertSleepStep + "('" + sleep_ids + "','" + userid + "','" + stepTime + "','" + stepQty + "','" + sleepState + "'),";
											console.log(" sleep - skip : { 'startTime' : '"+data1[i].startTime+"' } , ");
										}else{
											console.log(" sleep - skip : { 'startTime' : '"+data1[i].startTime+"' } , ");
										}
									}//end for loop - sleepstep
									//sleepstep insert here
									insertSleepStep = insertSleepStep.slice(0, insertSleepStep.length - 1) + ";";

									db.step.addSleepSteps(insertSleepStep).then( (sleepRowID) => { 

									}).error(err => {
										return err;
									});
								} //addSleepSteps End
							

						}).error(err => { //getLatestRecord End
							return err;
						});
						*/
					}

					
				}).error(err => {//check_newDevice End
					return err;
				});
			}
		}
	}).error(err => { //authUser End
		return err;
	});

	res.json(data);
	return res;
}


exports.addSleep = function(req, res) {
//console.log(req.body);
	var userid = req.body.userid;
	var token = req.body.token;
	var data1 = req.body.data;
	data1 = JSON.parse(data1);
	var header_data = req.body.header_data;
	header_data = JSON.parse(header_data);
	var total = data1.length;
	var startTime = req.body.startTime;
	var endTime = req.body.endTime;
	var sleepstate = req.body.sleepstate;
	var deviceuuid = req.body.deviceuuid;
	var deviceid = req.body.deviceid;
	var header_total = header_data.length;

	if (typeof sleepstate !== 'undefined' && sleepstate) { sleepstate = sleepstate; } else { sleepstate = "";}

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

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					/**************
					 **Delete Duplicate Record of same uuid and date
					 ****************/
					for (var j = 0; j < header_total - 1; j++) {
						var startDate = header_data[j].startDate;
						var uuID = header_data[j].uuID;
						console.log(userid + " - " + userid);
						db.sleep.updateDuplicateData(userid, userid, uuID).then(function(response) {}).error(function(err) {
							res.json(err);
						});
					}

					var startDate = header_data[header_total - 1].startDate;
					var uuID = header_data[header_total - 1].uuID;

					if (!!startDate && !!uuID) {


						////Last Update of data
						db.sleep.updateDuplicateData(userid, startDate, uuID).then(function(response) {

							///adding new steps
							//var fres = add_new_sleep(userid, current_date, data1, total, startTime, endTime, deviceuuid, res);
							///res.json(fres);
						
						/****************************************************
						 **Adding new records of sleep and sleep steps
						 ***********************************************/
						if (typeof uuID !== 'undefined' && uuID) {
							uuID = uuID;
						} else {
							uuID = 0;
						}
						///For new record
						var sql = "INSERT INTO sleep (userID, startTime, endTime,uuID, sleepstate , deviceid) VALUES ('" + userid + "', '" + startTime + "', '" + endTime + "','" + uuID + "', '"+sleepstate+"' , '"+deviceid+"') ";
						db.sleep.addSleep(sql).then(function(response) {
							var sleep_ids = response;

							/////remove duplicate sleep
							////remove_duplicate_sleep();

							if(data1 && data1.length>0)
                            { // if slepp data array not empty
							var sql = "INSERT INTO sleepstep (sleepID, userID, stepTime, stepQty, sleepState) values ";

							for (var i = 0; i < total - 1; i++) {
								//var stepTime = data1[i].stepTime;
								//if (typeof stepTime !== 'undefined' && stepTime) {stepTime = stepTime;} else {stepTime = 0;}
								if (data1[i].stepTime !== null && typeof data1[i].stepTime !== 'undefined' && data1[i].stepTime) {var stepTime = data1[i].stepTime;} else {var stepTime = 0;}
								var stepQty = data1[i].stepQty;
								if (typeof stepQty !== 'undefined' && stepQty) {stepQty = stepQty;} else {stepQty = 0;}
								var sleepState = data1[i].sleepState;
								if (typeof sleepState !== 'undefined' && sleepState) {
									sleepState = sleepState;
								} else {
									sleepState = 0; 
								}
								sql += "('" + sleep_ids + "','" + userid + "','" + stepTime + "','" + stepQty + "','" + sleepState + "'),";

								sql = sql.substr(0, sql.length);
							}

							//var stepTime = data1[i].stepTime;
							if (data1[i].stepTime !== null && typeof data1[i].stepTime !== 'undefined' && data1[i].stepTime) {var stepTime = data1[i].stepTime;} else {var stepTime = 0;}
							var stepQty = data1[i].stepQty;
							if (typeof stepQty !== 'undefined' && stepQty) {stepQty = stepQty;} else {stepQty = 0;}
							var sleepState = data1[i].sleepState; 
							if (typeof sleepState !== 'undefined' && sleepState) {
								sleepState = sleepState;
							} else {
								sleepState = 0;
							}
							sql += "('" + sleep_ids + "','" + userid + "','" + stepTime + "','" + stepQty + "','" + sleepState + "')";
							db.sleep.addSleepSteps(sql).then(function(response) {
								data["error"] = 0;
								data["authResponse"] = "Sleep Data Added Successfully";
								data['sleep_id'] = sleep_ids;
								//console.log(data);
								//return data;
								res.json(data);
							}).error(function(err) {
								return err;
							});
                          
                          }
                          else
                          {// sleep data array is empty
                          	data["error"] = 0;
							data["authResponse"] = "Sleep Data Added Successfully";
							data['sleep_id'] = sleep_ids;
							res.json(data); 

                          }

						}).error(function(err) { 
							return err;
						});

						/*****************************
						 **End Adding Sleep
						 *****************************/


						}).error(function(err) {
							res.json(err);
						});

					} else {
						///adding new steps
						//var fres = add_new_sleep(userid, current_date, data1, total, startTime, endTime, deviceuuid, res);
						//res.json(fres);
						
						/****************************************************
						 **Adding new records of sleep and sleep steps
						 ***********************************************/ 
						if (typeof uuID !== 'undefined' && uuID) {
							uuID = uuID;
						} else {
							uuID = 0;
						}
						///For new record
						var sql = "INSERT INTO sleep (userID, startTime, endTime,uuID, sleepstate, deviceid) VALUES ('" + userid + "', '" + startTime + "', '" + endTime + "','" + uuID + "', '"+sleepstate+"','"+deviceid+"') ";
						db.sleep.addSleep(sql).then(function(response) {
							var sleep_ids = response;
                            
                            /////remove duplicate sleep
							/////remove_duplicate_sleep();

                             if(data1 && data1.length)
                             {
							var sql = "INSERT INTO sleepstep (sleepID, userID, stepTime, stepQty, sleepState) values ";

							for (var i = 0; i < total - 1; i++) {
								//var stepTime = data1[i].stepTime;
								//if (typeof stepTime !== 'undefined' && stepTime) {stepTime = stepTime;} else {stepTime = 0;}
								if (data1[i].stepTime !== null && typeof data1[i].stepTime !== 'undefined' && data1[i].stepTime) {var stepTime = data1[i].stepTime;} else {var stepTime = 0;}
								var stepQty = data1[i].stepQty;
								if (typeof stepQty !== 'undefined' && stepQty) {stepQty = stepQty;} else {stepQty = 0;}
								var sleepState = data1[i].sleepState;
								if (typeof sleepState !== 'undefined' && sleepState) {
									sleepState = sleepState;
								} else {
									sleepState = 0;
								}
								sql += "('" + sleep_ids + "','" + userid + "','" + stepTime + "','" + stepQty + "','" + sleepState + "'),";

								sql = sql.substr(0, sql.length);
							}

							//var stepTime = data1[i].stepTime;
							//if (typeof stepTime !== 'undefined' && stepTime) {stepTime = stepTime;} else {stepTime = 0;}
							if (data1[i].stepTime !== null && typeof data1[i].stepTime !== 'undefined' && data1[i].stepTime) {var stepTime = data1[i].stepTime;} else {var stepTime = 0;}
							var stepQty = data1[i].stepQty;  
							if (typeof stepQty !== 'undefined' && stepQty) {stepQty = stepQty;} else {stepQty = 0;}
							var sleepState = data1[i].sleepState;
							if (typeof sleepState !== 'undefined' && sleepState) { 
								sleepState = sleepState;
							} else {
								sleepState = 0; 
							}
							sql += "('" + sleep_ids + "','" + userid + "','" + stepTime + "','" + stepQty + "','" + sleepState + "')";
							db.sleep.addSleepSteps(sql).then(function(response) {
								data["error"] = 0;
								data["authResponse"] = "Sleep Data Added Successfully";
								data['sleep_id'] = sleep_ids;
								//console.log(data);
								//return data;
								res.json(data);
							}).error(function(err) {
								return err;
							});

						}
						else
						{  /// if sleepdata array is empty
							data["error"] = 0;
							data["authResponse"] = "Sleep Data Added Successfully";
							data['sleep_id'] = sleep_ids;


							res.json(data);
						}


						}).error(function(err) {
							return err;
						});

						/*****************************
						 **End Adding Sleep
						 *****************************/

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
		})
		.error(function(err) {
			res.json(err);
		});



	return res;



};

function remove_duplicate_sleep(){   
console.log(':::::::::::::::::::: Sleep Removal Working');
	var runner = require("child_process");
	var phpScriptPath = __dirname+"/../phpFiles/remove_sleep.php";   
	var argsString = "1"+","+"1";
	runner.exec("php " + phpScriptPath + " " +argsString, function(err, phpResponse, stderr) {
	if(err) console.log(err); /* log error */
	console.log( phpResponse );
	});

}


/**************======================== add new step ====================================****************************/
/**   currently not used
function add_new_sleep(userid, current_date, data1, total, startTime, endTime, uuID) {

	var data = {
		"error": 0,
		"authResponse": ""
	}


	///////////////////////
	 /////Adding new records
	///////////////////////////
	if (typeof uuID !== 'undefined' && uuID) {
		uuID = uuID;
	} else {
		uuID = 0;
	}
	///For new record
	var sql = "INSERT INTO sleep (userID, startTime, endTime,uuID) VALUES ('" + userid + "', '" + startTime + "', '" + endTime + "','" + uuID + "') ";
	db.sleep.addSleep(sql).then(function(response) {
		var sleep_ids = response;
		var sql = "INSERT INTO sleepstep (sleepID, userID, stepTime, stepQty, sleepState) values ";

		for (var i = 0; i < total - 1; i++) {
			var stepTime = data1[i].stepTime;
			var stepQty = data1[i].stepQty;
			var sleepState = data1[i].sleepState;
			if (typeof sleepState !== 'undefined' && sleepState) {
				sleepState = sleepState;
			} else {
				sleepState = 0;
			}
			sql += "('" + sleep_ids + "','" + userid + "','" + stepTime + "','" + stepQty + "','" + sleepState + "'),";

			sql = sql.substr(0, sql.length);
		}

		var stepTime = data1[i].stepTime;
		var stepQty = data1[i].stepQty;
		var sleepState = data1[i].sleepState;
		if (typeof sleepState !== 'undefined' && sleepState) {
			sleepState = sleepState;
		} else {
			sleepState = 0;
		}
		sql += "('" + sleep_ids + "','" + userid + "','" + stepTime + "','" + stepQty + "','" + sleepState + "')";
		db.sleep.addSleepSteps(sql).then(function(response) {
			data["error"] = 0;
			data["authResponse"] = "Sleep Data Added Successfully";
			data['sleep_id'] = sleep_ids;
			console.log(data);
			return data;
			//res.json(data);
		}).error(function(err) {
			return err;
		});


	}).error(function(err) {
		return err;
	});

	data["error"] = 0;
	data["authResponse"] = "Sleep Data Added Successfully";
	data['sleep_id'] =  sleep_ids; 
	return data;


	//////////////////////////////
	 //End adding record to sleep
	 ///////////////////////////

}

*/
///////////////========================Get sleep Data=================================================/////////////////

exports.getSleep = function(req, res) {
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
		db.user.authUser(token).then(function(response) {
				if (response != '' && response != null) {
					var email = response;
					//res.json(email);
					///Get user info
					db.sleep.getSleeps(userid, startDate, endDate).then(function(response) {
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

///////////////========================Get sleep Steps Data=================================================/////////////////

exports.getSleepSteps = function(req, res) {
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
		db.user.authUser(token).then(function(response) {
				if (response != '' && response != null) {
					var email = response;
					//res.json(email);
					///Get user info
					db.sleep.getSleepSteps(userid, startDate, endDate).then(function(response) {
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

////////////=========================================Add Sleep Setting Goals ===============================//////////////////////
exports.addSleepSetting = function(req, res) {

	var user_id=req.body.userid;
	var token=req.body.token;
	var data1=req.body.data;
		data1=JSON.parse(data1);
//console.log(data1); return false;
	var total=data1.length; 
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
		if(!!token)
		{
		if(response!='' && response!=null)
		{
		   
		   db.sleep.getSleepSetting(user_id).then(function(response){
           
           if(response!='' && response!=null) //// Response Not Empty
			{
                var deviceuuid=data1[total-1].deviceuuid;

 //console.log('deviceuuiddeviceuuiddeviceuuiddeviceuuid===========>'+deviceuuid); return false;

				if(typeof deviceuuid === "undefined" || deviceuuid=='') {
                   
                    data["error"] = 1;
					data["authResponse"] = "Device UUID Required";
					res.json(data);
                   return false;
				}

               var sql=`UPDATE sleepSetting SET deviceuuid='`+deviceuuid+`' ,
                        userid=`+data1[total-1].userid+`,
                        enabled=`+data1[total-1].enabled+`,
                        starthour=`+data1[total-1].starthour+`,
                        startminute=`+data1[total-1].startminute+`,
                        endhour=`+data1[total-1].endhour+`,
                        endminute=`+data1[total-1].endminute+`
                        WHERE userid=`+data1[total-1].userid+``;
                 
                 db.sleep.updateSleepSetting(sql).then(function(response){
				 
					data["error"] = 0;
					data["authResponse"] = "Sleep Setting Updated Successfully";
					res.json(data);
		
				}).error(function(err){
		        res.json(err);
		        });
		        

			}
			else
			{ 
			

			var sql = "INSERT INTO sleepSetting (deviceuuid, userid , enabled , starthour , startminute , endhour , endminute ) values ";
			console.log(data1[total-1]);
                        if (typeof data1[total-1] !== 'undefined') {
			if(typeof data1[total-1].deviceuuid !== 'undefined')
                        {
                           

				var deviceuuid=data1[total-1].deviceuuid;
                            
			} else
			{
				var deviceuuid='';
			}
			
			
			//var deviceuuid=data1[total-1].deviceuuid;
			var userid=data1[total-1].userid;
			var enabled=data1[total-1].enabled;
			var starthour=data1[total-1].starthour;
			var startminute=data1[total-1].startminute;
			var endhour=data1[total-1].endhour;
			var endminute=data1[total-1].endminute;
				
			
			sql += "('"+deviceuuid+"','" + userid + "','" + enabled + "','" + starthour + "','" + startminute + "','" + endhour + "','" + endminute + "')";
			
		 
		    db.sleep.addSleepSetting(sql).then(function(response){
				 
					data["error"] = 0;
					data["authResponse"] = "Sleep Setting Added Successfully";
					res.json(data);
		
				}).error(function(err){
		        res.json(err);
		});

			}}

		   	}).error(function(err){
		        res.json(err);
		});


                    
		
		
		}
		else
		{
		data["error"]=1;
		data["authResponse"] = "Authentication Failed.";
		res.json(data);
		}
		}
		else
		{
		data["error"]=1;
		data["authResponse"] = "Token Required etc.";
		res.json(data);
			}
		})
		.error(function(err){
		res.json(err);
		});
		
		
	
      return res;
};


///////////////========================Get sleep Setting Data=================================================/////////////////

exports.getSleepSetting = function(req, res) {
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
					
					db.sleep.getSleepSetting(userid).then(function(response) {
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


////////////=========================================Add Weekly Sleep Setting Goals ===============================//////////////////////
exports.addWeeklySleepSetting = function(req, res) {

	var user_id=req.body.userid;
	var token=req.body.token;
	var data1=req.body.data;
	console.log("addWeeklySleepSetting's data1 : ", data1);
		data1=JSON.parse(data1);

	var total=data1.length;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		//console.log(data1); return false;

		db.user.authUser(token).then(function(response){
		if(!!token)
		{
		if(response!='' && response!=null)
		{
		   
		   db.sleep.getWeekendSleepSettings(user_id).then(function(response){
           
           if(response!='' && response!=null ) //// Response Not Empty
			{
				if(typeof data1[total-1].deviceuuid !== 'undefined' && data1[total-1].deviceuuid)
				{
               var sql=`UPDATE weekendsleepsettings SET deviceuuid='`+data1[total-1].deviceuuid+`' ,
                        userid=`+data1[total-1].userid+`,
                        enabled=`+data1[total-1].enabled+`,
                        starthour=`+data1[total-1].starthour+`,
                        startminute=`+data1[total-1].startminute+`,
                        endhour=`+data1[total-1].endhour+`,
                        endminute=`+data1[total-1].endminute+`
                        WHERE userid=`+data1[total-1].userid+``;
                 
                 db.sleep.updateSleepSetting(sql).then(function(response){
				 
					data["error"] = 0;
					data["authResponse"] = "Sleep Setting Updated Successfully";
					res.json(data);
		
				}).error(function(err){ 
		        res.json(err);
		        });

			}
			else
			{
			        data["error"] = 1;
					data["authResponse"] = "Device UUID required.";
					res.json(data);	
			}
		        

			}
			else
			{ 
			
if(typeof data[total-1] !== 'undefined') {
			var sql = "INSERT INTO weekendsleepsettings (deviceuuid, userid , enabled , starthour , startminute , endhour , endminute ) values ";
			
			
			var deviceuuid=data1[total-1].deviceuuid;
			var userid=data1[total-1].userid;
			var enabled=data1[total-1].enabled;
			var starthour=data1[total-1].starthour;
			var startminute=data1[total-1].startminute;
			var endhour=data1[total-1].endhour;
			var endminute=data1[total-1].endminute;
				
			
			sql += "('"+deviceuuid+"','" + userid + "','" + enabled + "','" + starthour + "','" + startminute + "','" + endhour + "','" + endminute + "')";
			
		 
		    db.sleep.addSleepSetting(sql).then(function(response){
				 
					data["error"] = 0;
					data["authResponse"] = "Weekly Sleep Setting Added Successfully";
					res.json(data);
		
				}).error(function(err){
		        res.json(err);
		});

			}}

		   	}).error(function(err){
		        res.json(err);
		});
		
		
		}
		else
		{
		data["error"]=1;
		data["authResponse"] = "Authentication Failed.";
		res.json(data);
		}
		}
		else
		{
		data["error"]=1;
		data["authResponse"] = "Token Required etc.";
		res.json(data);
			}
		})
		.error(function(err){
		res.json(err);
		});
		
		
	
      return res;
};


///////////////========================Get sleep Setting Data=================================================/////////////////

exports.getWeeklySleepSetting = function(req, res) {
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
					
					db.sleep.getWeekendSleepSettings(userid).then(function(response) {
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
