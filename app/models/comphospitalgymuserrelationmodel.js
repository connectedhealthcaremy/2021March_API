'use strict';

module.exports = function(sequelize, DataTypes) {

	var professional = sequelize.define('comphospital_userrelation',
	{},
	{
			classMethods: {
			   getcomphospitaluserrelation: function (userid)
			   {
				   var sql = "SELECT * from compHospitalGym_user_relation WHERE userID="+userid;
				   
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
		           },
                           addCompHospitalUserRelation: function(sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.INSERT
				});

			   },
                           getCompHospitalUserRelationWithCompID :function (sql) {
				return sequelize.query(sql, {
				    type: sequelize.QueryTypes.SELECT
				});

			   },
                           Updatenotification: function(sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.UPDATE
				});

			   }

                               
				   	
			}
	}
	);

	return professional;
};
