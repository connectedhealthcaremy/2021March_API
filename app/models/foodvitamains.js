'use strict';

module.exports = function(sequelize, DataTypes) {

	var foodvitamains = sequelize.define('foodvitamains',
	{},
	{
			classMethods: {
				addfoodvitamains: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
			   getallfoodvitamains: function ()
			   {
				   var sql = "select * from foodvitamains";
				
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
				   getspecificfoodvitamains: function (foodid)
			       {
				   var sql = "select * from foodvitamains WHERE foodid='"+foodid+"'";
				
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }
				   	
			}
	}
	);

	return foodvitamains;
};
