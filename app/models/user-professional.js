'use strict';

module.exports = function(sequelize, DataTypes) {

	var userProfessionalRegistration = sequelize.define('userProfessionalRegistration',
	{},
	{
			classMethods: {  
				getregistrationReq: function (id) {  
				
				var sql = "SELECT user.username, user.firstName, user.lastName, user.userID AS userid, userProfessionalRegistration.id as registrationid, userProfessionalRegistration.status from user INNER JOIN  userProfessionalRegistration ON user.userID=userProfessionalRegistration.userID WHERE userProfessionalRegistration.professionalID ='"+id+"' AND userProfessionalRegistration.status='1' AND userProfessionalRegistration.isdeleted='0'";
				  return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
				getrejectedReq: function (id) {  
				
				var sql = "SELECT user.username, user.firstName, user.lastName, user.userID AS userid, userProfessionalRegistration.id as registrationid, userProfessionalRegistration.status from user INNER JOIN  userProfessionalRegistration ON user.userID=userProfessionalRegistration.userID WHERE userProfessionalRegistration.professionalID ='"+id+"' AND userProfessionalRegistration.status='3' AND userProfessionalRegistration.isdeleted='0'";
				 return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
				removeRegistraion: function(sql)
				{
					return sequelize.query(sql,{ type: sequelize.QueryTypes.DELETE});
				}
				,
				getregisteredUsersTrainer: function(id)
				{

					var sql="select user.userID, user.firstName, user.lastName, user.gender, user.height ,user.profilepic as pic, user.username, userProfessionalRegistration.professionalID, userProfessionalRegistration.id  as prid from user inner join userProfessionalRegistration on user.userID=userProfessionalRegistration.userID where userProfessionalRegistration.professionalID='"+id+"' AND userProfessionalRegistration.isdeleted='0' AND userProfessionalRegistration.status='2'";
                         return sequelize.query(sql, {type: sequelize.QueryTypes.SELECT});
				},
				getregisteredProfessionals: function(id)
				{

					var sql="select user.userID, user.firstName, user.lastName, user.gender, user.height ,user.profilepic as pic, user.username, userProfessionalRegistration.professionalID from user inner join userProfessionalRegistration on user.userID=userProfessionalRegistration.professionalID where userProfessionalRegistration.userID='"+id+"' AND userProfessionalRegistration.isdeleted='0' AND userProfessionalRegistration.status='2'";
                         return sequelize.query(sql, {type: sequelize.QueryTypes.SELECT});
				},
				getUserTrainerDetail: function(userid,pid){ 
					var sql="select user.userID, user.firstName, user.lastName, user.token , user.ic_number,user.loginType, user.username, user.profilepic as pic, user.gender, user.birthday , user.weight, user.height, userProfessionalRegistration.professionalID, userProfessionalRegistration.insertionDate as member_since, weight.weightQty from user  inner join userProfessionalRegistration on user.userID=userProfessionalRegistration.userID left join weight on user.userID= weight.userID where userProfessionalRegistration.professionalID='"+pid+"'  AND userProfessionalRegistration.status='2' AND userProfessionalRegistration.userID='"+userid+"' AND userProfessionalRegistration.isdeleted='0' order by weight.scaleDate desc limit 1";
				     return sequelize.query(sql, {type: sequelize.QueryTypes.SELECT});	
				},
				getCountregistrationReq: function (id) { 
				
				var sql = "SELECT COUNT(user.userID) AS totalReq from user INNER JOIN  userProfessionalRegistration ON user.userID=userProfessionalRegistration.userID WHERE userProfessionalRegistration.professionalID ='"+id+"' AND userProfessionalRegistration.status='1' AND userProfessionalRegistration.isdeleted='0'";
				  return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
				countregistereduser: function(id){
                 var sql = "SELECT COUNT(user.userID) AS totalReq from user INNER JOIN  userProfessionalRegistration ON user.userID=userProfessionalRegistration.userID WHERE userProfessionalRegistration.professionalID ='"+id+"' AND userProfessionalRegistration.status='2' AND userProfessionalRegistration.isdeleted='0'";
				  return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				},
				getCountDiabetesReq: function (id) { 
				
				var sql = "SELECT COUNT(userillness.userID) AS totalDiabetes from userillness INNER JOIN  userProfessionalRegistration ON userillness.userID=userProfessionalRegistration.userID WHERE userProfessionalRegistration.professionalID ='"+id+"' AND userProfessionalRegistration.status='2' AND userProfessionalRegistration.isdeleted='0' AND userillness.disease='1'";
				  return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
				getCountHypertensionReq: function (id) { 
				
				var sql = "SELECT COUNT(userillness.userID) AS totalHypertension from userillness INNER JOIN  userProfessionalRegistration ON userillness.userID=userProfessionalRegistration.userID WHERE userProfessionalRegistration.professionalID ='"+id+"' AND userProfessionalRegistration.status='2' AND userProfessionalRegistration.isdeleted='0' AND userillness.disease='2'";
				  return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
				getCountBothReq: function (id) { 
				
				var sql = "SELECT COUNT(userillness.userID) AS totalPatient from userillness INNER JOIN  userProfessionalRegistration ON userillness.userID=userProfessionalRegistration.userID WHERE userProfessionalRegistration.professionalID ='"+id+"' AND userProfessionalRegistration.status='2' AND userProfessionalRegistration.isdeleted='0' AND userillness.disease='3'";
				  return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
				acceptRequest: function (sql) { 
				
				return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				
				},
				 get_patients_list: function (id) {

                         var sql = "SELECT user.username, user.firstName, user.lastName, user.profilepic, user.gender, user.userID AS userid, userProfessionalRegistration.id as registrationid, userProfessionalRegistration.status from user INNER JOIN userProfessionalRegistration ON user.userID=userProfessionalRegistration.userID WHERE userProfessionalRegistration.professionalID ='"+id+"' AND userProfessionalRegistration.status='2' AND userProfessionalRegistration.isdeleted='0';";
                                  return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});

                                },

				getallpatients: function (id) { 
				
		         var sql = "SELECT user.username, user.firstName, user.lastName, user.profilepic, user.gender, user.userID AS userid,userillness.disease ,userProfessionalRegistration.id as registrationid, userProfessionalRegistration.status from user INNER JOIN  userProfessionalRegistration ON user.userID=userProfessionalRegistration.userID INNER JOIN userillness ON user.userID= userillness.userID WHERE userProfessionalRegistration.professionalID ='"+id+"' AND userProfessionalRegistration.status='2' AND userProfessionalRegistration.isdeleted='0'";
				  return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
				getdiabetesepatients: function (id) { 
				
		         var sql = "SELECT user.username, user.firstName, user.lastName, user.userID AS userid,userillness.disease,userillness.dietControl,userillness.oralAntidiabetics,userillness.insulin ,userProfessionalRegistration.id as registrationid, userProfessionalRegistration.status from user INNER JOIN  userProfessionalRegistration ON user.userID=userProfessionalRegistration.userID INNER JOIN userillness ON user.userID= userillness.userID WHERE userProfessionalRegistration.professionalID ='"+id+"' AND userProfessionalRegistration.status='2' AND userProfessionalRegistration.isdeleted='0' AND userillness.disease='1'";
				  return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
				getdiabetesDietControl: function (id, dh)
				{
				var sql = "SELECT user.username, user.firstName, user.lastName, user.userID AS userid,userillness.disease,userillness.dietControl,userillness.oralAntidiabetics,userillness.insulin ,userProfessionalRegistration.id as registrationid, userProfessionalRegistration.status from user INNER JOIN  userProfessionalRegistration ON user.userID=userProfessionalRegistration.userID INNER JOIN userillness ON user.userID= userillness.userID WHERE userProfessionalRegistration.professionalID ='"+id+"' AND userProfessionalRegistration.status='2' AND userProfessionalRegistration.isdeleted='0' AND userillness.disease='"+dh+"' AND userillness.dietControl='1'";
                return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
				getdiabetesDietControlDetails: function (userid)
				{
					var sql="SELECT * FROM  diabetesDietControl WHERE userID="+userid+" order by recordDateTime desc";
					return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					},
				getdiabetesOAD : function (id, dh)
				{
				var sql = "SELECT user.username, user.firstName, user.lastName, user.userID AS userid,userillness.disease,userillness.dietControl,userillness.oralAntidiabetics,userillness.insulin ,userProfessionalRegistration.id as registrationid, userProfessionalRegistration.status from user INNER JOIN  userProfessionalRegistration ON user.userID=userProfessionalRegistration.userID INNER JOIN userillness ON user.userID= userillness.userID WHERE userProfessionalRegistration.professionalID ='"+id+"' AND userProfessionalRegistration.status='2' AND userProfessionalRegistration.isdeleted='0' AND userillness.disease='"+dh+"' AND userillness.oralAntidiabetics='1'"; 
				return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT}); 
				},
				getdiabetesOADDetails: function (userid)
				{
					var sql="SELECT * FROM  glucose_goal WHERE userID="+userid+" order by recordDateTime desc";
					return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					},
				getdiabetesInsulin : function (id, dh)
				{
				var sql = "SELECT user.username, user.firstName, user.lastName, user.userID AS userid,userillness.disease,userillness.dietControl,userillness.oralAntidiabetics,userillness.insulin ,userProfessionalRegistration.id as registrationid, userProfessionalRegistration.status from user INNER JOIN  userProfessionalRegistration ON user.userID=userProfessionalRegistration.userID INNER JOIN userillness ON user.userID= userillness.userID WHERE userProfessionalRegistration.professionalID ='"+id+"' AND userProfessionalRegistration.status='2' AND userProfessionalRegistration.isdeleted='0' AND userillness.disease='"+dh+"' AND userillness.insulin='1'";
				return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				},
				getDiabetesInsulinDetail: function (id)
				{
					var sql="SELECT * FROM diabetesInsulin WHERE  diabetesInsulin.userID="+id+" order by recordDateTime desc ";
					return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
					
					}
				,	
				gethypertensionpatients: function (id) { 
				
		         var sql = "SELECT user.username, user.firstName, user.lastName, user.userID AS userid,userillness.disease, userillness.notControlledTreatment,userillness.wellControlled ,userProfessionalRegistration.id as registrationid, userProfessionalRegistration.status from user INNER JOIN  userProfessionalRegistration ON user.userID=userProfessionalRegistration.userID INNER JOIN userillness ON user.userID= userillness.userID WHERE userProfessionalRegistration.professionalID ='"+id+"' AND userProfessionalRegistration.status='2' AND userProfessionalRegistration.isdeleted='0' AND userillness.disease='2'";
				  return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
				gethypertensionpatientsNotControlled: function (id, dh) { 
				
		         var sql = "SELECT user.username, user.token, user.firstName, user.lastName, user.userID AS userid,userillness.disease, userillness.notControlledTreatment,userillness.wellControlled ,userProfessionalRegistration.id as registrationid, userProfessionalRegistration.status from user INNER JOIN  userProfessionalRegistration ON user.userID=userProfessionalRegistration.userID INNER JOIN userillness ON user.userID= userillness.userID WHERE userProfessionalRegistration.professionalID ='"+id+"' AND userProfessionalRegistration.status='2' AND userProfessionalRegistration.isdeleted='0' AND userillness.disease='"+dh+"' AND userillness.notControlledTreatment='1'";

				  return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
                gethypertensionpatientsNotControlledDetailSystolic: function(userid){
                  
                  var sql="SELECT bp.userID, bp.systolic, bp.diastolic, bp.recordTime, bp.pulse, user.email, user.userID FROM bp INNER JOIN user ON bp.userID=user.email WHERE bp.userID='"+userid+"' AND TIME(bp.recordTime) between '00:00:00' AND '12:00:00' AND bp.isdeleted='0' order by bp.recordTime DESC";

                  return sequelize.query(sql, {type: sequelize.QueryTypes.SELECT});

                },
                gethypertensionpatientsDetailDiastolic: function(userid){

                 var sql="SELECT bp.userID, bp.systolic, bp.diastolic, bp.recordTime, bp.pulse, user.email, user.userID FROM bp INNER JOIN user ON bp.userID=user.email WHERE bp.userID='"+userid+"' AND TIME(bp.recordTime) between '12:00:00' AND '24:00:00' AND bp.isdeleted='0' order by bp.recordTime DESC";
                  return sequelize.query(sql, {type: sequelize.QueryTypes.SELECT});

                },
				gethypertensionpatientsWellControlled: function (id, dh) { 
				
		         var sql = "SELECT user.username, user.firstName, user.token, user.lastName, user.userID AS userid,userillness.disease, userillness.notControlledTreatment,userillness.wellControlled ,userProfessionalRegistration.id as registrationid, userProfessionalRegistration.status from user INNER JOIN  userProfessionalRegistration ON user.userID=userProfessionalRegistration.userID INNER JOIN userillness ON user.userID= userillness.userID WHERE userProfessionalRegistration.professionalID ='"+id+"' AND userProfessionalRegistration.status='2' AND userProfessionalRegistration.isdeleted='0' AND userillness.disease='"+dh+"' AND userillness.wellControlled='1'";
				  
				  return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
				gethypertensionpatientsWellControlledMorningDetails: function(id)
				{
					var sql="SELECT  SUM(systolic)/COUNT(systolic) as avgSystolic, SUM(diastolic)/COUNT(diastolic) as avgDiastolic, SUM(pulse)/COUNT(pulse) as avgPulse, COUNT(*) AS reports_in_week, DATE_ADD(recordTime, INTERVAL(1-DAYOFWEEK(recordTime)) DAY) as week_start, DATE_ADD(recordTime, INTERVAL(7-DAYOFWEEK(recordTime)) DAY) as week_end FROM bp WHERE userID='"+id+"' AND TIME(bp.recordTime) between '00:00:00' AND '12:00:00' GROUP BY WEEK(recordTime)";
					return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT});
				},
				gethypertensionpatientsWellControlledEveningDetails: function(id){
                  var sql="SELECT  SUM(systolic)/COUNT(systolic) as avgSystolic, SUM(diastolic)/COUNT(diastolic) as avgDiastolic, SUM(pulse)/COUNT(pulse) as avgPulse, COUNT(*) AS reports_in_week, DATE_ADD(recordTime, INTERVAL(1-DAYOFWEEK(recordTime)) DAY) as week_start, DATE_ADD(recordTime, INTERVAL(7-DAYOFWEEK(recordTime)) DAY) as week_end FROM bp WHERE userID='"+id+"' AND TIME(bp.recordTime) between '12:00:00' AND '24:00:00' GROUP BY WEEK(recordTime)";
					return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT});
				},
				gethmpatients: function (id) { 
				
		         var sql = "SELECT user.username, user.firstName, user.lastName, user.userID AS userid,userillness.disease,userillness.dietControl,userillness.oralAntidiabetics,userillness.insulin ,userillness.notControlledTreatment,userillness.wellControlled  ,userProfessionalRegistration.id as registrationid, userProfessionalRegistration.status from user INNER JOIN  userProfessionalRegistration ON user.userID=userProfessionalRegistration.userID INNER JOIN userillness ON user.userID= userillness.userID WHERE userProfessionalRegistration.professionalID ='"+id+"' AND userProfessionalRegistration.status='2' AND userProfessionalRegistration.isdeleted='0' AND userillness.disease='3'";
				  return sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});
				
				},
				getappointmentdate: function(id)
				{
					var sql="SELECT * FROM userProfessionalAppointment WHERE professionalID='"+id+"' order by appointmentDate desc";
					return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT});
				},
				getpatientmedicine: function(id){
                  var sql="SELECT mymedicine.id, mymedicine.medicineID,mymedicine.medicineTake, mymedicine.unit, mymedicine.startDate, mymedicine.endDate, medicine.medicineName, medicine.indication FROM mymedicine inner join medicine on mymedicine.medicineID=medicine.id where mymedicine.userID='"+id+"'"; 
                  return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT});
				},
				getpatientmedicienStatus: function(mid, id){
				var sql="SELECT mymedicinestatus.dateTime,mymedicinestatus.status,mymedicinestatus.timeTaken,case when mymedicinestatus.reason is null then '-' else  mymedicinestatus.reason end as reason  from mymedicinestatus  where mymedicinestatus.myMedicineID='"+mid+"' and mymedicinestatus.userID='"+id+"' order by mymedicinestatus.dateTime DESC"; 
                  return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT});
				} ,
				saveuserillnesscontrol: function(sql){
					return sequelize.query(sql, { type: sequelize.QueryTypes.INSERT});
				},
				updatesaveuserillnesscontrol: function(sql){
					return sequelize.query(sql, { type: sequelize.QueryTypes.UPDATE});
				},
				getmeasurementcontrol: function(userID)
				{


					var sql="SELECT user.userID,bp_goal.id as bp_id,glucose_goal.id as glucose_id,diabetesPremealFrom, diabetesPremealTo,diabetesPostmealFrom,diabetesPostmealTo,SBP,DBP   FROM user left join userillnessTargetControl on user.userID=userillnessTargetControl.userID left join glucose_goal on user.userID=glucose_goal.userID left join bp_goal on user.userID=bp_goal.userID where user.userID='"+userID+"' group by user.userID";
					
					//var sql="select user.userID, bp_goal.id as bp_id, glucose_goal.id as glucose_id, glucose_goal.goalBloodGlucose_Start_BM as diabetesPremealFrom , glucose_goal.goalBloodGlucose_End_BM as diabetesPremealTo, glucose_goal.goalBloodGlucose_Start_AM as diabetesPostmealFrom, glucose_goal.goalBloodGlucose_End_AM as diabetesPostmealTo, bp_goal.systolic_to as SBP, bp_goal.diastolic_to as DBP from user left join glucose_goal on user.userID=glucose_goal.userID left join bp_goal on user.userID=bp_goal.userID where user.userID='"+userID+"' group by user.userID";
					return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT});
				},
				getmeasurementsettings: function(userID)
				{
					var sql="SELECT * FROM userillnessMeasurements WHERE isdeleted=0 AND  userID='"+userID+"'";
					return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT});
				},
				getuserillnesscheck: function(userID)
				{
					var sql="SELECT * FROM userillness WHERE userID='"+userID+"'";
					return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT});
				},
				getcareplansettings: function(userID)
				{
					var sql="SELECT * FROM carePlanSettings WHERE professionalID='"+userID+"'";
					return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT});
				},
                                getglobalsettings: function(sql)
				{
                                        var sql="SELECT * FROM globalSetting";
					return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT});
				},
				getcareplanSMBG: function(email, date)
				{
					var sql="SELECT (select avg(glucoselevel) FROM WeHealthDB.glucose WHERE time(recordDateTime) > time('01:00:00') and  time(recordDateTime) < time('07:10:00') and user ='"+email+"' and date(recordDateTime) =date( '"+date+"')) as BreakFastPre, (select notes FROM WeHealthDB.glucose WHERE time(recordDateTime) > time('01:00:00') and  time(recordDateTime) < time('07:10:00') and user ='"+email+"' and date(recordDateTime) =date( '"+date+"')) as BreakFastPreNote, (select avg(glucoselevel) FROM WeHealthDB.glucose WHERE time(recordDateTime) > time('07:10:00') and  time(recordDateTime) < time('11:00:00') and user ='"+email+"' and date(recordDateTime) =date( '"+date+"')) as BreakFastPost, (select notes FROM WeHealthDB.glucose WHERE time(recordDateTime) > time('07:10:00') and  time(recordDateTime) < time('11:00:00') and user ='"+email+"' and date(recordDateTime) =date( '"+date+"')) as BreakFastPostNote, (select avg(glucoselevel) FROM WeHealthDB.glucose WHERE time(recordDateTime) > time('11:00:00') and  time(recordDateTime) < time('13:10:00') and user ='"+email+"' and date(recordDateTime) =date( '"+date+"')) as LunchPre, (select notes FROM WeHealthDB.glucose WHERE time(recordDateTime) > time('11:00:00') and  time(recordDateTime) < time('13:10:00') and user ='"+email+"' and date(recordDateTime) =date( '"+date+"')) as LunchPreNote, (select avg(glucoselevel) FROM WeHealthDB.glucose WHERE time(recordDateTime) > time('13:10:00') and  time(recordDateTime) < time('17:10:00') and user ='"+email+"' and date(recordDateTime) =date( '"+date+"')) as LunchPost, (select notes FROM WeHealthDB.glucose WHERE time(recordDateTime) > time('13:10:00') and  time(recordDateTime) < time('17:10:00') and user ='"+email+"' and date(recordDateTime) =date( '"+date+"')) as LunchPostNote, (select avg(glucoselevel) FROM WeHealthDB.glucose WHERE time(recordDateTime) > time('17:10:00') and  time(recordDateTime) < time('20:10:00') and user ='"+email+"' and date(recordDateTime) =date( '"+date+"')) as DinnerPre, (select notes FROM WeHealthDB.glucose WHERE time(recordDateTime) > time('17:10:00') and  time(recordDateTime) < time('20:10:00') and user ='"+email+"' and date(recordDateTime) =date( '"+date+"')) as DinnerPreNote, (select avg(glucoselevel) FROM WeHealthDB.glucose WHERE time(recordDateTime) > time('20:10:00') and  time(recordDateTime) < time('23:59:59') and user ='"+email+"' and date(recordDateTime) =date( '"+date+"')) as DinnerPost, (select notes FROM WeHealthDB.glucose WHERE time(recordDateTime) > time('20:10:00') and  time(recordDateTime) < time('23:59:59') and user ='"+email+"' and date(recordDateTime) =date( '"+date+"')) as DinnerPostNote, date(recordDateTime) as c_date  FROM WeHealthDB.glucose where user ='"+email+"' and date(recordDateTime) =date( '"+date+"') group by date(recordDateTime)";
					
					return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT});
				},
				getrequirereviewsPatients: function(userID)
				{
					var sql="select user.userID, user.username, user.email, user.firstName, user.lastName, userillness.disease,bp.systolic, bp.diastolic, glucose.glucoselevel from user inner join userillness on user.userID=userillness.userID inner join userProfessionalRegistration on user.userID=userProfessionalRegistration.userID left join carePlanreviewedPatients on user.userID=carePlanreviewedPatients.userID left join bp on user.email=bp.userID left join glucose on user.email=glucose.user where glucoselevel not between 4.4 and 7 and date(glucose.recordDateTime) >= DATE(NOW()) - INTERVAL 8 DAY and date(glucose.recordDateTime) != CURRENT_DATE OR bp.diastolic > 89 OR bp.systolic > 139 and  date(bp.recordTime) >= DATE(NOW()) - INTERVAL 8 DAY and date(bp.recordTime) != CURRENT_DATE and userProfessionalRegistration.status =2 and userProfessionalRegistration.professionalID='"+userID+"' and userillness.disease !=0 and user.userID NOT IN (SELECT userID FROM WeHealthDB.carePlanreviewedPatients where reviewedDate=CURRENT_DATE) group by user.userID";
					return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT});
				},
				getreviewedPatients: function(userID)
				{
					var sql="select user.userID, user.username, user.email, user.firstName, user.lastName,carePlanreviewedPatients.professionalID, carePlanreviewedPatients.reviewedDate from user inner join carePlanreviewedPatients on user.userID = carePlanreviewedPatients.userID where carePlanreviewedPatients.professionalID='"+userID+"' and carePlanreviewedPatients.reviewedDate=CURRENT_DATE";
					return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT});
				},
				getTodayTasksDiabetes: function(userID, day)
				{
					var sql="SELECT id, userID, diet_only_breakfast_pre, diet_only_breakfast_post, diet_only_lunch_pre, diet_only_lunch_post, diet_only_dinner_pre, diet_only_dinner_post, oad_breakfast_pre, oad_breakfast_post, oad_lunch_pre, oad_lunch_post, oad_dinner_pre, oad_dinner_post, insulin_breakfast_pre,insulin_breakfast_post, insulin_lunch_pre, insulin_lunch_post, insulin_dinner_pre, insulin_dinner_post   FROM WeHealthDB.userillnessMeasurements where userID='"+userID+"' and isdeleted=0 and  diabetes_day_measurement like '%"+day+"%' and CURRENT_DATE >= from_diabetes and CURRENT_DATE <= to_diabetes;";
					return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT});
				}, 
				getTodayTasksHypertension: function(userID, day)
				{
					var sql="SELECT id, userID, not_controlled_treatment, well_controlled FROM WeHealthDB.userillnessMeasurements where userID='"+userID+"' and isdeleted=0 and hypertension_day_measurement like '%"+day+"%' and CURRENT_DATE >= from_hypertension and CURRENT_DATE <= to_hypertension;";
					return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT});
				}, 
				getTodayTasksMedication: function(userID, day)
				{
					var sql="SELECT mymedicine.id, mymedicine.userID, medicine.medicineName , mymedicine.timingPerDay as todaytime  FROM WeHealthDB.mymedicine inner join medicine on mymedicine.medicineID=medicine.id where mymedicine.userID='"+userID+"' and mymedicine.days like '%"+day+"%' and CURRENT_DATE >= mymedicine.startDate and CURRENT_DATE <= mymedicine.endDate;";
					return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT});
				},
				getTasksDiabetes: function(userID)
				{
					var sql="SELECT id, userID, diet_only_breakfast_pre, diet_only_breakfast_post, diet_only_lunch_pre, diet_only_lunch_post, diet_only_dinner_pre, diet_only_dinner_post, oad_breakfast_pre, oad_breakfast_post, oad_lunch_pre, oad_lunch_post, oad_dinner_pre, oad_dinner_post, insulin_breakfast_pre,insulin_breakfast_post, insulin_lunch_pre, insulin_lunch_post, insulin_dinner_pre, insulin_dinner_post, diabetes_day_measurement, from_diabetes as startDate, to_diabetes as endDate   FROM WeHealthDB.userillnessMeasurements where userID='"+userID+"' and isdeleted=0 ";
					return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT});
				}, 
				getTasksHypertension: function(userID)
				{
					var sql="SELECT id, userID, not_controlled_treatment, well_controlled, hypertension_day_measurement, from_hypertension as startDate, to_hypertension as endDate FROM WeHealthDB.userillnessMeasurements where userID='"+userID+"' and isdeleted=0";
					return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT});
				}, 
				getTasksMedication: function(userID)
				{
					var sql="SELECT mymedicine.id, mymedicine.userID, medicine.medicineName , mymedicine.timingPerDay as todaytime, mymedicine.days, mymedicine.startDate , mymedicine.endDate FROM WeHealthDB.mymedicine inner join medicine on mymedicine.medicineID=medicine.id where mymedicine.userID='"+userID+"'";
					return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT});
				},
				previewdoctorreport: function(id)
				{
					var sql="select review_report from carePlanreview where id='"+id+"' ";
					return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT});
				},
				previewTeleConsultation: function(id)
				{
					var sql="select review_report from teleConsultationReview where id='"+id+"' ";
					return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT});
				},
				user_illness_status_check: function(id) 
				{
					var sql="SELECT * FROM WeHealthDB.userillness where userID='"+id+"' "; 
					return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT});
				},
				measurement_plan_setup_user: function(sql) 
				{
					
					return sequelize.query(sql, { type: sequelize.QueryTypes.INSERT});
				},
				pushNotification: function(sql)
				{
					return sequelize.query(sql, { type: sequelize.QueryTypes.INSERT});
				},
				updateTeleConsultationStatus: function(sql)
				{
					return sequelize.query(sql,{ type: sequelize.QueryTypes.UPDATE});
				}
			
				
				   	  
			}
	}
	);

	return userProfessionalRegistration;  
};
