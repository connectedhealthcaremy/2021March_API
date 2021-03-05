'use strict';

module.exports = function(sequelize, DataTypes) {

	var kglosttarget = sequelize.define('kglosttarget',
	{},
	{
			classMethods: {
				addtempratureGoal: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
			   getTempratureGoal: function (userid)
			   {
				   var sql = "SELECT * from temperatureGoal WHERE  userid='"+userid+"' ORDER BY id DESC LIMIT 1";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
				addbrainActivityGoal: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
			    getBrainActivityGoal: function (userid)
			   {
				   var sql = "SELECT * from BrainActivityGoal WHERE  userid='"+userid+"' ORDER BY id DESC LIMIT 1";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },


					addcalorieGoal: function (sql) { 

					return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});

					},
					getCalorieGoal: function (userid)
					{
					var sql = "SELECT * from calorieGoal WHERE  userid='"+userid+"' ORDER BY id DESC LIMIT 1";
					return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});

					},


					addExerciseGoal: function (sql) { 

					return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});

					},
					getExerciseGoal: function (userid)
					{
					var sql = "SELECT * from exerciseGoal WHERE  userid='"+userid+"' ORDER BY id DESC LIMIT 1";
					return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});

					},


					addHeartRateGoal: function (sql) { 

					return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});

					},
					getHeartRateGoal: function (userid)
					{
					var sql = "SELECT * from heartrateGoal WHERE  userid='"+userid+"' ORDER BY id DESC LIMIT 1";
					return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});

					},


					addOxygenGoal: function (sql) { 

					return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});

					},
					getOxygenGoal: function (userid)
					{
					var sql = "SELECT * from oxygenGoal WHERE  userid='"+userid+"' ORDER BY id DESC LIMIT 1";
					return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});

					},



					addSleepGoal: function (sql) { 

					return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});

					},
					getSleepGoal: function (userid)
					{
					var sql = "SELECT * from sleepGoal WHERE  userid='"+userid+"' ORDER BY id DESC LIMIT 1";
					return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});

					},


					addStepGoal: function (sql) { 

					return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});

					},
					getStepGoal: function (userid)
					{
					var sql = "SELECT * from stepGoal WHERE  userid='"+userid+"' ORDER BY id DESC LIMIT 1";
					return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});

					},



					addWaterIntakeGoal: function (sql) { 

					return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});

					},
					getWaterIntakeGoal: function (userid)
					{
					var sql = "SELECT * from waterintakeGoal WHERE  userid='"+userid+"' ORDER BY id DESC LIMIT 1";
					return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});

					},



					addWeightGoal: function (sql) { 

					return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});

					},
					getWeightGoal: function (userid)
					{
					var sql = "SELECT * from weightGoal WHERE  userid='"+userid+"' ORDER BY id DESC LIMIT 1";
					return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});

					},



					addkglosttarget: function (sql) { 

					return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});

					},
					getkglosttarget: function (userid)
					{
					var sql = "SELECT * from kglosttarget WHERE  user='"+userid+"' ORDER BY id DESC";
					return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});

					}	   	
			}
	}
	);

	return kglosttarget;
};
