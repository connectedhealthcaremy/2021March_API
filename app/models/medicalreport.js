'use strict';

module.exports = function(sequelize, DataTypes) {

	var medicalReport = sequelize.define('medicalReport',
	{},
	{
		classMethods: {
			addmedicalReport: function (sql) {
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
			},
			
			getmedicalReport: function(userid) {
				var sql="SELECT * FROM medicalReport WHERE userID='"+userid+"'";
				return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
			},
			
			addLabReport: function (sql) {
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
			},
			
			getLabReport: function(sql) {
				return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
			},
			
			addmedicalHistory: function (sql) {
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
			},
			
			getmedicalHistory: function(userid)
			{
				var sql="SELECT * FROM MedicalHistory WHERE userID='"+userid+"' order by insertDateTime desc LIMIT 1";
				return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
			}
		
		}
	}
	);

	return medicalReport;

};
