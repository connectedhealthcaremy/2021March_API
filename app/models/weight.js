'use strict';

module.exports = function(sequelize, DataTypes) {

	var weight = sequelize.define('weight',
	{},
	{
			classMethods: {
				addweight: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
				delete_Weight: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.DELETE});
				
				},
				lastAddIDs: function (lastinsertid) { 
				
				var sql = "SELECT weightID AS id from weight WHERE weightID >='"+lastinsertid+"' AND isdeleted='0' ";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
				updateweight: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				},
				deleteweight: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				},
			   getweight: function (userid)
			   {
				   var sql = "SELECT weightID,  scaleDate AS scaleDate , weightQty AS Qty , height , deviceStatus AS deviceStatus, unit , notes as notes , deviceuuid , deviceid from weight WHERE userID='"+userid+"' AND isdeleted='0' GROUP BY scaleDate";
				 
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
				getlatestweight: function(userid){

                var sql = "SELECT weight.scaleDate AS Date , weight.weightQty AS weightQty, user.height from weight inner join user on weight.userID=user.userID WHERE weight.userID='"+userid+"' AND weight.scaleDate between  CURDATE() - INTERVAL 30 DAY AND CURDATE() AND weight.isdeleted='0' GROUP BY weight.scaleDate";

				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				},
			   getweightforTrainer: function (userid)
			   {
				   var sql = "SELECT weight.scaleDate AS Date , weight.weightQty AS weightQty , weight.deviceStatus, user.height from weight inner join user on weight.userID=user.userID WHERE weight.userID='"+userid+"' AND weight.isdeleted='0' AND weight.scaleDate between  CURDATE() - INTERVAL 30 DAY AND CURDATE()  order by weight.scaleDate ASC";
				 
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
				getweightbydates: function(userid, date_from, date_to){
						date_from=date_from+' 00:00:00'; 
						date_to=date_to+' 23:59:59';  

					 var sql = "SELECT weight.scaleDate AS Date , weight.weightQty AS weightQty , weight.deviceStatus, user.height from weight inner join user on weight.userID=user.userID WHERE weight.userID='"+userid+"' AND weight.isdeleted='0' AND weight.scaleDate between  '"+date_from+"' AND '"+date_to+"'  order by weight.scaleDate ASC";
				 
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				}

			}
	}
	);

	return weight;
};
