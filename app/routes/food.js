 'use strict';

 module.exports = function(app) {
 	// food route
 	var food = require('../../app/controllers/food');

 	////========================Food History==========================//////////

 	app.post('/AddFoodHistory', food.addfoodhistory);
 	app.post('/UpdateactivityFood', food.UpdateactivityFood);
 	app.post('/DeleteactivityFood', food.DeleteactivityFood);
 	app.get('/GetFoodHistory', food.getfoodhistory);

 	////========================Food Timing==========================//////////

 	app.post('/AddFoodTiming', food.addfoodtiming);

 	////=========================Food Notification for mobile==========/////////
 	app.post('/addfoodnotifications', food.addfoodnotifications);

 	/////========================Food history days ====================////////
 	app.post('/addfoodhistorydays', food.addfoodhistorydays);

 	//////======================Food Nutrient Settings=================////////
 	app.post('/addfoodnutrientsettings', food.addfoodnutrientsettings);

 	////========================Food =================================//////////

 	app.post('/insertfood', food.addfood);
 	app.get('/retrieveAllFood', food.getAllFood);
 	app.get('/retrieveAllFoodWithoutCat', food.foodswithoutcat);
 	app.get('/retrieveSpecifcFood', food.getSpecificFood);
 	app.get('/retrieveFoodWithComposition', food.foodWithComposition);
 	app.get('/foodWithmg', food.foodWithMG);
 	app.get('/foodWithml', food.foodWithml);
 	app.get('/foodnameSuggestion', food.foodnameSuggestion1);

 	////========================add fat and colestrol==========================//////////
 	app.post('/insertfattyandcholestrol', food.insertfattyandcholestrol);
 	app.get('/retrieveallfattyandcholestrol', food.retrieveallfattyandcholestrol);
 	app.get('/retrievefattyandcholestrol', food.retrievefattyandcholestrol);

 	////========================Food minerals==========================//////////
 	app.post('/insertfoodminerals', food.insertfoodminerals);
 	app.get('/retrieveallfoodminerals', food.retrieveallfoodminerals);
 	app.get('/retrievefoodminerals', food.retrievefoodminerals);

 	////========================Food proximate composition==========================//////////
 	app.post('/insertfoodproximatecomposition', food.insertfoodproximatecomposition);
 	app.get('/retreiveallfoodproximatecomposition', food.retrieveallfoodproximatecomposition);
 	app.get('/retreivefoodproximatecomposition', food.retrievefoodproximatecomposition);

 	////========================Food Vitanmins==========================//////////
 	app.post('/insertfoodvitamains', food.insertfoodvitamains);
 	app.get('/retrieveallfoodvitamains', food.retrieveallfoodvitamains);
 	app.get('/retrievefoodvitamains', food.retrievefoodvitamains);

 	////========================Water And Minerals==========================//////////
 	app.post('/insertwaterandmineralcontent', food.insertwaterandmineralcontent);
 	app.get('/retrieveallwaterandmineralcontent', food.retrieveallwaterandmineralcontent);
 	app.get('/retrievewaterandmineralcontent', food.retrievewaterandmineralcontent);


 	////========================Fatty Acids==========================//////////
 	app.post('/insertfattyacids', food.insertfattyacids);
 	app.get('/retrieveallfattyacids', food.retrieveallfattyacids);
 	app.get('/retrievefattyacids', food.retrievefattyacids);



 };