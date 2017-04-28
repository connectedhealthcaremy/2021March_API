'use strict';

/**
 * Module dependencies.
 */
var db = require('../../config/sequelize'); 

/*************************************************Count Registered Users*************************************************************/ 

exports.countregiterusers = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.userProfessionalRegistration.countregistereduser(pid).then(function(response){
				 
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



/*************************************************All Registered Users*************************************************************/ 

exports.getregisteredUsersTrainer = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.userProfessionalRegistration.getregisteredUsersTrainer(pid).then(function(response){
				 
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

/*******************************************All registered professionals list*******************************************************/


exports.getregisteredProfessionals = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.userProfessionalRegistration.getregisteredProfessionals(pid).then(function(response){
				 
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
/************************************************* Registered Users Details for Trainer*************************************************************/ 

exports.getUserTrainerDetail = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.userProfessionalRegistration.getUserTrainerDetail(pid, userid).then(function(response){
				 
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

/************************************************* get user steps  for Trainer*************************************************************/ 

exports.getUserStepsTrainerDetail = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;

		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	 
	        
	 db.step.getStepsforTrainer(pid).then(function(response){
			console.log(response);    
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

/************************************************* get user steps  by dates for Trainer*************************************************************/ 
exports.getUserStepsbydatesTrainerDetail = function(req, res) {
 
	var token=req.query.token;
	var pid=req.query.pid;
	var date_from=req.query.date_from;
	var date_to=req.query.date_to;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	 
	
	 db.step.getStepsforTrainerbydates(pid, date_from, date_to).then(function(response){
				 
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


/************************************************* get user Sleep Data  for Trainer*************************************************************/ 

exports.getUsersleepTrainerDetail = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;

		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	 
	        
	 db.sleep.getSleepForTrainer(pid).then(function(response){
				 
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

/************************************************* get user Sleep Data by dates  for Trainer*************************************************************/ 

exports.getUsersleepTrainerDetailbyDates = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
    var date_from=req.query.date_from;
    var date_to=req.query.date_to;

		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	 
	        
	 db.sleep.getSleepForTrainerbydates(pid, date_from, date_to).then(function(response){
				 
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


/************************************************* get user weight  for Trainer*************************************************************/ 

exports.getUserWeightTrainerDetail = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.weight.getweightforTrainer(pid).then(function(response){
				 
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

/************************************************* get user weight by dates for Trainer*************************************************************/ 

exports.getweightbydates = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
	var date_from=req.query.date_from;
	var date_to=req.query.date_to;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.weight.getweightbydates(pid, date_from, date_to).then(function(response){
				 
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


/************************************************* get user body fat  for Trainer*************************************************************/ 

exports.getUserbodyfatTrainerDetail = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.fat.getfatfortrainer(pid).then(function(response){
				 
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

/************************************************* get user body fat  for Trainer by dates*************************************************************/ 

exports.getUserbodyfatTrainerbyDates = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
	var date_from=req.query.date_from;
    var date_to=req.query.date_to;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.fat.getfatfortrainerbydates(pid, date_from, date_to).then(function(response){
				 
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


/************************************************* get user BMR for Trainer*************************************************************/ 

exports.getUserbmrTrainerDetail = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.bmr.getbmrfortrainer(pid).then(function(response){
				 
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

/************************************************* get user BMR by dates for Trainer*************************************************************/ 

exports.getUserbmrTrainerDetailbydates = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
	var date_from=req.query.date_from;
	var date_to=req.query.date_to;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.bmr.getbmrbydates(pid, date_from, date_to).then(function(response){
				 
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

/************************************************* get user Visceral fat for Trainer*************************************************************/ 

exports.getvisceralfatforTrainer = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.visceralfat.getvisceralfatforTrainer(pid).then(function(response){
				 
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

/************************************************* get user Visceral fat for Trainer by dates*************************************************************/ 

exports.getvisceralfatforTrainerbyDates = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
	var date_from=req.query.date_from;
	var date_to=req.query.date_to;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.visceralfat.getvisceralfatbyDates(pid, date_from, date_to).then(function(response){
				 
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


/************************************************* get user glucose  for Trainer*************************************************************/ 

exports.getUserGlucoseTrainerDetail = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.checkByuserid(pid).then(function(response){
			
			var userid=response[0].userID;
			var email=response[0].email;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.glucose.getuserglucoselatest(email).then(function(response){
				 
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

/************************************************* get user glucose  for Trainer by dates*************************************************************/ 

exports.getUserGlucoseTrainerDetailByDates = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
	var date_from=req.query.date_from;
	var date_to=req.query.date_to;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.checkByuserid(pid).then(function(response){
			
			var userid=response[0].userID;
			var email=response[0].email;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.glucose.getuserglucosebydates(email, date_from, date_to).then(function(response){
				 
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


/************************************************* get user Blood Pressure  for Trainer*************************************************************/ 

exports.getUserBloodPressureTrainerDetail = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.checkByuserid(pid).then(function(response){
			
			var userid=response[0].userID;
			var email=response[0].email;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.bp.getbplatest(email).then(function(response){
				 
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

/************************************************* get user Blood Pressure  for Trainer by dates*************************************************************/ 

exports.getUserBloodPressureTrainerDetailbydates = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
	var date_from=req.query.date_from;
	var date_to=req.query.date_to;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.checkByuserid(pid).then(function(response){
			
			var userid=response[0].userID;
			var email=response[0].email;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.bp.getbpbydates(email, date_from, date_to).then(function(response){
				 
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


/************************************************* get user skinfold  for Trainer*************************************************************/ 

exports.getUserskinfoldTrainerDetail = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			var email=response[0].email;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.bodydensity.getlatestbodydensity(pid).then(function(response){
				 
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

/************************************************* get user skinfold detail  for Trainer*************************************************************/ 

exports.getUserskinfoldTrainerDetailbyDate = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
	var date_from=req.query.date_from;
	var date_to=req.query.date_to;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			var email=response[0].email;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.bodydensity.getlatestbodydensitybyDate(pid, date_from, date_to).then(function(response){
				 
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

/************************************************* get user waist to hip ratio  for Trainer*************************************************************/ 

exports.getUserwaisthipratioTrainerDetail = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			var email=response[0].email;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.waistcircumference.getwaistcircumferencefortrainer(pid).then(function(response){
				 
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


/************************************************* get user waist to hip ratio  for Trainer by dates*************************************************************/ 

exports.getUserwaisthipratioTrainerDetailbydates = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
	var date_from=req.query.date_from;
	var date_to=req.query.date_to;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			var email=response[0].email;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.waistcircumference.getwaistcircumferencebydates(pid, date_from, date_to).then(function(response){
				 
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


/************************************************* get user rock port walking test  for Trainer*************************************************************/ 

exports.getUserrockportTestTrainerDetail = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			var email=response[0].email;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.rockportwalkingtest.getrockportByMonth(pid).then(function(response){
				 
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


/************************************************* get user rock port walking test by dates  for Trainer*************************************************************/ 

exports.getUserrockportTestbyDates = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
	var date_from=req.query.date_from;
	var date_to=req.query.date_to;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			var email=response[0].email;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.rockportwalkingtest.getrockportbydates(pid, date_from, date_to).then(function(response){
				 
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

/************************************************* get user 2.4 km run test  for Trainer*************************************************************/ 

exports.getUserRunTestTrainerDetail = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			var email=response[0].email;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.runtest.getruntestByMonth(pid).then(function(response){
				 
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


/************************************************* get user 2.4 km run test by dates  for Trainer*************************************************************/ 

exports.getUserRunTestTrainerDetailBydates = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
	var date_from=req.query.date_from;
	var date_to=req.query.date_to;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			var email=response[0].email;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.runtest.getruntestbydates(pid, date_from, date_to).then(function(response){
				 
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


/************************************************* get user ymcs steps test  for Trainer*************************************************************/ 

exports.getUserYMCAStepTrainerDetail = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			var email=response[0].email;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.ymcasubmaxsteptest.getymcaByMonth(pid).then(function(response){
				 
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


/************************************************* get user ymcs steps by dates test  for Trainer*************************************************************/ 

exports.getUserYMCAStepTrainerDetailbyDates = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
	var date_from=req.query.date_from;
	var date_to=req.query.date_to;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			var email=response[0].email;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.ymcasubmaxsteptest.getymcabydates(pid, date_from, date_to).then(function(response){
				 
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


/************************************************* get user Push up  test  for Trainer*************************************************************/ 

exports.getUserPushUpTrainerDetail = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			var email=response[0].email;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.pushuptest.getpushuptestByMonth(pid).then(function(response){
				 
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


/************************************************* get user Push up  test by dates for Trainer*************************************************************/ 

exports.getUserPushUpTrainerDetailbyDates = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
	var date_from=req.query.date_from;
	var date_to=req.query.date_to;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			var email=response[0].email;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.pushuptest.getPushUptestbydates(pid, date_from, date_to).then(function(response){
				 
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


/************************************************* get user curl up test  for Trainer*************************************************************/ 

exports.getUserCurlUpTrainerDetail = function(req, res) {
  
	var token=req.query.token;
	var pid=req.query.pid;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			//var userid=response[0].userID;
			//var email=response[0].email;
			
		if(!!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.curluptest.getcurluptestByMonth(pid).then(function(response){
				 
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

/************************************************* get user curl up test by dates  for Trainer*************************************************************/ 

exports.getUserCurlUpTrainerDetailbyDates = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
	var date_from=req.query.date_from;
	var date_to=req.query.date_to;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			var email=response[0].email;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.curluptest.getCurlUptestbydates(pid, date_from, date_to).then(function(response){
				 
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


/************************************************* get user squats test  for Trainer*************************************************************/ 

exports.getUserSquatsTrainerDetail = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			var email=response[0].email;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.squattest.getsquatstestByMonth(pid).then(function(response){
				 
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



/************************************************* get user squats test by dates  for Trainer*************************************************************/ 

exports.getUserSquatsTrainerDetailByDates = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
	var date_from=req.query.date_from;
	var date_to=req.query.date_to;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			var email=response[0].email;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.squattest.getsquatstestbydates(pid, date_from, date_to).then(function(response){
				 
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


/************************************************* get user Long jump test  for Trainer*************************************************************/ 

exports.getUserLongjumpTrainerDetail = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			var email=response[0].email;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.standinglongjumptest.getlongjumptestByMonth(pid).then(function(response){
				 
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



/************************************************* get user Long jump test by dates  for Trainer*************************************************************/ 

exports.getUserLongjumpTrainerDetailByDates = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
	var date_from=req.query.date_from;
	var date_to=req.query.date_to;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			var email=response[0].email;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.standinglongjumptest.getlongjumptestbydates(pid, date_from, date_to).then(function(response){
				 
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


/************************************************* get user exercise heart rate test  for Trainer*************************************************************/ 

exports.getUserExerciseHeartRateTrainerDetail = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			var email=response[0].email;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.exercisetargetheartrate.getheartrateByMonth(pid).then(function(response){
				 
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


/************************************************* get user exercise heart rate test by dates  for Trainer*************************************************************/ 

exports.getUserExerciseHeartRateTrainerDetailByDates = function(req, res) {

	var token=req.query.token;
	var pid=req.query.pid;
	var date_from=req.query.date_from;
	var date_to=req.query.date_to;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
			
			var userid=response[0].userID;
			var email=response[0].email;
			
		if(!!userid && !!token)
		{
		if(response!='' && response!=null)
		{
	
	 db.exercisetargetheartrate.getheartratetestbydates(pid, date_from, date_to).then(function(response){
				 
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