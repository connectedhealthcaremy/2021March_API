'use strict';

module.exports = function(sequelize, DataTypes) {

	var muscle = sequelize.define('muscle',
	{},
	{
			classMethods: {
				addmusclemass: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
				delete_muscle_mass: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.DELETE});
				
				},
			   getmusclemass: function (userid)
			   {
				   var sql = "SELECT muscleID,scaleDate , muscleQty AS Qty from muscle WHERE userID='"+userid+"'"; 
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }	
			}
	}
	);

	return muscle;
};
