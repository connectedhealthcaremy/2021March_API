'use strict';

module.exports = function(sequelize, DataTypes) {

	var fatandcholestrol = sequelize.define('fatandcholestrol',
	{},
	{
			classMethods: {
				addfatandcholestrol: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
			   getallfatandcholestrol: function ()
			   {
				   var sql = "select * from fatandcholestrol";
				
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
				   getspecificfatandcholestrol: function (foodid)
			       {
				   var sql = "select * from fatandcholestrol where foodid='"+foodid+"' ";
				
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }
				   	
			}
	}
	);

	return fatandcholestrol;
};
