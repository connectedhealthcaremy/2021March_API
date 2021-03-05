'use strict';

module.exports = function(sequelize, DataTypes) {

    var badges = sequelize.define('badges', {}, {
        classMethods: {

            checksmokingstatus: function(userid, start_date, end_date) {
                var sql = "select count(smoker) as num from MedicalHistory where userid='" + userid + "' and insertDateTime BETWEEN '" + start_date + "' and '" + end_date + "' and smoker=1";
                return sequelize.query(sql, {
                    type: sequelize.QueryTypes.SELECT
                }).then(response => {
                    return response;
                });

            },
            Addchecksmokingstatus: function(userid, start_date, end_date, resval) {

                var sql = "select (count(smoker) + " + resval + ") as num from MedicalHistory where userID='" + userid + "' and insertDateTime BETWEEN '" + start_date + "' and '" + end_date + "' and smoker=1";
                return sequelize.query(sql, {
                    type: sequelize.QueryTypes.SELECT
                });

            },
            BmiCalculation: function(userid, start_date, end_date) {

                var sql = `SELECT ROUND ((SELECT avg(weightQty) as bmi FROM WeHealthDB.weight where userID='` + userid + `' and date(scaleDate) BETWEEN '` + start_date + `' and '` + end_date + `') /
                        ( ROUND(((select (height/100) from WeHealthDB.user where userID='` + userid + `') * (select (height/100) from WeHealthDB.user where userID='` + userid + `')), 2) ) , 2) as bmi ,
                         email FROM  WeHealthDB.user where userID=` + userid + ``;
                return sequelize.query(sql, {
                    type: sequelize.QueryTypes.SELECT
                });

            },
            PhysicalActivityCalculation: function(userid, start_date, end_date) {

                var sql = `SELECT sum(stepQty) as steps FROM WeHealthDB.step where userID='` + userid + `' and date(startTime) BETWEEN '` + start_date + `' and '` + end_date + `'`;
                return sequelize.query(sql, {
                    type: sequelize.QueryTypes.SELECT
                });
            },
            CholestrolCalculation: function(userid, start_date, end_date) {

                var sql = `SELECT avg(totalcholestrol) as totalcholestrol FROM WeHealthDB.LabReport where userID='` + userid + `' and date(reportdate) BETWEEN '` + start_date + `' and '` + end_date + `'`;
                return sequelize.query(sql, {
                    type: sequelize.QueryTypes.SELECT
                });
            },
            BloodPressureCalculation: function(email, start_date, end_date) {

                var sql = `SELECT avg(systolic) as systolic, avg(diastolic) as diastolic FROM WeHealthDB.bp where userID='` + email + `' and date(recordTime) BETWEEN '` + start_date + `' and '` + end_date + `'`;
                return sequelize.query(sql, {
                    type: sequelize.QueryTypes.SELECT
                });
            },
            GlucoseCalculation: function(email, start_date, end_date) {

                var sql = `SELECT avg(glucoselevel) as glucoselevel FROM WeHealthDB.glucose where user='` + email + `' and date(recordDateTime) BETWEEN '` + start_date + `' and '` + end_date + `'`;
                return sequelize.query(sql, {
                    type: sequelize.QueryTypes.SELECT
                });
            },
            DietCalculation: function(userid, current_date) {

                var sql = `SELECT((CASE WHEN (SELECT count(healthscorecategory) as Fish FROM WeHealthDB.foodhistory where healthscorecategory!='' and userID='` + userid + `' and date(foodDateTime)='` + current_date + `' and healthscorecategory='Fish')  > 0 THEN 1 ELSE  0 END) + (CASE WHEN (SELECT count(healthscorecategory) as Fruits FROM WeHealthDB.foodhistory where healthscorecategory!='' and userID='` + userid + `' and date(foodDateTime)='` + current_date + `' and healthscorecategory='Fruits')  > 0 THEN 1 ELSE  0 END ) + (CASE WHEN (SELECT count(healthscorecategory) as Vegetables FROM WeHealthDB.foodhistory where healthscorecategory!='' and userID='` + userid + `' and date(foodDateTime)='` + current_date + `' and healthscorecategory='Vegetables')  > 0 THEN 1 ELSE  0 END ) + (CASE WHEN (SELECT count(healthscorecategory) as beverages FROM WeHealthDB.foodhistory where healthscorecategory!='' and  userID='` + userid + `' and date(foodDateTime)='` + current_date + `' and healthscorecategory like '%beverages%')  > 0 THEN 1 ELSE  0 END ) + (CASE WHEN (SELECT count(healthscorecategory) as foodsodium  FROM WeHealthDB.foodhistory where healthscorecategory!='' and userID='` + userid + `' and date(foodDateTime)='` + current_date + `' HAVING avg(foodsodium) < 1500)  > 0 THEN 1 ELSE  0 END )) as dietScore FROM WeHealthDB.foodhistory where healthscorecategory!='' and userID='` + userid + `' and date(foodDateTime)='` + current_date + `'`;

                return sequelize.query(sql, {
                    type: sequelize.QueryTypes.SELECT
                });
            }



        }
    });

    return badges;
};