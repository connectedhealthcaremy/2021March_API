'use strict';


module.exports = function(sequelize, DataTypes) {

	var bp = sequelize.define('bp',
	{},
	{
			classMethods: {
				addbp: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
				lastaddIDs: function (lastinsertid) { 
				
				 var sql = "select bpID AS id from bp where bpID >='"+lastinsertid+"'";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
				getfamilyEmails: function (userid) { 
				
				 var sql = "select email from family where userID ='"+userid+"' and status=1 and type='caregiver'"; 
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
				updatebp: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				},
				deletebp: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				},
			   getbp: function (userid)
			   {
				   var sql = "select bpID, userID, systolic as systolic, diastolic as diastolic, recordTime as record_time, pulse as pulserate, notes as notes, insertDateTime, deviceStatus as deviceStatus from bp where userID='"+userid+"' AND isdeleted='0' order by recordTime desc";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
			  getbplatest: function(userid)
			  {
			  	var sql = "select * from bp where userID='"+userid+"' AND isdeleted='0' and recordTime between  CURDATE() - INTERVAL 30 DAY AND CURDATE() order by recordTime";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
			  } ,
			 getbpbydates: function(userid, date_from, date_to){
			 	    date_from=date_from+' 00:00:00'; 
                    date_to=date_to+' 23:59:59'; 

                    var sql = "select * from bp where userID='"+userid+"' AND isdeleted='0' and recordTime between  '"+date_from+"' AND '"+date_to+"' order by recordTime";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
			 }    	
			}
	}
	);

	return bp;
};