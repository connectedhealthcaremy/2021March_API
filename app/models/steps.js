'use strict';

module.exports = function(sequelize, DataTypes) {

	var step = sequelize.define('step',
	{},
	{
			classMethods: {
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
			   getSteps: function (userid)
			   {
				   var sql = "SELECT stepID, startTime AS startDateTime , endTime AS endDateTime , stepQty AS stepQty, case when calories IS NOT NULL then calories else 0 end as calorie, case when distance IS NOT NULL then distance else 0 end as distance, uuID as deviceuuid from step WHERE userID='"+userid+"' and isdeleted='0'";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
				getStepsforTrainer: function(userid){
                 
                                  
                 var sql="SELECT sum(stepQty) as totalSteps, SUM(calories) as caloriesQty, SUM(distance) as distanceQty,  startTime AS Date  FROM umch.step where userID='"+userid+"' AND stepQty> 0 AND startTime between  CURDATE() - INTERVAL 30 DAY AND CURDATE() AND isdeleted='0' group by date(startTime)";
                    return sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}); 


				},
				getStepsforTrainerbydates: function(userid, date_from, date_to){ 
                 
                 date_from=date_from+' 00:00:00';  
                 date_to=date_to+' 23:59:59';                
                 var sql="SELECT sum(stepQty) as totalSteps, SUM(calories) as caloriesQty, SUM(distance) as distanceQty , startTime AS Date FROM umch.step where userID='"+userid+"' AND stepQty> 0 AND isdeleted='0' AND startTime between '"+date_from+"' AND '"+date_to+"' group by date(startTime) order by startTime asc ;";
                  
                    return sequelize.query(sql, {type: sequelize.QueryTypes.SELECT});

				}   	
			}
	}
	);

	return step;
};