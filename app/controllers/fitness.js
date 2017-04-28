'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');

/******
 **2.4 run test 
 *******/

//============================================Add user 2.5 km run test============================================/////////////////
exports.addruntest = function(req, res) {
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
					var email = response;

					var sql = "INSERT INTO runtest (userid, timetaken, recorddatetime, vo2max, predicted1time, predicted5time, predicted10time) values ";

					for (var i = 0; i < total - 1; i++) {
						var timetaken = data1[i].timetaken;
						var date = data1[i].date;
						var vo2max = data1[i].vo2max;
						var predicted1time = data1[i].predicted1time;
						var predicted5time = data1[i].predicted5time;
						var predicted10time = data1[i].predicted10time;

						sql += "('" + userid + "','" + timetaken + "','" + date + "','" + vo2max + "','" + predicted1time + "','" + predicted5time + "','" + predicted10time + "'),";

						sql = sql.substr(0, sql.length);
					}

					var timetaken = data1[total - 1].timetaken;
					var date = data1[total - 1].date;
					var vo2max = data1[total - 1].vo2max;
					var predicted1time = data1[total - 1].predicted1time;
					var predicted5time = data1[total - 1].predicted5time;
					var predicted10time = data1[total - 1].predicted10time;

					sql += "('" + userid + "','" + timetaken + "','" + date + "','" + vo2max + "','" + predicted1time + "','" + predicted5time + "','" + predicted10time + "')";

					db.runtest.addruntest(sql).then(function(response) {

						var lastinsertid = response;
						db.runtest.lastAddIDs(lastinsertid).then(function(response) {

							data["error"] = 0;
							data["authResponse"] = "2.4 KM run test Added Successfully";
							data['id'] = response;
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

//============================================Update user 2.5 km run test============================================/////////////////
exports.updateruntestuser = function(req, res) {

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
					var email = response;

					//var sql;


					for (var i = 0; i < total - 1; i++) {
						var timetaken = data1[i].timetaken;
						var date = data1[i].date;
						var vo2max = data1[i].vo2max;
						var predicted1time = data1[i].predicted1time;
						var predicted5time = data1[i].predicted5time;
						var predicted10time = data1[i].predicted10time;
						var id = data1[i].id;

						var sql = "UPDATE runtest SET timetaken='" + timetaken + "', recorddatetime='" + date + "', vo2max='" + vo2max + "', predicted1time='" + predicted1time + "', predicted5time='" + predicted5time + "', predicted10time ='" + predicted10time + "' WHERE id='" + id + "'";

						db.runtest.updateruntest(sql).then(function(response) {}).error(function(err) {

							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}

					var timetaken = data1[total - 1].timetaken;
					var date = data1[total - 1].date;
					var vo2max = data1[total - 1].vo2max;
					var predicted1time = data1[total - 1].predicted1time;
					var predicted5time = data1[total - 1].predicted5time;
					var predicted10time = data1[total - 1].predicted10time;
					var id = data1[total - 1].id;

					var sql = "UPDATE runtest SET timetaken='" + timetaken + "', recorddatetime='" + date + "', vo2max='" + vo2max + "', predicted1time='" + predicted1time + "', predicted5time='" + predicted5time + "', predicted10time ='" + predicted10time + "' WHERE id='" + id + "'";
					// console.log(sql);
					db.runtest.updateruntest(sql).then(function(response) {}).error(function(err) {

						res.json(err);
					});



					data["error"] = 0;
					data["authResponse"] = "2.4 KM run test updated Successfully";
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

//============================================Delete user 2.5 km run test============================================/////////////////
exports.deleteruntest = function(req, res) {

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
					var email = response;

					for (var i = 0; i < total - 1; i++) {

						var id = data1[i].id;

						var sql = "UPDATE runtest SET isdeleted='1' WHERE id='" + id + "'";

						db.runtest.deleteruntest(sql).then(function(response) {}).error(function(err) {

							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}

					var id = data1[total - 1].id;

					var sql = "UPDATE runtest SET isdeleted='1' WHERE id='" + id + "'";

					db.runtest.deleteruntest(sql).then(function(response) {}).error(function(err) {

						res.json(err);
					});



					data["error"] = 0;
					data["authResponse"] = "2.4 KM run test deleted Successfully";
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

//============================================Get user single 2.5 run test get data============================================/////////////////
exports.getsingleruntest = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var id = req.query.id;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.runtest.getsingleruntest(id).then(function(response) {

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

//============================================Get user 2.5 run test get data============================================/////////////////
exports.getruntestbyuser = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.runtest.getruntest(userid).then(function(response) {

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

//============================================Get user 2.5 run test get data Average============================================/////////////////
exports.getaveragetestScore = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.runtest.getruntestAverage(userid).then(function(response) {

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

////==========================================get 2.4 km run test data by different dates==================================////////////////////
exports.gettestScorebydays = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var startdate = req.query.startDate;
	var enddate = req.query.endDate;
	startdate = startdate + ' 00:00:00';
	enddate = enddate + ' 23:59:59';
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.runtest.getruntestbydates(userid, startdate, enddate).then(function(response) {

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

//============================================Get user 2.5 run test by days============================================/////////////////
exports.gettestAverageScorebydays = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var startdate = req.query.startDate;
	var enddate = req.query.endDate;
	startdate = startdate + ' 00:00:00';
	enddate = enddate + ' 23:59:59';

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.runtest.getruntestAverageByDays(userid, startdate, enddate).then(function(response) {

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

//============================================Get user 2.5 run test by last 30 days============================================/////////////////
exports.gettestdatabymonth = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.runtest.getruntestByMonth(userid).then(function(response) {

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

/*********
 **push up test 
 ***********/
//============================================Add user push up fitness test============================================/////////////////
exports.addpushuptest = function(req, res) {

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
					var email = response;

					var sql = "INSERT INTO pushuptest (userid, pushupcount, recorddatetime, assessmentresult) values ";

					for (var i = 0; i < total - 1; i++) {
						var pushupcount = data1[i].pushupcount;
						var date = data1[i].date;
						var assessmentresult = data1[i].assessmentresult;

						if(assessmentresult =='' ){ assessmentresult='-';}

						sql += "('" + userid + "','" + pushupcount + "','" + date + "','" + assessmentresult + "'),";

						sql = sql.substr(0, sql.length);
					}

					var pushupcount = data1[total - 1].pushupcount;
					var date = data1[total - 1].date;
					var assessmentresult = data1[total - 1].assessmentresult;

					if(assessmentresult ==''){ assessmentresult='-';}  

					sql += "('" + userid + "','" + pushupcount + "','" + date + "','" + assessmentresult + "')";

					db.pushuptest.addpushuptest(sql).then(function(response) {

						var lastinsertid = response;
						db.pushuptest.lastAddIDs(lastinsertid).then(function(response) {

							data["error"] = 0;
							data["authResponse"] = "push up fitness test Added Successfully";
							data['id'] = response;
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

//============================================Get user push run test get data============================================/////////////////
exports.getsinglepushuptest = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var id = req.query.id;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.pushuptest.getsingletest(id).then(function(response) {

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

//============================================Update user push up test============================================/////////////////
exports.updatepushuptest = function(req, res) {

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
					var email = response;



					for (var i = 0; i < total - 1; i++) {
						var pushupcount = data1[i].pushupcount;
						var date = data1[i].date;
						var assessmentresult = data1[i].assessmentresult;
						var id = data1[i].id;
						var sql = "UPDATE pushuptest SET pushupcount='" + pushupcount + "', recorddatetime='" + date + "', assessmentresult='" + assessmentresult + "' WHERE id='" + id + "' ";

						db.pushuptest.updatepushuptest(sql).then(function(response) {}).error(function(err) {

							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}

					var pushupcount = data1[total - 1].pushupcount;
					var date = data1[total - 1].date;
					var assessmentresult = data1[total - 1].assessmentresult;
					var id = data1[total - 1].id;

					var sql = "UPDATE pushuptest SET pushupcount='" + pushupcount + "', recorddatetime='" + date + "', assessmentresult='" + assessmentresult + "' WHERE id='" + id + "' ";

					db.pushuptest.updatepushuptest(sql).then(function(response) {}).error(function(err) {

						res.json(err);
					});



					data["error"] = 0;
					data["authResponse"] = "Push Up test updated Successfully";
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

//============================================Delete user push up test============================================/////////////////
exports.deletepushtest = function(req, res) {

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
					var email = response;

					for (var i = 0; i < total - 1; i++) {

						var id = data1[i].id;

						var sql = "UPDATE pushuptest SET  isdeleted='1' WHERE id='" + id + "' ";

						db.pushuptest.deletepushuptest(sql).then(function(response) {}).error(function(err) {

							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}

					var id = data1[total - 1].id;

					var sql = "UPDATE pushuptest SET  isdeleted='1' WHERE id='" + id + "' ";

					db.pushuptest.deletepushuptest(sql).then(function(response) {}).error(function(err) {

						res.json(err);
					});



					data["error"] = 0;
					data["authResponse"] = "Push Up test deleted Successfully";
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

//============================================Get user push up fitness test get data============================================/////////////////
exports.getpushuptest = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.pushuptest.getpushuptest(userid).then(function(response) {

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

////==========================================get push up test data by different dates==================================////////////////////
exports.getpushupScorebydays = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var startdate = req.query.startDate;
	var enddate = req.query.endDate;
	startdate = startdate + ' 00:00:00';
	enddate = enddate + ' 23:59:59';
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.pushuptest.getPushUptestbydates(userid, startdate, enddate).then(function(response) {

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

////==========================================get push up test data by different dates==================================////////////////////
exports.getpushupScorebydays1 = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var startdate = req.query.startDate;
	var enddate = req.query.endDate;
	startdate = startdate + ' 00:00:00';
	enddate = enddate + ' 23:59:59';
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.pushuptest.getPushUptestbydates1(userid, startdate, enddate).then(function(response) {

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

//============================================Get push up fitness  test average by days============================================/////////////////
exports.getAveragepushupScore = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var startdate = req.query.startDate;
	var enddate = req.query.endDate;
	startdate = startdate + ' 00:00:00';
	enddate = enddate + ' 23:59:59';

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.pushuptest.getPushUptestAverageByDays(userid, startdate, enddate).then(function(response) {

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

//============================================Get push up fitness  test by last 30 days============================================/////////////////
exports.getpushuptestdatabymonth = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.pushuptest.getpushuptestByMonth(userid).then(function(response) {

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

/******
 **curl up test
 ********/
//============================================Add user curl up fitness test============================================/////////////////
exports.addcurluptest = function(req, res) {
	//console.log(req.body); 
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
					var email = response;

					var sql = "INSERT INTO curluptest (userid, curlupcount, recorddatetime, assessmentresult) values ";

					for (var i = 0; i < total - 1; i++) {
						var curlupcount = data1[i].curlupcount;
						var date = data1[i].date;
						var assessmentresult = data1[i].assessmentresult;
                         if(assessmentresult =='' ){ assessmentresult='-';} 


						sql += "('" + userid + "','" + curlupcount + "','" + date + "','" + assessmentresult + "'),";

						sql = sql.substr(0, sql.length);
					}

					var curlupcount = data1[total - 1].curlupcount;
					var date = data1[total - 1].date;
					var assessmentresult = data1[total - 1].assessmentresult;
                      if(assessmentresult =='' ){ assessmentresult='-';}
					sql += "('" + userid + "','" + curlupcount + "','" + date + "','" + assessmentresult + "')";

					db.curluptest.addcurluptest(sql).then(function(response) {

						var lastinsertid = response;
						db.curluptest.lastAddIDs(lastinsertid).then(function(response) {

							data["error"] = 0;
							data["authResponse"] = "curl up fitness test Added Successfully";
							data['id'] = response;
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

//============================================Get user single curl up test get data============================================/////////////////
exports.getsinglecurluptest = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var id = req.query.id;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.curluptest.getsingletest(id).then(function(response) {

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

//============================================Update user Curl up test============================================/////////////////
exports.updatecurluptest = function(req, res) {

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
					var email = response;



					for (var i = 0; i < total - 1; i++) {
						var curlupcount = data1[i].curlupcount;
						var date = data1[i].date;
						var assessmentresult = data1[i].assessmentresult;
						var id = data1[i].id;
						var sql = "UPDATE curluptest SET curlupcount='" + curlupcount + "', recorddatetime='" + date + "', assessmentresult='" + assessmentresult + "' WHERE id='" + id + "' ";

						db.curluptest.updatecurluptest(sql).then(function(response) {}).error(function(err) {

							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}

					var curlupcount = data1[total - 1].curlupcount;
					var date = data1[total - 1].date;
					var assessmentresult = data1[total - 1].assessmentresult;
					var id = data1[total - 1].id;

					var sql = "UPDATE curluptest SET curlupcount='" + curlupcount + "', recorddatetime='" + date + "', assessmentresult='" + assessmentresult + "' WHERE id='" + id + "' ";

					db.curluptest.updatecurluptest(sql).then(function(response) {}).error(function(err) {

						res.json(err);
					});



					data["error"] = 0;
					data["authResponse"] = "Curl Up test updated Successfully";
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

//============================================Delete user Curl up test============================================/////////////////
exports.deletecurluptest = function(req, res) {

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
					var email = response;

					for (var i = 0; i < total - 1; i++) {

						var id = data1[i].id;

						var sql = "UPDATE curluptest SET  isdeleted='1' WHERE id='" + id + "' ";

						db.curluptest.deletecurluptest(sql).then(function(response) {}).error(function(err) {

							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}

					var id = data1[total - 1].id;

					var sql = "UPDATE curluptest SET  isdeleted='1' WHERE id='" + id + "' ";

					db.curluptest.deletecurluptest(sql).then(function(response) {}).error(function(err) {

						res.json(err);
					});



					data["error"] = 0;
					data["authResponse"] = "Curl Up test deleted Successfully";
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

//============================================Get user curl up fitness test get data============================================/////////////////
exports.getcurluptest = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.curluptest.getcurluptest(userid).then(function(response) {

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

////==========================================get curl up test data by different dates==================================////////////////////
exports.getcurlupScorebydays = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var startdate = req.query.startDate;
	var enddate = req.query.endDate;
	startdate = startdate + ' 00:00:00';
	enddate = enddate + ' 23:59:59';
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.curluptest.getCurlUptestbydates(userid, startdate, enddate).then(function(response) {

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

exports.getcurlupScorebydays1 = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var startdate = req.query.startDate;
	var enddate = req.query.endDate;
	startdate = startdate + ' 00:00:00';
	enddate = enddate + ' 23:59:59';
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.curluptest.getCurlUptestbydates1(userid, startdate, enddate).then(function(response) {

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
//============================================Get curl up fitness  test average by days============================================/////////////////
exports.getAveragecurlupScore = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var startdate = req.query.startDate;
	var enddate = req.query.endDate;
	startdate = startdate + ' 00:00:00';
	enddate = enddate + ' 23:59:59';

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.curluptest.getCurlUptestAverageByDays(userid, startdate, enddate).then(function(response) {

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

//============================================Get curl up fitness  test by last 30 days============================================/////////////////
exports.getcurluptestdatabymonth = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.curluptest.getcurluptestByMonth(userid).then(function(response) {

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

/******
 **Body weight squats test
 ********/
//============================================Add user Body weight squats test============================================/////////////////
exports.addsquatstest = function(req, res) {

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
					var email = response;

					var sql = "INSERT INTO squattest (userid, squatCount, recorddatetime, assessmentresult) values ";

					for (var i = 0; i < total - 1; i++) {
						var squatcount = data1[i].squatcount;
						var date = data1[i].date;
						var assessmentresult = data1[i].assessmentresult;

						if(assessmentresult =='' ){ assessmentresult='-';}

						sql += "('" + userid + "','" + squatcount + "','" + date + "','" + assessmentresult + "'),";

						sql = sql.substr(0, sql.length);
					}

					var squatcount = data1[total - 1].squatcount;
					var date = data1[total - 1].date;
					var assessmentresult = data1[total - 1].assessmentresult;

					if(assessmentresult =='' ){ assessmentresult='-';}

					sql += "('" + userid + "','" + squatcount + "','" + date + "','" + assessmentresult + "')";

					db.squattest.addsquatstest(sql).then(function(response) {

						var lastinsertid = response;
						db.squattest.lastAddIDs(lastinsertid).then(function(response) {

							data["error"] = 0;
							data["authResponse"] = "Squats fitness test Added Successfully";
							data['id'] = response;
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

//============================================Get user single body weight squats get data============================================/////////////////
exports.getsinglesquatstest = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var id = req.query.id;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.squattest.getsingletest(id).then(function(response) {

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

//============================================Update user body weight squats test============================================/////////////////
exports.updatesquatstest = function(req, res) {

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
					var email = response;



					for (var i = 0; i < total - 1; i++) {
						var squatcount = data1[i].squatcount;
						var date = data1[i].date;
						var assessmentresult = data1[i].assessmentresult;
						var id = data1[i].id;

						var sql = "UPDATE squattest SET squatCount='" + squatcount + "', recorddatetime='" + date + "', assessmentresult='" + assessmentresult + "' WHERE id='" + id + "' ";

						db.squattest.updatesquatstest(sql).then(function(response) {}).error(function(err) {

							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}

					var squatcount = data1[total - 1].squatcount;
					var date = data1[total - 1].date;
					var assessmentresult = data1[total - 1].assessmentresult;
					var id = data1[total - 1].id;

					var sql = "UPDATE squattest SET squatCount='" + squatcount + "', recorddatetime='" + date + "', assessmentresult='" + assessmentresult + "' WHERE id='" + id + "' ";

					db.squattest.updatesquatstest(sql).then(function(response) {}).error(function(err) {

						res.json(err);
					});



					data["error"] = 0;
					data["authResponse"] = "Squats test updated Successfully";
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

//============================================Delete user body weight squats test============================================/////////////////
exports.deletesquatstest = function(req, res) {
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
					var email = response;

					for (var i = 0; i < total - 1; i++) {

						var id = data1[i].id;

						var sql = "UPDATE squattest SET  isdeleted='1' WHERE id='" + id + "' ";

						db.squattest.deletesquatstest(sql).then(function(response) {}).error(function(err) {

							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}

					var id = data1[total - 1].id;

					var sql = "UPDATE squattest SET  isdeleted='1' WHERE id='" + id + "' ";

					db.squattest.deletesquatstest(sql).then(function(response) {}).error(function(err) {

						res.json(err);
					});



					data["error"] = 0;
					data["authResponse"] = "squats test deleted Successfully";
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

//============================================Get user Body weight squats test get data============================================/////////////////
exports.getsquatstest = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.squattest.getsquatstest(userid).then(function(response) {

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

////==========================================get Body weight squats test data by different dates==================================////////////////////
exports.getsquatsScorebydays = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var startdate = req.query.startDate;
	var enddate = req.query.endDate;
	startdate = startdate + ' 00:00:00';
	enddate = enddate + ' 23:59:59';
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.squattest.getsquatstestbydates(userid, startdate, enddate).then(function(response) {

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


exports.getsquatsScorebydays1 = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var startdate = req.query.startDate;
	var enddate = req.query.endDate;
	startdate = startdate + ' 00:00:00';
	enddate = enddate + ' 23:59:59';
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.squattest.getsquatstestbydates1(userid, startdate, enddate).then(function(response) {

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


//============================================Get Body weight squats test average by days============================================/////////////////
exports.getAveragesquatsScore = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var startdate = req.query.startDate;
	var enddate = req.query.endDate;
	startdate = startdate + ' 00:00:00';
	enddate = enddate + ' 23:59:59';

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.squattest.getsquatstestAverageByDays(userid, startdate, enddate).then(function(response) {

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

//============================================Get body weight squats  test by last 30 days============================================/////////////////
exports.getsquatstestdatabymonth = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.squattest.getsquatstestByMonth(userid).then(function(response) {

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

/******
 ** Standing Long Jump test
 ********/

//============================================Add user Long Jump test============================================/////////////////
exports.addlongjumptest = function(req, res) {
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
					var email = response;

					var sql = "INSERT INTO standinglongjumptest (userid, jumpLength, recorddatetime, assessmentResult) values ";

					for (var i = 0; i < total - 1; i++) {
						var jumpLength = data1[i].jumpLength;
						var date = data1[i].date;
						var assessmentresult = data1[i].assessmentresult;

						if(assessmentresult =='' ){ assessmentresult='-';}

						sql += "('" + userid + "','" + jumpLength + "','" + date + "','" + assessmentresult + "'),";

						sql = sql.substr(0, sql.length);
					}

					var jumpLength = data1[total - 1].jumpLength;
					var date = data1[total - 1].date;
					var assessmentresult = data1[total - 1].assessmentresult;

					if(assessmentresult =='' ){ assessmentresult='-';}

					sql += "('" + userid + "','" + jumpLength + "','" + date + "','" + assessmentresult + "')";

					db.standinglongjumptest.addlongjumptest(sql).then(function(response) {

						var lastinsertid = response;
						db.standinglongjumptest.lastAddIDs(lastinsertid).then(function(response) {

							data["error"] = 0;
							data["authResponse"] = "Stand long jump test Added Successfully";
							data['id'] = response;
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

//============================================Get user single standing long jump get data============================================/////////////////
exports.getsinglelongjumptest = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var id = req.query.id;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.standinglongjumptest.getsingletest(id).then(function(response) {

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

//============================================Update user Standing Long jump test============================================/////////////////
exports.updatelongjumptest = function(req, res) {

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
					var email = response;



					for (var i = 0; i < total - 1; i++) {
						var jumpLength = data1[i].jumpLength;
						var date = data1[i].date;
						var assessmentresult = data1[i].assessmentresult;
						var id = data1[i].id;

						var sql = "UPDATE standinglongjumptest SET jumpLength='" + jumpLength + "', recorddatetime='" + date + "', assessmentresult='" + assessmentresult + "' WHERE id='" + id + "' ";

						db.standinglongjumptest.updatelongjumptest(sql).then(function(response) {}).error(function(err) {

							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}

					var jumpLength = data1[total - 1].jumpLength;
					var date = data1[total - 1].date;
					var assessmentresult = data1[total - 1].assessmentresult;
					var id = data1[total - 1].id;

					var sql = "UPDATE standinglongjumptest SET jumpLength='" + jumpLength + "', recorddatetime='" + date + "', assessmentresult='" + assessmentresult + "' WHERE id='" + id + "' ";

					db.standinglongjumptest.updatelongjumptest(sql).then(function(response) {}).error(function(err) {

						res.json(err);
					});



					data["error"] = 0;
					data["authResponse"] = "Standing Long Jump test updated Successfully";
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

//============================================Delete user Standing Long Jump test============================================/////////////////
exports.deletelongjumptest = function(req, res) {

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
					var email = response;

					for (var i = 0; i < total - 1; i++) {

						var id = data1[i].id;

						var sql = "UPDATE standinglongjumptest SET  isdeleted='1' WHERE id='" + id + "' ";

						db.standinglongjumptest.deletelongjumptest(sql).then(function(response) {}).error(function(err) {

							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}

					var id = data1[total - 1].id;

					var sql = "UPDATE standinglongjumptest SET  isdeleted='1' WHERE id='" + id + "' ";

					db.standinglongjumptest.deletelongjumptest(sql).then(function(response) {}).error(function(err) {

						res.json(err);
					});



					data["error"] = 0;
					data["authResponse"] = "Standing long jump test deleted Successfully";
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

//============================================Get user Standing Long Jump test get data============================================/////////////////
exports.getlongjumptest = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.standinglongjumptest.getlongjumptest(userid).then(function(response) {
                     
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

////==========================================get Body Standing Long Jump test data by different dates==================================////////////////////
exports.getlongjumpScorebydays = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var startdate = req.query.startDate;
	var enddate = req.query.endDate;
	startdate = startdate + ' 00:00:00';
	enddate = enddate + ' 23:59:59';
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.standinglongjumptest.getlongjumptestbydates(userid, startdate, enddate).then(function(response) {

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

exports.getlongjumpScorebydays1 = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var startdate = req.query.startDate;
	var enddate = req.query.endDate;
	startdate = startdate + ' 00:00:00';
	enddate = enddate + ' 23:59:59';
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.standinglongjumptest.getlongjumptestbydates1(userid, startdate, enddate).then(function(response) {

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


//============================================Get Standing Long Jump test average by days============================================/////////////////
exports.getAveragelongjumpScore = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var startdate = req.query.startDate;
	var enddate = req.query.endDate;
	startdate = startdate + ' 00:00:00';
	enddate = enddate + ' 23:59:59';

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.standinglongjumptest.getlongjumptestAverageByDays(userid, startdate, enddate).then(function(response) {

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

//============================================Get Standing Long Jump test by last 30 days============================================/////////////////
exports.getlongjumptestdatabymonth = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.standinglongjumptest.getlongjumptestByMonth(userid).then(function(response) {

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

/******
 ** Heart Rate Zone
 ********/

//============================================Add user Heart Rate Zone============================================/////////////////
exports.addheartratetest = function(req, res) {
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
					var email = response;

					var sql = "INSERT INTO exercisetargetheartrate (userid, restHeartRate, LowTrainingZoneVal, UpTrainingZoneVal, vo2max,  recorddatetime) values ";

					for (var i = 0; i < total - 1; i++) {
						var restHeartRate = data1[i].restHeartRate;
						var LowTrainingZoneVal = data1[i].LowTrainingZoneVal;
						var UpTrainingZoneVal = data1[i].UpTrainingZoneVal;
						var vo2max = data1[i].vo2max;
						var date = data1[i].date;

						sql += "('" + userid + "','" + restHeartRate + "','" + LowTrainingZoneVal + "','" + UpTrainingZoneVal + "','" + vo2max + "','" + date + "'),";

						sql = sql.substr(0, sql.length);
					}

					var restHeartRate = data1[total - 1].restHeartRate;
					var LowTrainingZoneVal = data1[total - 1].LowTrainingZoneVal;
					var UpTrainingZoneVal = data1[total - 1].UpTrainingZoneVal;
					var vo2max = data1[total - 1].vo2max;
					var date = data1[total - 1].date;


					sql += "('" + userid + "','" + restHeartRate + "','" + LowTrainingZoneVal + "','" + UpTrainingZoneVal + "','" + vo2max + "','" + date + "')";

					db.exercisetargetheartrate.addheartratetest(sql).then(function(response) {

						var lastinsertid = response;
						db.exercisetargetheartrate.lastAddIDs(lastinsertid).then(function(response) {

							data["error"] = 0;
							data["authResponse"] = "Target heart rate Added Successfully";
							data['id'] = response;
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

//============================================Get user Heart Rate Zone============================================/////////////////
exports.getsingleheartratetest = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var id = req.query.id;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.exercisetargetheartrate.getsingletest(id).then(function(response) {

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

//============================================Update user Heart Rate Zone============================================/////////////////
exports.updateheartratetest = function(req, res) {

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
					var email = response;



					for (var i = 0; i < total - 1; i++) {
						var restHeartRate = data1[i].restHeartRate;
						var LowTrainingZoneVal = data1[i].LowTrainingZoneVal;
						var UpTrainingZoneVal = data1[i].UpTrainingZoneVal;
						var vo2max = data1[i].vo2max;
						var date = data1[i].date;
						var id = data1[i].id;

						var sql = "UPDATE exercisetargetheartrate SET restHeartRate='" + restHeartRate + "', LowTrainingZoneVal='" + LowTrainingZoneVal + "', UpTrainingZoneVal='" + UpTrainingZoneVal + "', vo2max='" + vo2max + "',  recorddatetime='" + date + "' WHERE id='" + id + "'";

						db.exercisetargetheartrate.updateheartratetest(sql).then(function(response) {}).error(function(err) {
							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}

					var restHeartRate = data1[total - 1].restHeartRate;
					var LowTrainingZoneVal = data1[total - 1].LowTrainingZoneVal;
					var UpTrainingZoneVal = data1[total - 1].UpTrainingZoneVal;
					var vo2max = data1[total - 1].vo2max;
					var date = data1[total - 1].date;
					var id = data1[total - 1].id;

					var sql = "UPDATE exercisetargetheartrate SET restHeartRate='" + restHeartRate + "', LowTrainingZoneVal='" + LowTrainingZoneVal + "', UpTrainingZoneVal='" + UpTrainingZoneVal + "', vo2max='" + vo2max + "',  recorddatetime='" + date + "' WHERE id='" + id + "'";

					db.exercisetargetheartrate.updateheartratetest(sql).then(function(response) {}).error(function(err) {
						res.json(err);
					});
					data["error"] = 0;
					data["authResponse"] = "Target heart rate Updated Successfully";
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

//============================================Delete user Heart Rate Zone============================================/////////////////
exports.deleteheartratetest = function(req, res) {

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
					var email = response;



					for (var i = 0; i < total - 1; i++) {
						var restHeartRate = data1[i].restHeartRate;
						var LowTrainingZoneVal = data1[i].LowTrainingZoneVal;
						var UpTrainingZoneVal = data1[i].UpTrainingZoneVal;
						var vo2max = data1[i].vo2max;
						var date = data1[i].date;
						var id = data1[i].id;

						var sql = "UPDATE exercisetargetheartrate SET isdeleted='1' WHERE id='" + id + "'";

						db.exercisetargetheartrate.updateheartratetest(sql).then(function(response) {}).error(function(err) {
							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}

					var restHeartRate = data1[total - 1].restHeartRate;
					var LowTrainingZoneVal = data1[total - 1].LowTrainingZoneVal;
					var UpTrainingZoneVal = data1[total - 1].UpTrainingZoneVal;
					var vo2max = data1[total - 1].vo2max;
					var date = data1[total - 1].date;
					var id = data1[total - 1].id;

					var sql = "UPDATE exercisetargetheartrate SET isdeleted='1' WHERE id='" + id + "'";

					db.exercisetargetheartrate.updateheartratetest(sql).then(function(response) {}).error(function(err) {
						res.json(err);
					});
					data["error"] = 0;
					data["authResponse"] = "Target heart rate Deleted Successfully";
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


//============================================Get user Heart Rate Zone get data============================================/////////////////
exports.getheartratetest = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.exercisetargetheartrate.getheartratetest(userid).then(function(response) {

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

////==========================================get Body Heart Rate Zone data by different dates==================================////////////////////
exports.getheartrateScorebydays = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var startdate = req.query.startDate;
	var enddate = req.query.endDate;
	startdate = startdate + ' 00:00:00';
	enddate = enddate + ' 23:59:59';
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.exercisetargetheartrate.getheartratetestbydates(userid, startdate, enddate).then(function(response) {

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

//============================================Get Heart Rate Zone average by days============================================/////////////////
exports.getAverageheartrateScore = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var startdate = req.query.startDate;
	var enddate = req.query.endDate;
	startdate = startdate + ' 00:00:00';
	enddate = enddate + ' 23:59:59';

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.exercisetargetheartrate.getheartratetestAverageByDays(userid, startdate, enddate).then(function(response) {

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

//============================================Get Heart Rate Zone by last 30 days============================================/////////////////
exports.getheartratedatabymonth = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.exercisetargetheartrate.getheartrateByMonth(userid).then(function(response) {

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

/**
 * Ymca Step tests
 */
//============================================Add user YMCA Step test============================================/////////////////


exports.addymcasteptests = function(req, res) {

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
					var email = response;

					var sql = "INSERT INTO ymcasubmaxsteptest (Userid, Steptestpulserate, recorddatetime, vo2max) values ";

					for (var i = 0; i < total - 1; i++) {

						var steptestpulserate = data1[i].steptestpulserate;
						var recorddatetime = data1[i].recorddatetime;
						var vo2max = data1[i].vo2max;


						sql += "('" + userid + "','" + steptestpulserate + "','" + recorddatetime + "','" + vo2max + "'),";

						sql = sql.substr(0, sql.length);
					}


					var steptestpulserate = data1[total - 1].steptestpulserate;
					var recorddatetime = data1[total - 1].recorddatetime;
					var vo2max = data1[total - 1].vo2max;



					sql += "('" + userid + "','" + steptestpulserate + "','" + recorddatetime + "','" + vo2max + "')";

					db.ymcasubmaxsteptest.addymcawalking(sql).then(function(response) {

						var lastinsertid = response;
						db.ymcasubmaxsteptest.lastAddIDs(lastinsertid).then(function(response) {

							data["error"] = 0;
							data["authResponse"] = "YMCA Step test Added Successfully";
							data['id'] = response;
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

////==========================================get Body YMCA step test data==================================////////////////////
exports.getymcasteptest = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.ymcasubmaxsteptest.getymcaStepTest(userid).then(function(response) {
                     
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

////==========================================get Body YMCA step test data by different dates==================================////////////////////
exports.getymcasteptestbydays = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var startdate = req.query.startDate;
	var enddate = req.query.endDate;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.ymcasubmaxsteptest.getymcabydates(userid, startdate, enddate).then(function(response) {
                       ///console.log(response);
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

////==========================================get Body YMCA step Avaerage test data by different dates==================================////////////////////
exports.getymcaAveragebydatesUser = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;
	var startdate = req.query.startDate;
	var enddate = req.query.endDate;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.ymcasubmaxsteptest.getymcaAveragebydates(userid, startdate, enddate).then(function(response) {

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

//============================================Get ymca step test by last 30 days============================================/////////////////
exports.getymcastepdatabymonth = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.ymcasubmaxsteptest.getymcaByMonth(userid).then(function(response) {

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

//============================================Update user YMCA walking test============================================/////////////////
exports.updateymcawalkingtestuser1 = function(req, res) {

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
					var email = response;

					//var sql;


					for (var i = 0; i < total - 1; i++) {

						var steptestpulserate = data1[i].steptestpulserate;
						var recorddatetime = data1[i].recorddatetime;
						var vo2max = data1[i].vo2max;

						var id = data1[i].id;

						var sql = "UPDATE ymcasubmaxsteptest SET  Steptestpulserate='"+steptestpulserate+"', recorddatetime='"+recorddatetime+"', vo2max='"+vo2max+"' WHERE id='" + id + "'";

						db.ymcasubmaxsteptest.updateymcawalkingtest(sql).then(function(response) {}).error(function(err) {

							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}

					var steptestpulserate = data1[total - 1].steptestpulserate;
					var recorddatetime = data1[total - 1].recorddatetime;
					var vo2max = data1[total - 1].vo2max;

					var id = data1[total - 1].id;

					var sql = "UPDATE ymcasubmaxsteptest  SET Steptestpulserate='"+steptestpulserate+"', recorddatetime='"+recorddatetime+"', vo2max='"+vo2max+"' WHERE id='" + id + "'";
					// console.log(sql);
					db.ymcasubmaxsteptest.updateymcawalkingtest(sql).then(function(response) {}).error(function(err) {

						res.json(err);
					});



					data["error"] = 0;
					data["authResponse"] = "YMCA Walking test updated Successfully";
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

//============================================Delete user YMCA walking test============================================/////////////////
exports.deleteymcatest = function(req, res) {

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
					var email = response;

					for (var i = 0; i < total - 1; i++) {

						var id = data1[i].id;

						var sql = "UPDATE ymcasubmaxsteptest SET isdeleted='1' WHERE id='" + id + "'";

						db.ymcasubmaxsteptest.deleteymcawalkingtest(sql).then(function(response) {}).error(function(err) {

							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}

					var id = data1[total - 1].id;

					var sql = "UPDATE ymcasubmaxsteptest SET isdeleted='1' WHERE id='" + id + "'";

					db.ymcasubmaxsteptest.deleteymcawalkingtest(sql).then(function(response) {}).error(function(err) {

						res.json(err);
					});



					data["error"] = 0;
					data["authResponse"] = "YMCA Step Test deleted Successfully";
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



/*********************
 * Rockport walking test
 ************************/

//============================================Add user rock port walking test============================================/////////////////


exports.addrockporttest1 = function(req, res) {

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
					var email = response;

					var sql = "INSERT INTO rockportwalkingtest (userid, heartrateval, timetaken, recorddatetime, vo2max) values ";

					for (var i = 0; i < total - 1; i++) {
						var heartrateval = data1[i].heartrateval;
						var timetaken = data1[i].timetaken;
						var recorddatetime = data1[i].recorddatetime;
						var vo2max = data1[i].vo2max;


						sql += "('" + userid + "','" + heartrateval + "','" + timetaken + "','" + recorddatetime + "','" + vo2max + "'),";

						sql = sql.substr(0, sql.length);
					}

					var heartrateval = data1[total - 1].heartrateval;
					var timetaken = data1[total - 1].timetaken;
					var recorddatetime = data1[total - 1].recorddatetime;
					var vo2max = data1[total - 1].vo2max;



					sql += "('" + userid + "','" + heartrateval + "','" + timetaken + "','" + recorddatetime + "','" + vo2max + "')";


					db.rockportwalkingtest.addrockportwalking(sql).then(function(response) {

						var lastinsertid = response;
						db.rockportwalkingtest.lastAddIDs(lastinsertid).then(function(response) {

							data["error"] = 0;
							data["authResponse"] = "Rockport walking test Added Successfully";
							data['id'] = response;
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

//============================================Get user rochk port walking test days============================================/////////////////
exports.getrockportwalkingtest = function(req, res) {


	var userid = req.query.userid;
	var token = req.query.token;

	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {

					db.rockportwalkingtest.getrockport(userid).then(function(response) {
                     
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

//============================================Update user rockport walking test============================================/////////////////
exports.updaterockportwalkingtestuser = function(req, res) {

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
					var email = response;

					//var sql;


					for (var i = 0; i < total - 1; i++) {
						var heartrateval = data1[i].heartrateval;
						var timetaken = data1[i].timetaken;
						var recorddatetime = data1[i].recorddatetime;
						var vo2max = data1[i].vo2max;

						var id = data1[i].id;

						var sql = "UPDATE rockportwalkingtest SET  heartrateval='" + heartrateval + "', timetaken='" + timetaken + "', recorddatetime='" + recorddatetime + "', vo2max='" + vo2max + "' WHERE id='" + id + "'";

						db.rockportwalkingtest.updaterockporttest(sql).then(function(response) {}).error(function(err) {

							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}

					var heartrateval = data1[total - 1].heartrateval;
					var timetaken = data1[total - 1].timetaken;
					var recorddatetime = data1[total - 1].recorddatetime;
					var vo2max = data1[total - 1].vo2max;

					var id = data1[total - 1].id;

					var sql = "UPDATE rockportwalkingtest  SET heartrateval='" + heartrateval + "', timetaken='" + timetaken + "', recorddatetime='" + recorddatetime + "', vo2max='" + vo2max + "' WHERE id='" + id + "'";
					// console.log(sql);
					db.rockportwalkingtest.updaterockporttest(sql).then(function(response) {}).error(function(err) {

						res.json(err);
					});



					data["error"] = 0;
					data["authResponse"] = "Rock Port Walking test updated Successfully";
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

//============================================Delete user rockport walking test============================================/////////////////
exports.deleterockportwalkingtest = function(req, res) {

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
					var email = response;

					for (var i = 0; i < total - 1; i++) {

						var id = data1[i].id;

						var sql = "UPDATE rockportwalkingtest SET isdeleted='1' WHERE id='" + id + "'";

						db.rockportwalkingtest.deleterockporttest(sql).then(function(response) {}).error(function(err) {

							res.json(err);
						});

						sql = sql.substr(0, sql.length);
					}

					var id = data1[total - 1].id;

					var sql = "UPDATE rockportwalkingtest SET isdeleted='1' WHERE id='" + id + "'";

					db.rockportwalkingtest.deleterockporttest(sql).then(function(response) {}).error(function(err) {

						res.json(err);
					});



					data["error"] = 0;
					data["authResponse"] = "Rock Port Walking Test deleted Successfully";
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