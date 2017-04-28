'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');

//============================================Add user medical report============================================/////////////////
exports.addmedicalreport = function(req, res) {
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
		
			var sql = "INSERT INTO medicalReport (userid, smoker, medicalillness, usermedicalhistory,familyillness, familymedicalhistory, totalcholestrol, totalhdl, totalldl, totalglycerides, totalplasmaglucose, hemoglobin, recorddate, recordpath ) values ";
			
			for(var i=0; i< total-1 ; i++)
			{
			var smoker=data1[i].smoker;
			var medicalillness=data1[i].medicalillness;
			var usermedicalhistory=data1[i].usermedicalhistory; 
			var familyillness=data1[i].familyillness; 
			var familymedicalhistory=data1[i].familymedicalhistory; 
			var totalcholestrol=data1[i].totalcholestrol; 
			var totalhdl=data1[i].totalhdl; 
			var totalldl=data1[i].totalldl; 
			var totalglycerides=data1[i].totalglycerides; 
			var totalplasmaglucose=data1[i].totalplasmaglucose; 
			var hemoglobin=data1[i].hemoglobin; 
			var recorddate=data1[i].recorddate; 
			var recordpath=data1[i].recordpath; 

			sql += "('" + userid + "','" + smoker + "','" + medicalillness + "','" + usermedicalhistory + "','" + familyillness + "','" + familymedicalhistory + "','"+totalcholestrol+"' , '" + totalhdl + "','" + totalldl + "','" + totalglycerides + "','" + totalplasmaglucose + "','" + hemoglobin + "','" + recorddate + "','" + recordpath + "'),";
			
			sql = sql.substr(0,sql.length);
			}
			
			var smoker=data1[total-1].smoker;
			var medicalillness=data1[total-1].medicalillness;
			var usermedicalhistory=data1[total-1].usermedicalhistory; 
			var familyillness=data1[total-1].familyillness; 
			var familymedicalhistory=data1[total-1].familymedicalhistory; 
			var totalcholestrol=data1[total-1].totalcholestrol; 
			var totalhdl=data1[total-1].totalhdl; 
			var totalldl=data1[total-1].totalldl; 
			var totalglycerides=data1[total-1].totalglycerides; 
			var totalplasmaglucose=data1[total-1].totalplasmaglucose; 
			var hemoglobin=data1[total-1].hemoglobin; 
			var recorddate=data1[total-1].recorddate; 
			var recordpath=data1[total-1].recordpath; 

			sql += "('" + userid + "','" + smoker + "','" + medicalillness + "','" + usermedicalhistory + "','" + familyillness + "','" + familymedicalhistory + "','"+totalcholestrol+"' , '" + totalhdl + "','" + totalldl + "','" + totalglycerides + "','" + totalplasmaglucose + "','" + hemoglobin + "','" + recorddate + "','" + recordpath + "')";
			
	
		    
		    db.medicalReport.addmedicalReport(sql).then(function(response){
				 
					data["error"] = 0;
					data["authResponse"] = "Medical Report Added Successfully";
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

///////////////========================Get user medical report=================================================/////////////////

exports.getmedicalreport = function(req, res) {
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
			var email=response[0].email;
			
				db.medicalReport.getmedicalreport(userid).then(function(response){
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