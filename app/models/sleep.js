'use strict';

module.exports = function(sequelize, DataTypes) {

	var sleep = sequelize.define('sleep',
	{},
	{
			classMethods: {
				check_newRecord : (userID, uuID, startTime) => { // ,startTime
					var sql  = "SELECT * FROM sleep WHERE userID ='"+userID+"' and uuID ='"+uuID+"'and startTime ='"+startTime+"' limit 1;";
					return 	sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				}, 
				getLatestRecord: (userid,uuid) => {
					var sql="SELECT max(startTime) as maxTime from sleep WHERE userID='"+userid+"' and uuid ='"+uuid+"'; ";
					return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT});
				},
				setIsDeleted: (userID,uuID,startTime) => {
					var sql="UPDATE sleep SET isdeleted='1' WHERE userID='"+userID+"' and uuID= '"+uuID+"' and startTime ='"+startTime+"';";
					return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				},
				addSleep: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
				addSleepSetting: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
				updateSleepSetting: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				},
				getSleepSetting: function (userid) { 
				 
				var sql="SELECT * FROM WeHealthDB.sleepSetting where userid="+userid+""; 
				return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
				addWeekendSleepSettings: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
				updateWeekendSleepSettings: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				},
				getWeekendSleepSettings: function (userid) { 
				 
				var sql="SELECT * FROM WeHealthDB.weekendsleepsettings where userid="+userid+""; 
				return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
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
				getSleeps: function(userid, startDate, endDate) 
				{  
				var sql = "SELECT startTime AS start , endTime AS end, sleepID, uuID , sleepstate , deviceid from sleep WHERE userID='"+userid+"' and isdeleted=0 and date(startTime) BETWEEN date('"+startDate+"') AND date('"+endDate+"')";
				return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				},
				getSleepSteps: function(userid, startDate, endDate) 
				{  
				///var sql = "SELECT stepTime AS Date , stepQty AS Qty, sleepID from sleepstep WHERE userID='"+userid+"' and YEAR(stepTime) = YEAR(CURDATE())";
				var sql="SELECT stepTime AS Date , stepQty AS Qty, sleepID from sleepstep WHERE userID='"+userid+"' and date(stepTime) BETWEEN date('"+startDate+"') AND date('"+endDate+"')";
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
