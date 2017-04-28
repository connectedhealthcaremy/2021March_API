'use strict';

module.exports = function(sequelize, DataTypes) {

	var fat = sequelize.define('fat',
	{},
	{
			classMethods: {
				addfat: function (sql) { 
			
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
			   getfat: function (userid)
			   {
				   var sql = "SELECT fatID,scaleDate , fatQty AS Qty from fat WHERE userID='"+userid+"'";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
			   getfatfortrainer: function (userid)
			   {
				   var sql = "SELECT scaleDate AS Date , fatQty AS Qty from fat WHERE userID='"+userid+"' AND scaleDate between  CURDATE() - INTERVAL 30 DAY AND CURDATE() order by scaleDate desc";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
			   getfatfortrainerbydates: function (userid, date_from, date_to)
			   {
					date_from=date_from+' 00:00:00'; 
					date_to=date_to+' 23:59:59';

				   var sql = "SELECT scaleDate AS Date , fatQty AS Qty from fat WHERE userID='"+userid+"' AND scaleDate between '"+date_from+"' AND '"+date_to+"' order by scaleDate desc ";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }	
			}
	}
	);

	return fat;
};
