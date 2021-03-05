'use strict';

module.exports = function(sequelize, DataTypes) {

	var allergy = sequelize.define('allergy', {}, {
		classMethods: {
			get_corporate_users: function(pid) {
				var sql = `SELECT userProfessionalRegistration.userID,user.email
				FROM WeHealthDB.userProfessionalRegistration
				inner join user
				on userProfessionalRegistration.userID=user.userID
				where userProfessionalRegistration.professionalID=` + pid + `;`;
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			get_corporate_users_details: function(userID, email_ids) {

				var sql = `SELECT (YEAR(CURDATE())-YEAR(user.birthday)) as age,user.firstName, user.lastName, user.profilepic as photo, user.userID, user.gender, user.height, 
				corporateCompanyEmployee.employeeID, corporateCompanyEmployee.branch, corporateCompanyEmployee.department,
				(SELECT  weightQty as weight from weight where userID=` + userID + ` order by scaleDate desc limit 1) as weight ,
				((SELECT  weightQty as weight from weight where userID=` + userID + ` order by scaleDate desc limit 1)
				/(select ((user.height/100)*2) as height from user where user.userID=` + userID + `) ) as bmi,
				(SELECT fatQty FROM WeHealthDB.fat where userID=` + userID + ` order by scaleDate desc limit 1) as fatQty,
				(SELECT systolic FROM WeHealthDB.bp where userID='` + email_ids + `' order by recordTime desc limit 1) as systolic,
				(SELECT diastolic FROM WeHealthDB.bp where userID='` + email_ids + `' order by recordTime desc limit 1) as diastolic,
				(SELECT sum(stepQty) as stepQty FROM WeHealthDB.step where userID=` + userID + ` group by date(startTime) order by startTime desc limit 1) as steps,
				(SELECT sum(calories) as calories FROM WeHealthDB.step where userID=` + userID + ` group by date(startTime) order by startTime desc limit 1) as calories,
				(SELECT sum(distance) as distance FROM WeHealthDB.step where userID=` + userID + ` group by date(startTime) order by startTime desc limit 1) as distance,
				(SELECT sum(foodCalorie) as calories FROM WeHealthDB.foodhistory where userID=` + userID + ` order by insertionDate desc limit 1) as energy
				from user left join corporateCompanyEmployee
				on user.userID=corporateCompanyEmployee.userID
				where user.userID=` + userID + ``;

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			get_corporate_users_health_summary: function(userID, email_ids) {

				var sql = `SELECT (YEAR(CURDATE())-YEAR(user.birthday)) as age,user.firstName, user.profilepic as photo, user.gender, user.lastName,
						user.birthday, user.height, 
						corporateCompanyEmployee.employeeID, corporateCompanyEmployee.branch, corporateCompanyEmployee.department,
						(SELECT  weightQty as weight from weight where userID=` + userID + ` order by scaleDate desc limit 1) as weight ,
						((SELECT  weightQty as weight from weight where userID=` + userID + ` order by scaleDate desc limit 1)
						/(select ((user.height/100)*2) as height from user where user.userID=` + userID + `) ) as bmi,
						(SELECT waistcircumference FROM WeHealthDB.waistcircumference where userID=` + userID + ` order by recordDateTime desc limit 1) as waist_circumference,
						(SELECT visceralFatQty FROM WeHealthDB.visceralfat where userID=` + userID + ` order by scaleDate desc limit 1) as visceral_fat,
						(SELECT fatQty FROM WeHealthDB.fat where userID=` + userID + ` order by scaleDate desc limit 1) as fatQty,
						(SELECT systolic FROM WeHealthDB.bp where userID=(select email from user where userID=` + userID + `) order by recordTime desc limit 1) as systolic,
						(SELECT diastolic FROM WeHealthDB.bp where userID=(select email from user where userID=` + userID + `) order by recordTime desc limit 1) as diastolic,
						(SELECT glucoselevel FROM WeHealthDB.glucose where user=(select email from user where userID=` + userID + `) order by recordDateTime limit 1) as glucose ,
						(SELECT sum(stepQty) as stepQty FROM WeHealthDB.step where userID=` + userID + ` group by date(startTime) order by startTime desc limit 1) as steps,
						(SELECT sum(calories) as calories FROM WeHealthDB.step where userID=` + userID + ` group by date(startTime) order by startTime desc limit 1) as calories,
						(SELECT sum(distance) as distance FROM WeHealthDB.step where userID=` + userID + ` group by date(startTime) order by startTime desc limit 1) as distance,
						(SELECT sum(foodCalorie) as calories FROM WeHealthDB.foodhistory where userID=` + userID + ` order by insertionDate desc limit 1) as energy,
						(SELECT heartRateQty FROM WeHealthDB.heartrate where userID=` + userID + ` and isdeleted=0 order by recordTime desc limit 1) as heart_rate,
						(SELECT waterDensityQty FROM WeHealthDB.waterdensity where userID=` + userID + ` order by scaleDate limit 1) as body_water,
						(SELECT boneDensityQty FROM WeHealthDB.bonedensity where userID=` + userID + ` order by scaleDate desc limit 1) as bone_density,
						(SELECT muscleQty FROM WeHealthDB.muscle where userID=` + userID + ` order by scaleDate limit 1) as muscle_mass,
						(SELECT bmrQty FROM WeHealthDB.bmr where userID=` + userID + ` order by scaleDate desc limit 1) as bmr
						from user left join corporateCompanyEmployee
						on user.userID=corporateCompanyEmployee.userID
						where user.userID=` + userID + ``; 
						//console.log(sql); return false; 

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			get_corporate_users_sleep: function(userID) {
				var sql = `SELECT time_format(timediff(sleep.endTime,sleep.startTime),'%H.%i') as hours_min, date(startTime) as c_date 
				FROM WeHealthDB.sleep where userID=` + userID + ` and isdeleted=0  order by startTime desc; `;
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			get_corporate_users_food: function(userID, dateFrom, dateTo) {
				var sql = `SELECT foodDateTime, sum(foodCalorie) as energy, sum(foodCarbo) as carbohydrates, sum(foodFat) as food_fat, sum(foodsodium) as sodium, sum(foodfiber) as fiber,
							sum(foodcalcium) as calcium, sum(foodvitamainc) as vitamin_c, sum(foodiron) as iron, sum(foodProtein) as protein,
							(SELECT goalCalorieIntake as calorie_goal FROM WeHealthDB.calorieGoal where userid=`+userID+` order by insertDateTime desc limit 1) as calorie_goal 
							 FROM WeHealthDB.foodhistory 
							 where userID=`+userID+`  group by date(foodDateTime) limit 1`;
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			get_rewards_details: function(userID) {
				var sql = `select rewardProgrameRegistration.id, rewardPrograme.name as reward_name, rewardPrograme.start_date , rewardPrograme.end_date , rewardProgrameRegistration.read as read_status
							from rewardPrograme inner join rewardProgrameRegistration
							on rewardPrograme.id=rewardProgrameRegistration.rewardID
							where rewardProgrameRegistration.companyId=`+userID+`
							order by rewardProgrameRegistration.insertion_date_time desc`;
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			get_rewards_activity: function() {
				var sql = `SELECT * FROM WeHealthDB.rewardProgrameDetails`;
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			reward_challangeActivityDetails: function() {
				var sql = `SELECT * FROM WeHealthDB.reward_challangeActivityDetails`;
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			challengeScore: function(user_id, challenge_id) {
				var sql = `SELECT * FROM WeHealthDB.challengeScore where userID=`+user_id+` and challengeID=`+challenge_id+``;
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			challengeScoreFinal: function(user_id, challenge_id) { 
				var sql = `SELECT challengeScoreFinal.challengeID,challengeScoreFinal.userID,challengeScoreFinal.status,challengeScoreFinal.points,
							challengeScoreFinal.totalPonts as totalPoints , challenges.challengeName, challenges.startDate,
							challenges.endDate, challenges.challange_type , challenges.consective_number_days ,
							challenges.consective_number_weeks
							FROM WeHealthDB.challengeScoreFinal
							inner join challenges on challengeScoreFinal.challengeID=challenges.challengeID 
							where challengeScoreFinal.userID=`+user_id+` and challengeScoreFinal.challengeID=`+challenge_id+``;
		return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			countTargetChallengeSteps: function(start_date, end_date, user_id) {
				var sql = `SELECT sum(stepQty) as steps FROM WeHealthDB.step where userID=`+user_id+` and 
				stepQty > 0 and isdeleted=0 and 
               date(startTime) between date('`+start_date+`') and date('`+end_date+`')`;
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			}



		}
	});

	return allergy;
};