'use strict';

module.exports = function(sequelize, DataTypes) {

	var waterdensity = sequelize.define('waterdensity',
	{},
	{
			classMethods: {
				addwaterdensity: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
			   getwaterdensity: function (userid)
			   {
				   var sql = "SELECT waterDensityID, scaleDate AS scaleDate , waterDensityQty AS Qty from waterdensity WHERE userID='"+userid+"'";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }	
			}
	}
	);

	return waterdensity;
};
