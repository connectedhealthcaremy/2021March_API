'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');

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
	var deviceuuid=req.body.deviceuuid;
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
		
		/**************
        **Delete Duplicate Record of same uuid and date
        ****************/
        for(var j=0; j< header_total-1 ; j++)
			{
             var startDate=header_data[j].startDate;
             var uuID=header_data[j].uuID;
            
            db.sleep.updateDuplicateData(userid,startDate,uuID).then(function(response){
				}).error(function(err){
				res.json(err);
				});
			}
            
            var startDate=header_data[header_total-1].startDate;
            var uuID=header_data[header_total-1].uuID;
            
          if(!!startDate && !!uuID)
            {  
              
            
			////Last Update of data
			db.sleep.updateDuplicateData(userid,startDate,uuID).then(function(response){
           
           ///adding new steps
            var fres=add_new_sleep(userid, current_date, data1, total, startTime, endTime,deviceuuid,res);
            
            res.json(fres);

			}).error(function(err){
			res.json(err);
			});
            
            }
            else
            {
            	///adding new steps
            var fres=add_new_sleep(userid, current_date, data1, total, startTime, endTime,deviceuuid,res);
             res.json(fres);

            }	
 
		/****************
		**End Delete 
		*******************/


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


/**************======================== add new step ====================================****************************/

function add_new_sleep(userid, current_date, data1, total,startTime, endTime,uuID){

var data={
		"error": 0 ,
		"authResponse":""
		}

	       
            /*******
             **Adding new records
             ***********/
            
							  ///For new record
				 var sql = "INSERT INTO sleep (userID, startTime, endTime,uuID) VALUES ('"+userid+"', '"+startTime+"', '"+endTime+"','"+uuID+"') ";
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
				return data;
				res.json(data);
					 }).error(function(err){
				return err;
				});
				
				
					 }).error(function(err){
				return err;
				});

				data["error"] = 0;
				data["authResponse"] = "Sleep Data Added Successfully";
				return data;
				

/**************
  **End adding record to sleep
  ***************/

}

///////////////========================Get sleep Data=================================================/////////////////

exports.getSleep = function(req, res) {
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
				db.sleep.getSleeps(userid).then(function(response){
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

///////////////========================Get sleep Steps Data=================================================/////////////////

exports.getSleepSteps = function(req, res) {
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
				db.sleep.getSleepSteps(userid).then(function(response){
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