'use strict';

module.exports = function(sequelize, DataTypes) {

	var bodydensity = sequelize.define('bodydensity',
	{ 	
		},
	{
			classMethods: {
				addbodydensity: function (sql) { 
				
             return sequelize.query(sql,{ type: sequelize.QueryTypes.INSERT});
				
				},
				lastaddbodydensityIDs: function (lastinsertid)
			   {
				   var sql = "SELECT id FROM bodydensity WHERE id >='"+lastinsertid+"' AND isdeleted=0 ";
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
				updatebodydensity: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				},
				deletebodydensity: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				},
			   getbodydensity: function (userid)
			   {
				   var sql = "SELECT id as bodydensityid,userID , bodydensity as bodydensity, recordDateTime as insertiontime ,site1 , site2, site3 , deviceStatus as deviceTypeID, notes FROM bodydensity WHERE userID='"+userid+"' AND isdeleted=0 ";
				   
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
				getlatestbodydensity: function(userid)
				{
					var sql = "SELECT id,userID , bodydensity, recordDateTime, site1 as chest, site2 as thigh, site3 as abdominal  FROM bodydensity WHERE userID='"+userid+"' AND isdeleted=0 and recordDateTime between  CURDATE() - INTERVAL 30 DAY AND CURDATE() order by recordDateTime asc";
				   
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});

				},getlatestbodydensitybyDate: function(userid, date_from, date_to)
				{
					date_from=date_from+' 00:00:00'; 
                    date_to=date_to+' 23:59:59';

					var sql = "SELECT id,userID , bodydensity, recordDateTime  , site1 as chest, site2 as thigh, site3 as abdominal FROM bodydensity WHERE userID='"+userid+"' AND isdeleted=0 and recordDateTime between  '"+date_from+"' AND '"+date_to+"' order by recordDateTime asc";
				   
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});

				}    	
			}
	}
	);

	return bodydensity;
};
