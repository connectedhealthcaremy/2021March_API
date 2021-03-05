'use strict';


module.exports = function(sequelize, DataTypes) {

	var bp = sequelize.define('bp', {}, {
		classMethods: {
			addbp: function(sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.INSERT
				});

			},
			lastaddIDs: function(lastinsertid) {

				var sql = "select bpID AS id from bp where bpID >='" + lastinsertid + "'";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getfamilyEmails: function(userid) {

				var sql = "select email from family where userID ='" + userid + "' and status=1 ";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getBPPostDetails: function(bpID) {

				// var sql = `select user.userID, user.email, user.firstName, user.lastName, user.phone, bp.systolic, bp.diastolic, bp.pulse, bp.recordTime , bp.deviceid
				// from bp inner join user on bp.userID=user.email
				// where bp.bpID=`+bpID+``; 
				var sql = `select user.userID, user.email, user.firstName, user.lastName, user.phone, bp.systolic, bp.diastolic, bp.pulse, bp.recordTime , bp.deviceid , bp_goal.notification
							from user inner join bp on user.email=bp.userID
							inner join bp_goal on user.userID=bp_goal.userID where bp.bpID=` + bpID + ``;
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			updatebp: function(sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.UPDATE
				});

			},
			deletebp: function(sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.UPDATE
				});

			},
			deleteBloodPressure: function(sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.DELETE
				});

			},
			getbp: function(userid) {
				var sql = "select bpID, userID, systolic as systolic, deviceid, diastolic as diastolic, recordTime as record_time, pulse as pulserate, notes as notes, insertDateTime, deviceStatus as deviceStatus, unit , deviceuuid from bp where userID='" + userid + "' AND isdeleted='0' order by recordTime desc";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getbplatest: function(userid) {
				var sql = "select * from bp where userID='" + userid + "' AND isdeleted='0' and recordTime between  CURDATE() - INTERVAL 30 DAY AND CURDATE() order by recordTime";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});
			},
			getbpbydates: function(userid, date_from, date_to) {
				date_from = date_from + ' 00:00:00';
				date_to = date_to + ' 23:59:59';

				var sql = "select * from bp where userID='" + userid + "' AND isdeleted='0' and recordTime between  '" + date_from + "' AND '" + date_to + "' order by recordTime";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});
			}
		}
	});

	return bp;
};