'use strict';

module.exports = function(sequelize, DataTypes) {

	var oxygen = sequelize.define('oxygen',
	{},
	{
			classMethods: {
				addoxygen: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
				delete_oxygen: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.DELETE});
				
				},
				lastAddsID: function (lastid)
			   {
				   var sql = "select id from oxygen where id >='"+lastid+"'";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
			  getoxygenPostDetails: function (id)
			   {
				   var sql = `SELECT user.userID, user.email, user.firstName, user.lastName, oxygen.oxygenlevel, oxygen.pulse, oxygen.recordDateTime 
							  FROM WeHealthDB.oxygen inner join user on oxygen.user=user.email
							  where oxygen.id=`+id+``;
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
				updateoxygen: function(sql)
				{
					return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
					}
				,
				deleteoxygen: function(sql)
				{
					return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
					}	
				,
			   getoxygen: function (userid)
			   {
				   var sql = "select id, user, oxygenlevel as oxygenlevel, pulse as pulse, recordDateTime as record_date_time, insertDate, notes as notes, deviceStatus as deviceStatus , deviceuuid , deviceid from oxygen where user='"+userid+"' AND isdeleted='0'";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
			   checkgoaloxygen: function (userid)
			   {
				   var sql = "select * from oxygenGoal where userid='"+userid+"' order by insertDateTime desc limit 1";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }

				   	
			}
	}
	);

	return oxygen;
};
