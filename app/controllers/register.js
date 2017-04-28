'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');
var randtoken = require('rand-token');
var md5 = require('md5');

exports.adduser = function(req, res) {
		var username = req.body.email;
		var email =req.body.email;
		var password = req.body.password;
		var token = randtoken.generate(32);
		var realpwd=randtoken.generate(32);
		var deviceID=req.body.deviceID;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		if(!!username && !!email && !!password){
		///check user
		db.user.checkUser(username).then(function(response){
		
		if(response!='' && response!=null)
		{
			data["error"]=1;
			data["authResponse"] = "Email Already Exist.";
			res.json(data);
			}
		else
		{
			///Insert New User
			
			password=md5(password);
			
			db.user.newUser(username,email,password,token,realpwd, deviceID).then(function(response){
			data["error"] = 0;
			data["authResponse"] = "user Added Successfully";
			data['data']=response;
			res.json(data);
			})
			.error(function(err){
			res.json(err);
			});
			}
		})
		.error(function(err){
		res.json(err);
		});
		}
		else{
			data["error"]=1;
			data["authResponse"] = "Please provide all required data (i.e : email, Password)";
			res.json(data);
		//connection.end()
		}

      return res;
};
