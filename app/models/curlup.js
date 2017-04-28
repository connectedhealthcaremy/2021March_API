'use strict';

module.exports = function(sequelize, DataTypes) {

	var curluptest = sequelize.define('curluptest',
	{},
	{
			classMethods: {
				addcurluptest: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
				lastAddIDs: function (lastinsertid) { 
				
				var sql = "SELECT id from curluptest WHERE id >='"+lastinsertid+"'";
				  return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
				getsingletest: function (id) { 
				
				var sql = "SELECT * from curluptest WHERE id ='"+id+"'";
				  return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
				updatecurluptest: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				},
				deletecurluptest: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				},
			  getCurlUptestbydates: function (userid,startdate,enddate)
			   {
				   var sql = "SELECT * from curluptest WHERE recorddatetime BETWEEN '"+startdate+"' AND '"+enddate+"' AND userid='"+userid+"' order by id DESC";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
			getCurlUptestbydates1: function (userid,startdate,enddate)
			   {
				   var sql = "SELECT SUM(curlupcount) as curlupcount, recorddatetime, userid from curluptest WHERE recorddatetime BETWEEN '"+startdate+"' AND '"+enddate+"' AND userid='"+userid+"' group by date(recorddatetime) order by id DESC";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
			   getcurluptest: function (userid)
			   {
				   var sql = "SELECT id, userid, curlupcount as curlupcount, recorddatetime as date, assessmentresult as assessmentresult from curluptest WHERE userid='"+userid+"'";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }
				   ,
		   	getCurlUptestAverageByDays: function (userid,startdate,enddate)
			   {
				   var sql = "SELECT SUM(curlupcount) as sum_curlupcount, COUNT(curlupcount) as total, MIN(curlupcount) as min_curlupcount, MAX(curlupcount) as max_curlupcount from curluptest WHERE recorddatetime BETWEEN '"+startdate+"' AND '"+enddate+"' AND userid='"+userid+"' ORDER BY id DESC"; 
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }  ,
		   	getcurluptestByMonth: function (userid)
			   {
				   var sql = "SELECT * from curluptest WHERE recorddatetime BETWEEN NOW() - INTERVAL 30 DAY AND NOW() AND userid='"+userid+"' ORDER BY id DESC "; 
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   } 
				   	
			}
	}
	);

	return curluptest;
};
