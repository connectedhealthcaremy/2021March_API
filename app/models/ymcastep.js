'use strict';

module.exports = function(sequelize, DataTypes) {

	var ymcasubmaxsteptest = sequelize.define('ymcasubmaxsteptest', {}, {

		classMethods: {
			addymcawalking: function(sql) {
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.INSERT
				});
			},
			lastAddIDs: function(lastinsertid) {

				var sql = "SELECT id from ymcasubmaxsteptest WHERE id >='" + lastinsertid + "' AND isdeleted='0' ";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			updateymcawalkingtest: function(sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.UPDATE
				});
			},
			deleteymcawalkingtest: function(sql) {
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.UPDATE
				});
			},

			getymcaStepTest: function(userid) {
				var sql = "SELECT id, Userid as userid, Steptestpulserate as steptestpulserate, recorddatetime as recorddatetime, vo2max as vo2max from ymcasubmaxsteptest WHERE userid='" + userid + "' AND isdeleted='0' ORDER BY id DESC ";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getymcaByMonth: function(userid) {
				var sql = "SELECT * from ymcasubmaxsteptest WHERE recorddatetime BETWEEN NOW() - INTERVAL 30 DAY AND NOW() AND userid='" + userid + "' AND isdeleted='0' ORDER BY id DESC ";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getymcabydates: function(userid, date_from, date_to) {
				date_from = date_from + ' 00:00:00';
				date_to = date_to + ' 23:59:59';

				var sql = "SELECT * from ymcasubmaxsteptest WHERE recorddatetime BETWEEN '" + date_from + "' AND '" + date_to + "' AND userid='" + userid + "' AND isdeleted='0' ORDER BY id DESC "; 

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getymcaAveragebydates: function(userid, date_from, date_to) {
				date_from = date_from + ' 00:00:00';
				date_to = date_to + ' 23:59:59';

				var sql = "SELECT SUM(Steptestpulserate) as sum_pulse, COUNT(Steptestpulserate) as total, MIN(Steptestpulserate) as min_pulse, MAX(Steptestpulserate) as max_pulse, SUM(vo2max) as sum_vo2max, MIN(vo2max) as min_vo2max, MAX(vo2max) as max_vo2max  from ymcasubmaxsteptest WHERE recorddatetime BETWEEN '" + date_from + "' AND '" + date_to + "' AND userid='" + userid + "' AND isdeleted='0' ORDER BY id DESC ";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			}

		}
	});

	return ymcasubmaxsteptest;
};