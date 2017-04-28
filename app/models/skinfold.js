'use strict';


module.exports = function(sequelize, DataTypes) {

	var skinfold = sequelize.define('skinfold',
	{},
	{
			classMethods: {
				addbp: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
				lastaddIDs: function (lastinsertid) { 
				
				 var sql = "select bpID AS id from skinfold where bpID >='"+lastinsertid+"'";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
			  getbplatest: function(userid)
			  {
			  	var sql = "select * from skinfold where userID='"+userid+"' AND isdeleted='0' and recordTime between  CURDATE() - INTERVAL 30 DAY AND CURDATE() order by recordTime";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
			  }   	
			}
	}
	);

	return skinfold;
};