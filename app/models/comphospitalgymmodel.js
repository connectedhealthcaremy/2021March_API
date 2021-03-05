'use strict';

module.exports = function(sequelize, DataTypes) {

	var professional = sequelize.define('comphospital',
	{},
	{
			classMethods: {
			   getcomphospital: function (userid)
			   {
				   var sql = "SELECT * from compHospitalGym WHERE type=1 and status=1";
				   
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }
				   	
			}
	}
	);

	return professional;
};
