'use strict';

module.exports = function(sequelize, DataTypes) {

	var foodminerals = sequelize.define('foodminerals',
	{},
	{
			classMethods: {
				addfoodminerals: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
			   getallfoodminerals: function ()
			   {
				   var sql = "select * from foodminerals";
				
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
				   getfoodminerals: function (foodId)
			       {
				   var sql = "select * from foodminerals WHERE foodid='"+foodId+"' ";
				   console.log(sql);
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }
				   	
			}
	}
	);

	return foodminerals;
};
