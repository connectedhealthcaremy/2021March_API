'use strict';

module.exports = function(sequelize, DataTypes) {

	var pushuptest = sequelize.define('pushuptest', {}, {
		classMethods: {
			addpushuptest: function(sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.INSERT
				});

			},
			lastAddIDs: function(lastinsertid) {

				var sql = "SELECT id from pushuptest WHERE id >='" + lastinsertid + "' AND isdeleted='0'";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getsingletest: function(id) {

				var sql = "SELECT * from pushuptest WHERE id ='" + id + "' AND isdeleted='0'";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			updatepushuptest: function(sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.UPDATE
				});

			},
			deletepushuptest: function(sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.UPDATE
				});

			},
			getPushUptestbydates: function(userid, startdate, enddate) {
				var sql = "SELECT * from pushuptest WHERE recorddatetime BETWEEN '" + startdate + "' AND '" + enddate + "' AND userid='" + userid + "' AND isdeleted='0' ORDER BY id DESC";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getPushUptestbydates1: function(userid, startdate, enddate) {
				var sql = "SELECT SUM(pushupcount) as pushupcount, recorddatetime, userid from pushuptest WHERE recorddatetime BETWEEN '" + startdate + "' AND '" + enddate + "' AND userid='" + userid + "' AND isdeleted='0' group by date(recorddatetime) ORDER BY id DESC";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getpushuptest: function(userid) { 
				var sql = "SELECT id, userid, pushupcount as pushupcount, recorddatetime as date, assessmentresult as assessmentresult from pushuptest WHERE userid='" + userid + "' AND isdeleted='0'";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getPushUptestAverageByDays: function(userid, startdate, enddate) {
				var sql = "SELECT SUM(pushupcount) as sum_pushupcount, COUNT(pushupcount) as total, MIN(pushupcount) as min_pushupcount, MAX(pushupcount) as max_pushupcount from pushuptest WHERE recorddatetime BETWEEN '" + startdate + "' AND '" + enddate + "' AND userid='" + userid + "' AND isdeleted='0' ORDER BY id DESC";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getpushuptestByMonth: function(userid) {
				var sql = "SELECT * from pushuptest WHERE recorddatetime BETWEEN NOW() - INTERVAL 30 DAY AND NOW() AND userid='" + userid + "' AND isdeleted='0' ORDER BY id DESC ";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			}

		}
	});

	return pushuptest;
};