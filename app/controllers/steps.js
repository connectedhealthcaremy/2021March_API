'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');

//============================================Add user Steps============================================/////////////////
exports.addSteps = function(req, res) {
   
		var data1=req.body.data;
		var startDate=req.body.startDate;
		var deviceid=req.body.uuID;
		var userid=req.body.userid;
		var token=req.body.token;
		var header_data=req.body.header_data;
		header_data=JSON.parse(header_data);
		data1=JSON.parse(data1);
	   var total=data1.length;
	   var header_total=header_data.length;

		var data={
		"error": 0 ,
		"authResponse":""
		}
		   
		//Get current Date	
		var date = new Date();
		
		var hour = date.getHours();
		hour = (hour < 10 ? "0" : "") + hour;
		
		var min  = date.getMinutes();
		min = (min < 10 ? "0" : "") + min;
		
		var sec  = date.getSeconds();
		sec = (sec < 10 ? "0" : "") + sec;
		
		var year = date.getFullYear();
		
		var month = date.getMonth() + 1;
		month = (month < 10 ? "0" : "") + month;
		
		var day  = date.getDate();
		day = (day < 10 ? "0" : "") + day;
		
		var current_date=year + ":" + month + ":" + day + " " + hour + ":" + min + ":" + sec;	
		
		
		db.user.authUser(token).then(function(response){
		if(!!token)
		{
		if(response!='' && response!=null)
		{
		
		/**************
        **Delete Duplicate Record of same uuid and date
        ****************/
        for(var j=0; j< header_total-1 ; j++)
			{
             var startDate=header_data[j].startDate;
             var uuID=header_data[j].uuID;
             var sql="update step set isdeleted='1' where userID='"+userid+"'  and YEAR(startTime)=YEAR('"+startDate+"') and MONTH(startTime)>=MONTH('"+startDate+"') and DAY(startTime)>=DAY('"+startDate+"') and uuID='"+uuID+"'";
			db.step.updateDuplicateData(userid,startDate,uuID).then(function(response){
				}).error(function(err){
				res.json(err);
				});
			}
            
            var startDate=header_data[header_total-1].startDate;
            var uuID=header_data[header_total-1].uuID;
            
          if(!!startDate && !!uuID)
            {  
              
            var sql="update step set isdeleted='1' where userID='"+userid+"'  and YEAR(startTime)=YEAR('"+startDate+"') and MONTH(startTime)>=MONTH('"+startDate+"') and DAY(startTime)>=DAY('"+startDate+"') and uuID='"+uuID+"'";
			
			////Last Update of data
			db.step.updateDuplicateData(userid,startDate,uuID).then(function(response){
           
           ///adding new steps
            var fres=add_new_steps(userid, current_date, data1, total,res);
            
            res.json(fres);

			}).error(function(err){
			res.json(err);
			});
            
            }
            else
            {
            	///adding new steps
            var fres=add_new_steps(userid, current_date, data1, total,res);
             res.json(fres);

            }	
 
		/****************
		**End Delete 
		*******************/


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


///////////////==========================function to add new steps======================================/////////////

function add_new_steps(userid, current_date, data1, total){

var data={
		"error": 0 ,
		"authResponse":""
		}

	       
            /*******
             **Adding new records
             ***********/
              
			  // var email=response;
		
			var sql = "INSERT INTO step (activityID, userID, entryTypeID, startTime, stepQty  , endTime,calories ,distance , uuID, isdeleted) values ";
			
			for(var i=0; i< total-1 ; i++)
			{
			var activityID=data1[i].activityID;
			var startTime=data1[i].startDateTime;

			
			var endTime=data1[i].endDateTime;  
			var stepQty=data1[i].stepQty; 
			var calories=data1[i].calorie;
            var distance=data1[i].distance;
            var uuID=data1[i].deviceuuid;
			
            if(endTime==''){endTime='';}
            if(calories==''){calories=0;}
            if(distance==''){distance=0;}
            if(uuID==''){uuID=0;} 

			sql += "('" + activityID + "','" + userid + "','" + 1 + "','" + startTime + "','" + stepQty + "','" + endTime + "','" + calories + "','" + distance + "','" + uuID + "','0'),";
			
			sql = sql.substr(0,sql.length);
			}
			var activityID=data1[total-1].activityID;
			var startTime=data1[total-1].startDateTime;
			
			var endTime=data1[total-1].endDateTime;   
			var stepQty=data1[total-1].stepQty;
			var calories=data1[total-1].calorie;
            var distance=data1[total-1].distance;
            var uuID=data1[total-1].deviceuuid;
			
            if(endTime==''){endTime='';}
            if(calories==''){calories=0;}
            if(distance==''){distance=0;}
            if(uuID==''){uuID=0;} 

			sql += "('" + activityID + "','" + userid + "','" + 1 + "','" + startTime + "','" + stepQty + "','" + endTime + "','" + calories + "','" + distance + "','" + uuID + "','0')";
		    
	
		    /***********
		    **Add new steps records
		    ****************/
		  
            	//console.log(sql);
				db.step.addSteps(sql);
				
				data["error"] = 0;
				data["authResponse"] = "Steps Added Successfully";
                return data;
				
				

/**************
  **End adding record to step
  ***************/

}

///////////////========================Get Steps Data=================================================/////////////////

exports.getSteps = function(req, res) {
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
				db.step.getSteps(userid).then(function(response){
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