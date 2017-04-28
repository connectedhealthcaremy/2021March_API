'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');

//============================================Add user Steps============================================/////////////////
exports.AddDeviceHistory = function(req, res) {
		var data1=req.body.data;
		var userid=req.body.userid;
		var token=req.body.token;
		data1=JSON.parse(data1);
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
		
		var email=response;
		
			   var email=response;
		
			var sql = "INSERT INTO deviceHistory (userID, deviceName, oon, off, deviceType , recordDateTime) values ";
			
			for(var i=0; i< total-1 ; i++)
			{
			var deviceName=data1[i].deviceName;
			var on=data1[i].on;
            var off=data1[i].of;  
			var deviceType=data1[i].deviceType; 
			var recordDateTime=data1[i].recordDateTime;
            

			sql += "('" + userid + "','" + deviceName + "','" + on + "','" + off + "','" + deviceType + "','" + recordDateTime + "'),";
			
			sql = sql.substr(0,sql.length);
			}
			
			var deviceName=data1[total-1].deviceName;
			var on=data1[total-1].on;
            var off=data1[total-1].of;  
			var deviceType=data1[total-1].deviceType; 
			var recordDateTime=data1[total-1].recordDateTime;
            

			sql += "('" + userid + "','" + deviceName + "','" + on + "','" + off + "','" + deviceType + "','" + recordDateTime + "')";
		    
		   //console.log(sql);
				db.deviceHistory.addDeviceHistory(sql);

				data["error"] = 0;
				data["authResponse"] = "Device History Added Successfully";

				res.json(data);

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

