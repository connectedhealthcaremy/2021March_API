'use strict';

module.exports = function(sequelize, DataTypes) {

	var medicalReport = sequelize.define('medicalReport',
	{},
	{
			classMethods: {
				addmedicalReport: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
				updatemedicalReport: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				},

			getmedicalreport: function(userid)
			{
				var sql="SELECT * FROM medicalReport WHERE userid='"+userid+"' order by recorddate desc LIMIT 1";
				return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
			}

			}
	}
	);

	return medicalReport;
};
