'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');

//============================================Add user medical report============================================/////////////////
exports.addmedicalReport = function(req, res) {
	//console.log("===============================================>Medical Report===========================================================");
	//console.log(req.body);
	var userid=req.body.userid;
	var token=req.body.token;
	var data1=req.body.data;
         var inserted_rows = [];
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
		{  ///console.log(data1);
		
			var sql = "INSERT INTO medicalReport (userID, reporttype, reportname, reportdate ) values ";
			
			for(var i=0; i< total-1 ; i++)
			{
				var reporttype=data1[i].reporttype;
				var reportname=data1[i].reportname;
				var reportdate=data1[i].reportdate; 
				
				sql += "('" + userid + "','" + reporttype + "','" + reportname + reportdate + "'),";
				
				sql = sql.substr(0,sql.length);
			}
			
			var reporttype=data1[total-1].reporttype;
			var reportname=data1[total-1].reportname;
			var reportdate=data1[total-1].reportdate; 
			
			sql += "('" + userid + "','" + reporttype + "','" + reportname + "','" + reportdate + "')";
			
			/// console.log(sql); return false;
			
			db.medicalReport.addmedicalReport(sql).then(function(result){
			
				//data["error"] = 0;
				//data["authResponse"] = "Medical Report Added Successfully";
				//res.json(data);

     					inserted_rows.push(result);
					console.log("Last Inserted ID is========" + inserted_rows);
					console.log("Value of  i " + i);
					console.log("length of inserted rows  " + inserted_rows.length);
					console.log("length of Total  " + total);
					
					if (inserted_rows.length == total) {
						data["error"] = 0;
						data["Data"] = inserted_rows;
						data["authResponse"] = "Lab Report Records added Successfully";
						res.json(data);
					}
			
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

exports.getmedicalReport = function(req, res) {
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
			db.medicalReport.getmedicalReport(userid).then(function(response){
				//console.log(response);
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


//============================================Add user medical history Added by TSJ============================================/////////////////
exports.addmedicalHistory = function(req, res) {
	//console.log("===============================================>Medical History===========================================================");
	//console.log(req.body);
	var userid=req.body.userid;
	var token=req.body.token;
	var data1=req.body.data;

	data1=JSON.parse(data1);
	console.log(data1);
	var total=data1.length;

	var data={
		"error": 0 ,
		"authResponse":""
	}
		
	db.user.authUser(token).then(function(response){
	if(!!token)
	{
		if(response!='' && response!=null)
		{  ///console.log(data1);
		
			var sql = "INSERT INTO MedicalHistory (userID, smoker, medicalillness, usermedicalhistory,familyillness, familymedicalhistory, physicaldisability, physicaldisabilityhistory ) values ";
			
			for(var i=0; i< total-1 ; i++)
			{
				var smoker=data1[i].smoker;
				var medicalillness=data1[i].medicalillness;
				var usermedicalhistory=data1[i].usermedicalhistory; 
				var familyillness=data1[i].familyillness; 
				var familymedicalhistory=data1[i].familymedicalhistory; 
				var physicaldisability=data1[i].physicaldisability;
				var physicaldisabilityhistory=data1[i].physicaldisabilityhistory; 
				
				sql += "('" + userid + "','" + smoker + "','" + medicalillness + "','" + usermedicalhistory + "','" + familyillness + "','" + familymedicalhistory + "','" + physicaldisability + "','" + physicaldisabilityhistory + "'),";
				
				sql = sql.substr(0,sql.length);
			}
			
			var smoker=data1[total-1].smoker;
			var medicalillness=data1[total-1].medicalillness;
			var usermedicalhistory=data1[total-1].usermedicalhistory; 
			var familyillness=data1[total-1].familyillness; 
			var familymedicalhistory=data1[total-1].familymedicalhistory; 
			var physicaldisability=data1[total-1].physicaldisability; 
			var physicaldisabilityhistory=data1[total-1].physicaldisabilityhistory;
			
			sql += "('" + userid + "','" + smoker + "','" + medicalillness + "','" + usermedicalhistory + "','" + familyillness + "','" + familymedicalhistory + "','" + physicaldisability + "','" + physicaldisabilityhistory + "')";
			
			/// console.log(sql); return false;
			
			db.medicalReport.addmedicalHistory(sql).then(function(response){
			
				data["error"] = 0;
				data["authResponse"] = "Medical History Added Successfully";
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

///////////////========================Get user medical history Added by TSJ=================================================/////////////////

exports.getmedicalHistory = function(req, res) {
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
			db.medicalReport.getmedicalHistory(userid).then(function(response){
				//console.log(response);
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


///////////////========================Get user lab report (move from user.js by TSJ)=================================================/////////////////

// Insert Lab Report 

exports.addLabReport = function (req, res) {

	try {
        var inserted_rows = [];
        var userid = req.body.userid;
        var token = req.body.token;
        var data1 = req.body.data;
	
        data1 = JSON.parse(data1);
        var total = data1.length;
	
        console.log(data1);
	
	var data = {
		"error": 0,
		"Data":"",
		"authResponse": ""
	}

	for (var i = 0; i <= total - 1; i++) {
	
		var totalcholestrol = data1[i].totalcholestrol;
		var cholestrolhdlratio = data1[i].cholestrolhdlratio;
		var totalhdl = data1[i].totalhdl;
		var totalldl = data1[i].totalldl;
		var totaltriglycerides = data1[i].totaltriglycerides;
		var totalplasmaglucose = data1[i].totalplasmaglucose;
		var hemoglobin = data1[i].hemoglobin;
		var recordtime = data1[i].reportdate;
		var reportname = data1[i].reportname;
		db.user.authUser(token).then(function (response) {
		if (!!token) {
		
			if (response != '' && response != null) {
			
				var sql_n1 = "INSERT INTO LabReport (userID, reportname, reportdate, totalcholestrol, cholestrolhdlratio, totalhdl, totalldl, totaltriglycerides, totalplasmaglucose, hemoglobin) values ('" + userid + "','" + reportname + "','" + recordtime + "','" + totalcholestrol + "','" + cholestrolhdlratio + "','" + totalhdl + "','" + totalldl + "','" + totaltriglycerides + "','" + totalplasmaglucose + "','" + hemoglobin + "')";
				console.log(sql_n1);
				db.medicalReport.addLabReport(sql_n1).then(function(result){
				
					inserted_rows.push(result);
					console.log("Last Inserted ID is========" + inserted_rows);
					console.log("Value of  i " + i);
					console.log("length of inserted rows  " + inserted_rows.length);
					console.log("length of Total  " + total);
					
					if (inserted_rows.length == total) {
						data["error"] = 0;
						data["Data"] = inserted_rows;
						data["authResponse"] = "Lab Report Records added Successfully";
						res.json(data);
					}
					// res.json(data);
				}).error(function (err) {
				res.json(err);
				data["error"] = err;
			});
		}
		}
		else {
			data["error"] = 1;
			data["authResponse"] = "Token Required etc.";
			res.json(data);
		}
		})
		.error(function (err) {
			res.json(err);
			data["error"] = err;
		});
	}
	
	}catch (ex) {
		console.log(ex);
	}
	return res;
};

//get Lab Report 
exports.getLabReport = function (req, res) {

	try {
	
	var userid  = req.query.userid;
	var token   = req.query.token;
	//var reportid =req.query.reportid
	
	var data = {
		"error": 0,
		"authResponse": ""
	}
	
	db.user.authUser(token).then(function (response) {
	if (!!token) {
		if (response != '' && response != null) {
			if (response != '' && response != null) {
				var sql = "select *  from LabReport where userID='" + userid + "'";
				
				db.medicalReport.getLabReport(sql).then(function(response){
					data["error"] = 0;
					data["authResponse"] = "Action Successful";
					data['Data'] = response;
					res.json(data);
				})
				.error(function (err) {
					res.json(err);
				});
			}
		}
		
		//data["error"] = 0;
		//data["authResponse"] = "success";
		//res.json(data);
	} else {
		data["error"] = 1;
		data["authResponse"] = "Token Required etc.";
		res.json(data);
	}
	})
	.error(function (err) {
		res.json(err);
	});
	
	} catch (ex) {
		console.log(ex);
	}
	return res;
};
