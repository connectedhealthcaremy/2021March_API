'use strict';

module.exports = function(sequelize, DataTypes) {

	var squattest = sequelize.define('squattest',
	{},
	{
			classMethods: {
				addsquatstest: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
				lastAddIDs: function (lastinsertid) { 
				
				var sql = "SELECT id from squattest WHERE id >='"+lastinsertid+"' AND isdeleted='0'";
				  return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
				getsingletest: function (id) { 
				
				var sql = "SELECT * from squattest WHERE id ='"+id+"' AND isdeleted='0'";
				  return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
	
				updatesquatstest: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				},
				deletesquatstest: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				}
				,
			  getsquatstestbydates: function (userid,startdate,enddate)
			   {
				   var sql = "SELECT * from squattest WHERE recorddatetime BETWEEN '"+startdate+"' AND '"+enddate+"' AND userid='"+userid+"' AND isdeleted='0' order by id desc";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
				   getsquatstestbydates1: function (userid,startdate,enddate)
			       {
				   var sql = "SELECT SUM(squatCount) as squatCount , recorddatetime from squattest WHERE recorddatetime BETWEEN '"+startdate+"' AND '"+enddate+"' AND userid='"+userid+"' AND isdeleted='0' group by date(recorddatetime) order by id desc";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
			   getsquatstest: function (userid)
			   {
				   var sql = "SELECT id, userid, squatCount AS squatcount, recorddatetime as date, insertdate, assessmentresult as assessmentresult, isdeleted from squattest WHERE userid='"+userid+"' AND isdeleted='0'";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }
				   ,
		   	getsquatstestAverageByDays: function (userid,startdate,enddate)
			   {
				   var sql = "SELECT SUM(squatCount) as sum_squatCount, COUNT(squatCount) as total, MIN(squatCount) as min_squatCount, MAX(squatCount) as max_squatCount from squattest WHERE recorddatetime BETWEEN '"+startdate+"' AND '"+enddate+"' AND userid='"+userid+"' AND isdeleted='0'";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
		   	getsquatstestByMonth: function (userid)
			   {
				   var sql = "SELECT * from squattest WHERE recorddatetime BETWEEN NOW() - INTERVAL 30 DAY AND NOW() AND userid='"+userid+"' AND isdeleted='0' ORDER BY id DESC "; 
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }
				   	
			}
	}
	);

	return squattest;
};
