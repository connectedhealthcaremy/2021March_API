'use strict';


module.exports = function(sequelize, DataTypes) {

	var glucose = sequelize.define('glucose',
	{},
	{
			classMethods: {
				addglucose: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
				lastaddIDs: function (lastinsertid) { 
				
				 var sql = "select id from glucose where id >='"+lastinsertid+"'";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
				updateglucose: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				},
				deleteglucose: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				},
				delete_Glucose: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.DELETE});
				
				},
			   getglucose: function (userid)
			   {
				   var sql = "select id, user, glucoselevel as glucose_level, recordDateTime as record_datetime, insertDate, mealtype as meal_type, notes as notes, deviceID, deviceStatus as deviceStatus, unit from glucose where user='"+userid+"' AND isdeleted='0' order by recordDateTime desc";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
					},
					getBGPostDetails: function (id)
					{
					var sql = `SELECT user.userID, user.email, user.firstName, user.lastName, glucose.glucoselevel, glucose.recordDateTime, glucose.mealtype 
							   FROM WeHealthDB.glucose inner join user on glucose.user=user.email
							   where id=`+id+``;
					return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});

					},
				   getuserglucoselatest: function(userid){
                   
                   var sql = "SELECT * FROM WeHealthDB.glucose where user='"+userid+"' AND isdeleted='0' and recordDateTime between  CURDATE() - INTERVAL 30 DAY AND CURDATE() order by recordDateTime ASC;";
				   
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});

				   },
				   getuserglucosebydates: function(userid, date_from, date_to){
				   	
				   	date_from=date_from+' 00:00:00'; 
                    date_to=date_to+' 23:59:59'; 

                     var sql = "SELECT * FROM WeHealthDB.glucose where user='"+userid+"' AND isdeleted='0' and recordDateTime between  '"+date_from+"' AND '"+date_to+"' order by recordDateTime ASC;";
				   
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				   }	
			}
	}
	);

	return glucose;
};