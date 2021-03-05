'use strict';

module.exports = function(sequelize, DataTypes) {

	var heartrate = sequelize.define('heartrate',
	{ 	
		},
	{
			classMethods: {
				check_newDevice : (userid, uuID) =>{
					var sql  = "SELECT * FROM heartrate WHERE userID ='"+userid+"' and deviceuuid ='"+uuID+"' limit 1;";//and recordTime ='"+startDate+"' limit 1;"; 
					return 	sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				},
				getLatestRecord: (userid,uuid) => {
					var sql="SELECT max(recordTime) as maxTime from heartrate WHERE userID='"+userid+"' and deviceuuid ='"+uuid+"'; ";
					return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT});
				},
				addheartrate: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
				lastAddsID: function (lastid){
					var sql = "select heartRateID AS id from heartrate where heartRateID >="+lastid;
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				 },
				deleteHeartrate: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.DELETE});
				
				},
				getHRPostDetails: function (id)
				{
						var sql = `SELECT user.userID, user.email, user.firstName, user.lastName, heartrate.heartRateQty, heartrate.recordTime 
									FROM WeHealthDB.heartrate inner join user on heartrate.userID=user.userID
									where heartRateID=`+id+``;
						return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});

				},
				updateheartrate: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				},
				deleteheartrate: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				},
			   getheartrate: function (userid)
			   {
				   var sql = "SELECT heartRateID, userID, heartRateQty, recordTime as recordDateTime, deviceStatus, heartRateType , deviceuuid , deviceid FROM heartrate WHERE userID='"+userid+"' AND isdeleted=0 ";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
			   checkgoalheartrate: function (userid)
			   {
				   var sql = "select * from heartrateGoal where userid='"+userid+"' order by insertDateTime desc limit 1";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },

				  checkheart_rate_notify_check: function (userid)
			      {
				   var sql = "SELECT TIME_TO_SEC(TIMEDIFF(last_request, first_request)) as diff FROM WeHealthDB.heart_rate_notify_check where userID='"+userid+"' order by insertion_date_time desc limit 1;";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },

                 update_last_request: function (sql)
			      {
				   
				   return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
					
				   }

			}
	}
	);

	return heartrate;
};

//[{"deviceid":"Postman","devicetype":19,"deviceuuid":"Postman","email":"","entryType":1,"heartRateID":5185756,"heartRateQty":79,"heartRateType":0,"isUploadedToWeb":0,"notes":"","recordDate":"","recordDateTime":"2020-09-17 11:00:00","sectionheader":false,"serverid":0,"userID":12844}]
