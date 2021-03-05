'use strict';

module.exports = function(sequelize, DataTypes) {

	var bp_goal = sequelize.define('bp_goal',
	{},
	{
			classMethods: {
				addbpgoal: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
				lastAddsID: function (lastid)
			   {
				   var sql = "select id from bp_goal where id >="+lastid;
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
               checkgoalbp: function(id)
                 {
                 	var sql="SELECT * FROM WeHealthDB.bp_goal WHERE userID='"+id+"' order by id DESC";
                 	return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
                 },
				updatebpgoal: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				},
				deletebpgoal: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.DELETE});
				
				},
			   getbpgoal: function (userid)
			   {
				   var sql = "select userID as userid , id, systolic_from as goalSystolic_Start, systolic_to as goalSystolic_End, diastolic_from as goalDiastolic_Start, diastolic_to as goalDiastolic_End , notification from bp_goal where userID="+userid;
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }	
			}
	}
	);

	return bp_goal;
};
