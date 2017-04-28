'use strict';

module.exports = function(sequelize, DataTypes) {

	var medicine = sequelize.define('medicine',
	{},
	{
			classMethods: {
				getmedicine: function (userid)
			   {
				   var sql = "SELECT * from medicine";
				   
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }
				   	
			}
	}
	);

	return medicine;
};
