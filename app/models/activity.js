'use strict';

module.exports = function(sequelize, DataTypes) {

	var activity = sequelize.define('activity',
	{},
	{
			classMethods: {
				addactivity: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
				lastAddIDs: function (lastinsertid) { 
				
				var sql = "SELECT activityID AS id from activity WHERE activityID >='"+lastinsertid+"' AND isdeleted='0' ";
				  return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
				updateactivity : function(sql)
				{
					return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
					}
				,
			   getactivity: function (userid)
			   {
				   var sql = "SELECT activityID AS id, activityDateTime,  activityName , value AS activityLength, userID AS userid , type , activityTypeID AS activityID from activity WHERE type=1 AND userID='"+userid+"'  GROUP BY TIMESTAMP(activityDateTime) ORDER BY TIMESTAMP(activityDateTime) DESC  ";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }
				   ,
			getactivitySleep:function (userid)
			{
				    var sql = "SELECT activityID AS id, activityDateTime,  activityName ,  value AS activityLength, userID AS userid , type , activityTypeID AS activityID from activity WHERE type=2 AND userID="+userid+"  GROUP BY TIMESTAMP(activityDateTime) ORDER BY TIMESTAMP(activityDateTime) DESC ";
				   
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				}	   	
			}
	}
	);

	return activity;
};
