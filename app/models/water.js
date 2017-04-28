'use strict';

module.exports = function(sequelize, DataTypes) {

	var Water = sequelize.define('Water',
	{},
	{
			classMethods: {
				addwater: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
				lastAddIDs: function (lastinsertid)
				{
					var sql = "SELECT id from Water  WHERE id >='"+lastinsertid+"' AND isdeleted='0'";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					}	
				,
				updatewater: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				},
			   getwater: function (userid)
			   {
				   var sql = "SELECT name AS drinkname  , value AS drinksize , recorddatetime , userID AS userid from Water WHERE userID='"+userid+"' AND isdeleted='0'";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }	
			}
	}
	);

	return Water;
};
