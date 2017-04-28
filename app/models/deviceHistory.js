'use strict';

module.exports = function(sequelize, DataTypes) {

	var deviceHistory = sequelize.define('deviceHistory',
	{},
	{
			classMethods: {
				addDeviceHistory: function (sql) { 
				
                return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				}  	
			}
	}
	);

	return deviceHistory;
};
