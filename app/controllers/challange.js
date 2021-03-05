'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');

///////////////========================Get all Challanges=================================================/////////////////

exports.get_challenges = function(req, res) {
	var userid = req.query.userid;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!userid) {
		///Authinticate user
		
				if (userid != '' && userid != null) {

					db.challenges.all_challanges(userid).then(function(response) {
							data["error"] = 0;
							data["authResponse"] = "Action Successful";
							data['Data'] = response;
							res.json(data);

						})
						.error(function(err) {
							res.json(err);
						});

				} else {
					data["error"] = 1;
					data["authResponse"] = "Authentication Failed.";
					res.json(data);

				}
			
	} else {
		data["error"] = 1;
		data["authResponse"] = "Please provide all required data (i.e : user ID etc)";
		res.json(data);
		//connection.end()
	}

	return res;
};


///////////////========================Get target all Challanges statuts=================================================/////////////////

exports.get_target_challanges_status = function(req, res) {
	var userid = req.query.userid;
	var challengeID = req.query.challengeID;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!userid) {
		///Authinticate user
		
				if (userid != '' && userid != null && challengeID != '' && challengeID != null) {

					db.challenges.get_target_challanges_status(userid, challengeID).then(function(response) {
							data["error"] = 0;
							data["authResponse"] = "Action Successful";
							data['Data'] = response;
							res.json(data);

						})
						.error(function(err) {
							res.json(err);
						});

				} else {
					data["error"] = 1;
					data["authResponse"] = "Authentication Failed.";
					res.json(data);

				}
			
	} else {
		data["error"] = 1;
		data["authResponse"] = "Please provide all required data (i.e : user ID etc)";
		res.json(data);
		//connection.end()
	}

	return res;
};


///////////////========================Get target all Challanges Details=================================================/////////////////

exports.get_target_challanges_details = function(req, res) {
	var userid = req.query.userid;
	var challengeID = req.query.challengeID;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!userid) {
		///Authinticate user
		
				if (userid != '' && userid != null && challengeID != '' && challengeID != null) {

					db.challenges.get_target_challanges_details(userid, challengeID).then(function(response) {
							data["error"] = 0;
							data["authResponse"] = "Action Successful";
							data['Data'] = response;
							res.json(data);

						})
						.error(function(err) {
							res.json(err);
						});

				} else {
					data["error"] = 1;
					data["authResponse"] = "Authentication Failed.";
					res.json(data);

				}
			
	} else {
		data["error"] = 1;
		data["authResponse"] = "Please provide all required data (i.e : user ID etc)";
		res.json(data);
		//connection.end()
	}

	return res;
};

///////////////========================Update all Challanges=================================================/////////////////
exports.update_challanges = function(req, res) {

	var userid=req.body.userid;
	var token=req.body.token;
	var challangeID=req.body.challangeID;
	
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
		db.user.authUser(token).then(function(response){
		if(!!token)
		{
		if(response!='' && response!=null)
		{
		
		    var sql="UPDATE challenges_user SET status=1 WHERE challengeID="+challangeID+" and userID="+userid+"";
		    
			db.challenges.update_challanges(sql).then(function(response){
					

					data["error"] = 0;
					data["authResponse"] = "Challange Status Updated Successfully";
					data['id']=response;
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