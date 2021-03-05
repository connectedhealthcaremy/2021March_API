'use strict';

/**
 * Module dependencies.
 */
/*var _ = require('lodash');*/
var db = require('../../config/sequelize');


///////////////========================Get user health score=================================================/////////////////

exports.getHealtScore = function(req, res) {
	var moment = require('moment');
	var userid = req.query.userid;
	var token = req.query.token;
	console.log("userid : "+userid);
	var data = {
		"error": 0,
		"authResponse": ""
	}
	if (!!token) {
		///Authinticate user
		db.user.authUser(token).then(function(response) {
				if (response != '' && response != null) {


					/***************
					 **Smoking status start
					 ****************/
					////////curretn dates and last dates	

					var days_30_start_date = moment(moment().subtract(30, 'days')).format("YYYY-MM-DD");
					var days_7_start_date = moment(moment().subtract(7, 'days')).format("YYYY-MM-DD");
					var month_12_start_date = moment(moment().subtract(365, 'days')).format("YYYY-MM-DD");
					var year_4_start_date = moment(moment().subtract(1460, 'days')).format("YYYY-MM-DD");
					var end_date = moment(moment()).format('YYYY-MM-DD');

					///checking smoking status last 30 days
					db.badges.checksmokingstatus(userid, days_30_start_date, end_date).then(response => {

						if (response[0].num == 0) {

							///checking smoking status last 12 months
							db.badges.Addchecksmokingstatus(userid, month_12_start_date, end_date, response[0].num).then(response => {

								if (response[0].num == 0) {

									///checking smoking status last 4 years
									db.badges.Addchecksmokingstatus(userid, year_4_start_date, end_date, response[0].num).then(Smokingresponse => {

										if (Smokingresponse[0].num == 0) {
											var smokingscore = 2;
										} else {
											var smokingscore = 1;
										}

										////BMI Calculation after 4 year of smoking check
										//console.log("Smoking Score Final="+smokingscore);

										db.badges.BmiCalculation(userid, days_30_start_date, end_date).then(response => { /////start BMI Calculation

											var user_email = response[0].email;

											///BMI Calculation
											if (response[0].bmi == null || response[0].bmi == '') {
												var bmiScore = 0;
											} else {
												//console.log(parseFloat(response[0].bmi));

												if (parseFloat(response[0].bmi) > parseFloat(16) && parseFloat(response[0].bmi) < parseFloat(25)) {
													var bmiScore = 2;
												} else if (parseFloat(response[0].bmi) >= parseFloat(25) && parseFloat(response[0].bmi) < 30) {
													var bmiScore = 1;
												} else {
													var bmiScore = 0;
												}

											}

											/**************************************
											 ***Physical activity calculation 
											 ***************************************/
											///console.log('BMI Score===' + bmiScore + '================Smoking Score===' + smokingscore);days_7_start_date;

											db.badges.PhysicalActivityCalculation(userid, days_7_start_date, end_date).then(response => { ////start physical activity

												if (response[0].steps == null || response[0].steps == '') {
													var paScore = 0;
												} else {
													if (parseFloat(response[0].steps) < parseFloat(12000)) {
														var paScore = 1;
													} else if (parseFloat(response[0].steps) >= 12000) {
														var paScore = 2;
													} else {
														var paScore = 0;
													}

												}

												///console.log('BMI Score===' + bmiScore + '================Smoking Score===' + smokingscore + "=============PA Score=====" + paScore);

												/*******************************
												 **cholesterol Calculation 
												 ******************************/

												db.badges.CholestrolCalculation(userid, days_30_start_date, end_date).then(response => { ///cholestrol calculation start

													if (response[0].totalcholestrol == null || response[0].totalcholestrol) {
														var cholesterolScore = 0;
													} else {

														if (parseFloat(response[0].totalcholestrol) < parseFloat(5.18)) {
															var cholesterolScore = 2;
														} else if (parseFloat(response[0].totalcholestrol) >= parseFloat(5.18) && parseFloat(response[0].totalcholestrol) < parseFloat(6.19)) {
															var cholesterolScore = 1;
														} else {
															var cholesterolScore = 0;
														}

													}
													//console.log(user_email+'==BMI Score===' + bmiScore + '===Smoking Score===' + smokingscore + "===PA Score===" + paScore+"==Cholestrol Score=="+cholesterolScore);
													/*******************************
													 **Blood Pressure Calculation 
													 ******************************/
													db.badges.BloodPressureCalculation(user_email, days_30_start_date, end_date).then(response => { ///bp calculation start

														if (response[0].systolic == null && response[0].systolic == '' && response[0].diastolic == null && response[0].diastolic == '') {
															var bpScore = 0;
														} else {

															if (parseFloat(response[0].systolic) < parseFloat(120) || parseFloat(response[0].diastolic) < parseFloat(80)) {
																var bpScore = 2;
															} else if ((parseFloat(response[0].systolic) >= parseFloat(120) && parseFloat(response[0].systolic) < parseFloat(140)) || (parseFloat(response[0].diastolic) >= parseFloat(80) && parseFloat(response[0].diastolic) < parseFloat(90))) {
																var bpScore = 1;
															} else {
																var bpScore = 0;
															}

														}
														///console.log('BpScore=='+bpScore+'==='+user_email+'==BMI Score===' + bmiScore + '===Smoking Score===' + smokingscore + "===PA Score===" + paScore+"==Cholestrol Score=="+cholesterolScore);

														/******************************************
														 **Fasting plasma glucose Calculation 
														 ******************************************/

														db.badges.GlucoseCalculation(user_email, days_30_start_date, end_date).then(response => { ///Glucose calculation start

															if (response[0].glucoselevel == null && response[0].glucoselevel == '') {
																var glucoseScore = 0;
															} else {

																if (parseFloat(response[0].glucoselevel) < parseFloat(5.5)) {
																	var glucoseScore = 2;
																} else if (parseFloat(response[0].glucoselevel) >= parseFloat(5.5) && parseFloat(response[0].glucoselevel) < parseFloat(7)) {
																	var glucoseScore = 1;
																} else {
																	var glucoseScore = 0;
																}

															}
															///console.log('glucoseScore==='+glucoseScore+'==BpScore=='+bpScore+'==='+user_email+'==BMI Score===' + bmiScore + '===Smoking Score===' + smokingscore + "===PA Score===" + paScore+"==Cholestrol Score=="+cholesterolScore);

															/****************************************
															 **Diet Calculation 
															 ****************************************/
															db.badges.DietCalculation(userid, end_date).then(function(response) { ////diet calculation start

																if (response == '' || response == null) {
																	var dietScore = 0;
																} else {
																	if (response[0].dietScore == null || response[0].dietScore == '') {
																		var dietScore = 0;
																	} else {

																		if (parseInt(response[0].dietScore) <= parseInt(1)) {
																			var dietScore = 0;
																		} else if (parseInt(response[0].dietScore) >= parseInt(2) && parseInt(response[0].dietScore) <= parseInt(3)) {
																			var dietScore = 1;
																		} else if (parseInt(response[0].dietScore) >= parseInt(4) && parseInt(response[0].dietScore) <= parseInt(5)) {
																			var dietScore = 2;
																		} else {
																			var dietScore = 0;
																		}

																	}
																}

																var obtainedScore = parseInt(dietScore) + parseInt(glucoseScore) + parseInt(bpScore) + parseInt(bmiScore) + parseInt(smokingscore) + parseInt(paScore) + parseInt(cholesterolScore);
																var score = {
																	"dietScore": dietScore,
																	"glucoseScore": glucoseScore,
																	"bpScore": bpScore,
																	"bmiScore": bmiScore,
																	"smokingscore": smokingscore,
																	"paScore": paScore,
																	"cholesterolScore": cholesterolScore,
																	"obtainedScore": obtainedScore,
																	"totalScore": 14
																}

																data["error"] = 0;
																data["authResponse"] = "Action Successful";
																data['Data'] = score;
																res.json(data);

															}); ///diet calculations end

														}); ///Glucose Calculation end

													}); ///bp calculation end

												}); ///cholestrol calculation end

											}); ///end physical activity


										}); ////end BMI calculation

									}); /////end Smoking Score Calculation


								} else { ///start BMI Calculation after 12 months smoking check, if found smoking
									//console.log('For BMI Second Promise====' + response[0].num);
									var smokingscore = 1;

									db.badges.BmiCalculation(userid, days_30_start_date, end_date).then(response => { /////start BMI Calculation

										var user_email = response[0].email;

										///BMI Calculation
										if (response[0].bmi == null || response[0].bmi == '') {
											var bmiScore = 0;
										} else {
											//console.log(parseFloat(response[0].bmi));

											if (parseFloat(response[0].bmi) > parseFloat(16) && parseFloat(response[0].bmi) < parseFloat(25)) {
												var bmiScore = 2;
											} else if (parseFloat(response[0].bmi) >= parseFloat(25) && parseFloat(response[0].bmi) < 30) {
												var bmiScore = 1;
											} else {
												var bmiScore = 0;
											}

										}

										/**************************************
										 ***Physical activity calculation 
										 ***************************************/
										///console.log('BMI Score===' + bmiScore + '================Smoking Score===' + smokingscore);days_7_start_date;

										db.badges.PhysicalActivityCalculation(userid, days_7_start_date, end_date).then(response => { ////start physical activity

											if (response[0].steps == null || response[0].steps == '') {
												var paScore = 0;
											} else {
												if (parseFloat(response[0].steps) < parseFloat(12000)) {
													var paScore = 1;
												} else if (parseFloat(response[0].steps) >= 12000) {
													var paScore = 2;
												} else {
													var paScore = 0;
												}

											}

											///console.log('BMI Score===' + bmiScore + '================Smoking Score===' + smokingscore + "=============PA Score=====" + paScore);

											/*******************************
											 **cholesterol Calculation 
											 ******************************/

											db.badges.CholestrolCalculation(userid, days_30_start_date, end_date).then(response => { ///cholestrol calculation start

												if (response[0].totalcholestrol == null || response[0].totalcholestrol) {
													var cholesterolScore = 0;
												} else {

													if (parseFloat(response[0].totalcholestrol) < parseFloat(5.18)) {
														var cholesterolScore = 2;
													} else if (parseFloat(response[0].totalcholestrol) >= parseFloat(5.18) && parseFloat(response[0].totalcholestrol) < parseFloat(6.19)) {
														var cholesterolScore = 1;
													} else {
														var cholesterolScore = 0;
													}

												}
												//console.log(user_email+'==BMI Score===' + bmiScore + '===Smoking Score===' + smokingscore + "===PA Score===" + paScore+"==Cholestrol Score=="+cholesterolScore);
												/*******************************
												 **Blood Pressure Calculation 
												 ******************************/
												db.badges.BloodPressureCalculation(user_email, days_30_start_date, end_date).then(response => { ///bp calculation start

													if (response[0].systolic == null && response[0].systolic == '' && response[0].diastolic == null && response[0].diastolic == '') {
														var bpScore = 0;
													} else {

														if (parseFloat(response[0].systolic) < parseFloat(120) || parseFloat(response[0].diastolic) < parseFloat(80)) {
															var bpScore = 2;
														} else if ((parseFloat(response[0].systolic) >= parseFloat(120) && parseFloat(response[0].systolic) < parseFloat(140)) || (parseFloat(response[0].diastolic) >= parseFloat(80) && parseFloat(response[0].diastolic) < parseFloat(90))) {
															var bpScore = 1;
														} else {
															var bpScore = 0;
														}

													}
													///console.log('BpScore=='+bpScore+'==='+user_email+'==BMI Score===' + bmiScore + '===Smoking Score===' + smokingscore + "===PA Score===" + paScore+"==Cholestrol Score=="+cholesterolScore);

													/******************************************
													 **Fasting plasma glucose Calculation 
													 ******************************************/

													db.badges.GlucoseCalculation(user_email, days_30_start_date, end_date).then(response => { ///Glucose calculation start

														if (response[0].glucoselevel == null && response[0].glucoselevel == '') {
															var glucoseScore = 0;
														} else {

															if (parseFloat(response[0].glucoselevel) < parseFloat(5.5)) {
																var glucoseScore = 2;
															} else if (parseFloat(response[0].glucoselevel) >= parseFloat(5.5) && parseFloat(response[0].glucoselevel) < parseFloat(7)) {
																var glucoseScore = 1;
															} else {
																var glucoseScore = 0;
															}

														}
														///console.log('glucoseScore==='+glucoseScore+'==BpScore=='+bpScore+'==='+user_email+'==BMI Score===' + bmiScore + '===Smoking Score===' + smokingscore + "===PA Score===" + paScore+"==Cholestrol Score=="+cholesterolScore);

														/****************************************
														 **Diet Calculation 
														 ****************************************/
														db.badges.DietCalculation(userid, end_date).then(function(response) { ////diet calculation start

															if (response == '' || response == null) {
																var dietScore = 0;
															} else {
																if (response[0].dietScore == null || response[0].dietScore == '') {
																	var dietScore = 0;
																} else {

																	if (parseInt(response[0].dietScore) <= parseInt(1)) {
																		var dietScore = 0;
																	} else if (parseInt(response[0].dietScore) >= parseInt(2) && parseInt(response[0].dietScore) <= parseInt(3)) {
																		var dietScore = 1;
																	} else if (parseInt(response[0].dietScore) >= parseInt(4) && parseInt(response[0].dietScore) <= parseInt(5)) {
																		var dietScore = 2;
																	} else {
																		var dietScore = 0;
																	}

																}
															}

															var obtainedScore = parseInt(dietScore) + parseInt(glucoseScore) + parseInt(bpScore) + parseInt(bmiScore) + parseInt(smokingscore) + parseInt(paScore) + parseInt(cholesterolScore);
															var score = {
																"dietScore": dietScore,
																"glucoseScore": glucoseScore,
																"bpScore": bpScore,
																"bmiScore": bmiScore,
																"smokingscore": smokingscore,
																"paScore": paScore,
																"cholesterolScore": cholesterolScore,
																"obtainedScore": obtainedScore,
																"totalScore": 14
															}

															data["error"] = 0;
															data["authResponse"] = "Action Successful";
															data['Data'] = score;
															res.json(data);

														}); ///diet calculations end

													}); ///Glucose Calculation end

												}); ///bp calculation end

											}); ///cholestrol calculation end

										}); ///end physical activity


									}); ////end BMI calculation


								}

							}); ////end 12 months smoking status check

						} else {
							///start BMI Score Calculation after 30 days smoking check, if found smoking
							var smokingscore = 0;

							db.badges.BmiCalculation(userid, days_30_start_date, end_date).then(response => { /////start BMI Calculation

								var user_email = response[0].email;

								///BMI Calculation
								if (response[0].bmi == null || response[0].bmi == '') {
									var bmiScore = 0;
								} else {
									//console.log(parseFloat(response[0].bmi));

									if (parseFloat(response[0].bmi) > parseFloat(16) && parseFloat(response[0].bmi) < parseFloat(25)) {
										var bmiScore = 2;
									} else if (parseFloat(response[0].bmi) >= parseFloat(25) && parseFloat(response[0].bmi) < 30) {
										var bmiScore = 1;
									} else {
										var bmiScore = 0;
									}

								}

								/**************************************
								 ***Physical activity calculation 
								 ***************************************/
								///console.log('BMI Score===' + bmiScore + '================Smoking Score===' + smokingscore);days_7_start_date;

								db.badges.PhysicalActivityCalculation(userid, days_7_start_date, end_date).then(response => { ////start physical activity

									if (response[0].steps == null || response[0].steps == '') {
										var paScore = 0;
									} else {
										if (parseFloat(response[0].steps) < parseFloat(12000)) {
											var paScore = 1;
										} else if (parseFloat(response[0].steps) >= 12000) {
											var paScore = 2;
										} else {
											var paScore = 0;
										}

									}

									///console.log('BMI Score===' + bmiScore + '================Smoking Score===' + smokingscore + "=============PA Score=====" + paScore);

									/*******************************
									 **cholesterol Calculation 
									 ******************************/

									db.badges.CholestrolCalculation(userid, days_30_start_date, end_date).then(response => { ///cholestrol calculation start

										if (response[0].totalcholestrol == null || response[0].totalcholestrol) {
											var cholesterolScore = 0;
										} else {

											if (parseFloat(response[0].totalcholestrol) < parseFloat(5.18)) {
												var cholesterolScore = 2;
											} else if (parseFloat(response[0].totalcholestrol) >= parseFloat(5.18) && parseFloat(response[0].totalcholestrol) < parseFloat(6.19)) {
												var cholesterolScore = 1;
											} else {
												var cholesterolScore = 0;
											}

										}
										//console.log(user_email+'==BMI Score===' + bmiScore + '===Smoking Score===' + smokingscore + "===PA Score===" + paScore+"==Cholestrol Score=="+cholesterolScore);
										/*******************************
										 **Blood Pressure Calculation 
										 ******************************/
										db.badges.BloodPressureCalculation(user_email, days_30_start_date, end_date).then(response => { ///bp calculation start

											if (response[0].systolic == null && response[0].systolic == '' && response[0].diastolic == null && response[0].diastolic == '') {
												var bpScore = 0;
											} else {

												if (parseFloat(response[0].systolic) < parseFloat(120) || parseFloat(response[0].diastolic) < parseFloat(80)) {
													var bpScore = 2;
												} else if ((parseFloat(response[0].systolic) >= parseFloat(120) && parseFloat(response[0].systolic) < parseFloat(140)) || (parseFloat(response[0].diastolic) >= parseFloat(80) && parseFloat(response[0].diastolic) < parseFloat(90))) {
													var bpScore = 1;
												} else {
													var bpScore = 0;
												}

											}
											///console.log('BpScore=='+bpScore+'==='+user_email+'==BMI Score===' + bmiScore + '===Smoking Score===' + smokingscore + "===PA Score===" + paScore+"==Cholestrol Score=="+cholesterolScore);

											/******************************************
											 **Fasting plasma glucose Calculation 
											 ******************************************/

											db.badges.GlucoseCalculation(user_email, days_30_start_date, end_date).then(response => { ///Glucose calculation start

												if (response[0].glucoselevel == null && response[0].glucoselevel == '') {
													var glucoseScore = 0;
												} else {

													if (parseFloat(response[0].glucoselevel) < parseFloat(5.5)) {
														var glucoseScore = 2;
													} else if (parseFloat(response[0].glucoselevel) >= parseFloat(5.5) && parseFloat(response[0].glucoselevel) < parseFloat(7)) {
														var glucoseScore = 1;
													} else {
														var glucoseScore = 0;
													}

												}
												///console.log('glucoseScore==='+glucoseScore+'==BpScore=='+bpScore+'==='+user_email+'==BMI Score===' + bmiScore + '===Smoking Score===' + smokingscore + "===PA Score===" + paScore+"==Cholestrol Score=="+cholesterolScore);

												/****************************************
												 **Diet Calculation 
												 ****************************************/
												db.badges.DietCalculation(userid, end_date).then(function(response) { ////diet calculation start

													if (response == '' || response == null) {
														var dietScore = 0;
													} else {
														if (response[0].dietScore == null || response[0].dietScore == '') {
															var dietScore = 0;
														} else {

															if (parseInt(response[0].dietScore) <= parseInt(1)) {
																var dietScore = 0;
															} else if (parseInt(response[0].dietScore) >= parseInt(2) && parseInt(response[0].dietScore) <= parseInt(3)) {
																var dietScore = 1;
															} else if (parseInt(response[0].dietScore) >= parseInt(4) && parseInt(response[0].dietScore) <= parseInt(5)) {
																var dietScore = 2;
															} else {
																var dietScore = 0;
															}

														}
													}

													var obtainedScore = parseInt(dietScore) + parseInt(glucoseScore) + parseInt(bpScore) + parseInt(bmiScore) + parseInt(smokingscore) + parseInt(paScore) + parseInt(cholesterolScore);
													var score = {
														"dietScore": dietScore,
														"glucoseScore": glucoseScore,
														"bpScore": bpScore,
														"bmiScore": bmiScore,
														"smokingscore": smokingscore,
														"paScore": paScore,
														"cholesterolScore": cholesterolScore,
														"obtainedScore": obtainedScore,
														"totalScore": 14
													}

													data["error"] = 0;
													data["authResponse"] = "Action Successful";
													data['Data'] = score;
													res.json(data);

												}); ///diet calculations end

											}); ///Glucose Calculation end

										}); ///bp calculation end

									}); ///cholestrol calculation end

								}); ///end physical activity


							}); ////end BMI calculation
						}

					}); ////end 30 days smoking status check

					/**********************
					 **Smoking status end
					 ***********************/



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
