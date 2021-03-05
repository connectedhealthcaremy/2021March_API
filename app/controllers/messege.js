'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');
var FCM = require('fcm-node');
var config = require('../../config/config');
//============================================Add message============================================/////////////////
exports.addmessage = function(req, res) {

	var userid = req.body.userid;
	var token = req.body.token;

	var from = req.body.from;
	var to = req.body.to;
	var subject = req.body.subject;
	var details = req.body.details;
        var insertionDateTime = req.body.insertionDateTime;

	var data = {
		"error": 0,
		"authResponse": "",
		"pushresponse": ""
	}



	db.user.authUser(token).then(function(response) {
			if (!!token) {
				if (response != '' && response != null) {
					var name = response[0].firstName + ' ' + response[0].lastName;

					var sql = "INSERT INTO message (`fromUserID`, `toUserID`, `subject`, `details`,`insertionDateTime`) values ";
					sql += "('" + from + "','" + to + "','" + subject + "','" + details + "','"+insertionDateTime+"')";


					db.message.addmessage(sql).then(function(response) {

						var lastid = response;
						/***************
						 **message to mobile devices
						 ******************/

						var resf = sendAndroidmessage(to, name, subject, details, lastid);


						data["error"] = 0;
						data["authResponse"] = "Message Sent Successfully";
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


///////////==============================Send Push message To device androids===================================///////////////////






function sendAndroidmessage(userid, name, subject, details, lastid) {

	var data = {
		"error": 0,
		"authResponse": "",
		"push": ""
	}

	db.notificationDevices.getdevicebyuser(userid).then(function(response) {
			if (response != '' && response != null) {

				data["error"] = 0;
				data["authResponse"] = "Action Successful";
				data['Data'] = response[0].deviceID;
			
				const pushtoken = response[0].deviceID;
				const API_ACCESS_KEY = 'AAAAU1x0kR8:APA91bGOPDzYS6-oopqvbZLBaswp8DL9pp7omDSmOgF8gqYkFbnruETU5n2xgS6U9L8Gut37DZ3O4GvSGbbqcbfwYOGjFqrBBno3wKIeUshaAlELVu_tYKNEAgYQVPYvdmpnGzYce6ix';
				const token = pushtoken; //"fZPKpoH1OEg:APA91bGeqDMcTjuAQPZ7goDTHBodvpwjNxOMvC--bQegMHmUVxY_NN4UI3GtGgUrMi761irAx7cMHK_lsHnk6uPGGAjJP4bjsOCbf1Olpr_LwF7yNFjI6TzDQwp5ftHt4QQZdTrFpkyk";
				
				const notification = {
					title : subject, //'WeHealth Notification',
					body : details, //'From Web NodeJS Code',
					icon :'myIcon', 
					sound : 'mySound'
				};
				
				const extraNotificationData = {
					message : notification, 
					moredata : 'dd'
				};
				
				const post_data = JSON.stringify({
					to : token, 
					notification : notification,
					data : extraNotificationData
				});
				
				
				const options = {
					hostname: 'fcm.googleapis.com',
					path: '/fcm/send',
					method: 'POST',
					headers: {
						Authorization : 'key=' + API_ACCESS_KEY,
						'Content-Type': 'application/json',
						'Content-Length': post_data.length
					}
				};
				
				//Make post request : Push Notification
				const https = require('https'); //native library
				
				const req = https.request(options, (res) => {
					let data = '';
				
					console.log('Status Code:', res.statusCode);
				
					res.on('data', (chunk) => {
						data += chunk;
					});
				
					res.on('end', () => {
						console.log('Body: ', JSON.parse(data));
					});
				
				}).on("error", (err) => {
					console.log("Error: ", err.message);
				});
				
				req.write(post_data);
				req.end();


			} else {

				data['push'] = 'No Registered For Push message';
				return data;
			}

		})
		.error(function(err) {
			//res.json(err);
			data['push'] = err;
		});


	return data;
}


///////////////========================Get message inbox=================================================/////////////////

exports.getMessageinbox = function(req, res) {
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
					db.message.getMessageinbox(userid).then(function(response) {
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

///////////////========================Get docotr list\=================================================/////////////////

exports.getDoctorList = function(req, res) {
	console.log("getDoctorList -> req.query : ", req.query);
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
					db.message.getDoctorList(userid).then(function(response) {
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

///////////////========================Get more  message inbox=================================================/////////////////

exports.loadmoregetmessageinbox = function(req, res) {
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
					db.message.loadmoregetmessageinbox(userid, id).then(function(response) {
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

///////////////========================Get more  message Sent=================================================/////////////////

exports.loadmoregetmessagesent = function(req, res) {
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
					db.message.loadmoregetmessagesent(userid, id).then(function(response) {
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



///////////////========================Get message sent=================================================/////////////////

exports.getmessagesent = function(req, res) {
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

					db.message.getmessagesent(userid).then(function(response) {
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

///////////////========================Get message Details=================================================/////////////////

exports.getmessageinboxdetail = function(req, res) {

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
					var sql = "update message set status='1' where  id=" + userid + "";

					db.message.Updatemessage(sql).then(function(response) {

						db.message.getmessageinboxdetail(userid).then(function(response) {
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

/////////////===========================Update delete message status ================================////////////////
exports.deletemessages = function(req, res) {

	var userid = req.body.userid;
	var token = req.body.token;
    var message_id = req.body.message_id;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function(response) {
				if (response != '' && response != null) {

					var sql = "update message set isdeleted='1' where  id=" + message_id + "";
					db.message.Updatemessage(sql).then(function(response) {

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


/////////////===========================Tag Important message status ================================////////////////
exports.importantmessages = function(req, res) {

	var userid = req.body.userid;
	var token = req.body.token;
    var message_id = req.body.message_id;
    var important = req.body.important;
	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function(response) {
				if (response != '' && response != null) {

					var sql = "update message set is_important='"+important+"' where  id=" + message_id + "";
				        console.log(sql);
					db.message.Updatemessage(sql).then(function(response) {

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



/////////////===========================Update message status ================================////////////////
exports.readmessages = function(req, res) {

	var userid = req.body.userid;
	var token = req.body.token;
    var message_id = req.body.message_id;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function(response) {
				if (response != '' && response != null) {

					var sql = "update message set status='1' where  id=" + message_id + "";
					db.message.Updatemessage(sql).then(function(response) {

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

////////////////========================Read All messages inbox =================================================/////////////////
exports.readallmessagesInbox = function(req, res) {

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

					var sql = "update message set status='1' where  toUserID=" + userid + "";
					db.message.Updatemessage(sql).then(function(response) {

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



///////////////========================Count Unread message=================================================/////////////////
exports.getmessageinboxcount = function(req, res) {

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

					db.message.countUnreadmessage(userid).then(function(response) {
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
    /*    if (!!token) {
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
*/
          res.json(data);
          return res;
};
