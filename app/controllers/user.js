'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');
var randtoken = require('rand-token');
var md5 = require('md5');
var nodemailer = require('nodemailer');
var moment = require('moment');
var mysql = require('mysql');
const request = require('request');

/////================================Record Raw Data========================================================//////
module.exports.recordRawData = (userID, apiService, rawData) => {
	console.log(" rawData : ", rawData);
	db.user.recordRawData(userID, apiService, rawData).then(function (response) {
		console.log(" RecordRawData : Response -> ", response);
	}).error(function (err) {
		res.json(err);
	});

}

/////================================Login========================================================//////
exports.login = function (req, res) {
	var username = req.body.email;
	var password = req.body.password;
	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!username && !!password) {

		password = md5(password);

		db.user.login(username, password).then(function (response) {

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
			.error(function (err) {
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

exports.GetUserlogout = function (req, res) {
	var userid = req.body.userid;
	var token = req.body.token;
	var macAddress = req.body.macAddress;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function (response) {
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


//============================================Get user data============================================/////////////////

exports.GetUserData = function (req, res) {
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
				var email = response;
				userid = response[0].userID;

				//res.json(email);
				///Get user info
				db.user.getUser(userid, token).then(function (response) {
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

//============================================Get user data by user id============================================/////////////////

exports.GetUserDatabyID = function (req, res) {
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
				var email = response;

				db.user.getuserDetails(userid).then(function (response) {

					res.json(response);

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

//============================================Update user data============================================/////////////////


exports.UpdateUserInfo = function (req, res) {


	var userid = req.body.userID;
	var token = req.body.token;
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var gender = req.body.gender;
	var birthDate = req.body.birthDate;
	var height = req.body.height;

	var height_unit = req.body.height_unit;
	if (height_unit == '' || height_unit === undefined) {
		height_unit = 'cm';
	}

	var weight = req.body.weight;
	var address = req.body.address;
	var town = req.body.town;
	var state = req.body.state;
	var country = req.body.country;
	var postCode = req.body.postCode;
	var phone = req.body.phone;
	var version = req.body.version;
	var emailInput = req.body.email;
	var questionnaire = req.body.questionnaire;
	var ic_number = req.body.ic_number;
	var loginType = req.body.loginType;
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
				db.user.updateUser(userid, firstName, lastName, gender, birthDate, height, weight, address, town, state, country, postCode, phone, height_unit, version, emailInput, questionnaire, ic_number, loginType).then(function (response) {
					data["error"] = 0;
					data["authResponse"] = "Record Sucessfully updated.";
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

///////////////========================Get User device token=================================================/////////////////

exports.checkDeiveToken = function (req, res) {

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
				var email = response;

				///Get user info
				db.user.checkDeiveToken(userid).then(function (response) {
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

//============================================Update user Tokens============================================/////////////////

//------ chcek username

exports.checkUsername = function (req, res) {

	var userid = req.query.username;
	var token = req.query.token;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function (response) {
			if (response != '' && response != null) {

				///Get user info
				db.user.checkUsername(userid).then(function (response1) {



					if (response1 != '' && response1 != null) {
						data["error"] = 0;
						data["authResponse"] = "Valid Username";
						data['Data'] = response1;
						res.json(data);
					} else {
						data["error"] = 0;
						data["authResponse"] = "InValid Username";
						data['Data'] = response1;
						res.json(data);

					}






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


// Ends check username
exports.updateDeviceToken = function (req, res) {
	var userid = req.body.userID;
	var token = req.body.token;
	var deviceID = req.body.deviceID;



	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!userid && !!token) {
		///Authinticate user
		db.user.authUser(token).then(function (response) {
			if (response != '' && response != null) {

				var sql = "UPDATE user SET deviceID='" + deviceID + "' WHERE userID='" + userid + "'";

				db.user.updateDeiveToken(sql).then(function (response) {
					data["error"] = 0;
					data["authResponse"] = "Device Token updated Sucessfully.";
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
		data["authResponse"] = "Please provide all required data (i.e : token, password  etc)";
		res.json(data);
		//connection.end()
	}

	return res;
};




//Update PaymentTransaction

exports.updatePaymentTranscation = function (req, res) {
	var userid1 = req.body.userID;
	var token = req.body.token;
	var data1 = req.body.data;
	data1 = JSON.parse(data1);
	var total = data1.length;



	var data = {
		"error": 0,
		"authResponse": ""
	}

	var userid = data1[0].userid;
	var isuploadedtoweb = data1[0].isuploadedtoweb;
	var planid = data1[0].planid;
	var transcdate = data1[0].transcdate;
	var transactamount = data1[0].transactamount;
	var paymentmethod = data1[0].paymentmethod;
	var paymentStatus = data1[0].paymentStatus;
	var insertDateTime = data1[0].insertDateTime;




	if (!!userid && !!token) {
		///Authinticate user
		db.user.authUser(token).then(function (response) {
			if (response != '' && response != null) {

				var sql = "UPDATE PaymentTransaction SET isuploadedtoweb='" + isuploadedtoweb + "',planid='" + planid + "',transcdate='" + transcdate + "',transactamount='" + transactamount + "',paymentmethod='" + paymentmethod + "',paymentStatus='" + paymentStatus + "',insertDateTime='" + insertDateTime + "' WHERE userID='" + userid + "'";

				db.user.updateDeiveToken(sql).then(function (response) {
					data["error"] = 0;
					data["authResponse"] = "PaymentTranscation updated Sucessfully.";
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
		data["authResponse"] = "Please provide all required data (i.e : token, password  etc)";
		res.json(data);
		//connection.end()
	}

	return res;
};


exports.addPaymentTranscation = function (req, res) {

	try {

		var userid1 = req.body.userid;
		var token = req.body.token;
		var data1 = req.body.data;

		data1 = JSON.parse(data1);

		var total = data1.length;

		console.log(data1);

		var userid = data1[0].userid;
		//  var isuploadedtoweb = data1[0].isuploadedtoweb;
		var planid = data1[0].planid;
		var transcdate = data1[0].transcdate;
		var transactamount = data1[0].transactamount;
		var paymentmethod = data1[0].paymentmethod;
		var paymentStatus = data1[0].paymentStatus;
		var insertDateTime = data1[0].insertDateTime;


		var authcode = data1[0].authcode;
		var invoicenumber = data1[0].invoicenumber;
		var securehash2 = data1[0].securehash2;
		var responseDesc = data1[0].responseDesc;
		var maskedpan = data1[0].maskedpan;
		var invoicePath = data1[0].invoicePath;

		var date = new Date();

		var hour = date.getHours();
		hour = (hour < 10 ? "0" : "") + hour;

		var min = date.getMinutes();
		min = (min < 10 ? "0" : "") + min;

		var sec = date.getSeconds();
		sec = (sec < 10 ? "0" : "") + sec;

		var year = date.getFullYear();

		var month = date.getMonth() + 1;

		var day = date.getDate();
		day = (day < 10 ? "0" : "") + day;

		var insdatetime = year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;






		var data = { "error": 0, "authResponse": "" }

		db.user.authUser(token).then(function (response) {


			var sql_n1 = "INSERT INTO PaymentTransaction(userid,planid,transcdate,transactamount,paymentmethod,paymentStatus,insertDateTime,authcode,invoicenumber,securehash2,responseDesc,maskedpan, invoicePath) values ('" + userid + "','" + planid + "','" + transcdate + "','" + transactamount + "','" + paymentmethod + "','" + paymentStatus + "','" + insdatetime + "','" + authcode + "','" + invoicenumber + "','" + securehash2 + "','" + responseDesc + "','" + maskedpan + "','" + invoicePath + "')";
			console.log(sql_n1);
			db.user.addNextOfKin(sql_n1).then(function (result) {


				data["error"] = 0;
				data["Data"] = result;
				data["authResponse"] = "PaymentTranscation Records added Successfully";
				res.json(data);

			}).error(function (err) {
				res.json(err);
				data["error"] = err;
			});


		})
			.error(function (err) {
				res.json(err);
			});

	} catch (ex) {
		console.log(ex);
	}
	return res;
};

exports.getPaymentTranscation = function (req, res) {

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
				var email = response;

				///Get user info
				db.user.getPaymentTranscation(userid).then(function (response) {
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
		}).error(function (err) {
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

exports.GetMpayResponse = function (req, res) {

	try {

		//var userid1 = req.body.userid;
		//var token = req.body.token;
		//var data1 = req.body.data;

		//data1 = JSON.parse(data1);

		//var total = data1.length;

		//console.log(data1);

		var responseCode = req.body.responseCode;
		var authCode = req.body.authCode;
		var invno = req.body.invno;
		var amt = req.body.amt;
		var securehash2 = req.body.securehash2;
		var responseDesc = req.body.responseDesc;
		var tranDate = req.body.tranDate;
		var mid = req.body.mid;
		var maskedPAN = req.body.maskedPAN;
		var paymentType = req.body.paymentType;

		var data = { "error": 0, "responseCode": "", "authCode": "", "invno": "", "amt": "", "securehash2": "", "responseDesc": "", "tranDate": "", "mid": "", "maskedPAN": "", "paymentType": "" }

		//db.user.authUser(token).then(function (response) {



		data["error"] = 0;
		data["responseCode"] = responseCode;
		data["authCode"] = authCode;
		data["invno"] = invno;
		data["amt"] = amt;
		data["securehash2"] = securehash2;
		data["responseDesc"] = responseDesc;
		data["tranDate"] = tranDate;
		data["mid"] = mid;
		data["maskedPAN"] = maskedPAN;
		data["paymentType"] = paymentType;

		res.json(data);

		//request.post('https://pcimdex.mpay.my/mdex2/payment/eCommerce', {
		//    json: {
		//        reponseCode: secureHash,
		//        authCode: invno,
		//        amt: amt,
		//        desc: desc,
		//        postURL: postURL,
		//        phone: phone,
		//        mid: mid,
		//        email: email,
		//        param: param
		//    }
		//}, (error, resMpay, body) => {
		//    if (error) {
		//        console.error(error)
		//        return
		//        }

		//        console.log(`statusCode: ${resMpay}`);
		//        console.log(`statusCode: ${resMpay.statusCode}`);
		//        console.log(body);

		//        data["error"] = 0;
		//        data["responseCode"] = resMpay.toJSON();
		//        data["authResponse"] = "Mpay Successfully Give Response";
		//        res.json(data);
		//    });

		//})
		//    .error(function (err) {
		//        res.json(err);
		//    });

	} catch (ex) {
		console.log(ex);
	}
	return res;
};

exports.addUserPlan = function (req, res) {

	try {

		var userid1 = req.body.userid;
		var token = req.body.token;
		var data1 = req.body.data;

		data1 = JSON.parse(data1);

		var total = data1.length;

		console.log(data1);





		var userid = data1[0].userid;
		var professionalID = data1[0].professionalID;
		var planid = data1[0].planid;
		var subscriptiondate = data1[0].subscriptiondate;
		var expirydate = data1[0].expirydate;
		var promotioncode = data1[0].promotioncode;
		var planAmount = data1[0].planAmount;

		var voucherAmount = data1[0].voucherAmount;
		var chargeAmount = data1[0].chargeAmount;
		var autorenew = data1[0].autorenew;
		var autoBill = data1[0].autoBill;
		var paymentMethod = data1[0].paymentMethod;
		var paymentToken = data1[0].paymentToken;
		var cancelDate = data1[0].cancelDate;


		var status = data1[0].status;
		var insertDateTime = data1[0].insertDateTime;

		var date = new Date();

		var hour = date.getHours();
		hour = (hour < 10 ? "0" : "") + hour;

		var min = date.getMinutes();
		min = (min < 10 ? "0" : "") + min;

		var sec = date.getSeconds();
		sec = (sec < 10 ? "0" : "") + sec;

		var year = date.getFullYear();

		var month = date.getMonth() + 1;

		var day = date.getDate();
		day = (day < 10 ? "0" : "") + day;

		var insdatetime = year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;



		var data = { "error": 0, "Data": "", "authResponse": "" }

		db.user.authUser(token).then(function (response) {


			var sql_n1 = "INSERT INTO UserPlan(userid,planid,professionalID,subscriptiondate,expirydate, promotioncode,planAmount,voucherAmount,chargeAmount,autorenew,autoBill,paymentMethod, paymentToken,cancelDate,status,insertDateTime) values ('" + userid + "','" + planid + "','" + professionalID + "','" + subscriptiondate + "','" + expirydate + "','" + promotioncode + "','" + planAmount + "','" + voucherAmount + "','" + chargeAmount + "','" + autorenew + "','" + autoBill + "','" + paymentMethod + "','" + paymentToken + "','" + cancelDate + "','" + status + "','" + insdatetime + "')";
			console.log(sql_n1);
			db.user.addNextOfKin(sql_n1).then(function (result) {


				data["error"] = 0;
				data["Data"] = result;
				data["authResponse"] = "UserPlan Records added Successfully";
				res.json(data);

			}).error(function (err) {
				res.json(err);
				data["error"] = err;
			});


		})
			.error(function (err) {
				res.json(err);
			});

	} catch (ex) {
		console.log(ex);
	}
	return res;
};

exports.addPlanFeature = function (req, res) {
	var userid = 133;
	var token = req.body.token;
	var planid = req.body.planid;
	var featurename = req.body.featurename;
	var featuredescription = req.body.featuredescription;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function (response) {
			if (response != '' && response != null) {
				var email = response;

				///Get user info
				db.user.addPlanFeatures(planid, featurename, featuredescription).then(function (result) {
					data["error"] = 0;
					data["authResponse"] = "Action Successful";
					data['Data'] = result;
					res.json(data);
				}).catch(function (err) {
					res.json(err);
					data["error"] = err;
				});

			} else {
				data["error"] = 1;
				data["authResponse"] = "Authentication Failed.";
				res.json(data);

			}
		}).error(function (err) {
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

exports.retrievePlanFeatures = function (req, res) {
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
				var email = response;

				///Get user info
				db.user.retrievePlanFeatures(userid).then(function (response) {
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
		}).error(function (err) {
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
exports.getUserPlan = function (req, res) {

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
				var email = response;

				///Get user info
				db.user.getUserPlan(userid).then(function (response) {
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
		}).error(function (err) {
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


exports.getDoctorsAppointments = function (req, res) {

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
				var email = response;

				///Get user info
				db.user.getdoctorsappointment(userid).then(function (response) {
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
		}).error(function (err) {
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


exports.getPatientList = function (req, res) {

	var userid = req.query.userid;
	var token = req.query.token;
	console.log("userid --> ", userid);
	console.log("token --> ", token);
	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function (response) {
			if (response != '' && response != null) {
				var email = response;

				///Get user info
				db.userProfessionalRegistration.get_patients_list(userid).then(function (response) {
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
		}).error(function (err) {
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




exports.getDoctorsSchedule = function (req, res) {

	var userid = req.query.professionalID;
	var token = req.query.token;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function (response) {
			if (response != '' && response != null) {
				var email = response;

				///Get user info
				db.user.getdoctorsSchedule(userid).then(function (response) {
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
		}).error(function (err) {
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


exports.adduserprofessionalappointment = function (req, res) {

	try {

		var userid1 = req.body.userid;
		var token = req.body.token;
		var data1 = req.body.data;

		data1 = JSON.parse(data1);

		var total = data1.length;

		console.log(data1);

		var userid = data1[0].userID;
		var professionalID = data1[0].professionalID;
		var appointmentDate = data1[0].appointmentDate;
		var appointmentTime = data1[0].appointmentTime;
		var appointmentType = data1[0].appointmentType;
		var slotTime = data1[0].slotTime;
		console.log("appointmentdate " + appointmentDate);
		var insertDateTime = data1[0].insertDateTime;

		var Title = data1[0].Title;
		var note = data1[0].note;

		if (userid == 0) {
			userid == userid1;
		}

		var data = { "error": 0, "Data": "", "authResponse": "" }

		db.user.authUser(token).then(function (response) {


			var sql_n1 = "INSERT INTO userProfessionalAppointment(userid,professionalID,appointmentDate,appointmentTime,insertDateTime,Title,note,appointmentType,slotTime) values ('" + userid + "','" + professionalID + "','" + appointmentDate + "','" + appointmentTime + "','" + insertDateTime + "','" + Title + "','" + note + "','" + appointmentType + "','" + slotTime + "')";
			console.log(sql_n1);
			db.user.addUserProfessionalAppointment(sql_n1).then(function (result) {


				data["error"] = 0;
				data["Data"] = result;
				data["authResponse"] = "User Professional Appointment added Successfully";
				res.json(data);

			}).error(function (err) {
				res.json(err);
				data["error"] = err;
			});


		})
			.error(function (err) {
				res.json(err);
			});


		var sql = "select userID,firstname, lastname,username from user where userID='" + userid1 + "'";
		db.user.getUsername(sql).then(function (response) {

			if (response != '' && response != null) {

				var firstname = response[0].firstname;
				var lastname = response[0].lastname;
				var username = response[0].username;
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

				var dateime = year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

				var sql_notification = "INSERT INTO notification(fromUserID,toUserID,subject, details,insertionDateTime) values ('" + userid1 + "','" + professionalID + "','" + "Appointment Booking" + "','" + firstname + " " + lastname + " is requesting to book an appointment on " + appointmentDate + ", " + appointmentTime + ", Notes: " + note + ". Please confirm the appointment in the Doctor Portal.','" + dateime + "')";

				console.log(sql_notification);
				db.user.addNextOfKin(sql_notification).then(function (responsein2) {



				}).error(function (err) {
					res.json(err);
				});

				var sql = "select firstname, lastname,username,email from user where userID='" + professionalID + "'";
				var name = "";
				console.log(sql);
				db.user.getUsername(sql).then(function (response1) {

					if (response1 != '' && response1 != null) {

						name = response1[0].lastname + " " + response1[0].firstname;
						var email = response1[0].email;


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
							subject: "Appointment Booking", // subject
							html: 'Hi <b>' + name + ', </b>' + '<br><br>' + firstname + ' ' + lastname + ' is requesting to book an appointment on ' + appointmentDate + ', ' + appointmentTime + ' .Please confirm the appointment in the Doctor Portal.<br><br><h4><h4><br/><br/> Best Regards <br />UMCH Support <hr>This message was sent to ' + username + '. If you dont want to receive these emails from UMCH in the future, please update your notification settings' // body
						}, function (error, response) { //callback
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
					}
				}).error(function (err) {
					res.json(err);
				});

			}

		}).error(function (err) {
			res.json(err);
			data["error"] = err;
		});


		//////////////////////////////

	} catch (ex) {
		console.log(ex);
	}
	return res;
};



exports.cancelRescheduleUserProfessionalAppointment = function (req, res) {
	var userid1 = req.body.userid;
	var token = req.body.token;
	var data1 = req.body.data;
	var data1 = JSON.parse(data1);
	var total = data1.length;
	console.log(data1);
	var userid = data1[0].userID;
	var professionalID = data1[0].professionalID;
	var appointmentDate = data1[0].appointmentDate;
	var appointmentTime = data1[0].appointmentTime;
	var status = data1[0].status;
	var data = { "error": 0, "Data": "", "authResponse": "" }
	db.user.authUser(token).then(function (response) {

		var sql = "update userProfessionalAppointment set status=4 where professionalID='" + professionalID + "' and    appointmentDate='" + appointmentDate + "' and appointmentTime='" + appointmentTime + "'";



		console.log(sql);



		db.user.cancelRescheduleUserProfessionalAppointment(sql).then(function (result) {


			data["error"] = 0;
			data["Data"] = result;
			data["authResponse"] = "User Professional Appointment Updated Successfully";
			res.json(data);



		}).error(function (err) {
			res.json(err);
			data["error"] = err;
		});
		//sends the notification to the user 
		sql = "select userID,firstname, lastname from user where userID='" + userid1 + "'";
		db.user.getUsername(sql).then(function (response) {

			if (response != '' && response != null) {

				var firstname = response[0].firstname;
				var lastname = response[0].lastname;
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

				var dateime = year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

				var sql_notification = "INSERT INTO notification(fromUserID,toUserID,subject, details,insertionDateTime) values ('" + userid1 + "','" + professionalID + "','" + "Appointment Cancelled" + "','" + firstname + " " + lastname + " has cancelled the scheduled appointment on " + appointmentDate + ", " + appointmentTime + "','" + dateime + "')";
				if (status == 0 || status == 1) {
					sql_notification = "INSERT INTO notification(fromUserID,toUserID,subject, details,insertionDateTime) values ('" + userid1 + "','" + professionalID + "','" + "Appointment Rescheduled" + "','" + firstname + " " + lastname + " has rescheduled appointment from " + appointmentDate + ", " + appointmentTime + "','" + dateime + "')";
				}
				console.log(sql_notification);
				db.user.addNextOfKin(sql_notification).then(function (responsein2) {



				}).error(function (err) {
					res.json(err);
				});


				var sql = "select firstname, lastname,username,email from user where userID='" + professionalID + "'";
				var name = "";
				db.user.getUsername(sql).then(function (response1) {

					if (response1 != '' && response1 != null) {

						name = response1[0].lastname + " " + response1[0].firstname;
						var email = response1[0].email;

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
						if (status == 0 || status == 1) {
							smtpTransport.sendMail({ //email options
								from: "No-Reply <chief.umch@gmail.com>", // sender address.  Must be the same as authenticated user if using GMail.
								to: email, // receiver
								subject: "Appointment Rescheduled", // subject
								html: 'Hi <b>' + name + ', </b>' + '<br><br>' + firstname + ' ' + lastname + ' has rescheduled appointment from ' + appointmentDate + ', ' + appointmentTime + ' <br><br><h4><h4><br/><br/> Best Regards <br />UMCH Support <hr>This message was sent to ' + username + '. If you dont want to receive these emails from UMCH in the future, please update your notification settings' // body
							}, function (error, response) { //callback
								if (error) {
									console.log(error);
								} else {
									console.log("Message sent: " + response.message);

									data["authResponse"] = 'Success';
									res.json(data);
								}

								smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
							});
						} else {

							smtpTransport.sendMail({ //email options
								from: "No-Reply <chief.umch@gmail.com>", // sender address.  Must be the same as authenticated user if using GMail.
								to: email, // receiver
								subject: "Appointment Cancelled", // subject
								html: 'Hi <b>' + name + ', </b>' + '<br><br>' + firstname + ' ' + lastname + ' has cancelled the scheduled appointment on  ' + appointmentDate + ', ' + appointmentTime + ' <br><br><h4><h4><br/><br/> Best Regards <br />UMCH Support <hr>This message was sent to ' + username + '. If you dont want to receive these emails from UMCH in the future, please update your notification settings' // body
							}, function (error, response) { //callback
								if (error) {
									console.log(error);
								} else {
									console.log("Message sent: " + response.message);

									data["authResponse"] = 'Success';
									res.json(data);
								}

								smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
							});
						}

                        /*********************
                         **End email
                         ********************/







					}
				}).error(function (err) {
					res.json(err);
				});







			}



		}).error(function (err) {
			res.json(err);
			data["error"] = err;
		});




	}).error(function (err) {
		res.json(err);
	});
	return res;
};


exports.getBookedAppointment = function (req, res) {
	var userid1 = req.query.userid;
	var token = req.query.token;
	var professionalID = req.query.professionalID;
	var appointmentDate = req.query.appointmentDate;

	var status = req.body.status;
	var data = { "error": 0, "Data": "", "authResponse": "" }
	db.user.authUser(token).then(function (response) {
		var sql = "select appointmentTime from userProfessionalAppointment where appointmentDate='" + appointmentDate + "' and professionalID='" + professionalID + "' and status in (0,1,2)";
		console.log(sql);
		db.user.getBookedAppointment(sql).then(function (result) {


			data["error"] = 0;
			data["Data"] = result;
			data["authResponse"] = "Booked Appointment Retrieved Successfully";
			res.json(data);

		}).error(function (err) {
			res.json(err);
			data["error"] = err;
		});


	}).error(function (err) {
		res.json(err);
	});
	return res;
};



exports.addPromotions = function (req, res) {

	try {

		var userid1 = req.body.userid;
		var token = req.body.token;
		var data1 = req.body.data;

		data1 = JSON.parse(data1);

		var total = data1.length;

		console.log(data1);

		var userid = data1[0].userid;
		var promotionamount = data1[0].promotionamount;
		var startdate = data1[0].startdate;
		var enddate = data1[0].enddate;
		var isuploadedtoweb = data1[0].isuploadedtoweb;





		var data = { "error": 0, "Data": "", "authResponse": "" }

		db.user.authUser(token).then(function (response) {


			var sql_n1 = "INSERT INTO Promotions(userid,promotionamount,startdate,enddate,isuploadedtoweb) values ('" + userid + "','" + promotionamount + "','" + startdate + "','" + enddate + "','" + isuploadedtoweb + "')";
			console.log(sql_n1);
			db.user.addNextOfKin(sql_n1).then(function (result) {


				data["error"] = 0;
				data["Data"] = result;
				data["authResponse"] = "Promotions Records added Successfully";
				res.json(data);

			}).error(function (err) {
				res.json(err);
				data["error"] = err;
			});


		})
			.error(function (err) {
				res.json(err);
			});

	} catch (ex) {
		console.log(ex);
	}
	return res;
};
exports.insertcalllogs = function (req, res) {

	var userid = req.body.userid;
	var token = req.body.token;
	var data1 = req.body.data;
	data1 = JSON.parse(data1);

	var data = { "error": 0, "Data": "", "authResponse": "" }
	var total = data1.length;
	if (!!token) {
		db.user.authUser(token).then(function (response) {
			for (var i = 0; i <= total - 1; i++) {
				console.log("insert call log" + data1[i].name);
				var name = data1[i].name;
				// var userid = data1[i].userid;
				var peer = data1[i].peer;
				var timeStamps = data1[i].timeStamps;
				var mid = data1[i].mid;
				var callstatus = data1[i].callstatus;
				var calltype = data1[i].calltype;
				var timelong = data1[i].timelong;
				var sql = "select * from calllogs where timestamp='" + timeStamps + "' and userid='" + userid + "' and peer='" + peer + "'";
				db.user.getCallLogs(sql).then(function (response) {

					if (response == '' || response == null) {
						console.log("response " + response);

						var insertlogsSql = "INSERT INTO calllogs(name,userid,peer,timestamp,  mid, callstatus, calltype) values('" + name + "','" + userid + "','" + peer + "','" + timeStamps + "','" + mid + "','" + callstatus + "','" + calltype + "')";
						console.log(insertlogsSql);
						db.user.addCallLogs(insertlogsSql).then(function (result) {


							data["error"] = 0;
							data["Data"] = result;
							data["authResponse"] = "Calllogs Records added Successfully";
							//res.json(data);

						}).error(function (err) {
							res.json(err);
							data["error"] = err;
						});
					} else {

						data["error"] = 0;
						data["authResponse"] = "Already Inserted.";
						//     res.json(data);


					}

				}).error(function (err) {
					res.json(err);
					data["error"] = err;
				});



			}
		}).error(function (err) {
			res.json(err);
		});

	} else {
		data["error"] = 1;
		data["authResponse"] = "Please provide all required data (i.e : token etc)";
		res.json(data);
		//connection.end()
	}
	res.json(data);
	return res;
};

exports.getPromotions = function (req, res) {

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
				var email = response;

				///Get user info
				db.user.getPromotions(userid).then(function (response) {
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
		}).error(function (err) {
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

exports.addsubscriptionplan = function (req, res) {

	try {

		//var userid1 = req.body.userid;
		var token = req.body.token;
		var data1 = req.body.data;

		data1 = JSON.parse(data1);

		var total = data1.length;

		console.log(data1);

		//var userid = data1[0].userid;
		//var isuploadedtoweb = data1[0].isuploadedtoweb;
		//var planid = data1[0].planid;
		var planName = data1[0].planName;
		var price = data1[0].price;

		//price frequency pricedescription validatefrom validateto status photopath

		var frequency = data1[0].frequency;
		var pricedescription = data1[0].pricedescription;
		var validatefrom = data1[0].validatefrom;
		var validateto = data1[0].validateto;
		var status = data1[0].status;

		//var insertiondate = data1[0].insertiondate;
		var photopath = data1[0].photopath;




		var data = { "error": 0, "Data": "", "authResponse": "" }

		db.user.authUser(token).then(function (response) {


			var sql_n1 = "INSERT INTO subscriptionplan(planName,price,frequency,pricedescription,validatefrom,validateto,status,photopath ) values ('" + planName + "','" + price + "','" + frequency + "','" + pricedescription + "','" + validatefrom + "','" + validateto + "','" + status + "','" + photopath + "')";
			console.log(sql_n1);
			db.user.addNextOfKin(sql_n1).then(function (result) {


				data["error"] = 0;
				data["Data"] = result;
				data["authResponse"] = "subscriptionplan Records added Successfully";
				res.json(data);

			}).error(function (err) {
				res.json(err);
				data["error"] = err;
			});


		})
			.error(function (err) {
				res.json(err);
			});

	} catch (ex) {
		console.log(ex);
	}
	return res;
};

exports.getsubscriptionplan = function (req, res) {

	var planid = req.query.planid;
	var token = req.query.token;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function (response) {
			if (response != '' && response != null) {
				var email = response;

				///Get user info
				db.user.getsubscriptionplan(planid).then(function (response) {
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
		}).error(function (err) {
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

exports.getInvoiceNo = function (req, res) {

	var organizationID = req.query.organizationID;
	var token = req.query.token;

	var data = {
		"error": 0,
		"authResponse": ""
	}

	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function (response) {
			if (response != '' && response != null) {
				var email = response;

				///Get user info
				db.user.getInvoice(organizationID).then(function (response) {

					var prefix = response[0].invoicePrefix;
					var lastNo = response[0].lastInvoiceNo + 1;
					var toAdded = 8 - lastNo.toString().length;

					console.log("prefix : ", prefix);
					console.log("lastNo : ", lastNo);
					console.log("toAdded : ", toAdded);

					var invoiceNo = prefix;

					for (var i = 0; i < toAdded; i++) {
						invoiceNo += "0";
					}
					invoiceNo += lastNo;

					data["error"] = 0;
					data["authResponse"] = "Action Successful";
					data['Data'] = { 'invoiceNo': invoiceNo };
					res.json(data);

					db.user.updateInvoice(organizationID, lastNo).then(function () {


					}).error(function (err) {
						res.json(err);
					});
				}).error(function (err) {
					res.json(err);
				});

			} else {
				data["error"] = 1;
				data["authResponse"] = "Authentication Failed.";
				res.json(data);
			}
		}).error(function (err) {
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

exports.getDiscount = function (req, res) {

	var token = req.query.token;
	var voucherCode = req.query.voucherCode;
	var planid = req.query.planid;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function (response) {
			if (response != '' && response != null) {
				var email = response;

				///Get user info
				db.user.getDiscount(voucherCode, planid).then(function (response) {
					var discAmount = response[0].discAmount
					var quantity = response[0].quantity
					var used = response[0].used;
					var increment = used + 1;

					data["error"] = 0;
					if (quantity >= used) {
						data["authResponse"] = "Action Successful";
						data['Data'] = { 'discAmount': discAmount };
						db.user.voucherUsed(voucherCode, planid, increment).then(response => {

						});
					} else {
						data["authResponse"] = "No voucher left";
						data['Data'] = { 'discAmount': 0 };
					}
					res.json(data);
				}).error(function (err) {
					res.json(err);
				});

			} else {
				data["error"] = 1;
				data["authResponse"] = "Authentication Failed.";
				res.json(data);

			}
		}).error(function (err) {
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



exports.addPaymentGatewayModel = function (req, res) {

	try {

		var userid1 = req.body.userid;
		var token = req.body.token;
		var data1 = req.body.data;

		data1 = JSON.parse(data1);

		var total = data1.length;

		console.log(data1);

		var paymentgatewayname = data1[0].paymentgatewayname;
		var securehash = data1[0].securehash;
		var merchantid = data1[0].merchantid;


		var data = { "error": 0, "Data": "", "authResponse": "" }

		db.user.authUser(token).then(function (response) {


			var sql_n1 = "INSERT INTO PaymentGatewayModel(paymentgatewayname,securehash,merchantid) values ('" + paymentgatewayname + "','" + securehash + "','" + merchantid + "')";
			console.log(sql_n1);
			db.user.addNextOfKin(sql_n1).then(function (result) {


				data["error"] = 0;
				data["Data"] = result;
				data["authResponse"] = "PaymentGatewayModel Records added Successfully";
				res.json(data);

			}).error(function (err) {
				res.json(err);
				data["error"] = err;
			});


		})
			.error(function (err) {
				res.json(err);
			});

	} catch (ex) {
		console.log(ex);
	}
	return res;
};
//============================================Update user Password============================================/////////////////


exports.updatePasssword = function (req, res) {
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
		db.user.authUser(token).then(function (response) {
			if (response != '' && response != null) {
				var email = response;
				if (password == confirm_password) {

					password = md5(password);

					db.user.updateUserPassword(userid, password).then(function (response) {
						data["error"] = 0;
						data["authResponse"] = "Password updated Sucessfully.";
						res.json(data);

					})
						.error(function (err) {
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
			.error(function (err) {
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
exports.forgotPasssword = function (req, res) {
	var email = req.body.email;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!email) {
		///Authinticate user
		db.user.checkByname(email).then(function (response) {
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
						pass: "um1328ch"
					}
				});
				smtpTransport.sendMail({ //email options
					from: "No-Reply <chief.umch@gmail.com>", // sender address.  Must be the same as authenticated user if using GMail.
					to: email, // receiver
					subject: "Password Recovery", // subject
					html: 'Hi <b>' + name + ' </b>' + '<br><br> We received a request for password recovery.Please Click on below <a href="http://www.umchtech.com/chief/resetpassword.php?ts=' + userID + '&&token=' + token + '">link</a> to reset password.<br><br><h4><a href="http://www.umchtech.com/chief/resetpassword.php?ts=' + userID + '&&token=' + token + '">Click Here</a><h4><br><br><br>Regards <br>   Support CHIEF Team' // body
				}, function (error, response) { //callback
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
			.error(function (err) {
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
exports.socialLogin = function (req, res) {

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

		db.user.socialLoginCheck(username).then(function (response) {

			if (response != '' && response != null) {
				data["error"] = 0;
				data["authResponse"] = "Login Successfully";
				data['data'] = response;
				res.json(data);
			} else {
				var email = username;
				if (servicename == 'facebook') { ////facebook
					var sql = "INSERT INTO user (username, email, facebook, token, deviceID) VALUES ('" + username + "', '" + email + "', '" + servicetoken + "', '" + token + "', '" + deviceID + "')";

					db.user.socialregister(sql).then(function (response) {
						var id = response;
						//login
						db.user.loginSocial(id).then(function (response) {
							data["error"] = 0;
							data["authResponse"] = "Login Successfully";
							data['data'] = response;
							res.json(data)
						})
							.error(function (err) {
								res.json(err);
							});

					})
						.error(function (err) {
							res.json(err);
						});


				} else if (servicename == 'twitter') { ///twitter
					var sql = "INSERT INTO user (username, email, twitter, token, deviceID) VALUES ('" + username + "', '" + email + "', '" + servicetoken + "', '" + token + "', '" + deviceID + "')";

					db.user.socialregister(sql).then(function (response) {
						var id = response;
						//login
						db.user.loginSocial(id).then(function (response) {
							data["error"] = 0;
							data["authResponse"] = "Login Successfully";
							data['data'] = response;
							res.json(data)
						})
							.error(function (err) {
								res.json(err);
							});

					})
						.error(function (err) {
							res.json(err);
						});

				} else if (servicename == 'googleplus') { ////Google
					var sql = "INSERT INTO user (username, email, googleplus,token, deviceID) VALUES ('" + username + "', '" + email + "', '" + servicetoken + "', '" + token + "', '" + deviceID + "')";

					db.user.socialregister(sql).then(function (response) {

						var id = response;
						//login
						db.user.loginSocial(id).then(function (response) {
							data["error"] = 0;
							data["authResponse"] = "Login Successfully";
							data['data'] = response;
							res.json(data)
						})
							.error(function (err) {
								res.json(err);
							});

					})
						.error(function (err) {
							res.json(err);
						});

				} else {
					data["error"] = 1;
					data["authResponse"] = "Service Name Not Valid.Please Contact With Admin.";
					res.json(data);
				}

				data["error"] = 1;
				data["authResponse"] = "No Record Found";
				res.json(data);
			}
		})
			.error(function (err) {
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

exports.questionuseradd = function (req, res) {
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
		db.user.authUser(token).then(function (response) {
			if (response != '' && response != null) {


				db.userillness.getuserillness(userid).then(function (response) {

					if (response != '' && response != null) { // record found


						var sql = "UPDATE userillness SET disease='" + disease + "',dietControl='" + dietcontrol + "', oralAntidiabetics='" + oralantidiabetics + "', insulin='" + insulin + "',notControlledTreatment='" + notcontrolledtreatment + "',wellControlled ='" + wellcontrolled + "' WHERE userID='" + userid + "'";

						db.userillness.updateuserillness(sql).then(function (response) {
							data["error"] = 0;
							data["authResponse"] = "User Illness Successfully Updated";
							data['data'] = response;
							res.json(data)
						})
							.error(function (err) {
								res.json(err);
							});

					} else { ///no record found

						var sql = "INSERT INTO userillness (userID, disease,dietControl, oralAntidiabetics, insulin,notControlledTreatment,wellControlled) VALUES ('" + userid + "', '" + disease + "','" + dietcontrol + "', '" + oralantidiabetics + "', '" + insulin + "', '" + notcontrolledtreatment + "', '" + wellcontrolled + "') ";
						db.userillness.adduserillness(sql).then(function (response) {
							data["error"] = 0;
							data["authResponse"] = "User Illness Successfully Saved";
							data['data'] = response;
							res.json(data)
						})
							.error(function (err) {
								res.json(err);
							});

					}

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


//============================================Add user Next Of Kin============================================/////////////////
exports.addnextofkin12 = function (req, res) {

	try {

		var userid = req.body.userid;
		var token = req.body.token;
		var data1 = req.body.data;

		data1 = JSON.parse(data1);

		var total = data1.length;

		console.log(data1);

		var data = { "error": 0, "authResponse": "" }

		db.user.authUser(token).then(function (response) {

			if (!!token) {
				if (response != '' && response != null) {
					var sql = "";

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

					var dateime = year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;


					//for (var i = 0; i < total - 1; i++) {
					var username = data1[0].userid;
					var familyname = data1[0].familyname;
					var status = 1;
					var relation = data1[0].relationship;
					var email_notification = data1[0].email_notification;
					var app_notification = data1[0].app_notification;
					var sms_notification = data1[0].sms_notification;
					var type = data1[0].type;
					var approveByUser = data1[0].approve;
					var email = '';
					var phone = '';

					email = familyname;

					if (approveByUser == '1') {

						status = 1;

						//Update the status of previosu record     

						sql = "select userID,firstname, lastname from user where username='" + familyname + "'";
						db.user.getUsername(sql).then(function (response) {

							if (response != '' && response != null) {

								var familyid = response[0].userID;


								var sql1 = "update family set status=1,InsertationDatetime='" + dateime + "' where userID='" + username + "' and FamilyID='" + familyid + "' ";


								db.user.update_CardManagment(sql1).then(function (responstatus) {
									var resposnse = responstatus;

									var sql2 = "update family set status=1,InsertationDatetime='" + dateime + "' where userID='" + familyid + "' and FamilyID='" + username + "' ";

									db.user.update_CardManagment(sql2).then(function (responstatus2) {


										if (app_notification == "1") {
											var sql_notification = "INSERT INTO notification(fromUserID,toUserID,subject, details,insertionDateTime) values ('" + username + "','" + familyid + "','" + "Next of kin request Status." + "','" + "Congragulations, your next of kin request is approved." + "','" + dateime + "')";
											db.user.addNextOfKin(sql_notification).then(function (responsein2) {



											}).error(function (err) {
												res.json(err);
											});
										}



									}).error(function (err) {
										res.json(err);
									});

								}).error(function (err) {
									res.json(err);
								});
							}
						}).error(function (err) {
							res.json(err);
						});



						data["error"] = 0;
						data["authResponse"] = "Next Of Kin Status Approved Successfully";
						res.json(data);




						// get the family user ID ends 
					} else {

						status = 3;

						// get the family User ID 
						sql = "select * from user where username='" + familyname + "'";
						db.user.getUsername(sql).then(function (response) {

							if (response != '' && response != null) {

								familyname = response[0].userID;
								phone = response[0].phone;

								sql = "INSERT INTO family(userID,familyID,relationship, type,status,InsertationDatetime, EmailNotification, Appnotification, SmsNotification, IsDeleted) values ('" + username + "','" + familyname + "','" + relation + "','" + type + "','" + status + "','" + dateime + "','" + email_notification + "','" + app_notification + "','" + sms_notification + "','0')";
								db.user.addNextOfKin(sql).then(function (responseinner) {

									var senderName = '';
									var Gender = '';


									// Get Sender Name First And LAst name from database 
									var sql_forsendername = "select * from user where userID=" + username + "";
									db.user.getUsername(sql_forsendername).then(function (response134) {

										senderName = response134[0].firstName + " " + response134[0].lastName;
										Gender = response134[0].gender;


										if (response134[0].gender == 'F') {
											Gender = "Female";
										} else if (response134[0].gender == 'M') {
											Gender = "Male";
										}


										var typesecond = '';
										var relationsecond = '';

										if (type == 'Care Giver' || type == "caregiver") {
											typesecond = "Care Taker";
										}
										if (type == 'Care Taker' || type == "caretaker") {
											typesecond = "Care Giver";
										}


										switch (true) {
											case (Gender == 'Male' && relation == 'Son'):
												relationsecond = "Father";
												break;
											case (Gender == 'Female' && relation == 'Son'):
												relationsecond = "Mother";
												break;
											case (Gender == 'Female' && relation == 'Daughter'):
												relationsecond = "Mother";
											case (Gender == 'Male' && relation == 'Daughter'):
												relationsecond = "Father";
												break;
											case (relation == 'Father' && Gender == 'Female'):
												relationsecond = 'Daughter';
												break;
											case (relation == 'Mother' && Gender == 'Female'):
												relationsecond = 'Daughter';
												break;
											case (relation == 'Father' && Gender == 'Male'):
												relationsecond = 'Son';
												break;
											case (relation == 'Mother' && Gender == 'Male'):
												relationsecond = "Son";
												break;

											case (relation == 'Brother' && Gender == 'Male'):
												relationsecond = 'Brother';
												break;

											case (relation == 'Brother' && Gender == 'Female'):
												relationsecond = "Sister";
												break;

											case (relation == 'Sister' && Gender == 'Male'):
												relationsecond = "Brother";
												break;

											case (relation == 'Sister' && Gender == 'Female'):
												relationsecond = "Sister";
												break;

											case (relation == 'Husband' && Gender == 'Female'):
												relationsecond = "Wife";
												break;

											case (relation == 'Wife' && Gender == 'Male'):
												relationsecond = "Husband";
												break;

											case (relation == 'Grandfather' && Gender == 'Female'):
												relationsecond = "GrandDaughter";
												break;

											case (relation == 'Grandmother' && Gender == 'Male'):
												relationsecond = "GrandSon";
												break;
											default:
												relationsecond = "Other";

										}

										var status2 = 0;

										var sql_converse = "INSERT INTO family(userID, familyID,relationship, type,status,InsertationDatetime, EmailNotification, Appnotification, SmsNotification, IsDeleted) values ('" + familyname + "','" + username + "','" + relationsecond + "','" + typesecond + "','" + status2 + "','" + dateime + "','" + email_notification + "','" + app_notification + "','" + sms_notification + "',0);";

										db.user.addNextOfKin(sql_converse).then(function (responseinner2) {

											/////email to next of kin

											if (senderName == '') {
												senderName = "No Name";
											}

											if (email_notification == "1") {

												email_next_of_kin(responseinner2, email, senderName, type);
											}



											if (app_notification == "1") {
												var message_subject = senderName + " Invited you as Next of Kin";
												var message_body = senderName + ` invited you as ` + type;

												var sql_notification1 = "INSERT INTO notification(fromUserID,toUserID,subject, details,insertionDateTime) values ('" + username + "','" + familyname + "','" + message_subject + "','" + message_body + "','" + dateime + "')";
												db.user.addNextOfKin(sql_notification1).then(function (responsein2) {



												}).error(function (err) {
													res.json(err);
												});
											}

											if (sms_notification == "1") {
												if (phone != "" && phone != null) {

													if ((phone.length == 11 || phone.length == 12)) {

														var message_body = senderName + ` invited you as ` + type;
														const request = require('request');
														request(`http://api.silverstreet.com/send.php?username=umch&password=tvrtrTfS&destination=` + phone + `&sender=Google&senderton=5&sendernpi=0&body=` + message_body,
															function (error, response, body) {
																if (!error && response.statusCode == 200) {
																	console.log(body);


																}
															});
													}
												}
											}


											data["error"] = 0;
											data["authResponse"] = "Next Of Kin Added Successfully";
											res.json(data);

										}).error(function (err) {
											res.json(err);
										});




									}).error(function (err) {
										res.json(err);
									});




									//Now SEcond Entry 
									//Relationships
									//Female
									//if (Gender == 'Male'  && relation == 'Son') {
									//    relationsecond = "Father";
									//}
									// if (Gender == 'Female' && relation == 'Son') {
									//    relationsecond = "Mother";
									//}

									// if (Gender == 'Female' && relation == 'Daughter') {
									//    relationsecond = "Mother";
									//}

									//  if (relation == 'Father' && Gender == 'Female') {
									//     relationsecond = 'Daughter';
									// }

									//if (relation == 'Mother' && Gender == 'Female') {
									//     relationsecond = "Daughter";
									// }

									//if (relation == 'Father' && Gender == 'Male' ) {
									//    relationsecond = 'Son';
									//}

									//if (relation == 'Mother' && Gender == 'Male') {
									//     relationsecond = "Son";
									// }

									//if (relation == 'Brother' && Gender == 'Male') {
									//    relationsecond = 'Sister';
									//}

									//if (relation == 'Brother' && Gender == 'Female' ) {
									//    relationsecond = "Sister";
									//}
									//if (relation == 'Sister' && Gender == 'Male') {
									//    relationsecond = "Brother";
									//}

									//if (relation == 'Sister' && Gender == 'Female') {
									//    relationsecond = "Brother";
									//}

									//if (relation == 'Husband' && Gender == 'Female' ) {
									//    relationsecond = "Wife";
									//}
									//if (relation == 'Wife' && Gender == 'Male') {
									//    relationsecond = "Husband";
									//}
									//if (relation == 'Grandfather' && Gender == 'Female' ) {
									//    relationsecond = "GrandDaughter";
									//}
									//if (relation == 'Grandmother' && Gender == 'Male') {
									//    relationsecond = "GrandSon";
									//}
									//else {
									//    relationsecond = "Other";
									//}



								}).error(function (err) {
									res.json(err);
								});
							}

						}).error(function (err) {
							res.json(err);
						});
						// get the family user ID ends 
					}

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

	} catch (ex) {
		console.log(ex);
	}
	return res;
};


// Insert Lab REport 

exports.addLabReport = function (req, res) {

	try {
		var inserted_rows = [];
		var userid = req.body.userid;
		var token = req.body.token;
		var data1 = req.body.data;

		data1 = JSON.parse(data1);
		var total = data1.length;

		console.log(data1);


		var data = {
			"error": 0,
			"Data": "",
			"authResponse": ""
		}

		for (var i = 0; i <= total - 1; i++) {

			var totalcholestrol = data1[i].totalcholestrol;
			var cholestrolhdlratio = data1[i].cholestrolhdlratio;
			var totalhdl = data1[i].totalhdl;
			var totalldl = data1[i].totalldl;
			var totaltriglycerides = data1[i].totaltriglycerides;
			var totalplasmaglucose = data1[i].totalplasmaglucose;
			var hemoglobin = data1[i].hemoglobin;
			var recordtime = data1[i].recorddate;


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

			var datetime = year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;


			db.user.authUser(token).then(function (response) {
				if (!!token) {

					if (response != '' && response != null) {

						var sql_n1 = "INSERT INTO LabReport(totalcholestrol,cholestrolhdlratio,totalhdl,totalldl,totaltriglycerides,totalplasmaglucose,hemoglobin,inserdationdatetime,userid,recorddate) values ('" + totalcholestrol + "','" + cholestrolhdlratio + "','" + totalhdl + "','" + totalldl + "','" + totaltriglycerides + "','" + totalplasmaglucose + "','" + hemoglobin + "','" + datetime + "','" + userid + "','" + recordtime + "')";
						console.log(sql_n1);
						db.user.addNextOfKin(sql_n1).then(function (result) {

							inserted_rows.push(result);
							console.log("Last Inserted ID is========" + inserted_rows);
							console.log("Value of  i " + i);
							console.log("length of inserted rows  " + inserted_rows.length);
							console.log("length of Total  " + total);

							if (inserted_rows.length == total) {

								data["error"] = 0;
								data["Data"] = inserted_rows;
								data["authResponse"] = "Lab Report Records added Successfully";
								res.json(data);
							}

							// res.json(data);
						}).error(function (err) {
							res.json(err);
							data["error"] = err;
						});
					}
				} else {
					data["error"] = 1;
					data["authResponse"] = "Token Required etc.";
					res.json(data);
				}
			})
				.error(function (err) {
					res.json(err);
					data["error"] = err;
				});
		}


	} catch (ex) {
		console.log(ex);
	}

	return res;
};

// update the my medicine

exports.UpdateMyMedicine = function (req, res) {

	try {
		//var inserted_rows = [];
		var userid = req.body.userid;
		var token = req.body.token;
		var data1 = req.body.data;

		data1 = JSON.parse(data1);
		var total = data1.length;

		console.log(data1);


		var data = {
			"error": 0,
			"Data": "",
			"authResponse": ""
		}
		var id = data1[i].id;
		var myMedicineID = data1[i].myMedicineID;
		var userID = data1[i].userID;
		var status = data1[i].status;
		var dateTime2 = data1[i].dateTime;
		var timeTaken = data1[i].timeTaken;
		var reason = data1[i].reason;


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

		var datetime = year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;


		db.user.authUser(token).then(function (response) {
			if (!!token) {

				if (response != '' && response != null) {

					var sql1 = "update mymedicinestatus set myMedicineID='" + myMedicineID + "',userID='" + userID + "',status='" + status + "',dateTime='" + dateTime2 + "',status='" + status + "',insertDateTime='" + datetime + "',timeTake='" + timeTaken + "',reason='" + reason + "' where id=" + id + "";

					console.log(sql1);
					db.user.update_CardManagment(sql1).then(function (result) {

						data["error"] = 0;
						data["Data"] = "Updated Successfully";
						data["authResponse"] = "My Medicine Record Updated Successfully";
						res.json(data);

					}).error(function (err) {
						res.json(err);
						data["error"] = err;
					});
				}
			} else {
				data["error"] = 1;
				data["authResponse"] = "Token Required etc.";
				res.json(data);
			}
		})
			.error(function (err) {
				res.json(err);
				data["error"] = err;
			});



	} catch (ex) {
		console.log(ex);
	}

	return res;
};


//get Lab Report 
exports.getLabReport = function (req, res) {

	try {

		var userid = req.query.userid;
		var token = req.query.token;
		//var reportid =req.query.reportid

		var data = {
			"error": 0,
			"authResponse": ""
		}

		db.user.authUser(token).then(function (response) {
			if (!!token) {
				if (response != '' && response != null) {


					if (response != '' && response != null) {
						var sql = "select *  from LabReport where userid='" + userid + "'";
						db.user.getUsername(sql).then(function (response) {
							data["error"] = 0;
							data["authResponse"] = "Action Successful";
							data['Data'] = response;
							res.json(data);
						})
							.error(function (err) {
								res.json(err);
							});
					}
				}

				//data["error"] = 0;
				//data["authResponse"] = "success";
				//res.json(data);

			} else {
				data["error"] = 1;
				data["authResponse"] = "Token Required etc.";
				res.json(data);
			}

		})
			.error(function (err) {
				res.json(err);
			});

	} catch (ex) {
		console.log(ex);
	}
	return res;
};


exports.deletenextofkin = function (req, res) {

	try {

		var userid = req.body.userid;
		var token = req.body.token;
		var familyid = req.body.familyid;

		var data = {
			"error": 0,
			"authResponse": ""
		}

		db.user.authUser(token).then(function (response) {
			if (!!token) {
				if (response != '' && response != null) {
					var sql = "";


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

					var dateime = year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;



					//Update the status of previosu record 
					var sql1 = "update family set IsDeleted=1,InsertationDatetime='" + dateime + "' where userID=" + userid + " and FamilyID=" + familyid + ";";



					db.user.update_CardManagment(sql1).then(function (responstatus) {
						var resposnse = responstatus;

						var sql2 = "update family set IsDeleted=1,InsertationDatetime='" + dateime + "' where userID=" + familyid + " and FamilyID=" + userid + ";";

						db.user.update_CardManagment(sql2).then(function (responstatus2) {

							var sql_notification = "INSERT INTO notification(fromUserID,toUserID,subject, details,insertionDateTime) values ('" + userid + "','" + familyid + "','" + "Reject your next of kin request." + "','" + "your next of kin request is Rejected." + "','" + dateime + "');";
							db.user.addNextOfKin(sql_notification).then(function (responsein2) {

							}).error(function (err) {
								res.json(err);
							});

						}).error(function (err) {
							res.json(err);
						});

					}).error(function (err) {
						res.json(err);
					});


					data["error"] = 0;
					data["authResponse"] = "Next Of Kin Deleted Successfully";
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
	} catch (ex) {
		console.log(ex);
	}
	return res;
};

/*
AcceptNextOfKin = () =>{

	try {

        var userid = req.body.userid;
        var token = req.body.token;
		var familyid = req.body.familyid;
		var noty = req.body.noty;
		var email = req.body.email;
		var sms = req.body.sms;

        var data = {
            "error": 0,
            "authResponse": ""
        }

        db.user.authUser(token).then( (response) => {
                if (!!token) {
                    if (response != '' && response != null) {
                        var sql = "";


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

                        var datetime = year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;



                        //Update the status of previosu record 
                        var sql1 =  "update family set status=2,InsertationDatetime='" + datetime + "' where userID='" + userid + "' and FamilyID='" + familyid + "';";
                        db.user.update_CardManagment(sql1).then((responstatus) => {
                            var resposnse = responstatus;

                            var sql2 = "update family set status=2,InsertationDatetime='" + datetime + "' where userID='" + familyid + "' and FamilyID='" + userid + "';";
                            db.user.update_CardManagment(sql2).then((responstatus2) => {

								if(noty == 1){
									var sql_notification = "INSERT INTO notification(fromUserID,toUserID,subject, details,insertionDateTime) values ('" + userid + "','" + familyid + "','" + "Rejected your next of kin request." + "','" + "your next of kin request is Rejected." + "','" + dateime + "')";
									db.user.addNextOfKin(sql_notification).then((responsein2) => {



									}).error(function(err) {
										res.json(err);
									});
								}

								if (sms == "1") {
									if (phone != "" && phone != null) {

										if ((phone.length == 11 || phone.length == 12)) {

											var message_body = senderName + ` invited you as ` + type;
											const request = require('request');
											request(`http://api.silverstreet.com/send.php?username=umch&password=tvrtrTfS&destination=` + phone + `&sender=Google&senderton=5&sendernpi=0&body=` + message_body,
												function(error, response, body) {
													if (!error && response.statusCode == 200) {
														console.log(body);


													}
												});
										}
									}
								}

								if(email == 1){


								}



                            }).error(function(err) {
                                res.json(err);
                            });

                        }).error(function(err) {
                            res.json(err);
                        });


                        data["error"] = 0;
                        data["authResponse"] = "Next Of Kin Rejeted Successfully";
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
    } catch (ex) {
        console.log(ex);
    }
    return res;

};


RejectNextOfKin = () =>{
	try {

        var userid = req.body.userid;
        var token = req.body.token;
        var familyid = req.body.familyid;

        var data = {
            "error": 0,
            "authResponse": ""
        }

        db.user.authUser(token).then( (response) => {
                if (!!token) {
                    if (response != '' && response != null) {
                        var sql = "";


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

                        var datetime = year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;



                        //Update the status of previosu record 
                        var sql1 =  "update family set status=1,InsertationDatetime='" + datetime + "' where userID='" + userid + "' and FamilyID='" + familyid + "';";


                        db.user.update_CardManagment(sql1).then((responstatus) => {
                            var resposnse = responstatus;

                            var sql2 = "update family set status=1,InsertationDatetime='" + datetime + "' where userID='" + familyid + "' and FamilyID='" + userid + "';";

                            db.user.update_CardManagment(sql2).then((responstatus2) => {


                                var sql_notification = "INSERT INTO notification(fromUserID,toUserID,subject, details,insertionDateTime) values ('" + userid + "','" + familyid + "','" + "Accepted your next of kin request." + "','" + "your next of kin request is Accepted." + "','" + dateime + "')";
                                db.user.addNextOfKin(sql_notification).then((responsein2) => {



                                }).error(function(err) {
                                    res.json(err);
                                });



                            }).error(function(err) {
                                res.json(err);
                            });

                        }).error(function(err) {
                            res.json(err);
                        });


                        data["error"] = 0;
                        data["authResponse"] = "Next Of Kin Deleted Successfully";
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
    } catch (ex) {
        console.log(ex);
    }
    return res;

};
*/

///////////////========================Invitation Email To Next Of kin=================================================/////////////////

function email_next_of_kin(lastinsertid, email, senderName, type) {

	///console.log('last inser ID===================================>' + lastinsertid + "<============================>" + email);

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
		subject: senderName + " Invited you as Next of Kin", // subject
		html: "Hi,<br><br>" + senderName + " invited you as " + type + "<br><br><b>Take a Action </b><br><br><a style='color: #fff;background-color: #5cb85c;border-color: #4cae4c;display: inline-block;padding: 5px 12px;margin-bottom: 0;font-size: 14px;font-weight: 400;line-height: 1.42857143;text-align: center;white-space: nowrap;vertical-align: middle;-ms-touch-action: manipulation;touch-action: manipulation;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;border: 1px solid transparent;border-radius: 4px;'href='http://www.umchtech.com/chief/setup-next-of-kin.php?status=1&id=` + lastinsertid + `'>Accept</a>  <a style='color: #fff;background-color: #d9534f;border-color: #d43f3a;padding: 6px 12px;margin-bottom: 0;font-size: 14px;font-weight: 400;line-height: 1.42857143;text-align: center;white-space: nowrap;vertical-align: middle;-ms-touch-action: manipulation;touch-action: manipulation;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;margin-left:0px; border: 1px solid transparent;border-radius: 4px;'href='http://www.umchtech.com/chief/setup-next-of-kin.php?status=2&id=` + lastinsertid + '>Reject</a><br/><br/><br/> Best Regards <br />UMCH Support <hr>This message was sent to " + email + ". If you dont want to receive these emails from UMCH in the future, please update your notification settings"

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

}

///////////////========================Get User Next Of Kin=================================================/////////////////

exports.getNextOfKin = function (req, res) {

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
				var email = response;

				///Get user info
				db.user.getNextOfKin(userid).then(function (response) {
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
		}).error(function (err) {
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

///////////////========================Get User Appointment with professional=================================================/////////////////

exports.getListOfDoctores = function (req, res) {
	console.log(" getListOfDoctoresAgainstID --> req.query : ", req.query);
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
				var email = response;

				///Get user info
				db.user.getListOfDoctoresAgainstID(userid).then(function (response) {
					data["error"] = 0;
					data["authResponse"] = "Action Successful";
					data['Data'] = response;
					console.log("List Of Doctors:: " + data);
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
		}).error(function (err) {
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
exports.rejectDoctorRequest = function (req, res) {
	var userid = req.body.userid;
	var token = req.body.token;
	var professionalid = req.body.professionalid;
	var email = req.body.useremail;

	var data = {
		"error": 0,
		"authResponse": "",
		"Data": ""
	}
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

	var insertionDate = year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

	if (!!token) {
		db.user.authUser(token).then(function (response) {
			if (response != '' && response != null) {

				var updateRejectStatus = "update professionalInvitation set status =4 where email='" + email + "' and professionalID='" + professionalid + "'";
				console.log(updateRejectStatus);
				db.user.update_CardManagment(updateRejectStatus).then(function (response) {


					// Add Notification in Notification Table 
					var sql_notification = "INSERT INTO notification(fromUserID,toUserID,subject, details,insertionDateTime) values ('" + userid + "','" + professionalid + "','" + "Rejected the invitation for Health Monitoring." + "','" + "Patient rejected the invitation for Health Monitoring." + "','" + insertionDate + "')";
					db.user.addNextOfKin(sql_notification).then(function (responsein2) {
						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = "Successfully Updated";
						res.json(data);
						console.log(data);
					}).error(function (err) {
						res.json(err);
					});


				}).error(function (err) {
					res.json(err);
				});



			} else {
				data["error"] = 1;
				data["authResponse"] = "Authentication Failed.";
				res.json(data);

			}
		}).error(function (err) {
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

exports.healthcareProviders = (req, res) => {
	var userid = 133;
	var token = req.query.token;
	var organizationID = req.query.organizationID;

	var data = {
		"error": 0,
		"authResponse": ""
	}

	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function (response) {
			if (response != '' && response != null) {
				var email = response;

				///Get healthcare provider info
				db.user.getHealthcareProviders(organizationID).then(function (response) {
					data["error"] = 0;
					data["authResponse"] = "Action Successful";
					data['Data'] = response;
					console.log("Healthcare Provider List : " + response)
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
		}).error(function (err) {
			res.json(err);
		});
	} else {
		data["error"] = 1;
		data["authResponse"] = "Please provide all required data (i.e : token etc)";
		res.json(data);
		//connection.end()
	}

	return res;

}

//============================================Add Voucher============================================/////////////////
exports.addVoucher = function (req, res) {
	var userid = 133;
	var token = req.body.token;
	console.log('token : ', token);
	var data1 = req.body.data;
	console.log('data : ', data1);
	data1 = JSON.parse(data1);
	var data = {
		"error": 0,
		"authResponse": ""
	}

	let professionalID = data1[0].professionalID;
	let voucherType = data1[0].voucherType;
	let voucherDesc = data1[0].voucherDesc;
	let voucherCode = data1[0].voucherCode;
	let planid = data1[0].planid;
	let validatefrom = data1[0].validatefrom;
	let validateto = data1[0].validateto;
	let discType = data1[0].discType;
	let discAmount = data1[0].discAmount;
	let maxDiscAmount = data1[0].maxDiscAmount;
	let quantity = data1[0].quantity;

	if (!!token) {
		db.user.authUser(token).then(function (response) {
			if (response != '' && response != null) {
				var email = response;
				db.user.insertVoucher(professionalID, voucherType, voucherDesc, voucherCode, planid, validatefrom, validateto, discType, discAmount, maxDiscAmount, quantity).then(function (result) {
					data["error"] = 0;
					data["authResponse"] = "Action Successful";
					data['Data'] = result;
					res.json(data);
				}).catch(function (err) {
					res.json(err);
					data["error"] = err;
				});

			} else {
				data["error"] = 1;
				data["authResponse"] = "Authentication Failed.";
				res.json(data);
			}
		}).error(function (err) {
			res.json(err);
		});
	} else {
		data["error"] = 1;
		data["authResponse"] = "Token Required etc.";
		res.json(data);
	}

	return res;

};


exports.getpendinglistofDoctor = function (req, res) {

	var userid = req.query.userid;
	var token = req.query.token;
	var username = req.query.username;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function (response) {
			if (response != '' && response != null) {
				var email = response;

				///Get user info
				db.user.getPendingListOfDoctoresAgainstID(username).then(function (response) {
					data["error"] = 0;
					data["authResponse"] = "Action Successful";
					data['Data'] = response;
					console.log("Pending Doctors List " + response)
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
		}).error(function (err) {
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


exports.DoctorRequestStatus = function (req, res) {

	var userid = req.query.userid;
	var Professionalid = req.query.Professionalid;
	var changestatus = req.query.changestatus;
	var token = req.query.token;

	var data = {
		"error": 0,
		"authResponse": "",
		"Data": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function (response) {
			if (response != '' && response != null) {


				if (changestatus == "0") {

					var sql = "select userID,professionalID,status  from userProfessionalRegistration where userID='" + userid + "' and professionalID='" + Professionalid + "'";
					db.user.getUsername(sql).then(function (response) {
						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = response;
						console.log(data);
						res.json(data);
					})
						.error(function (err) {
							res.json(err);
						});

				}
				if (changestatus == "1") {

					var sql = "update userProfessionalRegistration set status='" + changestatus + "' where userID='" + userid + "' and professionalID='" + Professionalid + "' ";
					db.user.update_CardManagment(sql).then(function (response) {
						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = "Successfully Updated";
						res.json(data);
						console.log(data);
					})
						.error(function (err) {
							res.json(err);
						});
				}

			} else {
				data["error"] = 1;
				data["authResponse"] = "Authentication Failed.";
				res.json(data);
			}
		}).error(function (err) {
			res.json(err);
		});
	} else {
		data["error"] = 1;
		data["authResponse"] = "Please provide all required data (i.e : token etc)";
		res.json(data);
		//connection.end() 
	}
	// console.log(res);
	return res;
};


exports.getlatestmessagesOfUser = function (req, res) {

	try {

		var Fromuserid = req.query.Fromuserid;
		var Touserid = req.query.Touserid;
		var token = req.query.token;

		var data = {
			"error": 0,
			"authResponse": "",
			"Data": ""
		}

		if (!!token) {
			///Authinticate user
			db.user.authUser(token).then(function (response) {
				if (response != '' && response != null) {

					var sql = "select fromUserID,toUserID, subject,details,insertionDateTime as datetime  from message where fromUserID='" + Fromuserid + "'and toUserID='" + Touserid + "'";
					db.user.getUsername(sql).then(function (response) {
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
			}).error(function (err) {
				res.json(err);
			});
		} else {
			data["error"] = 1;
			data["authResponse"] = "Please provide all required data (i.e : token etc)";
			res.json(data);
			//connection.end()
		}
	} catch (ex) {
		console.log(ex);
	}

	return res;
};


exports.ValidateCode = function (req, res) {

	try {
		var Code = req.query.Code;
		var email = req.query.username;
		var token = req.query.token;
		console.log(token);

		var data = {
			"error": 0,
			"authResponse": "",
			"Data": ""
		}
		if (!!token) {
			///Authinticate user
			db.user.authUser(token).then(function (response) {
				if (response != '' && response != null) {

					var sql = "select * from professionalInvitation where email='" + email + "' and auth_code='" + Code + "'";
					console.log(sql);
					db.user.getUsername(sql).then(function (response) {
						if (response != '' && response != null) {

							var emailtoget = response[0].email;
							var refId = response[0].RefID;

							var sql_UserID = "select userID from user where username='" + emailtoget + "'";
							console.log(sql_UserID);
							db.user.getUsername(sql_UserID).then(function (responseUSerID) {


								var professionalID = response[0].professionalID;
								var userID = responseUSerID[0].userID;
								console.log("UserID:: " + userID);
								// add the userillness record into db 

								var status = 1;


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

								var insertionDate = year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;





								///////////////////////////////////////////////////////////////

								var insertUserIllness = "INSERT INTO userillness(userID, disease, dietControl, oralAntidiabetics, insulin, notControlledTreatment, wellControlled,InsertionDateTime) VALUES ('" + userID + "','0','0','0','0','0','0','" + insertionDate + "')";


								console.log("userillness:: " + insertUserIllness);
								// Insert the Entry in the UserProfessional Table
								var sql = "INSERT INTO userProfessionalRegistration (userID, professionalID, status ,insertionDate,refID) VALUES ('" + userID + "', '" + professionalID + "', '" + status + "' ,'" + insertionDate + "','" + refId + "')";
								console.log("Sql " + sql);
								db.user.addCardManagment(sql).then(function (response) {



									// Now Update the Status in Professioanl Invitation 
									var sql_Update = "UPDATE professionalInvitation SET status='" + status + "',emailConfirmByPatient='" + insertionDate + "' where email='" + email + "' and auth_code='" + Code + "'";
									db.user.update_CardManagment(sql_Update).then(function (response) {



										// Add Notification in Notification Table 
										var sql_notification = "INSERT INTO notification(fromUserID,toUserID,subject, details,insertionDateTime) values ('" + userID + "','" + professionalID + "','" + "Accepted the invitation for Health Monitoring." + "','" + "Accepted the invitation for Health Monitoring." + "','" + insertionDate + "')";
										db.user.addNextOfKin(sql_notification).then(function (responsein2) {

											db.userillness.getuserillness(userID).then(function (responseuserIllness) {

												console.log("userillness response" + responseuserIllness)

												if (responseuserIllness != '' && responseuserIllness != null) { // record found



												} else {
													db.user.addNextOfKin(insertUserIllness).then(function (responsein2) {



													}).error(function (err) {
														res.json(err);
													});
												}

												//Add Notification



											}).error(function (err) {
												res.json(err);
											});





										}).error(function (err) {
											res.json(err);
										});

									}).error(function (err) {
										res.json(err);
									});
									// Update Complete 


								}).error(function (err) {
									res.json(err);
								});


							}).error(function (err) {
								res.json(err);
							});
							//Insert in Entrty 


							data["error"] = 0;
							data["authResponse"] = "Action Successful";
							data['Data'] = "Authntication code validated";
						} else {
							data["error"] = 1;
							data["authResponse"] = "Action Successful";
							data['Data'] = "Authntication code not validated";

						}

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
			}).error(function (err) {
				res.json(err);
			});
		} else {
			data["error"] = 1;
			data["authResponse"] = "Please provide all required data (i.e : token etc)";
			res.json(data);
			//connection.end()
		}
	} catch (ex) {
		console.log(ex);
	}

	return res;
};


exports.getuserImage = function (req, res) {

	try {

		var userid = req.query.userid;
		var token = req.query.token;

		var data = {
			"error": 0,
			"authResponse": "",
			"Data": ""
		}
		if (!!token) {
			///Authinticate user
			db.user.authUser(token).then(function (response) {
				if (response != '' && response != null) {

					var sql = "select profilepic from user where userID='" + userid + "'";



					db.user.getUsername(sql).then(function (response) {
						if (response != '' && response != null) {

							data["error"] = 0;
							data["authResponse"] = "Action Successful";
							data['Data'] = response;
						} else {
							data["error"] = 1;
							data["authResponse"] = "Action Successful";
							data['Data'] = "Authntication code not validated";

						}

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
			}).error(function (err) {
				res.json(err);
			});
		} else {
			data["error"] = 1;
			data["authResponse"] = "Please provide all required data (i.e : token etc)";
			res.json(data);
			//connection.end()
		}
	} catch (ex) {
		console.log(ex);
	}

	return res;
};


exports.getUserAppointment = function (req, res) {

	var userid = req.query.userid;
	var token = req.query.token;

	console.log("getUserAppointment -> userid : ", userid);
	console.log("req.query : ", req.query);

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function (response) {
			if (response != '' && response != null) {
				var email = response;

				///Get user info
				db.user.getUserAppointment(userid).then(function (response) {
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

//============================================Get user Quetionaire Data============================================/////////////////

exports.GetUserQuestionnaire = function (req, res) {
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

				db.userillness.getuserillness(userid).then(function (response) {
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

function getOperatorUUID(operatorid, length, data, output) {
	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: "chat.umchtech.com",
		user: "umch",
		password: "umch!@#$",
		database: "ppmessage"
	});

	connection.connect();

	var user_name = "'" + operatorid + "'";

	connection.query("SELECT * FROM `device_users` WHERE user_name = " + user_name + "", function (error, results, fields) {
		if (error) throw error;

		// console.log('The device uuid is: ', results[0].uuid);
		// output(results[0].uuid);
		// return results[0].uuid;
		data[results[0].uuid] = {};
		output(data, length);

	});

	connection.end();
}

///===========================================Get User Chat List ==============================================///////////////////////
exports.GetChatPartners = function (req, res) {
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

				db.userillness.getProfessionalList(userid).then(function (response) {

					var output = JSON.parse("{}");

					if (response.length == 0) {
						var key = "5cebae78-29d8-11e7-9f68-82f2b4d1d44d"; //chief support

						output[key] = {};

						data["error"] = 0;
						data["authResponse"] = "Action Successful";
						data['Data'] = JSON.stringify(output);
						res.json(data);
					}

					for (var i = 0; i < response.length; i++) {

						var operatorid = response[i].operatorid;

						var uuid = getOperatorUUID(operatorid, response.length, output, function (dt, length) {

							var size = Object.keys(dt).length;
							// console.log('length: ', size);

							if (size == length) {
								// console.log('The data return is: ', data);
								var key = "5cebae78-29d8-11e7-9f68-82f2b4d1d44d"; //chief support

								output[key] = {};

								data["error"] = 0;
								data["authResponse"] = "Action Successful";
								data['Data'] = JSON.stringify(output);
								res.json(data);
							}

						});

					} //Get Professional

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

///===========================================Get Chat User Information==============================================///////////////////////
exports.GetChatUser = function (req, res) {
	var userid = req.query.userid;
	var token = req.query.token;
	var username = req.query.username;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function (response) {
			if (response != '' && response != null) {

				var myusername = "'" + response[0].username + "'";

				var mysql = require('mysql');
				var connection = mysql.createConnection({
					host: "chat.umchtech.com",
					user: "umch",
					password: "umch!@#$",
					database: "ppmessage"
				});

				connection.connect();

				var user_name = "'" + username + "'";

				// connection.query("SELECT user_name, uuid FROM `device_users` WHERE user_name = " + user_name + "", function(error, results, fields) {
				// 	if (error) throw error;
				//
				// 	data["error"] = 0;
				// 	data["authResponse"] = "Action Successful";
				// 	data['Data'] = results;
				// 	res.json(data);
				//
				// });

				connection.query("SELECT user_name, uuid from device_users WHERE user_name = " + user_name + " AND (SELECT COUNT(*) FROM `conversation_infos` JOIN device_users ON conversation_infos.assigned_uuid = device_users.uuid OR conversation_infos.user_uuid = device_users.uuid WHERE device_users.user_name = " + myusername + " AND (conversation_infos.assigned_uuid = (SELECT uuid from device_users WHERE user_name = " + user_name + ") OR conversation_infos.user_uuid = (SELECT uuid from device_users WHERE user_name = " + user_name + "))) < 1", function (error, results, fields) {
					if (error) throw error;

					data["error"] = 0;
					data["authResponse"] = "Action Successful";
					data['Data'] = results;
					res.json(data);

				});

				connection.end();

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

///===========================================Send Email to Patient=============================================//////////////////////
exports.addnewPatientByDoctor = function (req, res) {

	var email = req.body.email;
	var code = randtoken.generate(12);
	var professionalID = req.body.professionalID;
	var emailSentDatTime = req.body.emailSentDatTime;

	var phone = req.body.phone;

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
							from: "CHIEF", // sender address.  Must be the same as authenticated user if using GMail.
							to: email, // receiver
							subject: "Invitation For Patient Monitoring From " + doctor_name, // subject
							html: "Hi " + name + "<br>This is invitation for patient monitoring on behalf of " + doctor_name + ". <br><br><b>Follow The Link To Complete Registration Process</b><br><br><strong>Url: <a href=" + url + ">Click Here</a></strong><br><strong>Authentication Code:</strong>" + code + "<br><br>Best Regards <br>UMCH Support" // body
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

						res.json(data)
					})
						.error(function (err) {
							res.json(err);
						});


					/***************
					 **End Create user status with doctor
					 ****************/
					//console.log(name+"------------"+email+"-----------------"+userID+"================="+token);



				} else {

					var name = req.body.name;

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
							from: "CHIEF", // sender address.  Must be the same as authenticated user if using GMail.
							to: email, // receiver
							subject: "Invitation For Patient Monitoring From " + doctor_name, // subject
							html: "Hi <br>This is invitation for patient monitoring on behalf of " + doctor_name + ". <br><br><b>Follow The Link To Complete Registration Process</b><br><br><strong>Url: <a href=" + url + ">Click Here</a></strong><br><strong>Authentication Code:</strong>" + code + "<br><br>Best Regards <br>CHIEF Support" // body
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

						res.json(data)
					})
						.error(function (err) {
							res.json(err);
						});


					/***************
					 **End Create user status with doctor
					 ****************/

				}
			})
				.error(function (err) {
					res.json(err);
				});

		}).error(function (err) {
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

//============================================Add Card Managment For Mobile============================================/////////////////
exports.addCardManagment = function (req, res) {
	var userid = req.body.userid;
	var token = req.body.token;
	var data1 = req.body.data;
	data1 = JSON.parse(data1);
	var total = data1.length;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function (response) {
		if (!!token) {
			if (response != '' && response != null) {

				/////////Delete Extra card Managment settings///////////

				////////End Delete Card Management settings ///////////

				var sql = "INSERT INTO cardManagment (userID, name, status) values ";

				for (var i = 0; i < total - 1; i++) {
					var name = data1[i].name;
					var status = data1[i].status;
					var userid = data1[i].userID;

					sql += "('" + userid + "','" + name + "','" + status + "'),";

					sql = sql.substr(0, sql.length);
				}
				var name = data1[i].name;
				var status = data1[i].status;
				var userid = data1[i].userID;
				sql += "('" + userid + "','" + name + "','" + status + "')";
				deleteCardManagement(userid);
				console.log(sql);
				db.user.addCardManagment(sql).then(function (response) {

					data["error"] = 0;
					data["authResponse"] = "Card Managment Added Successfully";
					res.json(data);

				}).error(function (err) {
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
		.error(function (err) {
			res.json(err);
		});



	return res;
};


function deleteCardManagement(userid) {

	db.user.deleteUserCardManagement(userid).then(function (response) {

		console.log('Deleted');
	});

};

///////////////========================Get App Card managment Data=================================================/////////////////

exports.getUser_CardManagement = function (req, res) {
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

				db.user.getUser_CardManagement(userid).then(function (response) {
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



//============================================App Add Card Managment For Mobile============================================/////////////////
exports.app_addCardManagment = function (req, res) {
	var userid = req.body.userid;
	var token = req.body.token;
	var data1 = req.body.data;
	data1 = JSON.parse(data1);
	var total = data1.length;
	var data = {
		"error": 0,
		"authResponse": ""
	}


	db.user.authUser(token).then(function (response) {
		if (!!token) {
			if (response != '' && response != null) {

				var sql = '';

				for (var i = 0; i < total - 1; i++) {
					var enable = data1[i].enable;
					var activity = data1[i].activity;
					var position = data1[i].position;
					check_card_management(userid, enable, activity, position);
					// console.log(userid+enable+activity+position+'=======================================> '+i);
				}

				var enable = data1[total - 1].enable;
				var activity = data1[total - 1].activity;
				var position = data1[total - 1].position;
				check_card_management(userid, enable, activity, position);
				// console.log(userid+enable+activity+position+'=======================================> Outside loop');
				// check if previous record found
				//  db.user.checkUserCurrentCardManagement(userid , position).then(function(response) { 

				//                  if (response != '' && response != null) {

				//                      update_app_card_managment(userid, enable , activity , position , response[0].id);
				//                  }
				//                  else 
				//                  {
				//                     add_app_card_managment(userid, enable , activity , position); 
				//                  }

				// }).error(function(err) {
				// 	res.json(err);
				// });

				data["error"] = 0;
				data["authResponse"] = "Action Done with success.";
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


function check_card_management(userid, enable, activity, position) {

	db.user.checkUserCurrentCardManagement(userid, position).then(function (response) {
		if (response != '' && response != null) {

			//console.log(userid+enable+activity+position+'=======================================> UPDATE');
			update_app_card_managment(userid, enable, activity, position, response[0].id);

		} else {
			//console.log(userid+enable+activity+position+'=======================================> INSERT');
			add_app_card_managment(userid, enable, activity, position);
			//    enable='';activity='';position=''; 
		}

	}).error(function (err) {
		res.json(err);
	});

}

function add_app_card_managment(userid, enable, activity, position) {

	var sql = "INSERT INTO cardmanagement_app (userID, enable, activity , position) values ";
	sql += "('" + userid + "','" + enable + "','" + activity + "','" + position + "')";
	db.user.addCardManagment(sql).then(function (response) {

	}).error(function (err) {
		res.json(err);
	});
}

function update_app_card_managment(userid, enable, activity, position, id) {

	if (id != '' && id != null) {

		var sql = "UPDATE cardmanagement_app SET enable='" + enable + "' , activity='" + activity + "' , position='" + position + "'  WHERE id='" + id + "' ";

		db.user.update_CardManagment(sql).then(function (response) {

		}).error(function (err) {
			res.json(err);
		});

	}
}

//============================================Add user group reading============================================/////////////////
exports.addEtiqaUserMobile = function (req, res) {
	var userid = req.body.userid;
	var token = req.body.token;
	var data1 = req.body.data;
	data1 = JSON.parse(data1);
	var total = data1.length;
	var data = {
		"error": 0,
		"authResponse": ""
	}



	db.user.authUser(token).then(function (response) {
		if (!!token) {
			if (response != '' && response != null) {

				var email = response;

				var sqlDelete = "";
				var array_dateTime = '';
				var sql = `INSERT INTO etiqa_users_mobile (userid, pfid, weightQty, boneDensityQty, 
					            waterDensityQty, visceralFatQty, muscleQty, bmrQty, metabolicage, fatQty, height, gender, birthdate , recordDateTime) values `;

				for (var i = 0; i < total - 1; i++) {
					var pfid = data1[i].pfid;
					var weightQty = data1[i].weightQty;
					var boneDensityQty = data1[i].boneDensityQty;
					var waterDensityQty = data1[i].waterDensityQty;
					var visceralFatQty = data1[i].visceralFatQty;
					var muscleQty = data1[i].muscleQty;
					var bmrQty = data1[i].bmrQty;
					var metabolicage = data1[i].metabolicage;
					var fatQty = data1[i].fatQty;
					var height = data1[i].height;
					var gender = data1[i].gender;
					var birthdate = data1[i].birthdate;
					var recordDateTime = data1[i].recordDateTime;


					sql += `('` + userid + `','` + pfid + `','` + weightQty + `','` + boneDensityQty + `','` + waterDensityQty + `','` + visceralFatQty + `'
						,'` + muscleQty + `','` + bmrQty + `','` + metabolicage + `','` + fatQty + `','` + height + `','` + gender + `','` + birthdate + `','` + recordDateTime + `'),`;

					sql = sql.substr(0, sql.length);
				}

				var pfid = data1[total - 1].pfid;
				var weightQty = data1[total - 1].weightQty;
				var boneDensityQty = data1[total - 1].boneDensityQty;
				var waterDensityQty = data1[total - 1].waterDensityQty;
				var visceralFatQty = data1[total - 1].visceralFatQty;
				var muscleQty = data1[total - 1].muscleQty;
				var bmrQty = data1[total - 1].bmrQty;
				var metabolicage = data1[total - 1].metabolicage;
				var fatQty = data1[total - 1].fatQty;
				var height = data1[total - 1].height;
				var gender = data1[total - 1].gender;
				var birthdate = data1[total - 1].birthdate;
				var recordDateTime = data1[i].recordDateTime;

				sql += `('` + userid + `','` + pfid + `','` + weightQty + `','` + boneDensityQty + `','` + waterDensityQty + `','` + visceralFatQty + `'
						,'` + muscleQty + `','` + bmrQty + `','` + metabolicage + `','` + fatQty + `','` + height + `','` + gender + `','` + birthdate + `','` + recordDateTime + `')`;


				db.user.addUser_Etiqa_mobile(sql).then(function (response) {

					data["error"] = 0;
					data["authResponse"] = "Etiqa User Details Added Successfully";
					res.json(data);

				}).error(function (err) {
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
		.error(function (err) {
			res.json(err);
		});

	return res;
};


//============================================Add user bp reading============================================/////////////////
exports.addEtiqaUserMobileBP = function (req, res) {
	var userid = req.body.userid;
	var token = req.body.token;
	var data1 = req.body.data;
	data1 = JSON.parse(data1);
	var total = data1.length;
	var data = {
		"error": 0,
		"authResponse": ""
	}

	db.user.authUser(token).then(function (response) {
		if (!!token) {
			if (response != '' && response != null) {

				var email = response;

				var sqlDelete = "";
				var array_dateTime = '';
				var sql = `INSERT INTO etiqa_users_mobile_bp (userid, empid, pf_no, systolic, diastolic , pulserate, notes, recordDateTime) values `;

				for (var i = 0; i < total - 1; i++) {
					var empid = data1[i].empid;
					var pf_no = data1[i].pf_no;
					var systolic = data1[i].systolic;
					var diastolic = data1[i].diastolic;
					var pulserate = data1[i].pulserate;
					var notes = data1[i].notes;
					var recordDateTime = data1[i].recordDateTime;



					sql += `('` + userid + `','` + empid + `','` + pf_no + `','` + systolic + `','` + diastolic + `','` + pulserate + `'
						,'` + notes + `','` + recordDateTime + `'),`;

					sql = sql.substr(0, sql.length);
				}

				//var pfid = data1[total - 1].pfid;
				var empid = data1[total - 1].empid;
				var pf_no = data1[total - 1].pf_no;
				var systolic = data1[total - 1].systolic;
				var diastolic = data1[total - 1].diastolic;
				var pulserate = data1[total - 1].pulserate;
				var notes = data1[total - 1].notes;
				var recordDateTime = data1[total - 1].recordDateTime;


				sql += `('` + userid + `','` + empid + `','` + pf_no + `','` + systolic + `','` + diastolic + `','` + pulserate + `'
						,'` + notes + `','` + recordDateTime + `')`;


				db.user.addUser_Etiqa_mobile(sql).then(function (response) {

					data["error"] = 0;
					data["authResponse"] = "Etiqa User Blood Pressure Details Added Successfully";
					res.json(data);

				}).error(function (err) {
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
		.error(function (err) {
			res.json(err);
		});



	return res;
};

///////////////========================Get BMR Data=================================================/////////////////

exports.getUser_Etiqa_mobile = function (req, res) {
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
				var email = response;
				//res.json(email);
				///Get user info
				db.user.getUser_Etiqa_mobile(userid).then(function (response) {
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

//============================================Get Companies List============================================/////////////////

exports.get_companies_list = function (req, res) {
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
				var email = response;
				userid = response[0].userID;

				db.user.get_companies_list().then(function (response) {
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

	}

	return res;
};

//============================================Get User register company manager Company name============================================/////////////////
exports.get_user_companies_list = function (req, res) {
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
				// userid = response[0].userID;

				db.user.get_user_companie_name(userid).then(function (response) {
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

	}

	return res;
};
//============================================Add user Device Parameters============================================/////////////////
exports.adduserDeviceParameters = function (req, res) {
	var userid = req.body.userid;
	var token = req.body.token;
	var data1 = req.body.data;
	data1 = JSON.parse(data1);
	var total = data1.length;
	var data = {
		"error": 0,
		"authResponse": ""
	}



	db.user.authUser(token).then(function (response) {
		if (!!token) {
			if (response != '' && response != null) {

				var email = response;

				var sql = `INSERT INTO userDeviceParameters (deviceid, userid, devicetypeid, deviceuuid, 
					            firstpairingtime, devicename, devicebond, devicebletype, devicestatus, devicesettingsstatus, lastsynchtime) values `;

				for (var i = 0; i < total - 1; i++) {
					var deviceid = data1[i].deviceid;
					var devicetypeid = data1[i].devicetypeid;
					var deviceuuid = data1[i].deviceuuid;
					var firstpairingtime = data1[i].firstpairingtime;
					var devicename = data1[i].devicename;
					var devicebond = data1[i].devicebond;
					var devicebletype = data1[i].devicebletype;
					var devicestatus = data1[i].devicestatus;
					var devicesettingsstatus = data1[i].devicesettingsstatus;
					var lastsynchtime = data1[i].lastsynchtime;


					sql += `('` + deviceid + `','` + userid + `','` + devicetypeid + `','` + deviceuuid + `','` + firstpairingtime + `','` + devicename + `'
						,'` + devicebond + `','` + devicebletype + `','` + devicestatus + `','` + devicesettingsstatus + `','` + lastsynchtime + `'),`;

					sql = sql.substr(0, sql.length);
				}

				///var pfid = data1[total - 1].pfid;
				var deviceid = data1[total - 1].deviceid;
				var devicetypeid = data1[total - 1].devicetypeid;
				var deviceuuid = data1[total - 1].deviceuuid;
				var firstpairingtime = data1[total - 1].firstpairingtime;
				var devicename = data1[total - 1].devicename;
				var devicebond = data1[total - 1].devicebond;
				var devicebletype = data1[total - 1].devicebletype;
				var devicestatus = data1[total - 1].devicestatus;
				var devicesettingsstatus = data1[total - 1].devicesettingsstatus;
				var lastsynchtime = data1[total - 1].lastsynchtime;

				sql += `('` + deviceid + `','` + userid + `','` + devicetypeid + `','` + deviceuuid + `','` + firstpairingtime + `','` + devicename + `'
						,'` + devicebond + `','` + devicebletype + `','` + devicestatus + `','` + devicesettingsstatus + `','` + lastsynchtime + `')`;


				db.user.addUser_Etiqa_mobile(sql).then(function (response) {

					var lastinsertid = response;

					db.user.lastaddIDsUserDeviceParameters(lastinsertid).then(function (response) {

						data["error"] = 0;
						data["authResponse"] = "User Parameters Added Successfully";
						data["id"] = response;
						/****
						 ** Send Bp alert
						 ***********/
						//post_bp_alert(response);
						////remove_duplicate_bp();

						res.json(data);
					}).error(function (err) {
						res.json(err);
					});

					// data["error"] = 0;
					// data["authResponse"] = "User Parameters Added Successfully";
					// res.json(data);

				}).error(function (err) {
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
		.error(function (err) {
			res.json(err);
		});



	return res;
};

/************************************************** Get user device parameters **********************************************************/
exports.get_user_device_parameters = function (req, res) {
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
				// userid = response[0].userID;

				db.user.get_user_parameter_settings(userid).then(function (response) {
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

	}

	return res;
};

/************************************************* Delete User Device parameters ****************************************************************/
exports.deleteUserDeviceParameters = function (req, res) {
	var userid = req.body.userid;
	var token = req.body.token;
	var data1 = req.body.data;
	data1 = JSON.parse(data1);
	var total = data1.length;
	var data = {
		"error": 0,
		"authResponse": ""
	}



	db.user.authUser(token).then(function (response) {
		if (!!token) {
			if (response != '' && response != null) {

				var email = response;
				var id_array = [];
				var sql = `Delete from userDeviceParameters where id in `;

				for (var i = 0; i < total - 1; i++) {
					var id = data1[i].id;
					id_array.push(id);
				}


				var id = data1[total - 1].id;
				id_array.push(id);
				id_array = id_array.join();

				sql += `( ` + id_array + ` )`;

				db.user.deleteUserDeviceParameter(sql).then(function (response) {

					data["error"] = 0;
					data["authResponse"] = "User Parameters Deleted Successfully";
					res.json(data);

				}).error(function (err) {
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
		.error(function (err) {
			res.json(err);
		});



	return res;
};

/************************************************* Update User Password ****************************************************************/
exports.updateUserPassword = function (req, res) {
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



	db.user.authUser(token).then(function (response) {
		if (!!token) {
			if (response != '' && response != null) {

				var oldpassword = data1[total - 1].oldpassword;
				var newpassword = data1[total - 1].newpassword;
				var confirmpassword = data1[total - 1].confirmpassword;


				if (typeof oldpassword === 'undefined' || oldpassword == '') ////Old Password checking
				{

					data = {
						"error": 1,
						"authResponse": "Old Password Required ."
					}
					res.json(data);
					return false;
				}

				if (typeof newpassword === 'undefined' || newpassword == '') ////Old Password checking
				{

					data = {
						"error": 1,
						"authResponse": "New Password Required ."
					}
					res.json(data);
					return false;
				}

				if (typeof confirmpassword === 'undefined' || confirmpassword == '') ////Old Password checking
				{

					data = {
						"error": 1,
						"authResponse": "Confirm Password Required ."
					}
					res.json(data);
					return false;
				}


				if (newpassword == confirmpassword) { //process update password
					////console.log(newpassword+'-------------'+confirmpassword+'---------'+userid);

					newpassword = md5(newpassword);

					var sql = "UPDATE user SET password='" + newpassword + "' WHERE userID=" + userid + " ";

					db.user.update_CardManagment(sql).then(function (response) {

						data["error"] = 0;
						data["authResponse"] = "User Password Updated Successfully";
						res.json(data);

					}).error(function (err) {
						res.json(err);
					});

				} else {

					data = {
						"error": 1,
						"authResponse": "New Password and Confirm Password Mismatch ."
					}
					res.json(data);
					return false;

				}

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


//------------------- Update User Field ------------------------------------------//
exports.updateUserField = function (req, res) {
	console.log(req.body);
	var verify_email = req.body.verify_email;
	var verify_password = req.body.verify_password;
	var user_email = req.body.user_email;
	var field_name = req.body.field_name;
	var field_value = req.body.field_value;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (verify_email == '' || verify_email == null || verify_password == '' || verify_password == null) {
		data = {
			"error": 1,
			"authResponse": "Email Or Password Is Empty ."
		}
		res.json(data);
	} else if (typeof field_name === 'undefined' || field_name == '') {

		data = {
			"error": 1,
			"authResponse": "Field_name Is Empty ."
		}
		res.json(data);
	} else if (typeof field_value === 'undefined' || field_value == '') {

		data = {
			"error": 1,
			"authResponse": "Field_name Is Empty ."
		}
		res.json(data);
	} else if (typeof user_email === 'undefined' || user_email == '') {

		data = {
			"error": 1,
			"authResponse": "User Email Is Empty Or UnDefined ."
		}
		res.json(data);

	} else if (verify_email != 'ppum@gmail.com' && verify_password != 'ppum123') {
		data = {
			"error": 1,
			"authResponse": "Authentication Failure Email And Password Does Not Match ."
		}
		res.json(data);

	} else {

		var sql = "UPDATE user SET " + field_name + "='" + field_value + "' WHERE username='" + user_email + "'";
		console.log(sql);
		db.user.updateFieldNames(sql).then(function (response) {

			data["error"] = 0;
			data["authResponse"] = "User Profile Field " + field_name + " updated successfully ";
			res.json(data);

		}).error(function (err) {
			res.json(err);
		});
	}

	return res;
};

//=============================== PPUM Register Appointment client(PPUM) ===================================//
// cy added 18 May 2020
exports.regApptPPUM = function (req, res) {
	console.log("regApptPPUM function accessed");
	console.log(req.body);

	//parameter for hospital varification PPUM
	/*1*/
	var verify_email = req.body.verify_email;
	/*2*/
	var verify_password = req.body.verify_password;

	//parameter for user varification 
	/*3*/
	var doctor_email = req.body.doctor_email;
	/*4*/
	var patient_email = req.body.patient_email;

	// parameter for appointment Registration
	/*5*/
	var appointmentDate = req.body.appointmentDate;
	/*6*/
	var appointmentTime = req.body.appointmentTime;
	/*7*/
	var appointmentType = req.body.appointmentType;
	/*8*/
	var slotTime = req.body.slotTime;
	/*9*/
	var note = req.body.Note;


	//parameter for error response
	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (verify_email == '' || verify_email == null || verify_password == '' || verify_password == null) {
		data = {
			"error": 1,
			"authResponse": "Email Or Password Is Not Valid or Empty ."
		}
		res.json(data);
	} else if (typeof doctor_email === 'undefined' || doctor_email == '') {

		data = {
			"error": 1,
			"authResponse": "Doctor Email Is Not Valid or Empty ."
		}
		res.json(data);

	} else if (typeof patient_email === 'undefined' || patient_email == '') {
		data = {
			"error": 1,
			"authResponse": "Patient Email Is Not Valid or Empty ."
		}
		res.json(data);


	} else if (verify_email != 'ummc@umchtech.com' && verify_password != 'WeHealth123') {
		data = {
			"error": 1,
			"authResponse": "Authentication Failure Email And Password Does Not Match ."
		}
		res.json(data);
	} else if (typeof appointmentTime == 'undefined' || appointmentTime == "") {
		data = {
			"error": 1,
			"authResponse": "Patient Email Is Not Valid or Empty."
		}
		res.json(data);

	} else if (typeof appointmentDate == 'undefined' || appointmentDate == "") {
		data = {
			"error": 1,
			"authResponse": "appointmentDate Is Not Valid or Empty ."
		}
		res.json(data);
	} else if (appointmentType > 1) {
		data = {
			"error": 1,
			"authResponse": "appointmentType Is incorrect ."
		}
		res.json(data);
	} else {

		var getPatientID = "SELECT userID, firstname, lastname from user where username ='" + patient_email + "'";
		console.log(getPatientID);
		db.user.getUserID(getPatientID).then(function (response) {
			if (response != '' && response != null) {

				var patientID = response[0].userID;
				var firstname = response[0].firstname;
				var lastname = response[0].lastname;
				var date = new Date();

				//	var Title = "Appointment with "+firstName+" "+lastName+" scheduled at "+appointmentTime;
				if (appointmentType == 0) {
					var Title = "PPUM Appointment with " + firstname + " " + lastname + " scheduled at " + appointmentTime;
				} else {
					var Title = "PPUM Tele-Consultation with " + firstname + " " + lastname + " scheduled at " + appointmentTime;
				}
				console.log(Title);

				//}

				var getDoctorID = "SELECT userID from user where username ='" + doctor_email + "'";
				console.log(getDoctorID);
				db.user.getUserID(getDoctorID).then(function (response) {

					if (response != '' && response != null) {

						var doctorID = response[0].userID;



						var sql_n1 = "INSERT INTO userProfessionalAppointment(userID,professionalID,appointmentDate,appointmentTime,Title,note,appointmentType,slotTime,status) values ('" + patientID + "','" + doctorID + "','" + appointmentDate + "','" + appointmentTime + "','" + Title + "','" + note + "','" + appointmentType + "','" + slotTime + "','0')";
						console.log(sql_n1);
						db.user.addUserProfessionalAppointment(sql_n1).then(function (result) {

							data["error"] = 0;
							//data["Data"] = result;
							data["authResponse"] = "Appointment added Successfully";
							res.json(data);

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

							var dateime = year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

							var sql_notification = "INSERT INTO notification(fromUserID,toUserID,subject, details,insertionDateTime) values ('" + patientID + "','" + doctorID + "','" + "Appointment Booking" + "','" + firstname + " " + lastname + " is requesting to book an appointment on " + appointmentDate + ", " + appointmentTime + ", Notes: " + note + ". Please confirm the appointment in the Doctor Portal.','" + dateime + "')";
							console.log(sql_notification);
							db.user.addNextOfKin(sql_notification).then(function (response) {

								data["error"] = 0;
								//data["Data"] = result;
								data["authResponse"] = "User notification added Successfully";
								res.json(data);

							}).error(function (err) {
								data["error"] = 1;
								data["authResponse"] = "Add Notification failed ";
								res.json(data);
								//res.json(err);
							});

						}).error(function (err) {
							//data["error"] = err;
							//data["authResponse"] = "add user professional appointment failed ";
							//res.json(data);
							res.json(err);
						});
					} else {
						data = {
							"error": 1,
							"authResponse": "Doctor Email Is Not Valid or Empty ."
						}
					}
				}).error(function (err) {
					//data["error"] = err;
					//data["authResponse"] = "retieve Patient id fail failed ";
					//res.json(data);
					res.json(err);
				});
			} else {
				data = {
					"error": 1,
					"authResponse": "Patient Email Is Not Valid or Empty ."
				}
				res.json(data);
			}
		}).error(function (err) {
			//data["error"] = err;
			//data["authResponse"] = "retieve doctor id fail failed ";
			//res.json(data);
			res.json(err);
		});
	}

	return res;
};

//=============================== PPUM APPROVE Appointment client(PPUM) ===================================//
// cy added 19 May 2020
exports.approveApptPPUM = function (req, res) {
	console.log(req.body);

	//parameter for hospital varification PPUM
	/*1*/
	var verify_email = req.body.verify_email;
	/*2*/
	var verify_password = req.body.verify_password;

	//parameter for user varification 
	/*3*/
	var doctor_email = req.body.doctor_email;
	/*4*/
	var patient_email = req.body.patient_email;

	// parameter for appointment Registration
	/*5*/
	var appointmentDate = req.body.appointmentDate;
	/*6*/
	var appointmentTime = req.body.appointmentTime;

	/*hardcode*/
	var detail = "Your PPUM Tele-Consultation had been accepted";



	//parameter for error response
	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (verify_email == '' || verify_email == null || verify_password == '' || verify_password == null) {
		data = {
			"error": 1,
			"authResponse": "Email Or Password Is Not Valid or Empty."
		}
		res.json(data);
	} else if (typeof doctor_email === 'undefined' || doctor_email == '') {

		data = {
			"error": 1,
			"authResponse": "Doctor Email Is Not Valid or Empty."
		}
		res.json(data);
	} else if (typeof patient_email === 'undefined' || patient_email == '') {
		data = {
			"error": 1,
			"authResponse": "Patient Email Is Not Valid or Empty."
		}
		res.json(data);

	} else if (verify_email != 'ummc@umchtech.com' && verify_password != 'WeHealth123') {
		data = {
			"error": 1,
			"authResponse": "Authentication Failure Email And Password Does Not Match ."
		}
		res.json(data);
	} else if (typeof appointmentTime == 'undefined' || appointmentTime == "") {
		data = {
			"error": 1,
			"authResponse": "appointmentTime Is Not Valid or Empty. ."
		}
		res.json(data);

	} else if (typeof appointmentDate == 'undefined' || appointmentDate == "") {
		data = {
			"error": 1,
			"authResponse": "appointmentDate Is Not Valid or Empty. ."
		}
		res.json(data);
	} else {
		var getPatientID = "SELECT userID, firstname, lastname from user where username ='" + patient_email + "'";
		console.log(getPatientID);
		db.user.getUserID(getPatientID).then(function (response) {
			if (response != '' && response != null) {

				var patientID = response[0].userID;
				var firstname = response[0].firstname;
				var lastname = response[0].lastname;
				var date = new Date();





				var getDoctorID = "SELECT firstname, lastname, userID from user where username ='" + doctor_email + "'";
				console.log(getDoctorID);
				db.user.getUserID(getDoctorID).then(function (response) {

					if (response != '' && response != null) {

						var doctorID = response[0].userID;
						var drName = response[0].firstname + " " + response[0].lastname;
						var subject = "Appointment Accepted";
						var detail = firstname + " " + lastname + ", your PPUM appointment application had been accepted by " + drName;

						var sql_n1 = "UPDATE userProfessionalAppointment SET status = '2' WHERE(userID='" + patientID + "' and professionalID ='" + doctorID + "'and appointmentDate ='" + appointmentDate + "'and appointmentTime ='" + appointmentTime + "')";
						console.log(sql_n1);
						db.user.updateUserProfessionalAppointment(sql_n1).then(function (result) {

							data["error"] = 0;
							data["Data"] = result;
							data["authResponse"] = "Appointment added Successfully";
							res.json(data);


							var sql_notification = "INSERT INTO notification(toUserID,fromUserID,subject, details) values ('" + patientID + "','" + doctorID + "','" + subject + "','" + detail + "')";
							console.log(sql_notification);
							db.user.addNextOfKin(sql_notification).then(function (response) {

								data["error"] = 0;
								//data["Data"] = result;
								data["authResponse"] = "User notification added Successfully";
								res.json(data);

							}).error(function (err) {
								data["error"] = 1;
								data["authResponse"] = "Add Notification failed ";
								res.json(data);
								//res.json(err);
							});



						}).error(function (err) {
							data["error"] = err;
							data["authResponse"] = "Appointment Not Found";
							res.json(err);
						});
					} else {
						data = {
							"error": 1,
							"authResponse": "Doctor Email Is Not Valid or Empty."
						}
						res.json(data);
					}
				}).error(function (err) {
					data["error"] = err;
					data["authResponse"] = "Doctor Email Is Not Valid or Empty.";
					res.json(err);
				});
			} else {
				data = {
					"error": 1,
					"authResponse": "Patient Email Is Not Valid or Empty."
				}
				res.json(data);
			}
		}).error(function (err) {
			data["error"] = err;
			data["authResponse"] = "Patient Email Is Not Valid or Empty.";
			res.json(err);
		});
	}

	return res;
};

//=============================== PPUM Medical Notification client(PPUM) ===================================//
// cy added 20 May 2020
exports.medNotificationPPUM = function (req, res) {
	console.log(req.body);

	//parameter for hospital varification PPUM
	/*1*/
	var verify_email = req.body.verify_email;
	/*2*/
	var verify_password = req.body.verify_password;

	//parameter for user varification 
	/*3*/
	var doctor_email = req.body.doctor_email;
	/*4*/
	var patient_email = req.body.patient_email;
	console.log('typeof patient_email : ' + typeof patient_email);

	// parameter for appointment Registration
	/*5*/
	var subject = req.body.subject;
	/*6*/
	var details = req.body.details;


	//parameter for error response
	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (verify_email == '' || verify_email == null || verify_password == '' || verify_password == null) {
		data = {
			"error": 1,
			"authResponse": "Email Or Password Is Not Valid or Empty ."
		}
		res.json(data);
	} else if (typeof doctor_email === 'undefined' || doctor_email == '') {
		data = {
			"error": 1,
			"authResponse": "Doctor Email Is Not Valid or Empty ."
		}
		res.json(data);

	} else if (typeof patient_email === 'undefined' || patient_email == '') {
		data = {
			"error": 1,
			"authResponse": "Patient Email Is Not Valid or Empty ."
		}
		res.json(data);
	} else if (typeof subject === 'undefined' || subject == '') {
		data = {
			"error": 1,
			"authResponse": "Subject Is Not Valid or Empty ."
		}
		res.json(data);
	} else if (typeof details === 'undefined' || details == '') {
		data = {
			"error": 1,
			"authResponse": "Details Is Not Valid or Empty ."
		}
		res.json(data);

	} else if (verify_email != 'ummc@umchtech.com' && verify_password != 'WeHealth123') {
		data = {
			"error": 1,
			"authResponse": "Authentication Failure Email And Password Does Not Match ."
		}
		res.json(data);
	} else {
		var getPatientID = "SELECT userID, firstname, lastname from user where username ='" + patient_email + "'";
		console.log(getPatientID);
		db.user.getUserID(getPatientID).then(function (response) {
			if (response != '' && response != null) {

				var patientID = response[0].userID;
				//}

				var getDoctorID = "SELECT firstname, lastname, userID from user where username ='" + doctor_email + "'";
				console.log(getDoctorID);
				db.user.getUserID(getDoctorID).then(function (response) {

					if (response != '' && response != null) {

						var doctorID = response[0].userID;
						//}
						var sql_notification = "INSERT INTO notification(toUserID,fromUserID,subject, details) values ('" + patientID + "','" + doctorID + "','" + subject + "','" + details + "')";
						console.log(sql_notification);
						db.user.addNextOfKin(sql_notification).then(function (response) {

							data["error"] = 0;
							//data["Data"] = result;
							data["authResponse"] = "Notification added Successfully";
							res.json(data);

						}).error(function (err) {
							data["error"] = 1;
							data["authResponse"] = "Add Notification failed ";
							res.json(data);
							//res.json(err);
						});
					} else {
						data = {
							"error": 1,
							"authResponse": "Doctor Email is Not Valid or Empty."
						}
						res.json(data);
					}
				}).error(function (err) {
					data["error"] = err;
					data["authResponse"] = "Doctor Email is Not Valid or Empty.";
					res.json(err);
				});
			} else {
				data = {
					"error": 1,
					"authResponse": "Patient Email is Not Valid or Empty."
				}
				res.json(data);
			}
		}).error(function (err) {
			data["error"] = err;
			data["authResponse"] = "fPatient Email is Not Valid or Empty.";
			res.json(err);
		});
	}

	return res;
};

/************************************************** Get user device parameters **********************************************************/
exports.getNextOfKinGraph = function (req, res) {
	console.log(req.body);

	var userid = req.body.userid;
	var token = req.body.token;
	var data1 = JSON.parse(req.body.data);

	var startDate = data1[0].startDate;
	var endDate = data1[0].endDate;
	var graph = data1[0].graph;
	var username = data1[0].username;

	var sql = [];

	sql["bp"] = "SELECT * FROM bp WHERE userID='" + username + "' AND recordTime BETWEEN '" + startDate + " 00:00:00' AND '" + endDate + " 23:59:59' ORDER BY recordTime DESC LIMIT 25;";
	sql["oxygen"] = "select * FROM oxygen WHERE user='" + username + "'  AND insertDate BETWEEN '" + startDate + " 00:00:00' AND '" + endDate + " 23:59:59' ORDER BY recordDateTime ASC LIMIT 50;";
	sql["glucose"] = "SELECT * FROM glucose WHERE user = '" + username + "' AND insertDate BETWEEN '" + startDate + " 00:00:00' AND '" + endDate + " 23:59:59' ORDER BY recordDateTime ASC LIMIT 50;"
	sql["temperature"] = "SELECT * FROM temperature WHERE user= '" + username + "' AND insertDate BETWEEN '" + startDate + " 00:00:00' AND '" + endDate + " 23:59:59' order by recordDateTime desc limit 25;";


	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function (response) {
			if (response != '' && response != null) {
				// var email = response;
				// userid = response[0].userID; getQuery

				db.user.getQuery(sql[graph]).then(function (response) {
					data["error"] = 0;
					data["authResponse"] = "Action Successful";
					data['Data'] = response;
					res.json(data);

				}).error(function (err) {
					res.json(err);
				});

			} else {
				data["error"] = 1;
				data["authResponse"] = "Authentication Failed.";
				res.json(data);

			}
		}).error(function (err) {
			res.json(err);
		});
	} else {
		data["error"] = 1;
		data["authResponse"] = "Please provide all required data (i.e : token etc)";
		res.json(data);

	}

	return res;
};