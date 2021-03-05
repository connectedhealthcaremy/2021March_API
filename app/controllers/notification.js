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

						var resf = sendAndroidNotification(to, name, subject, details, lastid);


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





exports.GetPersonalizednotification = function (req, res) {

    var userid = req.query.userid;
    var token = req.query.token;

    var data = {
        "error": 0,
        "authResponse": "",
        "pushresponse": ""
    }

    db.user.authUser(token).then(function (response) {
        if (!!token) {
            if (response != '' && response != null) {

                var sql = "select * from WeHealthDB.PersonalizedNotifications where  userid=" + userid + "";

                db.notification.getPersonalizedNotification(sql).then(function (response) {

                    data["error"] = 0;
                    data["authResponse"] = "Personalized notification Successfully";
                    data["pushresponse"] = response;
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
exports.addPersonalizedNotificationStatus = function (req, res) {

    var userid = req.body.userid;
    var token = req.body.token;
    var data1 = req.body.data;


    data1 = JSON.parse(data1);
    var total = data1.length;
    console.log(data1);


    var data = {
        "error": 0,
        "authResponse": "",
        "pushresponse": ""
    }

    db.user.authUser(token).then(function (response) {
        if (!!token) {
            if (response != '' && response != null) {
                var userid = data1[0].userid;
                var enable = data1[0].enable;
                var notificationType = data1[0].notificationtype;
                 var updatequery = "update PersonalizedNotificationStatus set userid='"+userid+"',notificationtype='"+notificationType+"',enable='"+enable+"' where notificationtype='"+notificationType+"'  and  userid='" + userid + "'"
                 var sql = "INSERT INTO PersonalizedNotificationStatus (`userid`, `notificationtype`, `enable`) values ";
                sql += "('" + userid + "','" + notificationType + "','" + enable + "')";
                  
                var selectQuery = "select * from PersonalizedNotificationStatus where notificationtype='"+notificationType+"'  and  userid='" + userid + "'";

                  db.notification.getPersonalizedNotificationStatus(selectQuery).then(function (response) {
                          if (response != '' && response != null) {
                           db.notification.Updatenotification(updatequery).then(function (response) {
                                    var lastid = response;
                                    data["error"] = 0;
                                    data["authResponse"] = "Personalized Notification Updated Successfully";
                                    res.json(data);

                                }).error(function (err) {
                                    res.json(err);
                                });

                       } else {


                            db.notification.addnotification(sql).then(function (response) {

				    var lastid = response;
				    data["error"] = 0;
				    data["authResponse"] = "Personalized Notification status added Successfully";
				    data["pushresponse"] = lastid;
				    res.json(data);

			    }).error(function (err) {
				    res.json(err);
			    });
                       }
                    

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
//Personalized Notification
exports.insertPersonalizednotification = function (req, res) {

    var userid = req.body.userid;
    var token = req.body.token;
    var data1 = req.body.data;


    data1 = JSON.parse(data1);
    var total = data1.length;
    console.log(data1);


    var data = {
        "error": 0,
        "authResponse": "",
        "pushresponse": ""
    }

    db.user.authUser(token).then(function (response) {
        if (!!token) {
            if (response != '' && response != null) {

                var userid = data1[0].userid;
                var notificationType = data1[0].notificationType;
                var message = data1[0].message;
                var serverid = data1[0].serverid;
                var datetime = data1[0].datetime;
                var repeatinterval = data1[0].repeatinterval;
                var enable  = data1[0].enable;

                var updatequery = "update PersonalizedNotifications set userid='"+userid+"',notificationType='"+notificationType+"',message='"+message+"',serverid='"+serverid+"', repeatinterval='"+repeatinterval+"', enable='"+enable+"' where datetime='"+datetime+"'  and  userid='" + userid + "' and notificationType='"+notificationType+"'";
                var sql = "INSERT INTO PersonalizedNotifications (`userid`, `notificationType`, `message`, `serverid`, `datetime`, `repeatinterval`, `enable`) values ";
                sql += "('" + userid + "','" + notificationType + "','" + message + "','" + serverid + "','" + datetime + "','" + repeatinterval + "','"+enable+"')";

                var selectQuery = "select * from PersonalizedNotifications where datetime='"+datetime+"'  and  userid='" + userid + "' and notificationType='"+notificationType+"'";

                db.notification.getPersonalizedNotification(selectQuery).then(function (response) {

                       if (response != '' && response != null) {
                           db.notification.Updatenotification(updatequery).then(function (response) {
                                    var lastid = response;
                                    data["error"] = 0;
                                    data["authResponse"] = "Personalized Notification Updated Successfully";
                                    res.json(data);

                                }).error(function (err) {
                                    res.json(err);
                                });

                       } else {


                            db.notification.addnotification(sql).then(function (response) {

				    var lastid = response;
				    data["error"] = 0;
				    data["authResponse"] = "Personalized Notification added Successfully";
				    data["pushresponse"] = lastid;
				    res.json(data);

			    }).error(function (err) {
				    res.json(err);
			    });
                       }
                   

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
//PErsonalized Notification
exports.getPersonalizedNotificationStatus = function (req, res) {

    var userid = req.query.userid;
    var token = req.query.token;

    var data = {
        "error": 0,
        "authResponse": "",
        "pushresponse": ""
    }

    db.user.authUser(token).then(function (response) {
        if (!!token) {
            if (response != '' && response != null) {

                var sql = "select * from WeHealthDB.PersonalizedNotificationStatus where  userid=" + userid + "";

                db.notification.getPersonalizedNotificationStatus(sql).then(function (response) {

                    data["error"] = 0;
                    data["authResponse"] = "Personalized notification status retrieved Successfully";
                    data["pushresponse"] = response;
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




function sendAndroidNotification(userid, name, subject, details, lastid) {

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


exports.getnotificationinboxApp = function(req, res) {
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
					db.notification.getNotificationinboxApp(userid).then(function(response) {
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

	var nid = req.query.nid;
	var token = req.query.token;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function(response) {
				if (response != '' && response != null) {
					var sql = "update notification set status='1' where  id=" + nid + "";

					db.notification.Updatenotification(sql).then(function(response) {

						db.notification.getNotificationinboxdetail(nid).then(function(response) {
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

///////////////========================Get notification Sent Details=================================================/////////////////
// cy added 15May2020
exports.getNotificationsentdetail = function(req, res) {

	var nid = req.query.nid;
	var token = req.query.token;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function(response) {
			if (response != '' && response != null) {
				//var sql = "update notification set status='1' where  id=" + nid + "";

				//db.notification.Updatenotification(sql).then(function(response) {

				db.notification.getNotificationinboxdetail(nid).then(function(response) {
					data["error"] = 0;
					data["authResponse"] = "Action Successful";
					data['Data'] = response;
					res.json(data);

				}).error(function(err) {
					res.json(err);
				});

				/*}).error(function(err) {
					res.json(err);
				});*/
			} else {
				data["error"] = 1;
				data["authResponse"] = "Authentication Failed.";
				res.json(data);
			}
		}).error(function(err) {
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

/////////////===========================Update delete notification status ================================////////////////
exports.deletenotifications = function(req, res) {

	var userid = req.body.userid;
	var token = req.body.token;
    var notification_id = req.body.notification_id;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function(response) {
				if (response != '' && response != null) {

					var sql = "update notification set isdeleted='1' where  id=" + notification_id + "";
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



/////////////===========================Update Is important notification status ================================////////////////
exports.isImportantNotifications = function(req, res) {

	var userid = req.body.userid;
	var token = req.body.token;
    var notification_id = req.body.notification_id;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function(response) {
				if (response != '' && response != null) {

					var sql = "update notification set is_important='1' where  id=" + notification_id + "";
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


/////////////===========================Update Is Not important notification status ================================////////////////
exports.isNotImportantNotifications = function(req, res) {

	var userid = req.body.userid;
	var token = req.body.token;
    var notification_id = req.body.notification_id;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function(response) {
				if (response != '' && response != null) {

					var sql = "update notification set is_important='0' where  id=" + notification_id + "";
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

/////////////===========================Update notification status ================================////////////////
exports.readnotifications = function(req, res) {

	var userid = req.body.userid;
	var token = req.body.token;
    var notification_id = req.body.notification_id;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function(response) {
				if (response != '' && response != null) {

					var sql = "update notification set status='1' where  id=" + notification_id + "";
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
