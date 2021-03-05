'use strict';

module.exports = function(sequelize, DataTypes) {

	var notificationDevices = sequelize.define('notificationDevices', {}, {
		classMethods: {
			adddevice: function(sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.INSERT
				});

            },
            Deletedevice: function (sql) {

                return sequelize.query(sql, {
                    type: sequelize.QueryTypes.DELETE
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

			},
			getdevicebyuseremail: function(email) {
				var sql = "SELECT firstName, lastName, deviceID FROM user WHERE email='"+email+"' order by userID desc limit 1";
				
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			}
		}
	});

	return notificationDevices;
};