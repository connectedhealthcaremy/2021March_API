'use strict';

module.exports = function(sequelize, DataTypes) {

	var bmr = sequelize.define('bmr',
	{},
	{
			classMethods: {
				addbmr: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
			   getbmr: function (userid)
			   {
				   var sql = "SELECT bmrID, scaleDate AS scaleDate , bmrQty AS Qty from bmr WHERE userID='"+userid+"'";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
				   getbmrfortrainer: function(userid){

				   	var sql = "SELECT scaleDate AS Date , bmrQty AS Qty from bmr WHERE userID='"+userid+"' and scaleDate between CURDATE() - INTERVAL 30 DAY AND CURDATE() order by scaleDate desc";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});

				   },
				   getbmrbydates: function (userid, date_from, date_to)
				   {
				   	date_from=date_from+' 00:00:00'; 
                    date_to=date_to+' 23:59:59'; 
                    var sql = "SELECT scaleDate AS Date , bmrQty AS Qty from bmr WHERE userID='"+userid+"' and scaleDate between '"+date_from+"' AND '"+date_to+"' order by scaleDate desc";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				   }
				   



			}
	}
	);

	return bmr;
};
