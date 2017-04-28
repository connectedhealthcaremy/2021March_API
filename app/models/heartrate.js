'use strict';

module.exports = function(sequelize, DataTypes) {

	var heartrate = sequelize.define('heartrate',
	{ 	
		},
	{
			classMethods: {
				addheartrate: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
				lastAddsID: function (lastid)
			   {
				   var sql = "select heartRateID AS id from heartrate where heartRateID >="+lastid;
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
				updateheartrate: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				},
				deleteheartrate: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				},
			   getheartrate: function (userid)
			   {
				   var sql = "SELECT heartRateID, userID, heartRateQty, recordTime as recordDateTime, deviceStatus, heartRateType FROM heartrate WHERE userID='"+userid+"' AND isdeleted=0 ";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
			   checkgoalheartrate: function (userid)
			   {
				   var sql = "select * from heartrateGoal where userid='"+userid+"' order by insertDateTime desc limit 1";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }
			}
	}
	);

	return heartrate;
};
