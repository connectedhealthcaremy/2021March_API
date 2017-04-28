'use strict';

module.exports = function(sequelize, DataTypes) {

	var rockportwalkingtest = sequelize.define('rockportwalkingtest', {}, {
		classMethods: {
               
               addrockportwalking: function(sql)
               {
               	return sequelize.query(sql, {
					type: sequelize.QueryTypes.INSERT
				});
               },
               lastAddIDs: function (lastinsertid) { 
				
				var sql = "SELECT id from rockportwalkingtest WHERE id >='"+lastinsertid+"' AND isdeleted='0' ";
				  return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
				updaterockporttest: function(sql) 
				{
					
					return sequelize.query(sql,{type: sequelize.QueryTypes.UPDATE});
				},
				deleterockporttest: function(sql)
				{
					return sequelize.query(sql,{type: sequelize.QueryTypes.UPDATE});
				},
				getrockport: function(userid) {
				var sql = "SELECT id, userid, heartrateval, timetaken, recorddatetime, vo2max from rockportwalkingtest WHERE  userid='" + userid + "' AND isdeleted='0' ORDER BY id DESC ";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
               getrockportByMonth: function(userid) {
				var sql = "SELECT * from rockportwalkingtest WHERE recorddatetime BETWEEN NOW() - INTERVAL 30 DAY AND NOW() AND userid='" + userid + "' AND isdeleted='0' ORDER BY id DESC ";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getrockportbydates: function(userid, date_from, date_to) {
				date_from = date_from + ' 00:00:00';
				date_to = date_to + ' 23:59:59';

				var sql = "SELECT * from rockportwalkingtest WHERE recorddatetime BETWEEN '" + date_from + "' AND '" + date_to + "' AND userid='" + userid + "' AND isdeleted='0' ORDER BY recorddatetime DESC ";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});
			}

		}
	});

	return rockportwalkingtest;
};