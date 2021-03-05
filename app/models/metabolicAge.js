'use strict';

module.exports = function(sequelize, DataTypes) {

	var metabolic_age = sequelize.define('metabolic_age',
	{},
	{
			classMethods: {
				addmetabolicage: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
			   getmetabolicage: function (userid)
			   {
				   var sql = "SELECT metabolicageID,userID , scaleDate , metabolicage from metabolic_age WHERE userID='"+userid+"'";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }
			}
	}
	);

	return metabolic_age;
};
