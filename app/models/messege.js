'use strict';

module.exports = function(sequelize, DataTypes) {

	var message = sequelize.define('message', {}, {
		classMethods: {
			addmessage: function(sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.INSERT
				});

			},
			Updatemessage: function(sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.UPDATE
				});

			},
			getMessageinbox: function(id) {

				var sql = "select message.id, message.fromUserID , message.is_important , message.toUserID , message.subject, message.insertionDateTime as datetime, message.details,message.status, user.username, user.firstName, user.lastName, user.profilepic as pic, user.gender from message inner join user on message.fromUserID=user.userID where message.toUserID=" + id + " and message.isdeleted=0 order by message.insertionDateTime desc limit 100000";
				console.log(sql);
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			loadmoregetmessageinbox: function(id, pid) {

				var sql = "select message.id, message.fromUserID , message.toUserID , message.subject, message.insertionDateTime as datetime, message.details,message.status, user.username, user.firstName, user.lastName, user.profilepic as pic, user.gender from message inner join user on message.fromUserID=user.userID where message.toUserID=" + id + " and message.id < "+pid+" and message.isdeleted=0 order by message.insertionDateTime desc limit 20";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getmessagesent: function(id) {

				var sql = "select message.id, message.fromUserID , message.is_important , message.toUserID , message.subject, message.insertionDateTime as datetime, message.details,message.status, user.username, user.firstName, user.lastName, user.profilepic as pic, user.gender  from message inner join user on message.toUserID=user.userID where message.fromUserID=" + id + " and message.isdeleted=0 order by message.insertionDateTime desc limit 100000";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},loadmoregetmessagesent: function(id, pid) {

				var sql = "select message.id, message.fromUserID , message.toUserID , message.subject, message.insertionDateTime as datetime, message.details,message.status, user.username, user.firstName, user.lastName, user.profilepic as pic, user.gender  from message inner join user on message.toUserID=user.userID where message.fromUserID=" + id + " and message.id < "+pid+" and message.isdeleted=0 order by message.insertionDateTime desc limit 20";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getmessageinboxdetail: function(id) {

				var sql = "select message.id, message.fromUserID , message.is_important , message.toUserID , message.subject, message.insertionDateTime as datetime, message.details,message.status, user.username, user.firstName, user.lastName  from message inner join user on message.fromUserID=user.userID where message.id=" + id + "";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			countUnreadmessage: function(id) {
				var sql = "select count(status) as unread from message where toUserID=" + id + " and status=0 and isdeleted=0";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});
			},
			getDoctorList: function(id) {
				var sql = `SELECT userProfessionalRegistration.userID, userProfessionalRegistration.professionalID, user.firstName, user.lastName , user.username , user.profilepic as pic , user.gender
                            FROM WeHealthDB.userProfessionalRegistration left join user on userProfessionalRegistration.professionalID=user.userID  left join family f on f.FamilyID=user.userID 
                            where (userProfessionalRegistration.userID=`+ id + ` OR f.userID=` +id+`) and userProfessionalRegistration.status=2
                            and user.userRole=1;`;



				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});
			} 

		}
	}); 

	return message;
};
