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
    app.post('/updateprofilefields', user.updateUserField);
    app.get('/GetPateintDetails', user.GetUserDatabyID);

 	/**************
 	 **Next Of Kin Setup
 	 ***************/

     app.post('/addNextOfKin', user.addnextofkin12);
     app.get('/getNextOfKin', user.getNextOfKin);

     app.get('/getDoctorsAppointments', user.getDoctorsAppointments);

     

     app.post('/GetMpayResponse', user.GetMpayResponse);

     app.post('/updatePaymentTranscation', user.updatePaymentTranscation);
     app.post('/addPaymentTranscation', user.addPaymentTranscation);
     app.post('/addPromotions', user.addPromotions);

     app.post('/addsubscriptionplan', user.addsubscriptionplan);
     app.post('/addPaymentGatewayModel', user.addPaymentGatewayModel);


     app.get('/getUserPlan', user.getUserPlan);
     app.get('/getPaymentTranscation', user.getPaymentTranscation);
     app.get('/getPromotions', user.getPromotions);
     app.get('/getsubscriptionplan', user.getsubscriptionplan);

     
     app.post('/addUserPlan', user.addUserPlan);




     app.post('/addLabReport', user.addLabReport);
     app.get('/getLabReport', user.getLabReport);

     app.post('/UpdateMyMedicine', user.UpdateMyMedicine);

     app.post('/deletenextofkin', user.deletenextofkin);

     app.get('/getListOfDoctors', user.getListOfDoctores);

     app.get('/getpendinglistofDoctor', user.getpendinglistofDoctor);

     app.get('/getlatestmessages', user.getlatestmessagesOfUser);

     app.get('/ValidateCode', user.ValidateCode);

     app.get('/getuserImage', user.getuserImage);
     
     app.get('/DoctorRequestStatus', user.DoctorRequestStatus);
     app.post('/rejectDoctorRequest', user.rejectDoctorRequest);
 	/**************
 	 **Update Device Token
 	 ***************/
 	 app.put('/updateDeviceToken', user.updateDeviceToken);
     app.get('/checkDeiveToken', user.checkDeiveToken);
     app.get('/checkUsername', user.checkUsername);

 	/**************
 	 ** Questionaire User
 	 ****************/
 	app.post('/questionaire', user.questionuseradd);
 	app.get('/Getquestionaire', user.GetUserQuestionnaire);

 	/***************
 	 ** Added by alex for user chat list
 	 ******************/

 	app.get('/GetChatPartners', user.GetChatPartners);

 	/***************
 	 ** Added by alex for getting chat user info
 	 ******************/

 	app.get('/GetChatUser', user.GetChatUser);

 	/*****************
 	 **Add new patient by doctor
 	 ******************/
 	app.post('/addnewPatientByDoctor', user.addnewPatientByDoctor);

 	/*******************************
 	**Get user appointment
 	*******************************/
    
     app.get('/getUserAppointment', user.getUserAppointment);
     app.get('/getDoctorsSchedule', user.getDoctorsSchedule);

     app.get('/getPatientList', user.getPatientList); //When Doctor create appointment for patients
     

    /***************************
    **Add Card Managment
    ***************************/
     app.post('/addCardManagment', user.addCardManagment);

     app.post('/adduserprofessionalappointment', user.adduserprofessionalappointment);
     app.post('/cancelrescheduleappointment', user.cancelRescheduleUserProfessionalAppointment);
     app.get('/getBookedAppointment', user.getBookedAppointment);
    /***************************
    **Add Card Managment For Android and ios app
    ***************************/
    app.post('/addAppCardManagment', user.app_addCardManagment);
    app.get('/getUser_CardManagement', user.getUser_CardManagement); 

    /***********************************
    **Add Mobile etiqa Users details
    ***********************************/
   app.post('/addEtiqaUserMobile', user.addEtiqaUserMobile);
   app.get('/getUser_Etiqa_mobile', user.getUser_Etiqa_mobile);

   app.post('/addEtiqaUserMobileBP', user.addEtiqaUserMobileBP);

   /**********************************
   ** Get companies list
   ***********************************/ 
   app.get('/getCompaniesList', user.get_companies_list);
   app.get('/getUserCompany', user.get_user_companies_list);

   /******************************
   ** User Parameters API's
   *******************************/
   app.post('/addUserDeviceParameters', user.adduserDeviceParameters);
   app.get('/getUserDeviceParameters', user.get_user_device_parameters);
   app.post('/deleteUserDeviceParameters', user.deleteUserDeviceParameters);
  
  /********************************
  **Update User Password
  **********************************/
  app.post('/updateUserPassword', user.updateUserPassword);

  /********************************
  **PPUM Appointment
  *******************************/
  app.post('/regApptPPUM', user.regApptPPUM); // ppum client reg appt, cy added 18 May 2020
  app.post('/updateApptPPUM', user.approveApptPPUM);// ppum client approved appt, cy added 19 May 2020
  app.post('/medNotificationPPUM',user.medNotificationPPUM);
  app.post('/insertcalllogs',user.insertcalllogs);

  /********************************************
   ** Admin Portal Subscription Plan Setting
   ******************************************/
  app.get('/retrievePlanFeatures',user.retrievePlanFeatures);
  app.post('/addPlanFeature',user.addPlanFeature);
  app.get('/healthcareProviders',user.healthcareProviders);
  app.post('/addVoucher',user.addVoucher);

  /*******************************************
   ** Graph Data
   *******************************************/
  app.post('/nextOfKinGraph', user.getNextOfKinGraph);
 };
