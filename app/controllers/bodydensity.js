'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');

//============================================Add user body density============================================/////////////////
exports.addbodydensityData = function(req, res) {

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
		
		var email=response[0].email;
		
			var sql = "INSERT INTO bodydensity (userID , bodydensity, recordDateTime ,site1 , site2, site3 , deviceStatus, notes ) values ";
			
			for(var i=0; i< total-1 ; i++)
			{
			var bodydensity=data1[i].bodydensity;
			var recordDateTime=data1[i].insertiontime; 
			var site1=data1[i].site1; 
			var site2=data1[i].site2; 
			var site3=data1[i].site3; 
			var deviceStatus=data1[i].deviceTypeID; 
			var notes=data1[i].notes; 
			
			sql += "('" + userid + "','" + bodydensity + "','" + recordDateTime + "','" + site1 + "','" + site2 + "','" + site3 + "','" + deviceStatus + "','" + notes + "'),";
			
			sql = sql.substr(0,sql.length);
			}
			
			
			var bodydensity=data1[total-1].bodydensity;
		    var recordDateTime=data1[total-1].insertiontime; 
			var site1=data1[total-1].site1; 
			var site2=data1[total-1].site2; 
			var site3=data1[total-1].site3; 
			var deviceStatus=data1[total-1].deviceTypeID; 
			var notes=data1[total-1].notes;  
		
			sql += "('" + userid + "','" + bodydensity + "','" + recordDateTime + "','" + site1 + "','" + site2 + "','" + site3 + "','" + deviceStatus + "','" + notes + "')";
			
		    
		    db.bodydensity.addbodydensity(sql).then(function(response){
				/*
				**get last inserted ids
				*/
					var lastinsertid=response;
					db.bodydensity.lastaddbodydensityIDs(lastinsertid).then(function(response){
					
					data["error"] = 0;
					data["authResponse"] = "Body density Added successfully";
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

///////////////========================Get body density Data=================================================/////////////////

exports.getbodydensity = function(req, res) {
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
			//var userid=response[0].email;
			//res.json(email);
			///Get user info
				db.bodydensity.getbodydensity(userid).then(function(response){
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

///////////////========================Update body density Data=================================================/////////////////
exports.updatebodydensity = function(req, res) {
	


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
		
		var email=response[0].email;
		
			
			
			for(var i=0; i< total-1 ; i++)
			{
			var bodydensity=data1[i].bodydensity;
			var recordDateTime=data1[i].insertiontime; 
			var site1=data1[i].site1; 
			var site2=data1[i].site2; 
			var site3=data1[i].site3; 
			var deviceStatus=data1[i].deviceTypeID; 
			var id=data1[i].bodydensityid;
			 
			
			var sql = "UPDATE bodydensity SET bodydensity='" + bodydensity + "', recordDateTime='" + recordDateTime + "' ,site1='" + site1 + "' , site2='" + site2 + "', site3='" + site3 + "' WHERE id='"+id+"' ; ";
			
				db.bodydensity.updatebodydensity(sql).then(function(response){
				}).error(function(err){
				res.json(err);
				});
			sql = sql.substr(0,sql.length);
			}
			
			
			var bodydensity=data1[total-1].bodydensity;
			var recordDateTime=data1[total-1].insertiontime; 
			var site1=data1[total-1].site1; 
			var site2=data1[total-1].site2; 
			var site3=data1[total-1].site3; 
			var deviceStatus=data1[total-1].deviceTypeID; 
		    var id=data1[total-1].bodydensityid; 
		 
			var sql = "UPDATE bodydensity SET bodydensity='" + bodydensity + "', recordDateTime='" + recordDateTime + "' ,site1='" + site1 + "' , site2='" + site2 + "', site3='" + site3 + "' WHERE id='"+id+"' ; ";
			
		    
		    db.bodydensity.updatebodydensity(sql).then(function(response){
			}).error(function(err){
		        res.json(err);
		});
			
		data["error"]=0;
		data["authResponse"] = "Body Density Updated Successfully.";
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

//////////////=============================Delete body density Data===========================================//////////////////////

exports.deletebodydensity = function(req, res) {
	

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
		
			for(var i=0; i< total-1 ; i++)
			{
			var id=data1[i].id;
			
			var sql = "UPDATE bodydensity SET isdeleted='1'  WHERE id='"+id+"' AND deviceStatus='0'  ; ";
		
				db.bodydensity.deletebodydensity(sql).then(function(response){
				}).error(function(err){
				res.json(err);
				});
				
			sql = sql.substr(0,sql.length);
			}

		    var id=data1[total-1].id; 
		 
			var sql = "UPDATE bodydensity SET isdeleted='1'  WHERE id='"+id+"' AND deviceStatus='0' ; ";
			
			db.bodydensity.deletebodydensity(sql).then(function(response){
			}).error(function(err){
		        res.json(err);
		});
			
		data["error"]=0;
		data["authResponse"] = "Body Density Deleted Successfully.";
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