'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');


///////////////========================Get Hospital Data=================================================/////////////////

exports.getcomphospitaluserrelation = function(req, res) {
	var userid = req.query.userid;
	var token = req.query.token;

	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function(response) {
				if (response != '' && response != null) {
					var email = response;
					//res.json(email);
					///Get user info
					db.comphospital_userrelation.getcomphospitaluserrelation(userid).then(function(response) {
							data["error"] = 0;
							data["authResponse"] = "Action Successful";
							data['Data'] = response;
							res.json(data);

						})
						.error(function(err) {
							res.json(err);
						});

				} else {
					data["error"] = 1;
					data["authResponse"] = "Authentication Failed.";
					res.json(data);

				}
			})
			.error(function(err) {
				res.json(err);
			});
	} else {
		data["error"] = 1;
		data["authResponse"] = "Please provide all required data (i.e : token etc)";
		res.json(data);
		//connection.end()
	}

	return res;
};


exports.insertCompHospitalUserRelation = function (req, res) {
    var userid1 = req.body.userID;
    var token = req.body.token;
    var data1 = req.body.data;
    data1 = JSON.parse(data1);
    var total = data1.length;



    var data = {
        "error": 0,
        "authResponse": ""
    }
    var userid = data1[0].userid;
    var isuploadedtoweb = data1[0].isuploadedtoweb;
 
    var compHospitalGymID = data1[0].compHospitalGymID;
    var refID = data1[0].refID;
     
     
    db.user.authUser(token).then(function (response) {
            var updatequery = "update compHospitalGym_user_relation set userID='"+userid+"',compHospitalGymID='"+compHospitalGymID+"',refID='"+refID+"' where userID='" + userid + "' and compHospitalGymID='"+compHospitalGymID+"'";
    
            var sql_n1 = "INSERT INTO compHospitalGym_user_relation(userID,compHospitalGymID,refID) values ('" + userid + "','" + compHospitalGymID + "','" + 									refID + "')";

            var selectQuery = "select * from compHospitalGym_user_relation where userID='" + userid + "' and compHospitalGymID='"+compHospitalGymID+"'";

            console.log(sql_n1);
            db.comphospital_userrelation.getCompHospitalUserRelationWithCompID(selectQuery).then(function (response) {
                    if (response != '' && response != null) {
                                db.comphospital_userrelation.Updatenotification(updatequery).then(function (response) {
                                 data["error"] = 0;
				data["Data"] = response;
				data["authResponse"] = " comp hospital user relation updated Successfully";
				res.json(data);

                                }).error(function (err) {
                                    res.json(err);
                                });
                    } else {
                     
			    db.comphospital_userrelation.addCompHospitalUserRelation(sql_n1).then(function (result) {


				data["error"] = 0;
				data["Data"] = result;
				data["authResponse"] = "insert comp hospital user relation added Successfully";
				res.json(data);

			    }).error(function (err) {
				res.json(err);
				data["error"] = err;
			    });
                   }

             }).error(function (err) {
		res.json(err);
	     });


        }).error(function (err) {
                res.json(err);
        });





    return res;

};
