'use strict';

module.exports = function(sequelize, DataTypes) {

	var foodhistory = sequelize.define('foodhistory', {}, {
		classMethods: {
			addfoodhistory: function(sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.INSERT
				});

			},
			lastaddIDs: function(lastinsertid) {

				var sql = "select id AS id from foodhistory where id >='" + lastinsertid + "'";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getfoodhistory: function(userid) {
				var sql = "SELECT id as foodHistoryID, foodID, userID, foodName, foodphotoname, weight, foodPortion, foodType, foodDateTime, drinksize, foodCarbo, foodCalorie, foodsugar, foodProtein, foodFat, foodsaturatedfat, foodmonounsaturatedfat, foodpolyunsaturatedfat, foodtransfat, foodcholestrol, foodsodium, foodvitamainc, foodcalcium, foodiron, measuermentunit, foodfiber, greenbookcategory, healthscorecategory, item, servingsize1, servingsize2, iscustomfood FROM foodhistory WHERE foodhistory.userID='" + userid + "'";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			checkfoodtiming: function(userid) {
				var sql = "SELECT * from food_timing where userID='" + userid + "'";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			checkfoodnotification: function(userid) {
				var sql = "SELECT * from food_notification where userid='" + userid + "'";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			checkfoodhistorydays: function(userid) {
				var sql = "SELECT * from food_history_days where userid='" + userid + "'";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			checkfoodnutrientSettings: function(userid) {
				var sql = "SELECT * from food_Nutrient_Settings where userid='" + userid + "'";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			updatefoodtiming: function(sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.UPDATE
				});

			},
			addfoodtiming: function(sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.INSERT
				});

			},
			deleteFoodHistory: function(sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.DELETE
				});

			}
		}
	});

	return foodhistory;
};