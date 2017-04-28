'use strict';

module.exports = function(sequelize, DataTypes) {

	var food = sequelize.define('food', {}, {
		classMethods: {
			addfood: function(sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.INSERT
				});

			},
			getallfood: function() {
				var sql = "select * from food";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getfoodnamesuggestion: function(name) {
				var sql = "select foodid , englishname from food where englishname like '%" + name + "%' group by englishname ";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getallfoodwithoutcategory: function() {
				///var sql = "SELECT food.foodid, food.englishname, food.ediblePortion, foodproximatecomposition.energy, foodproximatecomposition.suger FROM food INNER JOIN foodproximatecomposition ON food.foodid=foodproximatecomposition.foodid";
				var sql = "SELECT food.foodid, food.englishname, food.ediblePortion, food.energy, food.suger FROM food ";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getspecificfood: function(food) {
				var sql = "select * from food WHERE foodid='" + food + "' OR englishname LIKE '%" + food + "%' OR scientificname LIKE '%" + food + "%'";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getspecificfoodwithcomposition: function(food) {

				if (food == 'other') {
					var sql = "select food.foodid , food.englishname, food.servingsize, food.measurement, food.healthScore_category,    food.scientificname,food.foodgroup ,food.ediblePortion ,food.weight ,foodproximatecomposition.energy, foodproximatecomposition.suger ,foodproximatecomposition.water  ,foodproximatecomposition.protein ,foodproximatecomposition.fat ,foodproximatecomposition.cho  ,foodproximatecomposition.fiber ,foodproximatecomposition.ash from food INNER JOIN foodproximatecomposition ON food.foodid=foodproximatecomposition.foodid WHERE food.englishname NOT LIKE '%Bread%' AND food.englishname NOT LIKE '%Burger%' AND food.englishname NOT LIKE '%Cheese%' AND food.englishname NOT LIKE '%Chicken%' AND food.englishname NOT LIKE '%Chocolate%' AND food.englishname NOT LIKE '%Egg%' AND food.englishname NOT LIKE '%Fish%' AND food.englishname NOT LIKE '%Fruit%' AND food.englishname NOT LIKE '%Rice%' AND food.englishname NOT LIKE '%IceCream%' AND food.englishname NOT LIKE '%Meat%' AND food.englishname NOT LIKE '%Noodle%' AND food.englishname NOT LIKE '%Pizza%' AND food.englishname NOT LIKE '%Snake%' AND food.englishname NOT LIKE '%Soup%' AND food.englishname NOT LIKE '%Sweet%' AND food.englishname NOT LIKE '%vegetable%' AND food.englishname NOT LIKE '%Rice%'"
				} else {
					//var sql = "select food.foodid , food.englishname, food.healthscorecategory, food.greenbookcategory, food.servingsize, food.measurement,   food.scientificname,food.foodgroup ,food.ediblePortion ,food.weight ,foodproximatecomposition.energy, foodproximatecomposition.suger ,foodproximatecomposition.water  ,foodproximatecomposition.protein ,foodproximatecomposition.fat ,foodproximatecomposition.cho  ,foodproximatecomposition.fiber ,foodproximatecomposition.ash, foodproximatecomposition.saturatedfat, foodproximatecomposition.monounsaturatedfat, foodproximatecomposition.polysaturatedfat, foodproximatecomposition.transfat, foodproximatecomposition.cholestrol ,foodminerals.calcium, foodminerals.iron, foodminerals.phosphorus, foodminerals.potassium, foodminerals.sodium,foodvitamains.carotenes, foodvitamains.niacin, foodvitamains.retinol, foodvitamains.retinolequival, foodvitamains.vitamainb1, foodvitamains.vitamainb2, foodvitamains.vitamainc from food LEFT JOIN foodproximatecomposition ON food.foodid=foodproximatecomposition.foodid LEFT JOIN foodminerals ON food.foodid=foodminerals.foodid LEFT JOIN foodvitamains ON food.foodid=foodvitamains.foodid WHERE food.foodid = '"+food+"' group by food.servingsize";
					var sql = "select food.foodid , food.englishname, food.healthscorecategory, food.greenbookcategory, food.servingsize, food.measurement,   food.scientificname,food.foodgroup ,food.ediblePortion ,food.weight ,food.energy, food.suger ,food.water  ,food.protein ,food.fat ,food.cho  ,food.fiber ,food.ash, food.saturatedfat, food.monounsaturatedfat, food.polysaturatedfat, food.transfat, food.cholestrol ,food.calcium, food.iron, food.phosphorus, food.potassium, food.sodium,food.carotenes, food.niacin, food.retinol, food.retinolequival, food.vitamainb1, food.vitamainb2, food.vitamainc from food  WHERE food.foodid = '" + food + "' group by food.measurement";

				}
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getspecificfoodwithmg: function(food) {


				var sql = "select food.foodid , food.englishname, food.scientificname,food.foodgroup ,food.ediblePortion ,food.weight ,food.energy, food.suger ,food.water  ,food.protein ,food.fat ,food.cho ,food.fiber ,food.ash from food  WHERE food.englishname LIKE '%" + food + "%' ";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			}

		}
	});

	return food;
};