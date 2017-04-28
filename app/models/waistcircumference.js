'use strict';

module.exports = function(sequelize, DataTypes) {

	var waistcircumference = sequelize.define('waistcircumference',
	{ 	
		},
	{
			classMethods: {
				addwaistcircumference: function (sql) { 
				
             return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
				lastaddwaistcircumferenceIDs: function (lastinsertid)
			   {
				   var sql = "SELECT id FROM waistcircumference WHERE id >='"+lastinsertid+"' AND isdeleted=0 ";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
				updatewaistcircumference: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				},
				daletewaistcircumference: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				},
			   getwaistcircumference: function (userid)
			   {
				   var sql = "SELECT id as waistcircumferenceid,userID , waistcircumference as waistcircumference, recordDateTime as insertiontime ,hipcircumference as hipcircumference , waisttohipratio as waisttohipratio, deviceStatus, notes FROM waistcircumference WHERE userID='"+userid+"' AND isdeleted=0 ";
				   
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
			   getwaistcircumferencefortrainer: function (userid)
			   {
				   var sql = "SELECT id,userID , waistcircumference, recordDateTime ,hipcircumference , waisttohipratio, deviceStatus FROM waistcircumference WHERE userID='"+userid+"' AND isdeleted=0 and recordDateTime between  CURDATE() - INTERVAL 30 DAY AND CURDATE() order by recordDateTime desc";
				   
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
			   getwaistcircumferencebydates: function (userid, date_from, date_to)
			   {
			    	date_from=date_from+' 00:00:00'; 
                    date_to=date_to+' 23:59:59';
				   var sql = "SELECT id,userID , waistcircumference, recordDateTime ,hipcircumference , waisttohipratio, deviceStatus FROM waistcircumference WHERE userID='"+userid+"' AND isdeleted=0 and recordDateTime between  '"+date_from+"' AND '"+date_to+"' order by recordDateTime desc ";
				   
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }	
			}
	}
	);

	return waistcircumference;
};
