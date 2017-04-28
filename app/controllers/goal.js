'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');

/************************
***Temprature Goals
************************/
//============================================Add user temprature Goal============================================/////////////////
exports.addtempratureGoal = function(req, res) {
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
		
		
			var sql = "INSERT INTO temperatureGoal (userid, goalBodyTemperature_start, goalBodyTemperature_end ) values ";
			
			for(var i=0; i< total-1 ; i++)
			{
			var goalBodyTemperature_start=data1[i].goalBodyTemperature_start;
			var goalBodyTemperature_end=data1[i].goalBodyTemperature_end;
			
			sql += "('"+userid+"','" + goalBodyTemperature_start + "','" + goalBodyTemperature_end + "'),";
			
			sql = sql.substr(0,sql.length); 
			}
			
			
			var goalBodyTemperature_start=data1[total-1].goalBodyTemperature_start;
			var goalBodyTemperature_end=data1[total-1].goalBodyTemperature_end;
			
			
			sql += "('"+userid+"','" + goalBodyTemperature_start + "','" + goalBodyTemperature_end + "')";
			
		 
		    db.kglosttarget.addtempratureGoal(sql).then(function(response){
				 
					data["error"] = 0;
					data["authResponse"] = "Temprature Goal Added Successfully";
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


///////////////========================Get Temprature  Goal=================================================/////////////////

exports.gettempratureGoal = function(req, res) {
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
			//var email=response[0].email;
			//res.json(email);
			///Get user info
				db.kglosttarget.getTempratureGoal(userid).then(function(response){
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

/************************
***Brain Activity Goal
************************/
//============================================Add user Brain Activity Goal============================================/////////////////
exports.addbrainactivityGoal = function(req, res) {
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
		
		
			var sql = "INSERT INTO BrainActivityGoal (userid, goalBrainActivity ) values ";
			
			for(var i=0; i< total-1 ; i++)
			{
			var goalBrainActivity=data1[i].goalBrainActivity;
			
			
			sql += "('"+userid+"','" + goalBrainActivity + "'),";
			
			sql = sql.substr(0,sql.length); 
			}
			
			
			var goalBrainActivity=data1[total-1].goalBrainActivity;
			
			
			
			sql += "('"+userid+"','" + goalBrainActivity + "')";
			
		 
		    db.kglosttarget.addbrainActivityGoal(sql).then(function(response){
				 
					data["error"] = 0;
					data["authResponse"] = "Brain Activity Goal Added Successfully";
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


///////////////========================Get Brain Activity  Goal=================================================/////////////////

exports.getbrainactivityGoal = function(req, res) {
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
			//var email=response[0].email;
			//res.json(email);
			///Get user info
				db.kglosttarget.getBrainActivityGoal(userid).then(function(response){
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


/************************
***Calorie Goal
************************/
//============================================Add user Calorie Goal============================================/////////////////
exports.addcalorieGoal = function(req, res) {
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
		
		
			var sql = "INSERT INTO calorieGoal (userid, goalCalorieIntake ) values ";
			
			for(var i=0; i< total-1 ; i++)
			{
			var goalCalorieIntake=data1[i].goalCalorieIntake;
			
			
			sql += "('"+userid+"','" + goalCalorieIntake + "'),";
			
			sql = sql.substr(0,sql.length); 
			}
			
			
			var goalCalorieIntake=data1[total-1].goalCalorieIntake;
			
			
			
			sql += "('"+userid+"','" + goalCalorieIntake + "')";
			
		 
		    db.kglosttarget.addcalorieGoal(sql).then(function(response){
				 
					data["error"] = 0;
					data["authResponse"] = "Calorie Goal Added Successfully";
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


///////////////========================Get Calorie  Goal=================================================/////////////////

exports.getcalorieGoal = function(req, res) {
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
			//var email=response[0].email;
			//res.json(email);
			///Get user info
				db.kglosttarget.getCalorieGoal(userid).then(function(response){
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

/************************
***Exercise Goal
************************/
//============================================Add user exercise Goal============================================/////////////////
exports.addexerciseGoal = function(req, res) {
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
		
		
			var sql = "INSERT INTO exerciseGoal (userid, goalExercise ) values ";
			
			for(var i=0; i< total-1 ; i++)
			{
			var goalExercise=data1[i].goalExercise;
			
			
			sql += "('"+userid+"','" + goalExercise + "'),";
			
			sql = sql.substr(0,sql.length); 
			}
			
			
			var goalExercise=data1[total-1].goalExercise;
			
			
			
			sql += "('"+userid+"','" + goalExercise + "')";
			
		 
		    db.kglosttarget.addcalorieGoal(sql).then(function(response){
				 
					data["error"] = 0;
					data["authResponse"] = "exercise Goal Added Successfully";
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


///////////////========================Get Exercise  Goal=================================================/////////////////

exports.getexerciseGoal = function(req, res) {
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
			//var email=response[0].email;
			//res.json(email);
			///Get user info
				db.kglosttarget.getExerciseGoal(userid).then(function(response){
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


/************************
***Heart Rate Goal
************************/
//============================================Add user Heart Rate Goal============================================/////////////////
exports.addheartrateGoal = function(req, res) {
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
		
		
			var sql = "INSERT INTO heartrateGoal (userid, goalHeartRate_Start, goalHeartRate_End ) values ";
			
			for(var i=0; i< total-1 ; i++)
			{
			var goalHeartRate_Start=data1[i].goalHeartRate_Start;
			var goalHeartRate_End=data1[i].goalHeartRate_End;
			
			
			sql += "('"+userid+"','" + goalHeartRate_Start + "','" + goalHeartRate_End + "'),";
			
			sql = sql.substr(0,sql.length); 
			}
			
			
			var goalHeartRate_Start=data1[total-1].goalHeartRate_Start;
			var goalHeartRate_End=data1[total-1].goalHeartRate_End;
			
			sql += "('"+userid+"','" + goalHeartRate_Start + "','" + goalHeartRate_End + "')";
			
		 
		    db.kglosttarget.addHeartRateGoal(sql).then(function(response){
				 
					data["error"] = 0;
					data["authResponse"] = "Heart Rate Goal Added Successfully";
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


///////////////========================Get heart rate  Goal=================================================/////////////////

exports.getheartrateGoal = function(req, res) { 
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
			//var email=response[0].email;
			//res.json(email);
			///Get user info
				db.kglosttarget.getHeartRateGoal(userid).then(function(response){
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



/************************
***Oxygen Goal
************************/
//============================================Add user oxygen Goal============================================/////////////////
exports.addoxygenGoal = function(req, res) {
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
		
		
			var sql = "INSERT INTO oxygenGoal (userid, goalOxygen_Start, goalOxygen_End ) values ";
			
			for(var i=0; i< total-1 ; i++)
			{
			var goalOxygen_Start=data1[i].goalOxygen_Start;
			var goalOxygen_End=data1[i].goalOxygen_End;
			
			
			sql += "('"+userid+"','" + goalOxygen_Start + "','" + goalOxygen_End + "'),";
			
			sql = sql.substr(0,sql.length); 
			}
			
			
			var goalOxygen_Start=data1[total-1].goalOxygen_Start;
			var goalOxygen_End=data1[total-1].goalOxygen_End;
			
			sql += "('"+userid+"','" + goalOxygen_Start + "','" + goalOxygen_End + "')";
			
		 
		    db.kglosttarget.addOxygenGoal(sql).then(function(response){
				 
					data["error"] = 0;
					data["authResponse"] = "Oxygen Goal Added Successfully";
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


///////////////========================Get oxygen  Goal=================================================/////////////////

exports.getoxygenGoal = function(req, res) { 
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
			//var email=response[0].email;
			//res.json(email);
			///Get user info
				db.kglosttarget.getOxygenGoal(userid).then(function(response){
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


/************************
***Sleep Goal
************************/
//============================================Add user Sleep Goal============================================/////////////////
exports.addsleepGoal = function(req, res) {
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
		
		
			var sql = "INSERT INTO sleepGoal (userid, goalTotalSleepMin, goalTotalDeepSleepMin, goalTotalLightSleepMin ) values ";
			
			for(var i=0; i< total-1 ; i++)
			{
			var goalTotalSleepMin=data1[i].goalTotalSleepMin;
			var goalTotalDeepSleepMin=data1[i].goalTotalDeepSleepMin;
			var goalTotalLightSleepMin=data1[i].goalTotalLightSleepMin;
			
			
			sql += "('"+userid+"','" + goalTotalSleepMin + "','" + goalTotalDeepSleepMin + "','" + goalTotalLightSleepMin + "'),";
			
			sql = sql.substr(0,sql.length); 
			}
			
			
			var goalTotalSleepMin=data1[total-1].goalTotalSleepMin;
			var goalTotalDeepSleepMin=data1[total-1].goalTotalDeepSleepMin;
			var goalTotalLightSleepMin=data1[total-1].goalTotalLightSleepMin;
			
			sql += "('"+userid+"','" + goalTotalSleepMin + "','" + goalTotalDeepSleepMin + "','" + goalTotalLightSleepMin + "')";
			
		 
		    db.kglosttarget.addSleepGoal(sql).then(function(response){
				 
					data["error"] = 0;
					data["authResponse"] = "Sleep Goal Added Successfully";
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


///////////////========================Get sleep  Goal=================================================/////////////////

exports.getsleepGoal = function(req, res) { 
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
			//var email=response[0].email;
			//res.json(email);
			///Get user info
				db.kglosttarget.getSleepGoal(userid).then(function(response){
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



/************************
***Step Goal
************************/
//============================================Add user step Goal============================================/////////////////
exports.addstepGoal = function(req, res) {
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
		
		
			var sql = "INSERT INTO stepGoal (userid, goalSteps ) values ";
			
			for(var i=0; i< total-1 ; i++)
			{
			var goalSteps=data1[i].goalSteps;
			
			
			
			sql += "('"+userid+"','" + goalSteps + "'),";
			
			sql = sql.substr(0,sql.length); 
			}
			
			
			var goalSteps=data1[total-1].goalSteps;
			
			sql += "('"+userid+"','" + goalSteps + "')";
			
		 
		    db.kglosttarget.addStepGoal(sql).then(function(response){
				 
					data["error"] = 0;
					data["authResponse"] = "Step Goal Added Successfully";
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


///////////////========================Get step  Goal=================================================/////////////////

exports.getstepGoal = function(req, res) { 
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
			//var email=response[0].email;
			//res.json(email);
			///Get user info
				db.kglosttarget.getStepGoal(userid).then(function(response){
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


/************************
***water intake Goal
************************/
//============================================Add user water intake Goal============================================/////////////////
exports.addwaterintakeGoal = function(req, res) {
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
		
		
			var sql = "INSERT INTO waterintakeGoal (userid, goalWaterIntake ) values ";
			
			for(var i=0; i< total-1 ; i++)
			{
			var goalWaterIntake=data1[i].goalWaterIntake;
			
			
			
			sql += "('"+userid+"','" + goalWaterIntake + "'),";
			
			sql = sql.substr(0,sql.length); 
			}
			
			
			var goalWaterIntake=data1[total-1].goalWaterIntake;
			
			sql += "('"+userid+"','" + goalWaterIntake + "')";
			
		 
		    db.kglosttarget.addWaterIntakeGoal(sql).then(function(response){
				 
					data["error"] = 0;
					data["authResponse"] = "water intake Goal Added Successfully";
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


///////////////========================Get water intake  Goal=================================================/////////////////

exports.getwaterintakeGoal = function(req, res) { 
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
			//var email=response[0].email;
			//res.json(email);
			///Get user info
				db.kglosttarget.getWaterIntakeGoal(userid).then(function(response){
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



/************************
***weight Goal
************************/
//============================================Add user  weight Goal============================================/////////////////
exports.addweightGoal = function(req, res) {
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
		
		
			var sql = "INSERT INTO weightGoal (userid, weight_initial, weight_end, weight_difference, calories_deficit , difficulties, weight_loss_week, start_date, end_date, days_needed ) values ";
			
			for(var i=0; i< total-1 ; i++)
			{
			var weight_initial=data1[i].weight_initial;
			var weight_end=data1[i].weight_end;
			var weight_difference=data1[i].weight_difference;
			var calories_deficit=data1[i].calories_deficit;
			var difficulties=data1[i].difficulties;
			var weight_loss_week=data1[i].weight_loss_week;
			var start_date=data1[i].start_date;
			var end_date=data1[i].end_date;
			var days_needed=data1[i].days_needed;
			
			
			
			sql += "('"+userid+"','" + weight_initial + "','" + weight_end + "','" + weight_difference + "','" + calories_deficit + "','" + difficulties + "','" + weight_loss_week + "','" + start_date + "','" + end_date + "','" + days_needed + "'),";
			
			sql = sql.substr(0,sql.length); 
			}
			
			var weight_initial=data1[total-1].weight_initial;
			var weight_end=data1[total-1].weight_end;
			var weight_difference=data1[total-1].weight_difference;
			var calories_deficit=data1[total-1].calories_deficit;
			var difficulties=data1[total-1].difficulties;
			var weight_loss_week=data1[total-1].weight_loss_week;
			var start_date=data1[total-1].start_date;
			var end_date=data1[total-1].end_date;
			var days_needed=data1[total-1].days_needed;
			
			sql += "('"+userid+"','" + weight_initial + "','" + weight_end + "','" + weight_difference + "','" + calories_deficit + "','" + difficulties + "','" + weight_loss_week + "','" + start_date + "','" + end_date + "','" + days_needed + "')";
			
		 
		    db.kglosttarget.addWeightGoal(sql).then(function(response){
				 
					data["error"] = 0;
					data["authResponse"] = "Weight Goal Added Successfully";
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


///////////////========================Get wweight  Goal=================================================/////////////////

exports.getweightGoal = function(req, res) { 
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
			//var email=response[0].email;
			//res.json(email);
			///Get user info
				db.kglosttarget.getWeightGoal(userid).then(function(response){
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



/*//============================================Add user weight Goal============================================/////////////////
exports.addweightGoal1 = function(req, res) {
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
		
		
			var sql = "INSERT INTO kglosttarget (user, startDate, initialweight, targetdate, targetlost, lossMode ) values ";
			
			for(var i=0; i< total-1 ; i++)
			{
			var startdate=data1[i].startdate;
			var enddate=data1[i].enddate;
			var initialweight=data1[i].initialweight;
			var endweight=data1[i].endweight; 
			var difficulty=data1[i].difficulty; 
			sql += "('" + email + "','" + startdate + "','" + initialweight + "','" + enddate + "','" + endweight + "','" + difficulty + "'),";
			
			sql = sql.substr(0,sql.length);
			}
			
			var startdate=data1[total-1].startdate;
			var enddate=data1[total-1].enddate;
			var initialweight=data1[total-1].initialweight;
			var endweight=data1[total-1].endweight; 
			var difficulty=data1[total-1].difficulty; 
			
			sql += "('" + email + "','" + startdate + "','" + initialweight + "','" + enddate + "','" + endweight + "','" + difficulty + "')";
			
		 
		    db.kglosttarget.addkglosttarget(sql).then(function(response){
				 
					data["error"] = 0;
					data["authResponse"] = "weight Goal Added Successfully";
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

///////////////========================Get user weight Data Goal=================================================/////////////////

exports.getweightGoal1 = function(req, res) {
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
			//res.json(email);
			///Get user info
				db.kglosttarget.getkglosttarget(email).then(function(response){
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


