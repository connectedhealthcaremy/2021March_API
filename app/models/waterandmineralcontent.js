'use strict';

module.exports = function(sequelize, DataTypes) {

	var waterandmineralcontent = sequelize.define('waterandmineralcontent',
	{},
	{
			classMethods: {
				addwaterandmineralcontent: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
			   getallwaterandmineralcontent: function ()
			   {
				   var sql = "select * from waterandmineralcontent";
				
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
				   getspecificwaterandmineralcontent: function (foodid)
			       {
				   var sql = "select * from waterandmineralcontent WHERE foodid='"+foodid+"'";
				
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }
				   	
			}
	}
	);

	return waterandmineralcontent;
};
