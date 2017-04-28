'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');
var randtoken = require('rand-token');
var fs = require('fs');
var multer  = require('multer'); 




//============================================Add user Food images============================================/////////////////
exports.uploadfiles = function(req, res) {
  
var uniqueid = randtoken.generate(46); 


var id=req.body.id;
var dir='/home/umch/API/uploads/FoodData/'+id;
if(!!id)
{
if (!fs.existsSync(dir)){ 
    fs.mkdirSync(dir);
}

//////////////file uploads configration

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, dir);
  },
  filename: function (req, file, callback) {
    console.log(file);
    callback(null, file.originalname)
  }
});

var upload = multer({storage: storage}).single('photo');

///end configration

  upload(req, res, function(err) {
  if(err) {
  	
    console.log('Error Occured');
    return;
  }
  console.log(req.file); 
  res.end('Your File Uploaded'); 
  console.log('Photo Uploaded');
  });

}
else
{
	res.send({error:"1", authResponse:"user ID Required"});
}


	return res;
};

//////=================================Upload Medical Reports===================================================//////////////////
exports.uploadfilesmedicalreport = function(req, res) {
  
var uniqueid = randtoken.generate(46); 


var id=req.body.id;
var dir='/home/umch/API/uploads/medicalReports';


//////////////file uploads configration

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, dir);
  },
  filename: function (req, file, callback) {
    console.log(file);
    callback(null, uniqueid+'-'+file.originalname)
  }
});

var upload = multer({storage: storage}).single('photo');

///end configration

  upload(req, res, function(err) {
  if(err) {
  	console.log(err);
    console.log('Error Occured');
    return;
  }
  console.log(req.file); 
  res.end('Your File Uploaded'); 
  console.log('Photo Uploaded');
  });


	return res;
};


//============================================Add user Profile pictures============================================/////////////////

exports.uploaduserpic = function(req, res) {
 console.log(req.body); return false;
	var userid=req.body.userid;
	var token=req.body.token;

		var data={
		"error": 0 ,
		"authResponse":""
		}
		
			//heartRateType 0=resting heart rate, 1= active heart rate
		
		
		db.user.authUser(token).then(function(response){
		if(!!token)
		{
		if(response!='' && response!=null)
		{
		
		
		//////////////file uploads configration
				var dir='/home/umch/IDAS/API/uploads/Userimg';

				var storage = multer.diskStorage({
				destination: function (req, file, callback) {
				callback(null, dir);
				},
				filename: function (req, file, callback) {
				console.log(file);
				callback(null, file.originalname)
				}
				});

				var upload = multer({storage: storage}).single('photo');

				///end configration

				upload(req, res, function(err) {
				if(err) {

				console.log('Error Occured');
				return;
				}
				console.log(req.file); 
				res.end('Your File Uploaded'+req.file); 
				console.log('Photo Uploaded');
				});

				//////////////////////End File Uploads
		
		
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




///============================================get all files in the directory============================================////////////////

exports.fetchuploadfiles = function(req, res) {

	
	var userid=req.query.userid;
	var token=req.query.token;
		var data={
		"error": 0 ,
		"authResponse":""
		}
		
			
		
		
		db.user.authUser(token).then(function(response){
		if(!!token && !!userid)
		{
		if(response!='' && response!=null)
		{
	      
      /*
      *Fetch files from directory
       */
            var imageArray=[];
			var path='/home/umch/IDAS/API/uploads/FoodData/'+userid;	
          
			fs.readdir(path, function(err, items) {
			for (var i=0; i<items.length; i++) {
			//console.log(items[i]);

            imageArray.push({imageName:'http://58.26.233.148:3000/FoodData/'+userid+'/'+items[i]});

			}
          
          	data['Data']=imageArray;
			data["error"]=1;
			data["authResponse"] = "Action successful.";

			res.json(data);

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