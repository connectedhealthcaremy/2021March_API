'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');
///var gcm = require('node-gcm');
//var message = new gcm.Message();

//============================================Add My Medicine============================================/////////////////
exports.addmymedicine = function(req, res) {

	console.log(req.body);
	var userid = req.body.userid;
	var token = req.body.token;
	var data1 = req.body.data;

	data1 = JSON.parse(data1);

	var total = data1.length;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	var LastIDs = [];

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {
					var email = response;

					var email = response;
					var deviceID = response[0].deviceID;

					console.log("Total Count======================================================" + total);

					for (var i = 0; i <= total; i++) {

						var medicineID = data1[i].medicineID;
						var shape = data1[i].shape;
						var colour = data1[i].colour;
						var variableDose = data1[i].variableDose;
						var strengthSupplied = data1[i].strengthSupplied;
						var strengthTaken = data1[i].strengthTaken;
						var medicineTake = data1[i].medicineTake;
						var units = data1[i].units;
						var timingPerDay = data1[i].timingPerDay;
						var reminderType = data1[i].reminderType;
						var beforeActualTimeRemind = data1[i].beforeActualTimeRemind;
						var startDate = data1[i].startDate;
						var endDate = data1[i].endDate;
						var days = data1[i].days;
						var instruction = data1[i].instruction;
						var medicineTakeType = data1[i].medicineTakeType;
						var quantitySupplied = data1[i].quantitySupplied;
						var refilReminder = data1[i].refilReminder;
						var daysBeforeMedicineOut = data1[i].daysBeforeMedicineOut;
                        var dosageUnit = data1[i].dosageUnit;
						

                        var sql = "INSERT INTO mymedicine (medicineID, userID , shape, colour, variableDose, strengthSupplied, strengthTaken, medicineTake, unit, timingPerDay, reminderType, beforeActualTimeRemind, startDate, endDate, days, instruction, medicineTakeType, quantitySupplied, refilReminder, daysBeforeMedicineOut, dosageUnit) values ";
						sql += "('" + medicineID + "','" + userid + "','" + shape + "','" + colour + "','" + variableDose + "','" + strengthSupplied + "','" + strengthTaken + "','" + medicineTake + "','" + units + "','" + timingPerDay + "','" + reminderType + "','" + beforeActualTimeRemind + "','" + startDate + "','" + endDate + "','" + days + "','" + instruction + "','" + medicineTakeType + "','" + quantitySupplied + "','" + refilReminder + "', '" + daysBeforeMedicineOut + "', '"+dosageUnit+"')";

						if (medicineID == '' || medicineID == 'undefined' || medicineID == null)
						{
						    medicineID = '0';
						}
						
						console.log("Medicine ID =================================================== " + medicineID);

						var sql_DuplicateCheck = "select * from mymedicine where medicineID='" + medicineID + "' and  userID='" + userid + "'";

						console.log(sql_DuplicateCheck);

					    db.mymedicine.Selectmymedicinestatus(sql_DuplicateCheck).then(function (response_duplicate) {

					        if (response_duplicate != '' && response_duplicate != null) {

					            data["error"] = 0;
					            data["authResponse"] = "my Medicine Already added.";
					            data["id"] = response_duplicate[0].id;
					            res.json(data);
					        }

					        else

                                {
					            console.log(sql);
					            db.mymedicine.addmymedicine(sql).then(function (response) {

					                /**
                                     **get last inserted id,s
                                     ***/
					                var lastinsertid = response;
					                //LastIDs.push(lastinsertid); // add at the end 
					                //console.log(LastIDs);

					                db.mymedicine.lastaddIDs(lastinsertid).then(function (response) {

					                    data["error"] = 0;
					                    data["authResponse"] = "my Medicine Added Successfully";
					                    data["id"] = response;
					                    res.json(data);

					                }).error(function (err) {
					                    res.json(err);
					                });


					            }).error(function (err) {
					                res.json(err);
					            });
					        }
						    //End 
						}).error(function (err) {
						    res.json(err);
						});
					}

				

					//var medicineID = data1[total - 1].medicineID;
					//var shape = data1[total - 1].shape;
					//var colour = data1[total - 1].colour;
					//var variableDose = data1[total - 1].variableDose;
					//var strengthSupplied = data1[total - 1].strengthSupplied;
					//var strengthTaken = data1[total - 1].strengthTaken;
					//var medicineTake = data1[total - 1].medicineTake;
					//var units = data1[total - 1].units;
					//var timingPerDay = data1[total - 1].timingPerDay;
					//var reminderType = data1[total - 1].reminderType;
					//var beforeActualTimeRemind = data1[total - 1].beforeActualTimeRemind;
					//var startDate = data1[total - 1].startDate;
					//var endDate = data1[total - 1].endDate;
					//var days = data1[total - 1].days;
					//var instruction = data1[total - 1].instruction;
					//var medicineTakeType = data1[total - 1].medicineTakeType;
					//var quantitySupplied = data1[total - 1].quantitySupplied;
					//var refilReminder = data1[total - 1].refilReminder;
					//var daysBeforeMedicineOut = data1[total - 1].daysBeforeMedicineOut;
					//var dosageUnit = data1[total - 1].dosageUnit;
					//sql += "('" + medicineID + "','" + userid + "','" + shape + "','" + colour + "','" + variableDose + "','" + strengthSupplied + "','" + strengthTaken + "','" + medicineTake + "','" + units + "','" + timingPerDay + "','" + reminderType + "','" + beforeActualTimeRemind + "','" + startDate + "','" + endDate + "','" + days + "','" + instruction + "','" + medicineTakeType + "','" + quantitySupplied + "','" + refilReminder + "', '" + daysBeforeMedicineOut + "', '"+dosageUnit+"')";
					//var sql_DuplicateCheck = "select * from mymedicine where myMedicineID='" + myMedicineID + "' and  userID='" + userid + "'";
					//console.log(sql_DuplicateCheck);
				    //db.mymedicine.Selectmymedicinestatus(sql_DuplicateCheck).then(function (response_duplicate) {
					//db.mymedicine.addmymedicine(sql).then(function(response) {
					//	/**
					//	 **get last inserted id,s
					//	 ***/
					//	var lastinsertid = response;
					//	db.mymedicine.lastaddIDs(lastinsertid).then(function(response) {
					//		data["error"] = 0;
					//		data["authResponse"] = "my Medicine Added Successfully";
					//		data["id"] = response;
                    //        res.json(data);
					//	}).error(function(err) {
					//		res.json(err);
					//	});
					//}).error(function(err) {
					//	res.json(err);
					//});
                    //    //End 
					//}).error(function (err) {
					//    res.json(err);
					//});

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

///////////===================================Update medicine======================================///////////////////////

exports.updatemymedicine = function(req, res) {

	var userid = req.body.userid;
	var token = req.body.token;
	var myMedicineID2 = req.body.myMedicineID;
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

					var email = response;

					for (var i = 0; i < total - 1; i++) {
							
					var myMedicineID = data1[i].medicineID;

					var shape = data1[i].shape;
					var colour = data1[i].colour;
					var variableDose = data1[i].variableDose;
					var strengthSupplied = data1[i].strengthSupplied;
					var strengthTaken = data1[i].strengthTaken;
					var medicineTake = data1[i].medicineTake;
					var units = data1[i].units;
                    var timingPerDay = data1[i].timingPerDay;
					var reminderType = data1[i].reminderType;
					var beforeActualTimeRemind = data1[i].beforeActualTimeRemind;
					var startDate = data1[i].startDate;
					var endDate = data1[i].endDate;
					var days = data1[i].days;
                    var instruction = data1[i].instruction;
                    var inserdatetime = data1[i].insertionDate;


                        var sql = "UPDATE mymedicine SET  shape='" + shape + "', colour='" + colour + "', variableDose='" + variableDose + "', strengthSupplied='" + strengthSupplied + "', strengthTaken='" + strengthTaken + "', medicineTake='" + medicineTake + "', unit='" + units + "', timingPerDay='" + timingPerDay + "', reminderType='" + reminderType + "', beforeActualTimeRemind='" + beforeActualTimeRemind + "', startDate='" + startDate + "', endDate='" + endDate + "', days='" + days + "', instruction='" + instruction + "', insertDateTime='" + inserdatetime + "' where medicineID='" + myMedicineID + "'";


                        db.mymedicine.updatemymedicine(sql).then(function (response) { }).error(function (err) {
							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}
               var myMedicineID = data1[total - 1].medicineID;
					var shape = data1[total - 1].shape;
					var colour = data1[total - 1].colour;
					var variableDose = data1[total - 1].variableDose;
					var strengthSupplied = data1[total - 1].strengthSupplied;
					var strengthTaken = data1[total - 1].strengthTaken;
					var medicineTake = data1[total - 1].medicineTake;
					var units = data1[total - 1].units;
					var timingPerDay = data1[total - 1].timingPerDay;
					var reminderType = data1[total - 1].reminderType;
					var beforeActualTimeRemind = data1[total - 1].beforeActualTimeRemind;
					var startDate = data1[total - 1].startDate;
					var endDate = data1[total - 1].endDate;
					var days = data1[total - 1].days;
					var instruction = data1[total - 1].instruction;

                    var sql = "UPDATE mymedicine SET  shape='" + shape + "', colour='" + colour + "', variableDose='" + variableDose + "', strengthSupplied='" + strengthSupplied + "', strengthTaken='" + strengthTaken + "', medicineTake='" + medicineTake + "', unit='" + units + "', timingPerDay='" + timingPerDay + "', reminderType='" + reminderType + "', beforeActualTimeRemind='" + beforeActualTimeRemind + "', startDate='" + startDate + "', endDate='" + endDate + "', days='" + days + "', instruction='" + instruction + "' , insertDateTime='" + inserdatetime + "' where medicineID='" + myMedicineID + "'";

                 
					db.mymedicine.updatemymedicine(sql).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "my Medicine Update Successfully";
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

///////////////========================Get My Medicine Data=================================================/////////////////

exports.getmymedicine = function(req, res) {
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


					db.mymedicine.getmymedicinelist(userid).then(function(response) {

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


///////////////========================Get Docotrs Data=================================================/////////////////

exports.getdoctors = function(req, res) {
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
					db.professional.getdoctors(userid).then(function(response) {
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

///////////////========================Get Pharmacist Data=================================================/////////////////

exports.getpharmacist = function(req, res) {
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
					db.pharmacist.getpharmacist(userid).then(function(response) {
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

///////////////========================Get Medicine Data=================================================/////////////////

exports.getmedicine = function(req, res) {
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
					db.medicine.getmedicine(userid).then(function(response) {
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




exports.getmedicineStatus = function (req, res) {
    var userid = req.query.userid;
    var token = req.query.token;

    var data = {
        "error": 0,
        "authResponse": ""
    }
    if (!!token) {
        ///Authinticate user
        db.user.authUser(token).then(function (response) {
            if (response != '' && response != null) {
               // var email = response;
                //res.json(email);
                ///Get user info
                db.medicine.getmedicineStatus(userid).then(function (response) {
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


///////////////////////=================Update MedicineStatus User===================================///////////////////////

exports.updatemedcinestatus = function(req, res) {


	var userid = req.body.userid;
	var token = req.body.token;
	var data1 = req.body.data;

	data1 = JSON.parse(data1);

	var total = data1.length;

	var data = {
		"error": 0,
		"authResponse": ""
	}
    console.log(data1);

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {
					var email = response;

					var email = response;
					var deviceID = response[0].deviceID;                 

                  // for (var i = 0; i < total - 1; i++) {

                        var myMedicineID = data1[0].myMedicineID;
                        var status       = data1[0].status;
                        var dateTime     = data1[0].dateTime;
                        var timeTake     = data1[0].timeTaken;
                        var reason       = data1[0].reason;

                        var sql = "INSERT INTO mymedicinestatus (myMedicineID, userID , status, dateTime, timeTaken, reason) values ('" + myMedicineID + "','" + userid + "','" + status + "','" + dateTime + "', '" + timeTake + "', '" + reason + "')";

                        console.log(sql);

                        var sql2 = "select * from mymedicinestatus where dateTime='" + dateTime + "' and myMedicineID='" + myMedicineID + "' and  userID='" + userid + "'";

                        console.log(sql2);
                     
                        db.mymedicine.Selectmymedicinestatus(sql2).then(function (response) {

                            console.log(response);
                            if (response != '' && response != null) {

                                //  var sqlUpdate = "UPDATE mymedicinestatus SET  myMedicineID='" + myMedicineID + "', userID='" + 
                                //userid + "', status='" + status + "', dateTime='" + dateTime + "', timeTake='" + timeTake + "', reason='" + reason + "'  where dateTime='" + dateTime + "' and myMedicineID='" + myMedicineID + "' and  userID='" + userid + "'";

                                var sqlUpdate = "UPDATE mymedicinestatus SET status='" + status + "', timeTaken='" + timeTake + "', reason='" + reason + "' where dateTime='" + dateTime + "' and myMedicineID='" + myMedicineID + "' and  userID='" + userid + "'";

                                db.mymedicine.updatemymedicine(sqlUpdate).then(function (response) {

                                    data["error"] = 0;
                                    data["authResponse"] = "my Medicine Status Updated Successfully";
                                    res.json(data);

                                }).error(function (err) {
                                    res.json(err);
                                });

                            }
                            else {
                                db.mymedicine.addmymedicine(sql).then(function (response) {

                                    data["error"] = 0;
                                    data["authResponse"] = "my Medicine Inserted Updated Successfully";
                                    res.json(data);

                                }).error(function (err) {
                                    res.json(err);
                                });
                            }

                        }).error(function (err) {
                            res.json(err);
                        });
                   // }

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

///////////////========================Get Medicine Data Status=================================================/////////////////

//exports.getmedicineStatus = function(req, res) {
//	var userid = req.query.userid;
//	var token = req.query.token;

//	var data = {
//		"error": 0,
//		"authResponse": ""
//	}
//	if (!!token) {
//		///Authinticate user
//		db.user.authUser(token).then(function(response) {
//				if (response != '' && response != null) {
//					var email = response;
//					//res.json(email);
//					///Get user info
//					db.mymedicine.getmedicindeStatus(userid).then(function(response) {
//							data["error"] = 0;
//							data["authResponse"] = "Action Successful";
//							data['Data'] = response;
//							res.json(data);

//						})
//						.error(function(err) {
//							res.json(err);
//						});

//				} else {
//					data["error"] = 1;
//					data["authResponse"] = "Authentication Failed.";
//					res.json(data);

//				}
//			})
//			.error(function(err) {
//				res.json(err);
//			});
//	} else {
//		data["error"] = 1;
//		data["authResponse"] = "Please provide all required data (i.e : token etc)";
//		res.json(data);
//		//connection.end()
//	}

//	return res;
//};

////=======================================Delete my medicine from table==================================================///////////////////////////	

exports.deleteMyMedicine = function(req, res) {

	var userid = req.body.userid;
	var token = req.body.token;
	var data1 = req.body.data;

	data1 = JSON.parse(data1);

	var total = data1.length;

	var data = {
		"error": 0,
		"authResponse": ""
	}


	var sql = '';

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					for (var i = 0; i < total - 1; i++) {
						var mymedicineID = data1[i].id;



						sql = "DELETE FROM mymedicine  WHERE id='" + mymedicineID + "'";

						db.activity.addactivity(sql).then(function(response) {}).error(function(err) {
							res.json(err);

						});
						sql = sql.substr(0, sql.length);
					}

					var mymedicineID = data1[total - 1].id;

					sql = "DELETE FROM mymedicine  WHERE id='" + mymedicineID + "'";


					db.activity.addactivity(sql).then(function(response) {

						data["error"] = 0;
						data["authResponse"] = "Medicine Deleted Successfully";
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


}

///=======================================Reminder Check from table and sent google cloud message============================////////////////////////

exports.remindercheck = function(req, res) {

	///current date
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
	var currentDate = year + "-" + month + "-" + day;

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.mymedicine.checkreminder(currentDate).then(function(response) {

			//console.log(year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec);
			var currentTime = hour + ":" + min;
			///current day

			var weekDay = new Array(7);
			weekDay[0] = "sun";
			weekDay[1] = "mon";
			weekDay[2] = "tue";
			weekDay[3] = "wed";
			weekDay[4] = "thr";
			weekDay[5] = "fri";
			weekDay[6] = "sat";

			var currentDay = weekDay[date.getDay()];
			var hours = '';
			var reminderbTime = '';

			for (var i in response) {
				var medicineID = response[i].medicineID;
				var userID = response[i].userID;
				var medicineName = response[i].medicineName;
				var deviceID = response[i].deviceID;
				console.log('CronJob Working with ' + medicineName + " at " + currentTime);
				var medicineDay = response[i].days.split(',');
				if (medicineDay.includes(currentDay) == true) {
					var beforeCurrentTime = parseInt(response[i].beforeActualTimeRemind);

					//beforeCurrentTime= beforeCurrentTime < 10 ? "0"+beforeCurrentTime : beforeCurrentTime;


					var timingPerDay = response[i].timingPerDay.split(',');

					for (var j in timingPerDay) {
						var intTime = timingPerDay[j].split(':');
						var intTimes = intTime[0] + intTime[1];
						var minDifference = parseInt(intTime[1]) - parseInt(beforeCurrentTime);
						if (minDifference < 0) {
							minDifference = parseInt(60) + parseInt(minDifference);
							hours = parseInt(intTime[0]) - parseInt(1);
							reminderbTime = hours + ":" + minDifference;
						} else {
							minDifference = minDifference;
							hours = parseInt(intTime[0]);
							reminderbTime = hours + ":" + minDifference;
						}
						//console.log("reminder Time+"+reminderbTime+"->current+"+currentTime);
						if (reminderbTime == currentTime) {
							///console.log('Send Notification');

							///GCM Start
							/*
							// start message 
							var message = new gcm.Message({
							collapseKey: 'demo',
							priority: 'high',
							contentAvailable: true,
							delayWhileIdle: true,
							timeToLive: 3,
							// restrictedPackageName: "somePackageName",
							dryRun: false,
							data: {
							key1: 'reminder',
							key2: 'medicineID='+medicineID,
							key3: 'userID='+userID
							},
							notification: {
							title: "CHIEF",
							icon: "ic_launcher",
							body: medicineName
							}
							});
									
									
							// Set up the sender with you API key
							var sender = new gcm.Sender('AIzaSyBvrZtAa2fyp4F-peTtpX5icXRZp1-VYog');
									
							var registrationTokens = [];
							registrationTokens.push(deviceID);
								
							sender.sendNoRetry(message, { registrationTokens: registrationTokens }, function(err, response) {
							if(err) console.error(err);
							else    console.log(response);
							});
									
							// ... or retrying
							sender.send(message, { registrationTokens: registrationTokens }, function (err, response) {
							if(err) console.error(err);
							else    console.log(response);
							});
									
							// ... or retrying a specific number of times (10)
							sender.send(message, { registrationTokens: registrationTokens }, 10, function (err, response) {
							if(err) console.error(err);
							else    console.log(response);
							});
							*/
							////Gcm End
						}
					}

				}
			}



			/*data["error"] = 0;
			data["authResponse"] ="Action Successful" ;
			data['Data']=response;
			res.json(data);*/

		})
		.error(function(err) {
			res.json(err);
		});



	return res;

};
