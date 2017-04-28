'use strict';

module.exports = function(sequelize, DataTypes) {

	var pharmacist = sequelize.define('pharmacist',
	{},
	{
			classMethods: {
				getpharmacist: function (userid)
			   {
				   var sql = "SELECT name from pharmacist";
				   
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }
				   	
			}
	}
	);

	return pharmacist;
};
