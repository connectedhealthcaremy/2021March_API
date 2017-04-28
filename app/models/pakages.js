'use strict';

module.exports = function(sequelize, DataTypes) {

	var pakages = sequelize.define('pakages',
	{},
	{
			classMethods: {
				getpakages: function () { 
				var sql="SELECT * FROM pakages";
				return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
				acceptpakage: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
				getdoctorpakages: function(id)
				{
				var sql="SELECT pakageDoctor.pakageID, pakageDoctor.id , pakages.name, pakages.code, pakages.price FROM pakageDoctor INNER JOIN pakages ON pakageDoctor.pakageID=pakages.id WHERE pakageDoctor.professionalID="+id+"";
				return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				}
				,
				checkCurrentPakage: function(userid,pakage_id)
				{
				var sql="SELECT pakageDoctor.pakageID , pakages.name, pakages.code, pakages.price FROM pakageDoctor INNER JOIN pakages ON pakageDoctor.pakageID=pakages.id WHERE pakageDoctor.professionalID="+userid+" AND pakageDoctor.pakageID="+pakage_id+"";
				return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				},
				deleteDoctorPakage: function (id)
				{
					var sql="DELETE FROM pakageDoctor WHERE id="+id+"";
					return sequelize.query(sql,{ type: sequelize.QueryTypes.DELETE});
					}
					
					
				
				   	
			}
	}
	);

	return pakages;
};
