'use strict';

module.exports = function(sequelize, DataTypes) {

	var medicine = sequelize.define('medicine',
	{},
	{
			classMethods: {
				getmedicine: function (userid)
			   {
				   var sql = "SELECT * from medicine";
				   
				    return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
				   },
                getmedicineStatus: function (userid) {
                    userid = userid.replace("'", "");
                    var sql = "SELECT * from mymedicinestatus WHERE userID=" + userid;
                    sql = sql.replace("'", "");

                    //console.log(sql1);
                   // var sql2 = "SELECT myMedicineID,userID , status, dateTime,reason,timeTake from mymedicinestatus WHERE userID='" + userid + "'"; 

                    console.log(sql);
                    return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });
                }
			}
	}
	);

	return medicine;
};
