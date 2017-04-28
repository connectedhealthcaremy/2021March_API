'use strict';

module.exports = function(sequelize, DataTypes) {

	var notificationDevices = sequelize.define('notificationDevices', {}, {
		classMethods: {
			adddevice: function(sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.INSERT
				});

			},
			getdevice: function(userid) {
				var sql = "SELECT distinct deviceID FROM notificationDevices";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getdevicebyuser: function(userid) {
				var sql = "SELECT deviceID FROM user WHERE userID="+userid+" order by userID desc limit 1";
				
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			}
		}
	});

	return notificationDevices;
};