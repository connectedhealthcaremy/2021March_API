'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');
var randtoken = require('rand-token');
var fs = require('fs');
var multer  = require('multer'); 


//============================================Add user Profile pictures============================================/////////////////

exports.uploaduserpic = function (req, res) {

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


//============================================Add MedicalReportDoc === Upload Lab + Medical file & pictures============================================/////////////////

exports.uploadlabreport = function (req, res) {
	console.log(req.body); return false;
	
	var userid = req.body.userid;
	var token = req.body.token;
	var reportid = req.body.reportid;
	var reporttype = req.body.reporttype;
	
	console.log("USer ID =============" + userid + "Token ===============" + token + "Report ID ================" + reportid);
	
	var data = {
		"error": 0,
		"authResponse": ""
	}
	
	try {
	db.user.authUser(token).then(function (response) {
	if (!!token) {
		if (response != '' && response != null) {
			////////////// file uploads configration
			var dir = '/home/umch/API/uploads/medicalReports';
			
			var storage = multer.diskStorage({
			destination: function (req, file, callback) {
				callback(null, dir);
			},
			filename: function (req, file, callback) {
				console.log(file);
				callback(null, file.originalname)
			}
			});
			
			var upload = multer({ storage: storage }).single('photo');
			///end configration
			
			upload(req, res, function (err) {
			if (err) {
				console.log('Error Occured');
				return;
			}
			console.log("===============================================Uploaded File name ========================================================================" + req.file);
			
			// Insert Lab Report Entery in the database 
			
			var sql1 = "INSERT INTO MedicalReportDoc (userID, reportID, reporttype, reportpath) VALUES ('" + userid + "', '" + reportid + "', '" + reporttype + "', '" + req.file + "')";
			console.log(sql1);
			db.user.socialregister(sql1).then(function (response) {
				var id = response;
			})
			.error(function (err) {
				res.json(err);
			});
			
			//Insert Lab Report Entery in the database 
			
			res.end('Your File Uploaded' + req.file);
			console.log('Photo Uploaded');
			});
			//////////////////////End File Uploads
		}
		else {
			data["error"] = 1;
			data["authResponse"] = "Authentication Failed.";
			res.json(data);
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
 	});
	} catch (ex) { console.log(ex);}
	return res;
};


//============================================Get MedicalReportDoc === Download Lab + Medical file & pictures============================================/////////////////

exports.downloadlabreport = function (req, res) {

	//console.log(req.body); return false;
	
	var userid = req.query.userid;
	var reportid = req.query.reportid;
	var reporttype = req.query.reporttype;
	var token = req.query.token;
	
	var data = {
		"error": 0,
		"authResponse": ""
	}
	
	db.user.authUser(token).then(function (response) {
	if (!!token) {
		if (response != '' && response != null) {
		   
			var sql = "select * from MedicalReportDoc where userID='" + userid + "' and reportid='" + reportid + "' and reporttype='" + reporttype + "'";
                        console.log(sql);
			db.user.getUsername(sql).then(function (response) {
				data["error"] = 0;
				data["authResponse"] = "Action Successful";
				data['Data'] = response;
                                console.log(data);
				res.json(data);
			})
			.error(function (err) {
				res.json(err);
			});
		}
		else {
			data["error"] = 1;
			data["authResponse"] = "Authentication Failed.";
			res.json(data);
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
	});
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
		callback(null, uniqueid + '-' + file.originalname)
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


exports.saveMedia = function (req, res) {

    var userid = req.body.userid;
    var token = req.body.token;
    var reportid = req.body.reportid;
    var image = req.body.image;


    var data = {
        "error": 0,
        "authResponse": ""
    }


    //console.log(image);

    var dir = '/var/www/html/labreports/' + reportid + '.png';

    console.log(dir);

    var base64Data = image.replace(/^data:image\/png;base64,/, "");

    require("fs").writeFile(dir, base64Data, 'base64', function (err) {
        console.log(err);
    });
    dir = dir.replace('/var/www/html',"");
    //    // Insert LAb Report Entery in the database 
    var sql1 =     "INSERT INTO MedicalReportDoc (userID, reportID, reporttype, reportpath) VALUES ('" + userid + "', '" + reportid + "', 0, '" + dir + "')";
    //var sql1 = "INSERT INTO MedicalReportDoc(userid, ReportPath,inserdatetime,reportid) VALUES ('" + userid + "', '" + dir + "', '" + "4-8-2018" + "', '" + reportid + "')";
    console.log(sql1);
    db.user.socialregister(sql1).then(function (response) {
        var id = response;
    })
        .error(function (err) {
            res.json(err);
        });

    //    //Insert Lab Report Entery in the database 

    data["error"] = 0;
    data["authResponse"] = "Medical Report uploaded Successfully.";
    res.json(data);

    return res;

};


//============================================Add user Food images - NOT USE - GHALIB USE FOOD SERVER============================================/////////////////
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
