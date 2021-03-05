'use strict';

module.exports = function(sequelize, DataTypes) {

	var bonedensity = sequelize.define('bonedensity',
	{},
	{
			classMethods: {
				addBoneDensity: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
				deleteBoneDensity: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.DELETE}); 
				
				},
			   getBoneDensity: function (userid)
			   {
				   var sql = "SELECT boneDensityID, scaleDate  , boneDensityQty AS Qty from bonedensity WHERE userID='"+userid+"'";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }	
			}
	}
	);

	return bonedensity;
};
