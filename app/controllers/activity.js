'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize'); 

//============================================Add user activity============================================/////////////////
exports.addactivity = function(req, res) {

	var userid=req.body.userid;
	var token=req.body.token;
	var data1=req.body.data;
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
		
			var sql = "INSERT INTO activity (activityName, value, userID, type, activityDateTime, activityTypeID) values ";
			
			for(var i=0; i< total-1 ; i++)
			{
			var activity=data1[i].activityName;
			var val=data1[i].activityLength;
		    var activityDateTime=data1[i].activityDateTime;
            var activityID=data1[i].activityID;
					
			sql += "('" + activity + "','" + val + "','" + userid + "','" + 1 + "','" + activityDateTime + "','" + activityID + "'),";
			
			sql = sql.substr(0,sql.length);
			}
			
			var activity=data1[total-1].activityName;
			var val=data1[total-1].activityLength;
			var activityDateTime=data1[total-1].activityDateTime;
            var activityID=data1[total-1].activityID;
			
	        sql += "('" + activity + "','" + val + "','" + userid + "','" + 1 + "','" + activityDateTime + "','" + activityID + "')";
		    
			db.activity.addactivity(sql).then(function(response){
						 /*
				**get last inserted id,s
				*/
				
					var lastinsertid=response;
					db.activity.lastAddIDs(lastinsertid).then(function(response){
					data["error"] = 0;
					data["authResponse"] = "Activity Added Successfully";
					data['id']=response;
					res.json(data);
					}).error(function(err){
					res.json(err);
					});
					
		
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

//============================================Get user activity============================================/////////////////
exports.getactivity = function(req, res) {

	
	var userid=req.query.userid;
	var token=req.query.token;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
			
		
		
		db.user.authUser(token).then(function(response){
		if(!!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.activity.getactivity(userid).then(function(response){
				 
		data["error"] = 0;
		data["authResponse"] ="Action Successful" ;
		data['Data']=response;
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

//============================================Update user activity============================================/////////////////

exports.updateactivity = function(req, res) {

	var userid=req.body.userid;
	var token=req.body.token;
	var data1=req.body.data;
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
		   
		   for(var i=0; i< total-1 ; i++)
			{
			var activity=data1[i].activityName;
			var val=data1[i].activityLength;
            var activity_id=data1[i].serverid;
			
			var sql = "UPDATE activity SET activityName='" + activity + "', value='" + val + "' WHERE activityID='"+activity_id+"'";
			db.activity.updateactivity(sql).then(function(response){
			}).error(function(err){
			res.json(err);
			});
			
			sql = sql.substr(0,sql.length);
			}
			
			var activity=data1[total-1].activityName;
			var val=data1[total-1].activityLength;
            var activity_id=data1[total-1].serverid;
			
	     	var sql = "UPDATE activity SET activityName='" + activity + "', value='" + val + "' WHERE activityID='"+activity_id+"'";
			db.activity.updateactivity(sql).then(function(response){
			}).error(function(err){
			res.json(err);
			});
		
	    data["error"]=0;
		data["authResponse"] = "Activity Updated Successfully.";
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


//============================================Update user activity Water============================================/////////////////

exports.updateactivityWater = function(req, res) {
   
   var userid=req.body.userid;
	var token=req.body.token;
	var data1=req.body.data;
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

						
			for(var i=0; i< total-1 ; i++)
			{
			var activity=data1[i].drinkname;
			var val=data1[i].drinksize;
			var recorddatetime=data1[i].recorddatetime; 
			var activity_id=data1[i].activity_id;
			
		  var sql = "UPDATE Water SET name='" + activity + "', value='" + val + "' , recorddatetime='" + recorddatetime + "' WHERE id='"+activity_id+"'";
			
			db.Water.updatewater(sql).then(function(response){
			}).error(function(err){
			res.json(err);
			});
		
			sql = sql.substr(0,sql.length);
			}
			
			var activity=data1[total-1].drinkname;
			var val=data1[total-1].drinksize;
			var recorddatetime=data1[total-1].recorddatetime;
			var activity_id=data1[total-1].activity_id;
			
			var sql = "UPDATE Water SET name='" + activity + "', value='" + val + "' , recorddatetime='" + recorddatetime + "' WHERE id='"+activity_id+"'";
			
			db.Water.updatewater(sql).then(function(response){
			}).error(function(err){
			res.json(err);
			});
			
			data["error"] = 0;
			data["authResponse"] = "Water Activity Updated Successfully";
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


//============================================Delete user activity============================================/////////////////
exports.deleteactivity = function(req, res) {
	
	
	var userid=req.body.userid;
	var token=req.body.token;
	var data1=req.body.data;
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
		   
		   for(var i=0; i< total-1 ; i++)
			{
            var activity_id=data1[i].id;
			
			//var sql = "UPDATE activity SET isdeleted='1' WHERE activityID='"+activity_id+"'";
			var sql = "DELETE FROM activity  WHERE activityID='"+activity_id+"'";
			db.activity.updateactivity(sql).then(function(response){
			}).error(function(err){
			res.json(err);
			});
			
			sql = sql.substr(0,sql.length);
			}
			

            var activity_id=data1[total-1].id;
			
	     	var sql = "DELETE FROM activity WHERE activityID='"+activity_id+"'";
			db.activity.updateactivity(sql).then(function(response){
			}).error(function(err){
			res.json(err);
			});
		
	    data["error"]=0;
		data["authResponse"] = "Activity Deleted Successfully.";
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

//============================================Delete user activity Water============================================/////////////////
exports.deleteactivitywater = function(req, res) {
   
   var userid=req.body.userid;
	var token=req.body.token;
	var data1=req.body.data;
	data1=JSON.parse(data1);
	var total=data1.length;
	
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
			
		
		
		db.user.authUser(token).then(function(response){
		if( !!token)
		{
		if(response!='' && response!=null)
		{
		
		
			   var email=response;

						
			for(var i=0; i< total-1 ; i++)
			{

			var activity_id=data1[i].id;
			
		  var sql = "UPDATE Water SET isdeleted='1' WHERE id='"+activity_id+"'";
			
			db.Water.updatewater(sql).then(function(response){
			}).error(function(err){
			res.json(err);
			});
		
			sql = sql.substr(0,sql.length);
			}
			
	
			var activity_id=data1[total-1].id;
			
			var sql = "UPDATE Water SET isdeleted='1' WHERE id='"+activity_id+"'";
			
			db.Water.updatewater(sql).then(function(response){
			}).error(function(err){
			res.json(err);
			});
			
			data["error"] = 0;
			data["authResponse"] = "Water Activity Deleted Successfully";
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

//============================================Add user activity sleep============================================/////////////////
exports.addactivitySleep = function(req, res) {

	
	var userid=req.body.userid;
	var token=req.body.token;
	/*var activity=req.body.activity;
	var val=req.body.total;*/
	var data1=req.body.data;
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
		
		/*
		For single Value
		
			var sql = "INSERT INTO activity (activityName, value, userID, type) values ";
			sql += "('" + activity + "','" + val + "','" + userid + "','" + 2 + "')";*/
			
			var sql = "INSERT INTO activity (activityName, value, userID, type, activityDateTime, activityTypeID) values ";
			
			for(var i=0; i< total-1 ; i++)
			{
			var activity=data1[i].activityName;
			var val=data1[i].activityLength;
			var activityDateTime=data1[i].activityDateTime;
            var activityID=data1[i].activityID;
			
			
			sql += "('" + activity + "','" + val + "','" + userid + "','" + 2 + "','" + activityDateTime + "','" + activityID + "'),";
			
			sql = sql.substr(0,sql.length);
			}
			
			
			var activity=data1[total-1].activityName;
			var val=data1[total-1].activityLength;
			var activityDateTime=data1[total-1].activityDateTime;
            var activityID=data1[total-1].activityID; 
			
	        sql += "('" + activity + "','" + val + "','" + userid + "','" + 2 + "','" + activityDateTime + "','" + activityID + "')";
			
			
		    
		    db.activity.addactivity(sql).then(function(response){
				 
				 		 /*
				**get last inserted id,s
				*/
				
					var lastinsertid=response;
					db.activity.lastAddIDs(lastinsertid).then(function(response){
	                data["error"] = 0;
					data["authResponse"] = "Sleep Activity Added Successfully";
					data['id']=response;
					res.json(data);
					}).error(function(err){
					res.json(err);
					});
				
					
					
		
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

//============================================Get user activity Sleep============================================/////////////////
exports.getactivitySleep = function(req, res) {

	
	var userid=req.query.userid;
	var token=req.query.token;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
			
		
		
		db.user.authUser(token).then(function(response){
		if(!!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.activity.getactivitySleep(userid).then(function(response){
				 
		data["error"] = 0;
		data["authResponse"] ="Action Successful" ;
		data['Data']=response;
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

//============================================Get user activity============================================/////////////////
exports.getactivity = function(req, res) {

	
	var userid=req.query.userid;
	var token=req.query.token;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
			
		
		
		db.user.authUser(token).then(function(response){
		if(!!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.activity.getactivity(userid).then(function(response){
				 
		data["error"] = 0;
		data["authResponse"] ="Action Successful" ;
		data['Data']=response;
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


//============================================Add user activity Water============================================/////////////////
exports.addactivitywater = function(req, res) {
     
	var userid=req.body.userid;
	var token=req.body.token;
	var data1=req.body.data;
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
		
			
			var sql = "INSERT INTO Water (name, value, recorddatetime, userID) values ";
			/*
			For Single Value
			sql += "('" + activity + "','" + val + "','" + userid + "')";*/
			
						
			for(var i=0; i< total-1 ; i++)
			{
			var activity=data1[i].drinkname;
			var val=data1[i].drinksize;
			var recorddatetime=data1[i].recorddatetime; 
			
			sql += "('" + activity + "','" + val + "','" + recorddatetime + "','" + userid + "'),";
			
			sql = sql.substr(0,sql.length);
			}
			
			var activity=data1[total-1].drinkname;
			var val=data1[total-1].drinksize;
			var recorddatetime=data1[i].recorddatetime;
			
			sql += "('" + activity + "','" + val + "', '" + recorddatetime + "','" + userid + "')";
			
		    db.Water.addwater(sql).then(function(response){
				 
				 
				 		 /*
				**get last inserted id,s
				*/
				
					var lastinsertid=response;
					db.Water.lastAddIDs(lastinsertid).then(function(response){
					data["error"] = 0;
					data["authResponse"] = "Water Activity Added Successfully";
					data['id']=response;
					res.json(data);
					}).error(function(err){
					res.json(err);
					});
				
		
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


//============================================Get user activity water============================================/////////////////
exports.getactivityWater = function(req, res) {

	
	var userid=req.query.userid;
	var token=req.query.token;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
			
		
		
		db.user.authUser(token).then(function(response){
		if(!!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.Water.getwater(userid).then(function(response){
				 
		data["error"] = 0;
		data["authResponse"] ="Action Successful" ;
		data['Data']=response;
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

///////////////========================Get activity=================================================/////////////////

/*exports.getbmr = function(req, res) {
   var userid=req.query.userid;
	var token=req.query.token;
		
		var data={
		"error": 0 ,
		"authResponse":""
		}
		if(!!userid && !!token){
		///Authinticate user
		db.user.authUser(userid, token).then(function(response){
		if(response!='' && response!=null)
		{
			var email=response;
			//res.json(email);
			///Get user info
				db.bmr.getbmr(userid).then(function(response){
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
};*/