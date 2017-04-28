 'use strict';

 module.exports = function(app) {
 	// User route
 	var user = require('../../app/controllers/user');
 	app.post('/login', user.login);
 	app.post('/logout', user.GetUserlogout);
 	app.get('/GetUserData', user.GetUserData);
 	app.put('/UpdateUserInfo', user.UpdateUserInfo);
 	app.put('/UpdatePassword', user.updatePasssword);
 	app.post('/ForgotPassword', user.forgotPasssword);
 	app.post('/SocialLogin', user.socialLogin);

 	app.get('/GetPateintDetails', user.GetUserDatabyID);

 	/**************
 	 **Update Device Token
 	 ***************/
 	app.put('/updateDeviceToken', user.updateDeviceToken);

 	/**************
 	 ** Questionaire User
 	 ****************/
 	app.post('/questionaire', user.questionuseradd);
 	app.get('/Getquestionaire', user.GetUserQuestionnaire);
	
	/***************
	** Added by alex for user chat list
	******************/

	app.get('/GetChatPartners', user.GetChatPartners);
 	/*****************
 	 **Add new patient by doctor
 	 ******************/
 	app.post('/addnewPatientByDoctor', user.addnewPatientByDoctor);

 };
