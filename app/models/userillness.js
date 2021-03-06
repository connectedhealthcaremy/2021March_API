'use strict';

module.exports = function(sequelize, DataTypes) {

	var userillness = sequelize.define('userillness',
	{},
	{
		classMethods: {
			adduserillness: function (sql) {

				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});

			},
			updateuserillness: function (sql) {

				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});

			},
			getuserillness: function (userid)
			{
				var sql = "SELECT * from userillness WHERE userID='"+userid+"'";
				return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});

			},
			getProfessionalList: function (userid)
			{
				var sql = "SELECT * from partner_patient WHERE patientid = (Select username from user where userid='"+userid+"')";
				return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});

			}




			}
	}
	);

	return userillness;
};
