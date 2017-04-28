 'use strict';

module.exports = function(app) {
var goal = require('../../app/controllers/goal');

	/****************
	***Temprature Goal
	*****************/
	
app.post('/AddTempratureGoal', goal.addtempratureGoal);
app.get('/GetTempratureGoal', goal.gettempratureGoal);

	/****************
	***Brain Activity Goal
	*****************/
	
app.post('/AddBrainActivityGoal', goal.addbrainactivityGoal);
app.get('/GetBrainActivityGoal', goal.getbrainactivityGoal);

	/****************
	***Calorie Goal
	*****************/
	
app.post('/AddCalorieGoal', goal.addcalorieGoal);
app.get('/GetCalorieGoal', goal.getcalorieGoal);

	/****************
	***exercise Goal
	*****************/
	
app.post('/AddExerciseGoal', goal.addexerciseGoal);
app.get('/GetExerciseGoal', goal.getexerciseGoal);

	/****************
	***Heart Rate Goal
	*****************/
	
app.post('/AddHeartRateGoal', goal.addheartrateGoal);
app.get('/GetHeartRateGoal', goal.getheartrateGoal);


	/****************
	***Oxygen Goal
	*****************/
	
app.post('/AddOxygenGoal', goal.addoxygenGoal);
app.get('/GetOxygenGoal', goal.getoxygenGoal);


	/****************
	***Sleep Goal
	*****************/
	
app.post('/AddSleepGoal', goal.addsleepGoal);
app.get('/GetSleepGoal', goal.getsleepGoal);


	/****************
	***Step Goal
	*****************/
	
app.post('/AddStepGoal', goal.addstepGoal);
app.get('/GetStepGoal', goal.getstepGoal);


	/****************
	***Water Intake Goal
	*****************/
	
app.post('/AddWaterIntakeGoal', goal.addwaterintakeGoal);
app.get('/GetWaterIntakeGoal', goal.getwaterintakeGoal);

	/****************
	***Weight Goal
	*****************/
	
app.post('/AddWeightsGoal', goal.addweightGoal);
app.get('/GetWeightsGoal', goal.getweightGoal);


// Weight route

/*app.post('/AddWeightGoal', goal.addweightGoal);
app.get('/GetWeightGoal', goal.getweightGoal);*/



};

