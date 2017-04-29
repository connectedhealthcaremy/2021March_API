'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');
var FCM = require('fcm-node');
var config = require('../../config/config');
//============================================Add Notification============================================/////////////////
exports.addnotification = function(req, res) {

	var userid = req.body.userid;
	var token = req.body.token;

	var from = req.body.from;
	var to = req.body.to;
	var subject = req.body.subject;
	var details = req.body.details;

	var data = {
		"error": 0,
		"authResponse": "",
		"pushresponse": ""
	}



	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {
					var name = response[0].firstName + ' ' + response[0].lastName;

					var sql = "INSERT INTO notification (`fromUserID`, `toUserID`, `subject`, `details`) values ";
					sql += "('" + from + "','" + to + "','" + subject + "','" + details + "')";


					db.notification.addnotification(sql).then(function(response) {

						var lastid = response;
						/***************
						 **notification to mobile devices
						 ******************/

						var resf = sendAndroidNotification(to, name, subject, lastid);


						data["error"] = 0;
						data["authResponse"] = "Notification Sent Successfully";
						data["pushresponse"] = resf;
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


///////////==============================Send Push Notification To device androids===================================///////////////////






function sendAndroidNotification(userid, name, subject, lastid) {

	var data = {
		"error": 0,
		"authResponse": "",
		"push": ""
	}

	db.notificationDevices.getdevicebyuser(userid).then(function(response) {
			if (response != '' && response != null) {

			/*var pushtoken = response[0].deviceID;


				var SERVER_API_KEY='AAAANqHPTPA:APA91bEZgGvMJOjinwWqHNpdcfzaZFEf97CDRtK9-CkvuKU4-5wHb7uFkKxn5u9VNdEkm6-xpYjWpHz5P9U2MtRMDvpJ3f_ntMbzcJmszV9U1HJP26RXLvN--ZMokc82j6aV-PDnKshQdNMvq9_LzNTKb0i8j8P_jA';//put your api key here

				var validDeviceRegistrationToken = pushtoken; //put a valid device token here

				var fcmCli= new FCM(SERVER_API_KEY);

				var payloadOK = {
				to: validDeviceRegistrationToken,
				data: { //some data object (optional)
				url: "<a href='http://58.26.233.115/IDAS/portal/read-notification.php?nid=" + lastid + "'>" + subject + "</a>",
				//foo:'test',
				//bar:'check'
				},
				priority: 'high',
				content_available: true,
				notification: { //notification object
				title: name , body: "<a href='http://58.26.233.115/IDAS/portal/read-notification.php?nid=" + lastid + "'>" + subject + "</a>"
				}
				};


				//var callbackLog = function (sender, err, res) {
				console.log("\n__________________________________")
				console.log("\t"+"Send OK");
				console.log("----------------------------------")
				//console.log("err="+err);
				//console.log("res="+res);
				console.log("----------------------------------\n>>>");
				//};
*/
      data["error"] = 0;
				data["authResponse"] = "Action Successful";
				data['Data'] = response[0].deviceID;
				var pushtoken = response[0].deviceID;

var serverKey = 'AAAANqHPTPA:APA91bEZgGvMJOjinwWqHNpdcfzaZFEf97CDRtK9-CkvuKU4-5wHb7uFkKxn5u9VNdEkm6-xpYjWpHz5P9U2MtRMDvpJ3f_ntMbzcJmszV9U1HJP26RXLvN--ZMokc82j6aV-PDnKshQdNMvq9_LzNTKb0i8j8P_jA';
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

fcm.send(message, function(err, response){
    if (err) {
        console.log("Something has gone wrong------------------------------------------------------------------FCM------------------------------!"+pushtoken);
    } else {
        console.log("FCM-----------------------Successfully sent with response: "+pushtoken+'----------------', response);
    }
});




			} else {

				data['push'] = 'No Registered For Push Notification';
				return data;
			}

		})
		.error(function(err) {
			//res.json(err);
			data['push'] = err;
		});


	return data;
}


///////////////========================Get notification inbox=================================================/////////////////

exports.getnotificationinbox = function(req, res) {
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
					db.notification.getNotificationinbox(userid).then(function(response) {
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

///////////////========================Get more  notification inbox=================================================/////////////////

exports.loadmoregetNotificationinbox = function(req, res) {
	var userid = req.query.userid;
	var id = req.query.id;
	var token = req.query.token;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function(response) {
				if (response != '' && response != null) {
					db.notification.loadmoregetNotificationinbox(userid, id).then(function(response) {
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

///////////////========================Get more  notification Sent=================================================/////////////////

exports.loadmoregetNotificationsent = function(req, res) {
	var userid = req.query.userid;
	var id = req.query.id;
	var token = req.query.token;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function(response) {
				if (response != '' && response != null) {
					db.notification.loadmoregetNotificationsent(userid, id).then(function(response) {
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



///////////////========================Get notification sent=================================================/////////////////

exports.getnotificationsent = function(req, res) {
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

					db.notification.getNotificationsent(userid).then(function(response) {
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

///////////////========================Get notification Details=================================================/////////////////

exports.getNotificationinboxdetail = function(req, res) {

	var userid = req.query.nid;
	var token = req.query.token;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function(response) {
				if (response != '' && response != null) {
					var sql = "update notification set status='1' where  id=" + userid + "";

					db.notification.Updatenotification(sql).then(function(response) {

						db.notification.getNotificationinboxdetail(userid).then(function(response) {
								data["error"] = 0;
								data["authResponse"] = "Action Successful";
								data['Data'] = response;
								res.json(data);

							})
							.error(function(err) {
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


////////////////========================Read All Notifications inbox =================================================/////////////////
exports.readallnotificationsInbox = function(req, res) {

	var userid = req.body.userid;
	var token = req.body.token;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function(response) {
				if (response != '' && response != null) {

					var sql = "update notification set status='1' where  toUserID=" + userid + "";
					db.notification.Updatenotification(sql).then(function(response) {

							data["error"] = 0;
							data["authResponse"] = "Action Successful";
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



///////////////========================Count Unread Notification=================================================/////////////////
exports.getNotificationinboxcount = function(req, res) {

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

					db.notification.countUnreadNotification(userid).then(function(response) {
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

///////////////========================Count Unread Message=================================================/////////////////
exports.getMessagecount = function(req, res) {

        var userid = req.query.userid;
        var token = req.query.token;
				var operatorid = req.query.operatorid;

        var data = {
                "error": 0,
                "authResponse": ""
        }
        if (!!token) {
                ///Authinticate user
                db.user.authUser(token).then(function(response) {
                                if (response != '' && response != null) {


		var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : config.dbChat.host,
  user     : config.dbChat.username,
  password : config.dbChat.password,
  database : config.dbChat.name
});

connection.connect();

var user_name = "'drmoy@umchtech.com'";
user_name = "'"+operatorid+"'";

connection.query("SELECT COUNT(*) AS count FROM `message_push_tasks` LEFT JOIN `conversation_infos` ON message_push_tasks.conversation_uuid = conversation_infos.uuid LEFT JOIN `device_users` ON conversation_infos.assigned_uuid = device_users.uuid WHERE msg_read = 1 AND user_name = "+user_name+"", function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].count);

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


//////////////========================Read All Message=================================================/////////////////
exports.readAllMessages = function(req, res) {

        var userid = req.query.userid;
        var token = req.query.token;
				var operatorid = req.query.operatorid;

        var data = {
                "error": 0,
                "authResponse": ""
        }
        if (!!token) {
                ///Authinticate user
                db.user.authUser(token).then(function(response) {

                                if (response != '' && response != null) {


                var mysql      = require('mysql');
                var connection = mysql.createConnection({
                  host     : config.dbChat.host,
                  user     : config.dbChat.username,
                  password : config.dbChat.password,
                  database : config.dbChat.name
                  });

                  connection.connect();

                  var username = "'drmoy@umchtech.com'";
									username = "'"+operatorid+"'";
                  var uuid = "";

                  connection.query("SELECT * FROM device_users WHERE user_name = "+username+"",function(error,results,fields){
                    if(error) throw error;

                    uuid = results[0].uuid;
		    console.log('The uuid is: ', uuid);
//                    });

		   var queryString = "UPDATE message_push_tasks INNER JOIN `conversation_infos` ON message_push_tasks.conversation_uuid = conversation_infos.uuid SET msg_read = 0 WHERE message_push_tasks.msg_read = 1 AND conversation_infos.assigned_uuid ='"+uuid+"'";

		   console.log('the query is ',queryString);

                    connection.query(queryString,function(error,results,fields){

                    if (error) throw error;
                    console.log('The solution is: ', results);

                                                        data["error"] = 0;
                                                        data["authResponse"] = "Action Successful";
                                                        data['Data'] = results;
                                                        res.json(data);

                                                        });

			connection.end()
			});
			//connection.end();

                                                        } //response
                                                        else {
                                                            data["error"] = 1;
                                                            data["authResponse"] = "Please provide all required data (i.e : token etc)";
                                                            res.json(data);

                                                            return res;
                                                            }


                                                      }); //auth user
              }//token

          return res;
};
