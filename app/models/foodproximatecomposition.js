'use strict';

module.exports = function(sequelize, DataTypes) {

	var foodproximatecomposition = sequelize.define('foodproximatecomposition',
	{},
	{
			classMethods: {
				addfoodproximatecomposition: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
			   getallfoodproximatecomposition: function ()
			   {
				   var sql = "select * from foodproximatecomposition";
				
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
				   getspecificfoodproximatecomposition: function (foodid)
			       {
				   var sql = "select * from foodproximatecomposition WHERE foodid='"+foodid+"'";
				
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }
				   	
			}
	}
	);

	return foodproximatecomposition;
};
