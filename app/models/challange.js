'use strict';

module.exports = function(sequelize, DataTypes) {

	var challenges = sequelize.define('challenges', {}, {
		classMethods: {

			all_challanges: function(userid) {
				var sql = `select challenges.challengeName  , challenges.challengeActivities , challenges.startDate , challenges.endDate,
							challenges_user.challengeID , challenges_user.userID  from challenges 
							inner join challenges_user on  challenges.challengeID=challenges_user.challengeID
							where challenges_user.userID=`+userid +` and challenges_user.status=1 and challenges_user.userID!=0`;
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			update_challanges: function(sql) {
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.UPDATE
				});

			},
			get_target_challanges_status: function(userid, challaengeID) {
				var sql = `SELECT * FROM WeHealthDB.challengeScoreFinal where userID=`+userid+` and challengeID=`+challaengeID+``;
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			get_target_challanges_details: function(userid, challaengeID) {
				var sql = `SELECT challengeID , userID, achievedScore as achievedSteps, TagetScore as targetSteps , startDate , endDate , calculationDate , weekStartDate , weekEndDate
                           FROM WeHealthDB.challengeScore where userID=`+userid+` and challengeID=`+challaengeID+` `;
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			}

		}
	});

	return challenges;
};