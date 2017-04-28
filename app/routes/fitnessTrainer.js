 'use strict';

 module.exports = function(app) {
 	//  route
 	var trainer = require('../../app/controllers/fitnessTrainer.js');

 	/************
 	 ** trainer dashboard 
 	 **********/
 	app.get('/countregiterusers', trainer.countregiterusers);
 	app.get('/GetRegisteredUsers', trainer.getregisteredUsersTrainer);
 	app.get('/GetUserDetailTrainer', trainer.getUserTrainerDetail);
 	app.get('/GetregisteredProfessionals', trainer.getregisteredProfessionals);

 	/******
 	 ** user dashboard on trainer portal
 	 ******/

 	app.get('/GetUserSteps', trainer.getUserStepsTrainerDetail);
 	app.get('/GetUserStepsbyDates', trainer.getUserStepsbydatesTrainerDetail);

 	app.get('/GetUserSleep', trainer.getUsersleepTrainerDetail);
 	app.get('/GetUserSleepbyDates', trainer.getUsersleepTrainerDetailbyDates);

 	app.get('/GetUserWeight', trainer.getUserWeightTrainerDetail);
 	app.get('/GetUserWeightByDates', trainer.getweightbydates);

 	app.get('/GetUserBodyFat', trainer.getUserbodyfatTrainerDetail);
 	app.get('/GetUserBodyFatByDates', trainer.getUserbodyfatTrainerbyDates);

 	app.get('/GetUserbmr', trainer.getUserbmrTrainerDetail);
 	app.get('/Getuserbmrbydates', trainer.getUserbmrTrainerDetailbydates);

 	app.get('/GetUserVisceralFat', trainer.getvisceralfatforTrainer);
 	app.get('/GetVisceralFatByDates', trainer.getvisceralfatforTrainerbyDates);

 	app.get('/GetUserBloodPressure', trainer.getUserBloodPressureTrainerDetail);
 	app.get('/GetUserBloodPressurebyDates', trainer.getUserBloodPressureTrainerDetailbydates);

 	app.get('/GetUserGlucose', trainer.getUserGlucoseTrainerDetail);
 	app.get('/GetUserGlucosebydates', trainer.getUserGlucoseTrainerDetailByDates);


 	app.get('/GetUserskinfolds', trainer.getUserskinfoldTrainerDetail);
 	app.get('/GetUserSkinfoldByDate', trainer.getUserskinfoldTrainerDetailbyDate);

 	app.get('/GetUserWaistToHipRatio', trainer.getUserwaisthipratioTrainerDetail);
 	app.get('/GetUserWaistToHipRatioByDates', trainer.getUserwaisthipratioTrainerDetailbydates);

 	/**********************
 	 ***User test results
 	 ****************************/

 	app.get('/GetUserRockPortWakingTest', trainer.getUserrockportTestTrainerDetail);
 	app.get('/GetUserRockPortWalkingTestbyDates', trainer.getUserrockportTestbyDates);

 	app.get('/GetUserRunTest', trainer.getUserRunTestTrainerDetail);
 	app.get('/GetUserRunTestByDates', trainer.getUserRunTestTrainerDetailBydates);

 	app.get('/GetYMCATest', trainer.getUserYMCAStepTrainerDetail);
 	app.get('/GetYMCAByDates', trainer.getUserYMCAStepTrainerDetailbyDates);

 	app.get('/GetPushUPUserTest', trainer.getUserPushUpTrainerDetail);
 	app.get('/GetPushUPByDates', trainer.getUserPushUpTrainerDetailbyDates);

 	app.get('/getUserCurlUpTrainerDetail', trainer.getUserCurlUpTrainerDetail);
 	app.get('/GetCurlUpTestByDates', trainer.getUserCurlUpTrainerDetailbyDates);

 	app.get('/GetUserSquatsTest', trainer.getUserSquatsTrainerDetail);
 	app.get('/GetUserSquatsTestByDates', trainer.getUserSquatsTrainerDetailByDates);

 	app.get('/GetUserLongJumpTest', trainer.getUserLongjumpTrainerDetail);
 	app.get('/GetUserLongJumpTestByDates', trainer.getUserLongjumpTrainerDetailByDates);


 	app.get('/GetUserPostHeartRate', trainer.getUserExerciseHeartRateTrainerDetail);
 	app.get('/GetUserPostHeartRateByDates', trainer.getUserExerciseHeartRateTrainerDetailByDates);

 };