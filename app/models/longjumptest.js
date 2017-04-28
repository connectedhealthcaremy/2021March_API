'use strict';

module.exports = function(sequelize, DataTypes) {

	var standinglongjumptest = sequelize.define('standinglongjumptest',
	{},
	{
			classMethods: {
				addlongjumptest: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
				lastAddIDs: function (lastinsertid) { 
				
				var sql = "SELECT id from standinglongjumptest WHERE id >='"+lastinsertid+"' AND isdeleted='0'";
				  return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				}
				,
				getsingletest: function (id) { 
				
				var sql = "SELECT * from standinglongjumptest WHERE id ='"+id+"' AND isdeleted='0'";
				  return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				}
				,
				updatelongjumptest: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				},
				deletelongjumptest: function (sql) {  
			
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				}
				,
			  getlongjumptestbydates: function (userid,startdate,enddate)
			   {
				   var sql = "SELECT * from standinglongjumptest WHERE recorddatetime BETWEEN '"+startdate+"' AND '"+enddate+"' AND isdeleted='0' AND userid='"+userid+"' order by id desc"; 
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
		getlongjumptestbydates1: function (userid,startdate,enddate)
			   {
				   var sql = "SELECT SUM(jumpLength) as jumpLength, recorddatetime from standinglongjumptest WHERE recorddatetime BETWEEN '"+startdate+"' AND '"+enddate+"' AND isdeleted='0' AND userid='"+userid+"' group by date(recorddatetime) order by id desc"; 
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
			   getlongjumptest: function (userid)
			   {
				   var sql = "SELECT id, userid, jumpLength as jumpLength, recorddatetime as date, assessmentResult as assessmentresult from standinglongjumptest WHERE userid='"+userid+"' AND isdeleted='0'";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }
				   ,
		   	getlongjumptestAverageByDays: function (userid,startdate,enddate)
			   {
				   var sql = "SELECT SUM(jumpLength) as sum_jumpLength, COUNT(jumpLength) as total, MIN(jumpLength) as min_jumpLength, MAX(jumpLength) as max_jumpLength from standinglongjumptest WHERE recorddatetime BETWEEN '"+startdate+"' AND '"+enddate+"' AND userid='"+userid+"' AND isdeleted='0'";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   } ,
		   	getlongjumptestByMonth: function (userid)
			   {
				   var sql = "SELECT * from standinglongjumptest WHERE recorddatetime BETWEEN NOW() - INTERVAL 30 DAY AND NOW() AND userid='"+userid+"' AND isdeleted='0' ORDER BY id DESC "; 
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   } 
				   	
			}
	}
	);

	return standinglongjumptest;
};
