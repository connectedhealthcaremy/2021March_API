'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');

//================================================Add Food Timing =================================//////////////////
exports.addfoodtiming = function(req, res) {

    var userid = req.body.userid;
    var token = req.body.token;

    var data1 = req.body.data;
    data1 = JSON.parse(data1);
    var total = data1.length;
    var data = {
        "error": 0,
        "authResponse": ""
    }



    db.user.authUser(token).then(function(response) {
            if (!!token) {
                if (response != '' && response != null) {

                    db.foodhistory.checkfoodtiming(userid).then(function(response) {

                        if (response != '' && response != null) {


                            var id = response[0].id;

                            if (!!id) {

                                /************************
                                 ***Update food timing
                                 *********** **************/
                                var sql = "UPDATE food_timing SET ";


                                var startbreakfasttime = data1[total - 1].startbreakfasttime;
                                var endbreakfasttime = data1[total - 1].endbreakfasttime;
                                var startmorningtea = data1[total - 1].startmorningtea;
                                var endmorningtea = data1[total - 1].endmorningtea;
                                var startlunchtime = data1[total - 1].startlunchtime;
                                var endlunchtime = data1[total - 1].endlunchtime;
                                var startteabreak = data1[total - 1].startteabreak;
                                var endteabreak = data1[total - 1].endteabreak;
                                var startdinnertime = data1[total - 1].startdinnertime;
                                var enddinnertime = data1[total - 1].enddinnertime;
                                var startsuppertime = data1[total - 1].startsuppertime;
                                var endsuppertime = data1[total - 1].endsuppertime;


                                sql += "startbreakfasttime='" + startbreakfasttime + "',endbreakfasttime='" + endbreakfasttime + "',startmorningtea='" + startmorningtea + "',endmorningtea='" + endmorningtea + "',startlunchtime='" + startlunchtime + "',endlunchtime='" + endlunchtime + "',startteabreak='" + startteabreak + "',endteabreak='" + endteabreak + "',startdinnertime='" + startdinnertime + "',enddinnertime='" + enddinnertime + "',startsuppertime='" + startsuppertime + "',endsuppertime='" + endsuppertime + "' WHERE id='" + id + "'; ";


                                db.foodhistory.updatefoodtiming(sql).then(function(response) {

                                    data["error"] = 0;
                                    data["authResponse"] = "Food Timing Updated Successfully";
                                    res.json(data);

                                }).error(function(err) {
                                    res.json(err);
                                });

                            } else {
                                data["error"] = 0;
                                data["authResponse"] = "Server Id Required !.";
                                res.json(data);
                            }

                        } else {

                            /************************
                             **** Add New food timing
                             *********************/
                            var sql = "INSERT INTO food_timing (userID,startbreakfasttime,endbreakfasttime, startmorningtea, endmorningtea, startlunchtime, endlunchtime, startteabreak, endteabreak, startdinnertime, enddinnertime, startsuppertime, endsuppertime) values ";

                            for (var i = 0; i < total - 1; i++) {

                                var startbreakfasttime = data1[i].startbreakfasttime;
                                var endbreakfasttime = data1[i].endbreakfasttime;
                                var startmorningtea = data1[i].startmorningtea;
                                var endmorningtea = data1[i].endmorningtea;
                                var startlunchtime = data1[i].startlunchtime;
                                var endlunchtime = data1[i].endlunchtime;
                                var startteabreak = data1[i].startteabreak;
                                var endteabreak = data1[i].endteabreak;
                                var startdinnertime = data1[i].startdinnertime;
                                var enddinnertime = data1[i].enddinnertime;
                                var startsuppertime = data1[i].startsuppertime;
                                var endsuppertime = data1[i].endsuppertime;

                                sql += "('" + userid + "','" + startbreakfasttime + "','" + endbreakfasttime + "','" + startmorningtea + "','" + endmorningtea + "','" + startlunchtime + "','" + endlunchtime + "','" + startteabreak + "','" + endteabreak + "','" + startdinnertime + "','" + enddinnertime + "','" + startsuppertime + "','" + endsuppertime + "'),";

                                sql = sql.substr(0, sql.length);
                            }


                            var startbreakfasttime = data1[total - 1].startbreakfasttime;
                            var endbreakfasttime = data1[total - 1].endbreakfasttime;
                            var startmorningtea = data1[total - 1].startmorningtea;
                            var endmorningtea = data1[total - 1].endmorningtea;
                            var startlunchtime = data1[total - 1].startlunchtime;
                            var endlunchtime = data1[total - 1].endlunchtime;
                            var startteabreak = data1[total - 1].startteabreak;
                            var endteabreak = data1[total - 1].endteabreak;
                            var startdinnertime = data1[total - 1].startdinnertime;
                            var enddinnertime = data1[total - 1].enddinnertime;
                            var startsuppertime = data1[total - 1].startsuppertime;
                            var endsuppertime = data1[total - 1].endsuppertime;

                            sql += "('" + userid + "','" + startbreakfasttime + "','" + endbreakfasttime + "','" + startmorningtea + "','" + endmorningtea + "','" + startlunchtime + "','" + endlunchtime + "','" + startteabreak + "','" + endteabreak + "','" + startdinnertime + "','" + enddinnertime + "','" + startsuppertime + "','" + endsuppertime + "')";


                            db.foodhistory.addfoodtiming(sql).then(function(response) {

                                data["error"] = 0;
                                data["authResponse"] = "Food Timing Added Successfully";
                                res.json(data);

                            }).error(function(err) {
                                res.json(err);
                            });


                        }

                    });

                } else {
                    data["error"] = 1;
                    data["authResponse"] = "Authentication Failed.";
                    res.json(data);
                }
            } else {
                data["error"] = 1;
                data["authResponse"] = "Token Required etc.";
                res.json(data);
            }
        })
        .error(function(err) {
            res.json(err);
        });



    return res;

};


//================================================Add Food Notifications =================================//////////////////
exports.addfoodnotifications = function(req, res) {

    var userid = req.body.userid;
    var token = req.body.token;

    var data1 = req.body.data;
    data1 = JSON.parse(data1);
    var total = data1.length;
    var data = {
        "error": 0,
        "authResponse": ""
    }



    db.user.authUser(token).then(function(response) {
            if (!!token) {
                if (response != '' && response != null) {

                    db.foodhistory.checkfoodnotification(userid).then(function(response) {

                        if (response != '' && response != null) {


                            var id = response[0].id;

                            if (!!id) {

                                /************************
                                 ***Update food notification
                                 *********** **************/
                                var sql = "UPDATE food_notification SET ";


                                var isnotificationenabled = data1[total - 1].isnotificationenabled;



                                sql += "isnotificationenabled='" + isnotificationenabled + "' WHERE id='" + id + "' ";


                                db.foodhistory.updatefoodtiming(sql).then(function(response) {

                                    data["error"] = 0;
                                    data["authResponse"] = "Food Notification Updated Successfully";
                                    res.json(data);

                                }).error(function(err) {
                                    res.json(err);
                                });

                            } else {
                                data["error"] = 0;
                                data["authResponse"] = "Server Id Required !.";
                                res.json(data);
                            }

                        } else {

                            /************************
                             **** Add New food Notification
                             *********************/
                            var sql = "INSERT INTO food_notification (userid,isnotificationenabled) values ";

                            for (var i = 0; i < total - 1; i++) {


                                var isnotificationenabled = data1[i].isnotificationenabled;


                                sql += "('" + userid + "','" + isnotificationenabled + "'),";

                                sql = sql.substr(0, sql.length);
                            }



                            var isnotificationenabled = data1[total - 1].isnotificationenabled;

                            sql += "('" + userid + "','" + isnotificationenabled + "')";

                            db.foodhistory.addfoodtiming(sql).then(function(response) {

                                data["error"] = 0;
                                data["authResponse"] = "Food Notification Added Successfully";
                                res.json(data);

                            }).error(function(err) {
                                res.json(err);
                            });


                        }

                    });

                } else {
                    data["error"] = 1;
                    data["authResponse"] = "Authentication Failed.";
                    res.json(data);
                }
            } else {
                data["error"] = 1;
                data["authResponse"] = "Token Required etc.";
                res.json(data);
            }
        })
        .error(function(err) {
            res.json(err);
        });



    return res;

};



//================================================Add Food history days =================================//////////////////
exports.addfoodhistorydays = function(req, res) {

    var userid = req.body.userid;
    var token = req.body.token;

    var data1 = req.body.data;
    data1 = JSON.parse(data1);
    var total = data1.length;
    var data = {
        "error": 0,
        "authResponse": ""
    }



    db.user.authUser(token).then(function(response) {
            if (!!token) {
                if (response != '' && response != null) {

                    db.foodhistory.checkfoodhistorydays(userid).then(function(response) {

                        if (response != '' && response != null) {


                            var id = response[0].id;

                            if (!!id) {

                                /************************
                                 ***Update food notification
                                 *********** **************/
                                var sql = "UPDATE food_history_days SET ";


                                var startdate = data1[total - 1].startdate;
                                var enddate = data1[total - 1].enddate;



                                sql += "startdate='" + startdate + "', enddate='" + enddate + "' WHERE id='" + id + "' ";



                                db.foodhistory.updatefoodtiming(sql).then(function(response) {

                                    data["error"] = 0;
                                    data["authResponse"] = "Food History Days Updated Successfully";
                                    res.json(data);

                                }).error(function(err) {
                                    res.json(err);
                                });

                            } else {
                                data["error"] = 0;
                                data["authResponse"] = "Server Id Required !.";
                                res.json(data);
                            }

                        } else {

                            /************************
                             **** Add New food historay days
                             *********************/
                            var sql = "INSERT INTO food_history_days (userid,startdate, enddate) values ";

                            for (var i = 0; i < total - 1; i++) {


                                var startdate = data1[i].startdate;
                                var enddate = data1[i].enddate;


                                sql += "('" + userid + "','" + startdate + "','" + enddate + "'),";

                                sql = sql.substr(0, sql.length);
                            }



                            var startdate = data1[total - 1].startdate;
                            var enddate = data1[total - 1].enddate;

                            sql += "('" + userid + "','" + startdate + "','" + enddate + "')";

                            db.foodhistory.addfoodtiming(sql).then(function(response) {

                                data["error"] = 0;
                                data["authResponse"] = "Food History Days Added Successfully";
                                res.json(data);

                            }).error(function(err) {
                                res.json(err);
                            });


                        }

                    });

                } else {
                    data["error"] = 1;
                    data["authResponse"] = "Authentication Failed.";
                    res.json(data);
                }
            } else {
                data["error"] = 1;
                data["authResponse"] = "Token Required etc.";
                res.json(data);
            }
        })
        .error(function(err) {
            res.json(err);
        });



    return res;

};

//================================================Add Food nutrient setting =================================//////////////////
exports.addfoodnutrientsettings = function(req, res) {

    var userid = req.body.userid;
    var token = req.body.token;

    var data1 = req.body.data;
    data1 = JSON.parse(data1);
    var total = data1.length;
    var data = {
        "error": 0,
        "authResponse": ""
    }



    db.user.authUser(token).then(function(response) {
            if (!!token) {
                if (response != '' && response != null) {

                    db.foodhistory.checkfoodnutrientSettings(userid).then(function(response) {

                        if (response != '' && response != null) {


                            var id = response[0].id;

                            if (!!id) {

                                /************************
                                 ***Update food notification
                                 *********** **************/
                                var sql = "UPDATE food_Nutrient_Settings SET ";


                                var totalcalories = data1[total - 1].totalcalories;
                                var totalcarbohydrate = data1[total - 1].totalcarbohydrate;
                                var totalsugar = data1[total - 1].totalsugar;
                                var totalprotein = data1[total - 1].totalprotein;
                                var totalfat = data1[total - 1].totalfat;
                                var totalsaturatedfat = data1[total - 1].totalsaturatedfat;
                                var totalmonosaturatedfat = data1[total - 1].totalmonosaturatedfat;
                                var totalpolysaturatedfat = data1[total - 1].totalpolysaturatedfat;
                                var totaltransfat = data1[total - 1].totaltransfat;
                                var totalcholestrol = data1[total - 1].totalcholestrol;
                                var totalsodium = data1[total - 1].totalsodium;
                                var totalcalcium = data1[total - 1].totalcalcium;
                                var totalfiber = data1[total - 1].totalfiber;
                                var totalvitamainc = data1[total - 1].totalvitamainc;
                                var totaliron = data1[total - 1].totaliron;



                                sql += "totalcalories='" + totalcalories + "', totalcarbohydrate='" + totalcarbohydrate + "', totalsugar='" + totalsugar + "', totalprotein='" + totalprotein + "', totalfat='" + totalfat + "', totalsaturatedfat='" + totalsaturatedfat + "', totalmonosaturatedfat='" + totalmonosaturatedfat + "', totalpolysaturatedfat='" + totalpolysaturatedfat + "', totaltransfat='" + totaltransfat + "', totalcholestrol='" + totalcholestrol + "', totalsodium='" + totalsodium + "', totalcalcium='" + totalcalcium + "', totalfiber='" + totalfiber + "', totalvitamainc='" + totalvitamainc + "', totaliron='" + totaliron + "' WHERE id='" + id + "' ";



                                db.foodhistory.updatefoodtiming(sql).then(function(response) {

                                    data["error"] = 0;
                                    data["authResponse"] = "Food Nutrient Settings Updated Successfully";
                                    res.json(data);

                                }).error(function(err) {
                                    res.json(err);
                                });

                            } else {
                                data["error"] = 0;
                                data["authResponse"] = "Server Id Required !.";
                                res.json(data);
                            }

                        } else {

                            /************************
                             **** Add New food nutirient Settings
                             *********************/
                            var sql = "INSERT INTO food_Nutrient_Settings (userid,totalcalories, totalcarbohydrate, totalsugar, totalprotein, totalfat, totalsaturatedfat, totalmonosaturatedfat, totalpolysaturatedfat, totaltransfat, totalcholestrol, totalsodium, totalcalcium, totalfiber, totalvitamainc, totaliron) values ";

                            for (var i = 0; i < total - 1; i++) {


                                var totalcalories = data1[i].totalcalories;
                                var totalcarbohydrate = data1[i].totalcarbohydrate;
                                var totalsugar = data1[i].totalsugar;
                                var totalprotein = data1[i].totalprotein;
                                var totalfat = data1[i].totalfat;
                                var totalsaturatedfat = data1[i].totalsaturatedfat;
                                var totalmonosaturatedfat = data1[i].totalmonosaturatedfat;
                                var totalpolysaturatedfat = data1[i].totalpolysaturatedfat;
                                var totaltransfat = data1[i].totaltransfat;
                                var totalcholestrol = data1[i].totalcholestrol;
                                var totalsodium = data1[i].totalsodium;
                                var totalcalcium = data1[i].totalcalcium;
                                var totalfiber = data1[i].totalfiber;
                                var totalvitamainc = data1[i].totalvitamainc;
                                var totaliron = data1[i].totaliron;


                                sql += "('" + userid + "','" + totalcalories + "','" + totalcarbohydrate + "', '" + totalsugar + "','" + totalprotein + "','" + totalfat + "','" + totalsaturatedfat + "','" + totalmonosaturatedfat + "','" + totalpolysaturatedfat + "', '" + totaltransfat + "','" + totalcholestrol + "','" + totalsodium + "','" + totalcalcium + "','" + totalfiber + "','" + totalvitamainc + "','" + totaliron + "'),";

                                sql = sql.substr(0, sql.length);
                            }


                            var totalcalories = data1[total - 1].totalcalories;
                            var totalcarbohydrate = data1[total - 1].totalcarbohydrate;
                            var totalsugar = data1[total - 1].totalsugar;
                            var totalprotein = data1[total - 1].totalprotein;
                            var totalfat = data1[total - 1].totalfat;
                            var totalsaturatedfat = data1[total - 1].totalsaturatedfat;
                            var totalmonosaturatedfat = data1[total - 1].totalmonosaturatedfat;
                            var totalpolysaturatedfat = data1[total - 1].totalpolysaturatedfat;
                            var totaltransfat = data1[total - 1].totaltransfat;
                            var totalcholestrol = data1[total - 1].totalcholestrol;
                            var totalsodium = data1[total - 1].totalsodium;
                            var totalcalcium = data1[total - 1].totalcalcium;
                            var totalfiber = data1[total - 1].totalfiber;
                            var totalvitamainc = data1[total - 1].totalvitamainc;
                            var totaliron = data1[total - 1].totaliron;

                            sql += "('" + userid + "','" + totalcalories + "','" + totalcarbohydrate + "', '" + totalsugar + "','" + totalprotein + "','" + totalfat + "','" + totalsaturatedfat + "','" + totalmonosaturatedfat + "','" + totalpolysaturatedfat + "', '" + totaltransfat + "','" + totalcholestrol + "','" + totalsodium + "','" + totalcalcium + "','" + totalfiber + "','" + totalvitamainc + "','" + totaliron + "')";

                            db.foodhistory.addfoodtiming(sql).then(function(response) {

                                data["error"] = 0;
                                data["authResponse"] = "Food Nutrient Settings Added Successfully";
                                res.json(data);

                            }).error(function(err) {
                                res.json(err);
                            });


                        }

                    });

                } else {
                    data["error"] = 1;
                    data["authResponse"] = "Authentication Failed.";
                    res.json(data);
                }
            } else {
                data["error"] = 1;
                data["authResponse"] = "Token Required etc.";
                res.json(data);
            }
        })
        .error(function(err) {
            res.json(err);
        });



    return res;

};



//============================================Add food ============================================/////////////////
exports.addfood = function(req, res) {

    var userid = req.body.userid;
    var token = req.body.token;
    var foodid = req.body.foodid;
    var englishName = req.body.englishname;
    var scientificName = req.body.scientificname;
    var weight = req.body.weight;
    var ediblePortion = req.body.edibleportion;
    var foodGroup = req.body.foodgroup;

    var data = {
        "error": 0,
        "authResponse": ""
    }



    db.user.authUser(token).then(function(response) {
            if (!!token) {
                if (response != '' && response != null) {

                    var email = response;

                    var email = response;

                    var sql = "Insert into food(foodid,englishname,scientificname,foodgroup,ediblePortion,weight) values(" + foodid + ",'" + englishName + "','" + scientificName + "','" + weight + "','" + ediblePortion + "','" + foodGroup + "')";
                    db.food.addfood(sql).then(function(response) {

                        data["error"] = 0;
                        data["authResponse"] = "Food Added Successfully";
                        res.json(data);

                    }).error(function(err) {
                        res.json(err);
                    });


                } else {
                    data["error"] = 1;
                    data["authResponse"] = "Authentication Failed.";
                    res.json(data);
                }
            } else {
                data["error"] = 1;
                data["authResponse"] = "Token Required etc.";
                res.json(data);
            }
        })
        .error(function(err) {
            res.json(err);
        });



    return res;
};

///////////////========================Get Food =================================================/////////////////

exports.getAllFood = function(req, res) {
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

                    db.food.getallfood().then(function(response) {
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

////////=====================Get food suggestion===============================================/////////////////////
exports.foodnameSuggestion1 = function(req, res) {
    var userid = req.query.userid;
    var token = req.query.token;
    var name = req.query.name;

    var data = {
        "error": 0,
        "authResponse": ""
    }
    if (!!token) {
        ///Authinticate user
        db.user.authUser(token).then(function(response) {
                if (response != '' && response != null) {
                    var email = response;

                    db.food.getfoodnamesuggestion(name).then(function(response) {
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

///////////////========================Get Food with out category =================================================/////////////////

exports.foodswithoutcat = function(req, res) {

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

                    db.food.getallfoodwithoutcategory().then(function(response) {
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

///////////////========================Get getSpecificFood =================================================/////////////////

exports.getSpecificFood = function(req, res) {
    var userid = req.query.userid;
    var token = req.query.token;
    var food = req.query.food;
    var data = {
        "error": 0,
        "authResponse": ""
    }
    if (!!token) {
        ///Authinticate user
        db.user.authUser(token).then(function(response) {
                if (response != '' && response != null) {
                    var email = response;

                    db.food.getspecificfood(food).then(function(response) {
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

///////////////========================Get getSpecificFood With Composition =================================================/////////////////

exports.foodWithComposition = function(req, res) {
    var userid = req.query.userid;
    var token = req.query.token;
    var food = req.query.food;
    var data = {
        "error": 0,
        "authResponse": ""
    }
    if (!!token) {
        ///Authinticate user
        db.user.authUser(token).then(function(response) {
                if (response != '' && response != null) {
                    var email = response;

                    db.food.getspecificfoodwithcomposition(food).then(function(response) {
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


///////////////========================Get getSpecificFood With Composition =================================================/////////////////

exports.foodWithMG = function(req, res) {
    var userid = req.query.userid;
    var token = req.query.token;
    var food = req.query.food;
    var data = {
        "error": 0,
        "authResponse": ""
    }
    if (!!token) {
        ///Authinticate user
        db.user.authUser(token).then(function(response) {
                if (response != '' && response != null) {
                    var email = response;

                    db.food.getspecificfoodwithmg(food).then(function(response) {
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


exports.foodWithml = function(req, res) {
    var userid = req.query.userid;
    var token = req.query.token;
    var food = req.query.food;
    var data = {
        "error": 0,
        "authResponse": ""
    }
    if (!!token) {
        ///Authinticate user
        db.user.authUser(token).then(function(response) {
                if (response != '' && response != null) {
                    var email = response;

                    db.food.getspecificfoodwithmg(food).then(function(response) {
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

//============================================Add food minerals============================================/////////////////
exports.insertfoodminerals = function(req, res) {
    var userid = req.body.userid;
    var token = req.body.token;
    var foodId = req.body.foodid;
    var calcium = req.body.calcium;
    var phosphorus = req.body.phosphorus;
    var iron = req.body.iron;
    var sodium = req.body.sodium;
    var potassium = req.body.potassium;

    var data = {
        "error": 0,
        "authResponse": ""
    }



    db.user.authUser(token).then(function(response) {
            if (!!token) {
                if (response != '' && response != null) {

                    var email = response;

                    var email = response;

                    var sql = "Insert into foodminerals(foodid,calcium,phosphorus,iron,sodium, potassium) values(" + foodId + ",'" + calcium + "','" + phosphorus + "','" + iron + "','" + sodium + "','" + potassium + "')";

                    db.foodminerals.addfoodminerals(sql).then(function(response) {

                        data["error"] = 0;
                        data["authResponse"] = "Food Minerals Inserted Successfully";
                        res.json(data);

                    }).error(function(err) {
                        res.json(err);
                    });


                } else {
                    data["error"] = 1;
                    data["authResponse"] = "Authentication Failed.";
                    res.json(data);
                }
            } else {
                data["error"] = 1;
                data["authResponse"] = "Token Required etc.";
                res.json(data);
            }
        })
        .error(function(err) {
            res.json(err);
        });



    return res;
};

///////////////========================Get All food minerals =================================================/////////////////

exports.retrieveallfoodminerals = function(req, res) {
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

                    db.foodminerals.getallfoodminerals().then(function(response) {
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

///////////////========================Get Specific food minerals=================================================/////////////////

exports.retrievefoodminerals = function(req, res) {
    var userid = req.query.userid;
    var token = req.query.token;
    var foodId = req.query.foodid;

    var data = {
        "error": 0,
        "authResponse": ""
    }
    if (!!token) {
        ///Authinticate user
        db.user.authUser(token).then(function(response) {
                if (response != '' && response != null) {
                    var email = response;

                    db.foodminerals.getfoodminerals(foodId).then(function(response) {
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

//============================================Add food proximate composition============================================/////////////////
exports.insertfoodproximatecomposition = function(req, res) {
    var userid = req.body.userid;
    var token = req.body.token;
    var foodId = req.body.foodid;
    var energy = req.body.energy;
    var water = req.body.water;
    var protein = req.body.protein;
    var fat = req.body.fat;
    var cho = req.body.cho;
    var fiber = req.body.fiber;
    var ash = req.body.ash;

    var data = {
        "error": 0,
        "authResponse": ""
    }



    db.user.authUser(token).then(function(response) {
            if (!!token) {
                if (response != '' && response != null) {

                    var email = response;

                    var email = response;

                    var sql = "Insert into foodproximatecomposition(foodid, energy, water, protein, fat, cho, fiber, ash) values(" + foodId + ",'" + energy + "','" + water + "','" + protein + "','" + fat + "','" + cho + "','" + fiber + "','" + ash + "')";

                    db.foodproximatecomposition.addfoodproximatecomposition(sql).then(function(response) {

                        data["error"] = 0;
                        data["authResponse"] = "Food Proximate Composition Inserted Successfully";
                        res.json(data);

                    }).error(function(err) {
                        res.json(err);
                    });


                } else {
                    data["error"] = 1;
                    data["authResponse"] = "Authentication Failed.";
                    res.json(data);
                }
            } else {
                data["error"] = 1;
                data["authResponse"] = "Token Required etc.";
                res.json(data);
            }
        })
        .error(function(err) {
            res.json(err);
        });



    return res;
};

///////////////========================Get All food proximate composition =================================================/////////////////

exports.retrieveallfoodproximatecomposition = function(req, res) {
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

                    db.foodproximatecomposition.getallfoodproximatecomposition().then(function(response) {
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

///////////////========================Get Specific food proximate composition=================================================/////////////////

exports.retrievefoodproximatecomposition = function(req, res) {
    var userid = req.query.userid;
    var token = req.query.token;
    var foodId = req.query.foodid;

    var data = {
        "error": 0,
        "authResponse": ""
    }
    if (!!token) {
        ///Authinticate user
        db.user.authUser(token).then(function(response) {
                if (response != '' && response != null) {
                    var email = response;

                    db.foodproximatecomposition.getspecificfoodproximatecomposition(foodId).then(function(response) {
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

//============================================Add food Vitamins============================================/////////////////
exports.insertfoodvitamains = function(req, res) {
    var userid = req.body.userid;
    var token = req.body.token;
    var foodId = req.body.foodid;
    var retinol = req.body.retinol;
    var carotenes = req.body.carotenes;
    var retinolequival = req.body.retinolequival;
    var vitamainb2 = req.body.vitamainb2;
    var vitamainb1 = req.body.vitamainb1;
    var niacin = req.body.niancin;
    var vitamainc = req.body.vitamainc;

    var data = {
        "error": 0,
        "authResponse": ""
    }



    db.user.authUser(token).then(function(response) {
            if (!!token) {
                if (response != '' && response != null) {

                    var email = response;

                    var email = response;

                    var sql = "Insert into foodvitamains(foodid, retinol, carotenes, retinolequival, vitamainb2, vitamainb1, niacin, vitamainc) values(" + foodId + ",'" + retinol + "','" + carotenes + "','" + retinolequival + "','" + vitamainb2 + "','" + vitamainb1 + "','" + niacin + "','" + vitamainc + "')";

                    db.foodvitamains.addfoodvitamains(sql).then(function(response) {

                        data["error"] = 0;
                        data["authResponse"] = "Food Vitamins Inserted Successfully";
                        res.json(data);

                    }).error(function(err) {
                        res.json(err);
                    });


                } else {
                    data["error"] = 1;
                    data["authResponse"] = "Authentication Failed.";
                    res.json(data);
                }
            } else {
                data["error"] = 1;
                data["authResponse"] = "Token Required etc.";
                res.json(data);
            }
        })
        .error(function(err) {
            res.json(err);
        });



    return res;
};

///////////////========================Get All food vitamins =================================================/////////////////

exports.retrieveallfoodvitamains = function(req, res) {
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

                    db.foodvitamains.getallfoodvitamains().then(function(response) {
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

///////////////========================Get Specific food vitamins=================================================/////////////////

exports.retrievefoodvitamains = function(req, res) {
    var userid = req.query.userid;
    var token = req.query.token;
    var foodId = req.query.foodid;

    var data = {
        "error": 0,
        "authResponse": ""
    }
    if (!!token) {
        ///Authinticate user
        db.user.authUser(token).then(function(response) {
                if (response != '' && response != null) {
                    var email = response;

                    db.foodvitamains.getspecificfoodvitamains(foodId).then(function(response) {
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

//============================================Add water and mineral content============================================/////////////////
exports.insertwaterandmineralcontent = function(req, res) {
    var userid = req.body.userid;
    var token = req.body.token;
    var foodId = req.body.foodid;
    var water = req.body.water;
    var magnesium = req.body.magnesium;
    var copper = req.body.copper;
    var zinc = req.body.zinc;


    var data = {
        "error": 0,
        "authResponse": ""
    }



    db.user.authUser(token).then(function(response) {
            if (!!token) {
                if (response != '' && response != null) {

                    var email = response;

                    var email = response;

                    var sql = "Insert into waterandmineralcontent(foodid,water,magnesium,copper,zinc) values(" + foodId + ",'" + water + "','" + magnesium + "','" + copper + "','" + zinc + "')";

                    db.waterandmineralcontent.addwaterandmineralcontent(sql).then(function(response) {

                        data["error"] = 0;
                        data["authResponse"] = "water and Minerals Data Inserted Successfully";
                        res.json(data);

                    }).error(function(err) {
                        res.json(err);
                    });


                } else {
                    data["error"] = 1;
                    data["authResponse"] = "Authentication Failed.";
                    res.json(data);
                }
            } else {
                data["error"] = 1;
                data["authResponse"] = "Token Required etc.";
                res.json(data);
            }
        })
        .error(function(err) {
            res.json(err);
        });



    return res;
};

///////////////========================Get All water and mineral content =================================================/////////////////

exports.retrieveallwaterandmineralcontent = function(req, res) {
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

                    db.waterandmineralcontent.getallwaterandmineralcontent().then(function(response) {
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

///////////////========================Get Specific water and mineral content =================================================/////////////////

exports.retrievewaterandmineralcontent = function(req, res) {
    var userid = req.query.userid;
    var token = req.query.token;
    var foodId = req.query.foodid;

    var data = {
        "error": 0,
        "authResponse": ""
    }
    if (!!token) {
        ///Authinticate user
        db.user.authUser(token).then(function(response) {
                if (response != '' && response != null) {
                    var email = response;

                    db.waterandmineralcontent.getspecificwaterandmineralcontent(foodId).then(function(response) {
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

//============================================Add Fatty Acids content============================================/////////////////
exports.insertfattyacids = function(req, res) {
    var userid = req.body.userid;
    var token = req.body.token;
    var foodId = req.body.foodid;
    var lauric = req.body.lauric;
    var myristic = req.body.myristic;
    var myristoleic = req.body.myristoleic;
    var plamitic = req.body.plamitic;
    var palmitoleic = req.body.palmitoleic;
    var stearic = req.body.stearic;
    var oleic = req.body.oleic;
    var linoleic = req.body.linoleic;
    var linolenic = req.body.linolenic;
    var arachidic = req.body.arachidic;
    var arachidonic = req.body.arachidonic;


    var data = {
        "error": 0,
        "authResponse": ""
    }



    db.user.authUser(token).then(function(response) {
            if (!!token) {
                if (response != '' && response != null) {

                    var email = response;

                    var email = response;

                    var sql = "Insert into fattyacids(foodid, lauric, myristic, myristoleic, plamitic, palmitoleic, stearic, oleic, linoleic, linolenic, arachidic, arachidonic) values('" + foodId + "','" + lauric + "','" + myristic + "','" + myristoleic + "','" + plamitic + "','" + palmitoleic + "','" + stearic + "','" + oleic + "','" + linoleic + "','" + linolenic + "','" + arachidic + "','" + arachidonic + "')";

                    db.fattyacids.addfattyacids(sql).then(function(response) {

                        data["error"] = 0;
                        data["authResponse"] = "Fatty Acids Data Inserted Successfully";
                        res.json(data);

                    }).error(function(err) {
                        res.json(err);
                    });


                } else {
                    data["error"] = 1;
                    data["authResponse"] = "Authentication Failed.";
                    res.json(data);
                }
            } else {
                data["error"] = 1;
                data["authResponse"] = "Token Required etc.";
                res.json(data);
            }
        })
        .error(function(err) {
            res.json(err);
        });



    return res;
};

///////////////========================Get All Fatty Acids content =================================================/////////////////

exports.retrieveallfattyacids = function(req, res) {
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

                    db.fattyacids.getallfattyacids().then(function(response) {
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

///////////////========================Get Specific Fatty Acids content =================================================/////////////////

exports.retrievefattyacids = function(req, res) {
    var userid = req.query.userid;
    var token = req.query.token;
    var foodId = req.query.foodid;

    var data = {
        "error": 0,
        "authResponse": ""
    }
    if (!!token) {
        ///Authinticate user
        db.user.authUser(token).then(function(response) {
                if (response != '' && response != null) {
                    var email = response;

                    db.fattyacids.getspecificfattyacids(foodId).then(function(response) {
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


//============================================Add fat And Colestrol============================================/////////////////
exports.insertfattyandcholestrol = function(req, res) {
    var userid = req.body.userid;
    var token = req.body.token;
    var foodId = req.body.foodid;
    var cholestrolLevel = req.body.cholestrol;
    var fatLevel = req.body.fat;

    var data = {
        "error": 0,
        "authResponse": ""
    }



    db.user.authUser(token).then(function(response) {
            if (!!token) {
                if (response != '' && response != null) {

                    var email = response;

                    var email = response;

                    var sql = "Insert into fatandcholestrol(foodid,fat,cholestrol) values(" + foodId + ",'" + fatLevel + "','" + cholestrolLevel + "')";

                    db.fatandcholestrol.addfatandcholestrol(sql).then(function(response) {

                        data["error"] = 0;
                        data["authResponse"] = "Fat And Cholestrol Data Inserted Successfully";
                        res.json(data);

                    }).error(function(err) {
                        res.json(err);
                    });


                } else {
                    data["error"] = 1;
                    data["authResponse"] = "Authentication Failed.";
                    res.json(data);
                }
            } else {
                data["error"] = 1;
                data["authResponse"] = "Token Required etc.";
                res.json(data);
            }
        })
        .error(function(err) {
            res.json(err);
        });



    return res;
};

///////////////========================Get All fat And Colestrol =================================================/////////////////

exports.retrieveallfattyandcholestrol = function(req, res) {
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

                    db.fatandcholestrol.getallfatandcholestrol().then(function(response) {
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

///////////////========================Get Specific fat And Colestrol =================================================/////////////////

exports.retrievefattyandcholestrol = function(req, res) {
    var userid = req.query.userid;
    var token = req.query.token;
    var foodId = req.query.foodid;

    var data = {
        "error": 0,
        "authResponse": ""
    }
    if (!!token) {
        ///Authinticate user
        db.user.authUser(token).then(function(response) {
                if (response != '' && response != null) {
                    var email = response;

                    db.fatandcholestrol.getspecificfatandcholestrol(foodId).then(function(response) {
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


//============================================Add food history============================================/////////////////
exports.addfoodhistory = function(req, res) {



    var userid = req.body.userid;
    var token = req.body.token;
    var data1 = req.body.data;
    data1 = JSON.parse(data1);
    var total = data1.length;

    var data = {
        "error": 0,
        "authResponse": ""
    }



    db.user.authUser(token).then(function(response) {
            if (!!token) {
                if (response != '' && response != null) {

                    var email = response;

                    var email = response;

                    var sql = "INSERT INTO foodhistory (foodID,userID, foodName, foodphotoname, weight, foodPortion, foodType, foodDateTime, drinksize, foodCarbo, foodCalorie, foodsugar, foodProtein, foodFat, foodsaturatedfat, foodmonounsaturatedfat, foodpolyunsaturatedfat, foodtransfat, foodcholestrol, foodsodium, foodvitamainc, foodcalcium, foodiron, measuermentunit, foodfiber, greenbookcategory, healthscorecategory, item,servingsize1, servingsize2, iscustomfood) values ";


                    for (var i = 0; i < total - 1; i++) {
                        var foodID = data1[i].foodID;
                        var foodName = data1[i].foodName;
                        var foodphotoname = data1[i].foodphotoname;
                        var weight = data1[i].weight;
                        var foodPortion = data1[i].foodPortion;
                        var foodType = data1[i].foodType;
                        var foodDateTime = data1[i].foodDateTime;
                        var drinksize = data1[i].drinksize;
                        var foodCarbo = data1[i].foodCarbo;
                        var foodCalorie = data1[i].foodCalorie;
                        var foodsugar = data1[i].foodsugar;
                        var foodProtein = data1[i].foodProtein;
                        var foodFat = data1[i].foodFat;
                        var foodsaturatedfat = data1[i].foodsaturatedfat;
                        var foodmonounsaturatedfat = data1[i].foodmonounsaturatedfat;
                        var foodpolyunsaturatedfat = data1[i].foodpolyunsaturatedfat;
                        var foodtransfat = data1[i].foodtransfat;
                        var foodcholestrol = data1[i].foodcholestrol;
                        var foodsodium = data1[i].foodsodium;
                        var foodvitamainc = data1[i].foodvitamainc;
                        var foodcalcium = data1[i].foodcalcium;
                        var foodiron = data1[i].foodiron;
                        var measuermentunit = data1[i].measuermentunit;
                        var foodfiber = data1[i].foodfiber;
                        var greenbookcategory = data1[i].greenbookcategory;
                        var healthscorecategory = data1[i].healthscorecategory;
                        var item = data1[i].item;
                        var servingsize1 = data1[i].servingsize1;
                        var servingsize2 = data1[i].servingsize2;
                        var iscustomfood = data1[i].iscustomfood;


                        sql += "('" + foodID + "','" + userid + "','" + foodName + "','" + foodphotoname + "','" + weight + "','" + foodPortion + "','" + foodType + "','" + foodDateTime + "','" + drinksize + "','" + foodCarbo + "','" + foodCalorie + "','" + foodsugar + "','" + foodProtein + "','" + foodFat + "','" + foodsaturatedfat + "','" + foodmonounsaturatedfat + "','" + foodpolyunsaturatedfat + "','" + foodtransfat + "','" + foodcholestrol + "','" + foodsodium + "','" + foodvitamainc + "','" + foodcalcium + "','" + foodiron + "','" + measuermentunit + "','" + foodfiber + "','" + greenbookcategory + "','" + healthscorecategory + "','" + item + "','" + servingsize1 + "','" + servingsize2 + "','" + iscustomfood + "'),";

                        sql = sql.substr(0, sql.length);
                    }

                    var foodID = data1[total - 1].foodID;
                    var foodName = data1[total - 1].foodName;
                    var foodphotoname = data1[total - 1].foodphotoname;
                    var weight = data1[total - 1].weight;
                    var foodPortion = data1[total - 1].foodPortion;
                    var foodType = data1[total - 1].foodType;
                    var foodDateTime = data1[total - 1].foodDateTime;
                    var drinksize = data1[total - 1].drinksize;
                    var foodCarbo = data1[total - 1].foodCarbo;
                    var foodCalorie = data1[total - 1].foodCalorie;
                    var foodsugar = data1[total - 1].foodsugar;
                    var foodProtein = data1[total - 1].foodProtein;
                    var foodFat = data1[total - 1].foodFat;
                    var foodsaturatedfat = data1[total - 1].foodsaturatedfat;
                    var foodmonounsaturatedfat = data1[total - 1].foodmonounsaturatedfat;
                    var foodpolyunsaturatedfat = data1[total - 1].foodpolyunsaturatedfat;
                    var foodtransfat = data1[total - 1].foodtransfat;
                    var foodcholestrol = data1[total - 1].foodcholestrol;
                    var foodsodium = data1[total - 1].foodsodium;
                    var foodvitamainc = data1[total - 1].foodvitamainc;
                    var foodcalcium = data1[total - 1].foodcalcium;
                    var foodiron = data1[total - 1].foodiron;
                    var measuermentunit = data1[total - 1].measuermentunit;
                    var foodfiber = data1[total - 1].foodfiber;
                    var greenbookcategory = data1[total - 1].greenbookcategory;
                    var healthscorecategory = data1[total - 1].healthscorecategory;
                    var item = data1[total - 1].item;
                    var servingsize1 = data1[total - 1].servingsize1;
                    var servingsize2 = data1[total - 1].servingsize2;
                    var iscustomfood = data1[total - 1].iscustomfood;


                    sql += "('" + foodID + "','" + userid + "','" + foodName + "','" + foodphotoname + "','" + weight + "','" + foodPortion + "','" + foodType + "','" + foodDateTime + "','" + drinksize + "','" + foodCarbo + "','" + foodCalorie + "','" + foodsugar + "','" + foodProtein + "','" + foodFat + "','" + foodsaturatedfat + "','" + foodmonounsaturatedfat + "','" + foodpolyunsaturatedfat + "','" + foodtransfat + "','" + foodcholestrol + "','" + foodsodium + "','" + foodvitamainc + "','" + foodcalcium + "','" + foodiron + "','" + measuermentunit + "','" + foodfiber + "','" + greenbookcategory + "','" + healthscorecategory + "','" + item + "','" + servingsize1 + "','" + servingsize2 + "','" + iscustomfood + "')";



                    db.foodhistory.addfoodhistory(sql).then(function(response) {

                        var lastinsertid = response;

                        db.foodhistory.lastaddIDs(lastinsertid).then(function(response) {

                            data["error"] = 0;
                            data["authResponse"] = "Food History Added Successfully";
                            data["id"] = response;
                            res.json(data);
                        }).error(function(err) {
                            res.json(err);
                        });

                    }).error(function(err) {
                        res.json(err);
                    });


                } else {
                    data["error"] = 1;
                    data["authResponse"] = "Authentication Failed.";
                    res.json(data);
                }
            } else {
                data["error"] = 1;
                data["authResponse"] = "Token Required etc.";
                res.json(data);
            }
        })
        .error(function(err) {
            res.json(err);
        });



    return res;
};

//============================================Update Food History============================================/////////////////

exports.UpdateactivityFood = function(req, res) {
    var userid = req.body.userid;
    var token = req.body.token;
    var data1 = req.body.data;
    data1 = JSON.parse(data1);
    var total = data1.length;

    var data = {
        "error": 0,
        "authResponse": ""
    }



    db.user.authUser(token).then(function(response) {
            if (!!token) {
                if (response != '' && response != null) {


                    var email = response;

                    for (var i = 0; i < total - 1; i++) {
                        var id = data1[i].foodHistoryID;
                        var foodID = data1[i].foodID;
                        var foodName = data1[i].foodName;
                        var foodphotoname = data1[i].foodphotoname;
                        var weight = data1[i].weight;
                        var foodPortion = data1[i].foodPortion;
                        var foodType = data1[i].foodType;
                        var foodDateTime = data1[i].foodDateTime;
                        var drinksize = data1[i].drinksize;
                        var foodCarbo = data1[i].foodCarbo;
                        var foodCalorie = data1[i].foodCalorie;
                        var foodsugar = data1[i].foodsugar;
                        var foodProtein = data1[i].foodProtein;
                        var foodFat = data1[i].foodFat;
                        var foodsaturatedfat = data1[i].foodsaturatedfat;
                        var foodmonounsaturatedfat = data1[i].foodmonounsaturatedfat;
                        var foodpolyunsaturatedfat = data1[i].foodpolyunsaturatedfat;
                        var foodtransfat = data1[i].foodtransfat;
                        var foodcholestrol = data1[i].foodcholestrol;
                        var foodsodium = data1[i].foodsodium;
                        var foodvitamainc = data1[i].foodvitamainc;
                        var foodcalcium = data1[i].foodcalcium;
                        var foodiron = data1[i].foodiron;
                        var measuermentunit = data1[i].measuermentunit;
                        var foodfiber = data1[i].foodfiber;
                        var greenbookcategory = data1[i].greenbookcategory;
                        var healthscorecategory = data1[i].healthscorecategory;
                        var item = data1[i].item;
                        var servingsize1 = data1[i].servingsize1;
                        var servingsize2 = data1[i].servingsize2;
                        var iscustomfood = data1[i].iscustomfood;

                        var sql = "UPDATE foodhistory SET foodID='" + foodID + "', foodName='" + foodName + "', foodphotoname='" + foodphotoname + "', weight='" + weight + "' , foodPortion='" + foodPortion + "', foodType='" + foodType + "', foodDateTime='" + foodDateTime + "', drinksize='" + drinksize + "', foodCarbo='" + foodCarbo + "', foodCalorie='" + foodCalorie + "', foodsugar='" + foodsugar + "', foodProtein='" + foodProtein + "',  foodFat='" + foodFat + "', foodsaturatedfat='" + foodsaturatedfat + "', foodmonounsaturatedfat='" + foodmonounsaturatedfat + "', foodpolyunsaturatedfat='" + foodpolyunsaturatedfat + "', foodtransfat='" + foodtransfat + "', foodcholestrol='" + foodcholestrol + "', foodsodium='" + foodsodium + "', foodvitamainc='" + foodvitamainc + "', foodcalcium='" + foodcalcium + "' , foodiron='" + foodiron + "', measuermentunit='" + measuermentunit + "', foodfiber='" + foodfiber + "', greenbookcategory='" + greenbookcategory + "', healthscorecategory='" + healthscorecategory + "' , item='" + item + "', servingsize1='" + servingsize1 + "', servingsize2='" + servingsize2 + "', iscustomfood='" + iscustomfood + "' WHERE id='" + id + "'";

                        db.foodhistory.updatefoodtiming(sql).then(function(response) {

                        }).error(function(err) {
                            res.json(err);
                        });


                        sql = sql.substr(0, sql.length);
                    }

                    var id = data1[total - 1].foodHistoryID;
                    var foodID = data1[total - 1].foodID;
                    var foodName = data1[total - 1].foodName;
                    var foodphotoname = data1[total - 1].foodphotoname;
                    var weight = data1[total - 1].weight;
                    var foodPortion = data1[total - 1].foodPortion;
                    var foodType = data1[total - 1].foodType;
                    var foodDateTime = data1[total - 1].foodDateTime;
                    var drinksize = data1[total - 1].drinksize;
                    var foodCarbo = data1[total - 1].foodCarbo;
                    var foodCalorie = data1[total - 1].foodCalorie;
                    var foodsugar = data1[total - 1].foodsugar;
                    var foodProtein = data1[total - 1].foodProtein;
                    var foodFat = data1[total - 1].foodFat;
                    var foodsaturatedfat = data1[total - 1].foodsaturatedfat;
                    var foodmonounsaturatedfat = data1[total - 1].foodmonounsaturatedfat;
                    var foodpolyunsaturatedfat = data1[total - 1].foodpolyunsaturatedfat;
                    var foodtransfat = data1[total - 1].foodtransfat;
                    var foodcholestrol = data1[total - 1].foodcholestrol;
                    var foodsodium = data1[total - 1].foodsodium;
                    var foodvitamainc = data1[total - 1].foodvitamainc;
                    var foodcalcium = data1[total - 1].foodcalcium;
                    var foodiron = data1[total - 1].foodiron;
                    var measuermentunit = data1[total - 1].measuermentunit;
                    var foodfiber = data1[total - 1].foodfiber;
                    var greenbookcategory = data1[total - 1].greenbookcategory;
                    var healthscorecategory = data1[total - 1].healthscorecategory;
                    var item = data1[total - 1].item;
                    var servingsize1 = data1[total - 1].servingsize1;
                    var servingsize2 = data1[total - 1].servingsize2;
                    var iscustomfood = data1[total - 1].iscustomfood;

                    var sql = "UPDATE foodhistory SET foodID='" + foodID + "', foodName='" + foodName + "', foodphotoname='" + foodphotoname + "', weight='" + weight + "' , foodPortion='" + foodPortion + "', foodType='" + foodType + "', foodDateTime='" + foodDateTime + "', drinksize='" + drinksize + "', foodCarbo='" + foodCarbo + "', foodCalorie='" + foodCalorie + "', foodsugar='" + foodsugar + "', foodProtein='" + foodProtein + "',  foodFat='" + foodFat + "', foodsaturatedfat='" + foodsaturatedfat + "', foodmonounsaturatedfat='" + foodmonounsaturatedfat + "', foodpolyunsaturatedfat='" + foodpolyunsaturatedfat + "', foodtransfat='" + foodtransfat + "', foodcholestrol='" + foodcholestrol + "', foodsodium='" + foodsodium + "', foodvitamainc='" + foodvitamainc + "', foodcalcium='" + foodcalcium + "' , foodiron='" + foodiron + "', measuermentunit='" + measuermentunit + "', foodfiber='" + foodfiber + "', greenbookcategory='" + greenbookcategory + "', healthscorecategory='" + healthscorecategory + "' , item='" + item + "', servingsize1='" + servingsize1 + "', servingsize2='" + servingsize2 + "', iscustomfood='" + iscustomfood + "' WHERE id='" + id + "'";


                    db.foodhistory.updatefoodtiming(sql).then(function(response) {

                        data["error"] = 0;
                        data["authResponse"] = "Food History Updated Successfully";
                        data["id"] = response;
                        res.json(data);
                    }).error(function(err) {
                        res.json(err);
                    });



                } else {
                    data["error"] = 1;
                    data["authResponse"] = "Authentication Failed.";
                    res.json(data);
                }
            } else {
                data["error"] = 1;
                data["authResponse"] = "Token Required etc.";
                res.json(data);
            }
        })
        .error(function(err) {
            res.json(err);
        });



    return res;
};

//============================================Delete Food History============================================/////////////////
exports.DeleteactivityFood = function(req, res) {

    var userid = req.body.userid;
    var token = req.body.token;
    var data1 = req.body.data;
    data1 = JSON.parse(data1);
    var total = data1.length;
    var data = {
        "error": 0,
        "authResponse": ""
    }



    db.user.authUser(token).then(function(response) {
            if (!!token) {
                if (response != '' && response != null) {


                    var email = response;

                    for (var i = 0; i < total - 1; i++) {
                        var id = data1[i].foodHistoryID;


                        var sql = "DELETE FROM foodhistory  WHERE id='" + id + "'";

                        db.foodhistory.deleteFoodHistory(sql).then(function(response) {

                        }).error(function(err) {
                            res.json(err);
                        });


                        sql = sql.substr(0, sql.length);
                    }

                    var id = data1[total - 1].foodHistoryID;


                    var sql = "DELETE FROM foodhistory  WHERE id='" + id + "'";



                    db.foodhistory.deleteFoodHistory(sql).then(function(response) {

                        data["error"] = 0;
                        data["authResponse"] = "Food History Deleted Successfully";
                        data["id"] = response;
                        res.json(data);
                    }).error(function(err) {
                        res.json(err);
                    });



                } else {
                    data["error"] = 1;
                    data["authResponse"] = "Authentication Failed.";
                    res.json(data);
                }
            } else {
                data["error"] = 1;
                data["authResponse"] = "Token Required etc.";
                res.json(data);
            }
        })
        .error(function(err) {
            res.json(err);
        });



    return res;
};



///////////////========================Get Food History=================================================/////////////////

exports.getfoodhistory = function(req, res) {
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
                    db.foodhistory.getfoodhistory(userid).then(function(response) {
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