'use strict';

module.exports = function(sequelize, DataTypes) {

	var sleep = sequelize.define('sleep',
	{},
	{
			classMethods: {
				addSleep: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
				updateDuplicateData: function(userid,startDate,deviceid)
                { 
                	var updatesql="update sleep set isdeleted='1' where userID='"+userid+"'  and YEAR(startTime)=YEAR('"+startDate+"') and MONTH(startTime)>=MONTH('"+startDate+"') and DAY(startTime)>=DAY('"+startDate+"') and uuID='"+deviceid+"'";
                 
                     return sequelize.query(updatesql,{ type: sequelize.QueryTypes.UPDATE}); 
                },  
				getSleepID: function (userid)
				{
				var sql = "SELECT * from sleep WHERE userID='"+userid+"'";
				return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});

				},
				addSleepSteps: function (sql)
				{
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				}
				,
				getprevSleepID: function(userid , startTime , endTime)
				{
				var sql = "SELECT sleepID FROM sleep WHERE userID='"+userid+"' and startTime >= '"+startTime+"' and endTime <= '"+endTime+"'";
				return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				},
				getSleeps: function(userid) 
				{  
				var sql = "SELECT startTime AS start , endTime AS end from sleep WHERE userID='"+userid+"'";
				return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				},
				getSleepSteps: function(userid) 
				{  
				var sql = "SELECT stepTime AS Date , stepQty AS Qty from sleepstep WHERE userID='"+userid+"'";
				return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				},
				getSleepForTrainer: function(userid) 
				{  
				var sql = "SELECT sleepID, startTime as start, endTime as end, time_format(timediff(endTime,startTime),'%H.%i') as hours  FROM sleep WHERE userID='"+userid+"'AND startTime between  CURDATE() - INTERVAL 30 DAY AND CURDATE()";
				return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				},
				getSleepForTrainerbydates: function(userid, date_from, date_to)
				{
					date_from=date_from+' 00:00:00'; 
                    date_to=date_to+' 23:59:59'; 
					var sql = "SELECT sleepID, startTime as start, endTime as end, time_format(timediff(endTime,startTime),'%H.%i') as hours  FROM sleep WHERE userID='"+userid+"' and startTime between '"+date_from+"' and '"+date_to+"' ";
					
					return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});

				}

				  	  	   	
			}
	}
	);

	return sleep;
};
