'use strict';

module.exports = function(sequelize, DataTypes) {

	var glucose_goal = sequelize.define('glucose_goal',
	{},
	{
			classMethods: {
				addglucosegoal: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
                 checkgoal: function(id)
                 {
                 	var sql="SELECT * FROM umch.glucose_goal WHERE userID='"+id+"' order by id DESC";
                 	return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
                 }
				,
				updateglucosegoal: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				},
				deleteglucosegoal: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.DELETE});
				
				},
			   getglucosegoal: function (userid)
			   {
				   var sql = "select * from glucose_goal where userID="+userid;
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   }	
			}
	}
	);

	return glucose_goal;
};

