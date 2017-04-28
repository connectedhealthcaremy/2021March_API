'use strict';

module.exports = function(sequelize, DataTypes) {

	var runtest = sequelize.define('runtest',
	{},
	{
			classMethods: {
				addruntest: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
				updateruntest: function(sql) 
				{
					return sequelize.query(sql,{type: sequelize.QueryTypes.UPDATE});
				},
				deleteruntest: function(sql)
				{
					return sequelize.query(sql,{type: sequelize.QueryTypes.UPDATE});
				},
				lastAddIDs: function (lastinsertid) { 
				
				var sql = "SELECT id from runtest WHERE id >='"+lastinsertid+"' AND isdeleted='0'";
				  return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
				getsingleruntest: function(id) 
				{
				   var sql = "SELECT * from runtest WHERE id ='"+id+"' AND isdeleted='0'";
				   return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					}
				,
			  getruntestbydates: function (userid,startdate,enddate)
			   {
				   var sql = "SELECT * from runtest WHERE recorddatetime BETWEEN '"+startdate+"' AND '"+enddate+"' AND userid='"+userid+"' AND isdeleted='0' order by id DESC";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
			   getruntest: function (userid)
			   {
				   var sql = "SELECT id, userid, timetaken as timetaken, recorddatetime as date, vo2max as vo2max, predicted1time as predicted1time, predicted5time as predicted5time, predicted10time as predicted10time from runtest WHERE userid='"+userid+"'";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
		   	getruntestAverage: function (userid)
			   {
				   var sql = "SELECT SUM(vo2max) as sum_vo2max, COUNT(vo2max) as total, MIN(vo2max) as min_vo2max, MAX(vo2max) as max_vo2max from runtest WHERE userid='"+userid+"' AND isdeleted='0'";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   } 
				   ,
		   	getruntestAverageByDays: function (userid,startdate,enddate)
			   {
				   var sql = "SELECT SUM(vo2max) as sum_vo2max, COUNT(vo2max) as total, MIN(vo2max) as min_vo2max, MAX(vo2max) as max_vo2max from runtest WHERE recorddatetime BETWEEN '"+startdate+"' AND '"+enddate+"' AND userid='"+userid+"' AND isdeleted='0'";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   } ,
		   	getruntestByMonth: function (userid)
			   {
				   var sql = "SELECT * from runtest WHERE recorddatetime BETWEEN NOW() - INTERVAL 30 DAY AND NOW() AND userid='"+userid+"' AND isdeleted='0' ORDER BY id DESC "; 
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }     
				   	
			}
	}
	);

	return runtest;
};
