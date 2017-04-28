'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');

//============================================Add user waistcircumference============================================/////////////////
exports.addwaistcircumference = function(req, res) {

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
		
			var sql = "INSERT INTO waistcircumference (userID , waistcircumference, hipcircumference ,waisttohipratio , recordDateTime, deviceStatus, notes ) values ";
			
			for(var i=0; i< total-1 ; i++)
			{
			var waistcircumference=data1[i].waistcircumference;
			var hipcircumference=data1[i].hipcircumference; 
			var waisttohipratio=data1[i].waisttohipratio; 
			var insertiontime=data1[i].insertiontime; 
			var deviceStatus=data1[i].deviceTypeID; 
			var notes=data1[i].notes; 
			
			sql += "('" + userid + "','" + waistcircumference + "','" + hipcircumference + "','" + waisttohipratio + "','" + insertiontime + "','" + deviceStatus + "','" + notes + "'),";
			
			sql = sql.substr(0,sql.length);
			}
			
		
			var waistcircumference=data1[total-1].waistcircumference;
			var hipcircumference=data1[total-1].hipcircumference; 
			var waisttohipratio=data1[total-1].waisttohipratio; 
			var insertiontime=data1[total-1].insertiontime; 
			var deviceStatus=data1[total-1].deviceTypeID; 
			var notes=data1[total-1].notes; 
		
			sql += "('" + userid + "','" + waistcircumference + "','" + hipcircumference + "','" + waisttohipratio + "','" + insertiontime + "','" + deviceStatus + "','" + notes + "')";
			
		    
		    db.waistcircumference.addwaistcircumference(sql).then(function(response){
				/*
				**get last inserted ids
				*/
					var lastinsertid=response;
					db.waistcircumference.lastaddwaistcircumferenceIDs(lastinsertid).then(function(response){
					
					data["error"] = 0;
					data["authResponse"] = "waist circumference Added successfully";
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

///////////////========================Get body waist circumference=================================================/////////////////

exports.getwaistcircumference = function(req, res) {
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
				db.waistcircumference.getwaistcircumference(userid).then(function(response){
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

///////////////========================Update waist circumference Data=================================================/////////////////
exports.updatewaistcircumference = function(req, res) {
	
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
			var waistcircumference=data1[i].waistcircumference;
			var hipcircumference=data1[i].hipcircumference; 
			var waisttohipratio=data1[i].waisttohipratio; 
			var insertiontime=data1[i].insertiontime; 
			var notes=data1[i].notes;
			var id=data1[i].waistcircumferenceid; 
			
			var sql = "UPDATE waistcircumference SET waistcircumference='" + waistcircumference + "', hipcircumference='" + hipcircumference + "' ,waisttohipratio='" + waisttohipratio + "' , recordDateTime='" + insertiontime + "', notes='" + notes + "' WHERE id='"+id+"' ;";
			
			db.waistcircumference.updatewaistcircumference(sql).then(function(response){
			}).error(function(err){
			res.json(err);
			});
			
			sql = sql.substr(0,sql.length);
			}
			
		
			var waistcircumference=data1[total-1].waistcircumference;
			var hipcircumference=data1[total-1].hipcircumference; 
			var waisttohipratio=data1[total-1].waisttohipratio; 
			var insertiontime=data1[total-1].insertiontime; 
			var notes=data1[total-1].notes; 
			var id=data1[total-1].waistcircumferenceid; 
		
			var sql = "UPDATE waistcircumference SET waistcircumference='" + waistcircumference + "', hipcircumference='" + hipcircumference + "' ,waisttohipratio='" + waisttohipratio + "' , recordDateTime='" + insertiontime + "', notes='" + notes + "' WHERE id='"+id+"' ;";
			
			db.waistcircumference.updatewaistcircumference(sql).then(function(response){
			}).error(function(err){
			res.json(err);
			});
			
		data["error"]=0;
		data["authResponse"] = "waistcircumference Updated Successfully.";
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

//////////////=============================Delete body weight Circumference===========================================//////////////////////

exports.deletewaistcircumference = function(req, res) {
	
	

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
				
			var id=data1[i].id; 
			
			var sql = "UPDATE waistcircumference SET isdeleted=1 WHERE id='"+id+"' AND deviceStatus='0' ;";
			
			db.waistcircumference.daletewaistcircumference(sql).then(function(response){
			}).error(function(err){
			res.json(err);
			});
			
			sql = sql.substr(0,sql.length);
			}
			
	
			var id=data1[total-1].id; 
		
			var sql = "UPDATE waistcircumference SET isdeleted=1 WHERE id='"+id+"' AND deviceStatus='0'";
			
			db.waistcircumference.daletewaistcircumference(sql).then(function(response){
			}).error(function(err){
			res.json(err);
			});
			
		data["error"]=0;
		data["authResponse"] = "waistcircumference Deleted Successfully.";
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