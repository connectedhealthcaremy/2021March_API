 'use strict';

 module.exports = function(app) {
 	//  route
 	var hm = require('../../app/controllers/homeMonitring');

 	/****
 	 ** Registration request
 	 *****/
 	app.get('/GetRegisterRequest', hm.getregiterrequest);
 	app.get('/Getrejectedrequest', hm.getrejectedrequest);
 	app.get('/CountRegisterRequest', hm.getcountregister);
 	app.get('/CountDiabetesPatients', hm.getcountDiabetesUser);
 	app.get('/CountHypertensionPatients', hm.getcountHypertensionUser);
 	app.get('/CountDiabetesAndHypertensionPatients', hm.getcountBothUser);
 	app.post('/acceptRequest', hm.acceptRequest);
 	app.post('/rejectRequest', hm.rejectRequest);
 	app.post('/removeRegistration', hm.removeRegistration);

 	app.get('/GetRegisterPatients', hm.getregiterrequestPatients);
 	app.get('/GetDiabetesPatients', hm.getdiabetsePatients);
 	app.get('/GetHypertensionPatients', hm.gethypertensionPatients);
 	app.get('/GetDHPatients', hm.getdiabetseandhypertensionPatients);

 	/*******************
 	 ***Pakages user
 	 *******************/
 	app.get('/GetPakages', hm.getPakages);
 	app.post('/AddDoctorPakage', hm.addpakage);
 	app.get('/DoctorPakages', hm.getdoctorpakages);
 	app.post('/DeleteDoctorPakage', hm.deletedoctorpakage);

 	/****************
 	 ** Get Diabetes Detail patients
 	 ****************/

 	app.get('/GetDiabetesDietControlPatients', hm.getDiabetesPatientDietControl);
 	app.get('/GetDiabetesOADPatients', hm.getdiabetesPateintsOAD);
 	app.get('/GetDiabaetesInsulinPatients', hm.getdiabestPatientsInsulin);

 	app.get('/GetDiabetesDietControlDetail', hm.getDiabetesDietControlDetail);
 	app.get('/GetDiabetesOADDetail', hm.getDiabetesOADDetail);
 	app.get('/GetDiabetesInsulinDetail', hm.getDiabetesInsulinDetail);

 	/**************
 	 **Get Hypertension Details Patients
 	 ***************/

 	app.get('/GetHypertensionNotControlled', hm.getHypertensionNotControlled);
 	app.get('/GetHypertensionNotControlledDetailMorning', hm.getHypertensionNotControlledDetailPateintsSystolic);
 	app.get('/GetHypertensionNotControlledDetailEvening', hm.GetHypertensionNotControlledDetailDiastolic);

 	app.get('/GetHypertensionWellControlled', hm.getHypertensionwellcontrolled);
 	app.get('/GetHypertensionWellControlledDetailsMorning', hm.getHypertensionwellcontrolledDetailsMorning);
 	app.get('/GetHypertensionWellControlledDetailsEvening', hm.getHypertensionwellcontrolledDetailsEvening);


 	/********************
 	 **Get apoointments details users for doctor
 	 **********************/

 	app.get('/GetAppointmentsDoctor', hm.getAppointmentsDetasils);

 	/*****************
 	 *** User Medicine Modules 
 	 ******************/

 	app.get('/GetPatientMedicineList', hm.getMedicineListDetasils);
 	app.get('/GetPatientMedicineStatus', hm.getMedicineDetasilsStatus);

 	/*****************
 	 **User Measurement Settings
 	 *******************/

 	app.post('/saveUserIllnessControl', hm.saveUserIllnessControl);
 	app.get('/getmeasurementcontrol', hm.getmeasurementcontrol);
 	app.get('/getmeasurementsettings', hm.getmeasurementsettings);
 	app.get('/getuserillnesscheck', hm.getuserillnesscheck);

 	/*******************
 	 ***Care Plan Settings
 	 *********************/
 	app.post('/careplansetting', hm.careplansetting);
 	app.get('/getcareplandisplay', hm.getcareplandisplay);
 	app.get('/getcareplanSMBG', hm.getcareplanSMBG);

 	/*****************
 	 **Comments by doctor on health summary
 	 ******************/
 	app.post('/careplanReview', hm.careplanReview);

 	/***************
 	 **get review patients
 	 ****************/
 	app.get('/getrequirereviewsPatients', hm.getrequirereviewsPatients);

 	/*******************
 	 **Get Reviewed patients
 	 ********************/
 	app.get('/getreviewedPatients', hm.getreviewedPatients);

 	/*********************
 	 **Get Todays taks
 	 **********************/
 	app.get('/getTodayTasksDiabetes', hm.getTodayTasksDiabetes);
 	app.get('/getTodayTasksHypertension', hm.getTodayTasksHypertension);
 	app.get('/getTodayTasksMedication', hm.getTodayTasksMedication);

 	app.get('/getTasksDiabetes', hm.getTasksDiabetes);
 	app.get('/getTasksHypertension', hm.getTasksHypertension);
 	app.get('/getTasksMedication', hm.getTasksMedication);

 	/****************
 	 **Get preview report for doctor
 	 ****************/
 	app.get('/previewdoctorreport', hm.previewdoctorreport);


 };