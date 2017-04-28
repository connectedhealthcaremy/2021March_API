'use strict';

module.exports = function(sequelize, DataTypes) {

	var temperature = sequelize.define('temperature',
	{ 	
		},
	{
			classMethods: {
				addtemperature: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
				lastAddsID: function (lastid)
			   {
				   var sql = "select id from temperature where id >="+lastid;
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
				updatetemperaturemain: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				},
				deletetemperaturemain: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				},
			   gettemperature: function (userid)
			   {
				   var sql = "SELECT id,user , temperaturelevel , recordDateTime , unit, temprature_celcius , temprature_foreignheight, notes from temperature WHERE user='"+userid+"' AND isdeleted='0'";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
			   temprature_goal: function (userid)
			   {
				   var sql = "SELECT * from temperatureGoal WHERE userid='"+userid+"'";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }	
			}
	}
	);

	return temperature;
};
