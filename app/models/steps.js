'use strict';

module.exports = function(sequelize, DataTypes) {

	var step = sequelize.define('step',
	{},
	{
			classMethods: {
				setIsDeletedByID: stepID =>{
					let setDelSql = "update step set isdeleted='1' where stepID='"+stepID+"';";
					return sequelize.query(setDelSql,{ type: sequelize.QueryTypes.UPDATE});
				},
				updateIsDeleted : (userID,uuID,startDate) =>{
					var updatesql="update step set isdeleted='1' where userID='"+userID+"' and uuID='"+uuID+"' and startTime='"+startDate+"';";
					//console.log("updatesql : ",updatesql);
                    return sequelize.query(updatesql,{ type: sequelize.QueryTypes.UPDATE});

				},
				check_newDevice : (userid, uuID, startDate) =>{
					var sql  = "SELECT * FROM step WHERE userID ='"+userid+"' and uuID ='"+uuID+"' and startTime ='"+startDate+"';"; 
					return 	sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				},
				latestData : (userID,uuID) =>{
					var sql  = "SELECT max(startTime) as maxTime FROM step WHERE userID ='"+userID+"' and uuID ='"+uuID+"' and isdeleted ='0';"; 
					return 	sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				},
				latestDataID : (userID,uuID,maxTime) =>{
					var sql  = "SELECT stepID FROM step WHERE userID ='"+userID+"' and uuID='"+uuID+"' and startTime='"+maxTime+"' and isdeleted='0';"; 
					return 	sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				},
				addSteps: function (sql) {  
				
                return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
                updateDuplicateData: function(userid,startDate,deviceid)
                {
                	var updatesql="update step set isdeleted='1' where userID='"+userid+"'  and YEAR(startTime)=YEAR('"+startDate+"') and MONTH(startTime)>=MONTH('"+startDate+"') and DAY(startTime)>=DAY('"+startDate+"') and uuID='"+deviceid+"'";
                     return sequelize.query(updatesql,{ type: sequelize.QueryTypes.UPDATE});
                },
                selectDuplicateData: function(userid,startDate,deviceid)
                {
                	var sql="select COUNT(stepID) AS totalRows from step where isdeleted='0' and userID='"+userid+"'  and YEAR(startTime)=YEAR('"+startDate+"') and MONTH(startTime)>=MONTH('"+startDate+"') and DAY(startTime)>=DAY('"+startDate+"') and uuID='"+deviceid+"'";
                     return  sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
                }
				,
			   getSteps: function (userid, startDate, endDate)
			   { 
				   //var sql = "SELECT stepID, startTime AS startDateTime , endTime AS endDateTime , stepQty AS stepQty, case when calories IS NOT NULL then calories else 0 end as calorie, case when distance IS NOT NULL then distance else 0 end as distance, uuID as deviceuuid from step WHERE userID='"+userid+"' and isdeleted='0' and YEAR(startTime) = YEAR(CURDATE())";
				    var sql = "SELECT stepID, startTime AS startDateTime , endTime AS endDateTime , stepQty AS stepQty, case when calories IS NOT NULL then calories else 0 end as calorie, case when distance IS NOT NULL then distance else 0 end as distance, uuID as deviceuuid , deviceid from step WHERE userID='"+userid+"' and isdeleted='0' and date(startTime) BETWEEN date('"+startDate+"') AND date('"+endDate+"')";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
				getStepsforTrainer: function(userid){
                 
                                  
                 var sql="SELECT sum(stepQty) as totalSteps, SUM(calories) as caloriesQty, SUM(distance) as distanceQty,  startTime AS Date  FROM WeHealthDB.step where userID='"+userid+"' AND stepQty> 0 AND startTime between  CURDATE() - INTERVAL 30 DAY AND CURDATE() AND isdeleted='0' group by date(startTime)";
                    return sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}); 


				},
				getStepsforTrainerbydates: function(userid, date_from, date_to){ 
                 
                 date_from=date_from+' 00:00:00';  
                 date_to=date_to+' 23:59:59';                
                 var sql="SELECT sum(stepQty) as totalSteps, SUM(calories) as caloriesQty, SUM(distance) as distanceQty , startTime AS Date FROM WeHealthDB.step where userID='"+userid+"' AND stepQty> 0 AND isdeleted='0' AND startTime between '"+date_from+"' AND '"+date_to+"' group by date(startTime) order by startTime asc ;";
                  
                    return sequelize.query(sql, {type: sequelize.QueryTypes.SELECT});

				},
				get_user_challennge_ids: function(userid, end_date){
				 var sql=`select challenges.challengeID FROM WeHealthDB.challenges
							inner join challenges_user on challenges.challengeID=challenges_user.challengeID
							where challenges.challange_type=1 and challenges_user.userID=`+userid+` 
							and challenges.endDate > '`+end_date+`'`;
				 return sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}); 
                },
                get_user_challennge_ids: function(userid, end_date){
				 var sql=`select challenges.challengeID , challenges.startDate FROM WeHealthDB.challenges
							inner join challenges_user on challenges.challengeID=challenges_user.challengeID
							where challenges.challange_type=1 and challenges_user.userID=`+userid+` 
							and challenges.endDate > '`+end_date+`'`;
				 return sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}); 
                } ,
                get_challenge_activities_detail:function(challenge_id){
                	var sql=`SELECT challengeActivities, consective_number_days , consective_number_weeks , challengeID
                	 FROM WeHealthDB.challenges where challengeID='`+challenge_id+`'`;
                    return sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}); 
                } ,
                count_activity_points:function(activity){
                   var sql=`select points , target from reward_challangeActivityDetails 
                            where activity_type='`+activity+`'`;
                   return sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}); 
                },
                count_challenge_steps:function(user_id,week_start_date,week_end_date){ 
                	var sql=`SELECT sum(stepQty) as steps , date(startTime) as week_date FROM WeHealthDB.step where userID=`+user_id+` and stepQty > 0 and isdeleted=0 and 
                              date(startTime) between date('`+week_start_date+`') and date('`+week_end_date+`')`;
                	return sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}); 
                },
                check_previous_calc_date:function(user_id,week_start_date,week_end_date){
                	var sql=`SELECT id, calculationDate FROM WeHealthDB.challengeScore 
                	         where weekStartDate='`+week_start_date+`' and weekEndDate='`+week_end_date+`' and userID=`+user_id+``;
                	return sequelize.query(sql, {type: sequelize.QueryTypes.SELECT});
                },
                add_challenge_score:function(sql){
                	
                    return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
                }  	
			}
	}
	);

	return step;
};