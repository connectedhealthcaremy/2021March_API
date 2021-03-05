'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');

//============================================Add user Viscerall FAt============================================/////////////////
exports.addMetabolicAge = function(req, res) {
	var userid=req.body.userid;
	var token=req.body.token;
	var scaleDate=req.body.scaleDate;
	var Qty=req.body.Qty;
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
		
			var sql = "INSERT INTO metabolic_age (userID, scaleDate, metabolicage) values ";
			
			for(var i=0; i< total-1 ; i++)
			{
			var scaleDate=data1[i].scaleDate;
			var metabolicage=data1[i].metabolicage; 
			sql += "('" + userid + "','" + scaleDate + "','" + metabolicage + "'),";
			
			sql = sql.substr(0,sql.length);
			}
			var scaleDate=data1[total-1].scaleDate;
			var metabolicage=data1[total-1].metabolicage; 
			sql += "('" + userid + "','" + scaleDate + "','" + metabolicage + "')";
			
		    
		    db.metabolic_age.addmetabolicage(sql).then(function(response){
				 
					data["error"] = 0;
					data["authResponse"] = "Metabolic Age Added Successfully";
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

///////////////========================Get bone density Data=================================================/////////////////

exports.getMetabolicAge = function(req, res) {
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
				db.metabolic_age.getmetabolicage(userid).then(function(response){
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