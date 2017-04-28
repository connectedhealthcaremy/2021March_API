'use strict';

module.exports = function(sequelize, DataTypes) {

	var fattyacids = sequelize.define('fattyacids',
	{},
	{
			classMethods: {
				addfattyacids: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
			   getallfattyacids: function ()
			   {
				   var sql = "select * from fattyacids";
				
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
				   getspecificfattyacids: function (food)
			       {
				   var sql = "select * from fattyacids WHERE foodid='"+food+"' ";
				
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }
				   	
			}
	}
	);

	return fattyacids;
};
