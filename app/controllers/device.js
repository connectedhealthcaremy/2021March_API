'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');
var FCM = require('fcm-node');

//============================================Add Device============================================/////////////////
exports.adddevice = function(req, res) {
	var userid=req.body.userid;
	var token=req.body.token;
	var deviceID=req.body.deviceID;
	
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		
		
		db.user.authUser(token).then(function(response){
		if(!!token && !!deviceID)
		{
		if(response!='' && response!=null)
		{
		
		var email=response;
		
			   var email=response;
		
			var sql = "INSERT INTO notificationDevices (deviceID,userID) values ";
			
			/*for(var i=0; i< total-1 ; i++)
			{
			var deviceID=data1[i]["deviceID"].toString();
			sql += "('" + deviceID + "','" + userid + "'),";
			
			sql = sql.substr(0,sql.length);
			}
			var deviceID=data1[i]["deviceID"].toString();*/
			sql += "('" + deviceID + "','" + userid + "')";
			
		    
		    db.notificationDevices.adddevice(sql).then(function(response){
				 
					data["error"] = 0;
					data["authResponse"] = "Notification Device Added Successfully";
					res.json(data);
		
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

///////////////========================GetDEvice=================================================/////////////////

exports.getdevice = function(req, res) {
   var userid=req.query.userid;
	var token=req.query.token;
		
		var data={
		"error": 0 ,
		"authResponse":""
		}
		if(!!token){
		///Authinticate user
		db.user.authUser(token).then(function(response){
		if(response!='' && response!=null)
		{
			var email=response;
			//res.json(email);
			///Get user info
				db.notificationDevices.getdevice().then(function(response){
				data["error"] = 0;
				data["authResponse"] ="Action Successful" ;
				data['Data']=response;
				res.json(data);
				
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
		})
		.error(function(err){
		res.json(err);
		});
		}
		else{
			data["error"]=1;
			data["authResponse"] = "Please provide all required data (i.e : token etc)";
			res.json(data);
		//connection.end()
		}

      return res;
};

///////////////========================Test Device=================================================/////////////////

exports.testdevice = function(req, res) {
  // var userid=req.query.userid;
	//var token=req.query.token;
		
		var data={
		"error": 0 ,
		"authResponse":""
		}
		db.notificationDevices.getdevice().then(function(response){
				data["error"] = 0;
				data["authResponse"] ="Action Successful" ;
				data['Data']=response[0].deviceID;

 

var SERVER_API_KEY='AAAANqHPTPA:APA91bEZgGvMJOjinwWqHNpdcfzaZFEf97CDRtK9-CkvuKU4-5wHb7uFkKxn5u9VNdEkm6-xpYjWpHz5P9U2MtRMDvpJ3f_ntMbzcJmszV9U1HJP26RXLvN--ZMokc82j6aV-PDnKshQdNMvq9_LzNTKb0i8j8P_jA';//put your api key here

var validDeviceRegistrationToken = 'APA91bEYkLt561iNybIbK-b6dRaw7GC3a6ZX8quP-DmsfsLP8q0HyzdfTM_EQuQm_8l9wFp5POhM94W2K1lDh50cnn5kspP7XGUfv3nziL5IINs-WXMJtO-KRGsItWQZam8jkGe_juOR'; //put a valid device token here

var fcmCli= new FCM(SERVER_API_KEY);

var payloadOK = {
    to: validDeviceRegistrationToken,
    data: { //some data object (optional)
        url: 'news',
        foo:'fooooooooooooo',
        bar:'bar bar bar'
    },
    priority: 'high',
    content_available: true,
    notification: { //notification object
        title: 'HELLO', body: 'World!', sound : "default", badge: "1"
    }
};


var callbackLog = function (sender, err, res) {
    console.log("\n__________________________________")
    console.log("\t"+sender);
    console.log("----------------------------------")
    console.log("err="+err);
    console.log("res="+res);
    console.log("----------------------------------\n>>>");
};

function sendOK()
{
    fcmCli.send(payloadOK,function(err,res){
        callbackLog('sendOK',err,res);
    });
}



sendOK();
				
	/*	  response.forEach(function(response) {
       console.log(response.deviceID);
    });		res.json(data);
				*/
				})
				.error(function(err){
				res.json(err);
				});


      return res;
};