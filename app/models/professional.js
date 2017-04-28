'use strict';

module.exports = function(sequelize, DataTypes) {

	var professional = sequelize.define('professional',
	{},
	{
			classMethods: {
				adddoctors: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
			   getdoctors: function (userid)
			   {
				   var sql = "SELECT professionalCode , name,userID from professional WHERE type=1";
				   
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }
				   	
			}
	}
	);

	return professional;
};
