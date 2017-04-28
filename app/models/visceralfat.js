'use strict';

module.exports = function(sequelize, DataTypes) {

	var visceralfat = sequelize.define('visceralfat',
	{},
	{
			classMethods: {
				addvisceralfat: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
			   getvisceralfat: function (userid)
			   {
				   var sql = "SELECT visceralFatID,scaleDate , visceralFatQty AS Qty from visceralfat WHERE userID='"+userid+"'";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
			   getvisceralfatforTrainer: function (userid)
			   {
				   var sql = "SELECT scaleDate AS Date , visceralFatQty AS Qty from visceralfat WHERE userID='"+userid+"' and scaleDate between CURDATE() - INTERVAL 30 DAY AND CURDATE() order by scaleDate";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
			   getvisceralfatbyDates: function (userid, date_from, date_to)
			   {
			   	    date_from=date_from+' 00:00:00'; 
                    date_to=date_to+' 23:59:59'; 
				   var sql = "SELECT scaleDate AS Date , visceralFatQty AS Qty from visceralfat WHERE userID='"+userid+"' and scaleDate between '"+date_from+"' AND '"+date_to+"' order by scaleDate";
				    
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }	
			}
	}
	);

	return visceralfat;
};
