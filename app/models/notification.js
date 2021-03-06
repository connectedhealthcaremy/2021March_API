'use strict';

module.exports = function(sequelize, DataTypes) {

	var notification = sequelize.define('notification', {}, {
		classMethods: {
			addnotification: function(sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.INSERT
				});

			},
			Updatenotification: function(sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.UPDATE
				});

			},
			getNotificationinbox: function(id) {

				var sql = "select notification.id, notification.fromUserID , notification.is_important , notification.toUserID , notification.subject, notification.insertionDateTime as datetime, notification.details,notification.status, user.username, user.firstName, user.lastName, user.profilepic as pic, user.gender from notification inner join user on notification.fromUserID=user.userID where notification.toUserID=" + id + " and notification.isdeleted=0 order by notification.insertionDateTime desc limit 20";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getNotificationinboxApp: function(id) {

				var sql = "select notification.id, notification.fromUserID , notification.is_important , notification.toUserID , notification.subject, notification.insertionDateTime as datetime, notification.details,notification.status, user.username, user.firstName, user.lastName, user.profilepic as pic, user.gender from notification inner join user on notification.fromUserID=user.userID where notification.toUserID=" + id + " and notification.isdeleted=0 order by notification.insertionDateTime desc limit 10000";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			loadmoregetNotificationinbox: function(id, pid) {

				var sql = "select notification.id, notification.fromUserID , notification.is_important , notification.toUserID , notification.subject, notification.insertionDateTime as datetime, notification.details,notification.status, user.username, user.firstName, user.lastName, user.profilepic as pic, user.gender from notification inner join user on notification.fromUserID=user.userID where notification.toUserID=" + id + " and notification.id < "+pid+" and notification.isdeleted=0 order by notification.insertionDateTime desc limit 20";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getNotificationsent: function(id) {

				var sql = "select notification.id, notification.fromUserID , notification.is_important , notification.toUserID , notification.subject, notification.insertionDateTime as datetime, notification.details,notification.status, user.username, user.firstName, user.lastName, user.profilepic as pic, user.gender  from notification inner join user on notification.toUserID=user.userID where notification.fromUserID=" + id + " and notification.isdeleted=0 order by notification.insertionDateTime desc limit 20";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},loadmoregetNotificationsent: function(id, pid) {

				var sql = "select notification.id, notification.fromUserID , notification.is_important , notification.toUserID , notification.subject, notification.insertionDateTime as datetime, notification.details,notification.status, user.username, user.firstName, user.lastName, user.profilepic as pic, user.gender  from notification inner join user on notification.toUserID=user.userID where notification.fromUserID=" + id + " and notification.id < "+pid+" and notification.isdeleted=0 order by notification.insertionDateTime desc limit 20";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getNotificationinboxdetail: function(id) {

				var sql = "select notification.id, notification.fromUserID , notification.is_important , notification.toUserID , notification.subject, notification.insertionDateTime as datetime, notification.details,notification.status, user.username, user.firstName, user.lastName  from notification inner join user on notification.fromUserID=user.userID where notification.id=" + id + "";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

            },
            getPersonalizedNotification :function (sql) {

               // var sql = "select notification.id, notification.fromUserID , notification.is_important , notification.toUserID , notification.subject, notification.insertionDateTime as datetime, notification.details,notification.status, user.username, user.firstName, user.lastName  from notification inner join user on notification.fromUserID=user.userID where notification.id=" + id + "";

                return sequelize.query(sql, {
                    type: sequelize.QueryTypes.SELECT
                });

            },      
         getPersonalizedNotificationStatus :function (sql) {
                return sequelize.query(sql, {
                    type: sequelize.QueryTypes.SELECT
                });

          },
         countUnreadNotification: function(id) {
				var sql = "select count(status) as unread from notification where toUserID=" + id + " and status=0 and isdeleted=0";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});
			}

		}
	});

	return notification;
};
