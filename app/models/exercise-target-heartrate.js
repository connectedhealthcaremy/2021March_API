'use strict';

module.exports = function(sequelize, DataTypes) {

	var exercisetargetheartrate = sequelize.define('exercisetargetheartrate',
	{},
	{
			classMethods: {
				addheartratetest: function (sql) {      
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
				lastAddIDs: function (lastinsertid) { 
				
				var sql = "SELECT id from exercisetargetheartrate WHERE id >='"+lastinsertid+"' AND isdeleted='0'";
				  return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
				getsingletest: function (id) { 
				
				var sql = "SELECT * from exercisetargetheartrate WHERE id ='"+id+"' AND isdeleted='0'";
				  return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
				updateheartratetest: function (sql) {      
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				},
				deleteheartratetest: function (sql) {      
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				}
				,
			  getheartratetestbydates: function (userid,startdate,enddate)
			   {
				   var sql = "SELECT * from exercisetargetheartrate WHERE recorddatetime BETWEEN '"+startdate+"' AND '"+enddate+"' AND userid='"+userid+"' AND isdeleted='0' order by recorddatetime asc";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
			   getheartratetest: function (userid)
			   {
				   var sql = "SELECT id, Userid as userid, restHeartRate as restHeartRate, LowTrainingZoneVal as LowTrainingZoneVal, UpTrainingZoneVal as UpTrainingZoneVal, vo2max as vo2max , recorddatetime as date from exercisetargetheartrate WHERE userid='"+userid+"' AND isdeleted='0'";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }
				   ,
		   	getheartratetestAverageByDays: function (userid,startdate,enddate)
			   {
				   var sql = "SELECT SUM(vo2max) as sum_vo2max, COUNT(vo2max) as total, MIN(vo2max) as min_vo2max, MAX(vo2max) as max_vo2max from exercisetargetheartrate WHERE recorddatetime BETWEEN '"+startdate+"' AND '"+enddate+"' AND userid='"+userid+"' AND isdeleted='0'";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   } ,
		   	getheartrateByMonth: function (userid)
			   {
				   var sql = "SELECT * from exercisetargetheartrate WHERE recorddatetime BETWEEN NOW() - INTERVAL 30 DAY AND NOW() AND userid='"+userid+"' AND isdeleted='0' ORDER BY id DESC "; 
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }  
				   	
			}
	}
	);

	return exercisetargetheartrate;
};
