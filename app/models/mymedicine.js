'use strict';

module.exports = function(sequelize, DataTypes) {

	var mymedicine = sequelize.define('mymedicine', {}, {
		classMethods: {
			addmymedicine: function(sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.INSERT
				});

			},
			lastaddIDs: function(lastinsertid) {

				var sql = "select id from mymedicine where id >='" + lastinsertid + "'";
				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getmymedicinelist: function(userid) {
				var sql = "SELECT  medicine.medicineName ,  mymedicine.* from mymedicine  INNER JOIN medicine ON mymedicine.medicineID=medicine.id WHERE mymedicine.userID='" + userid + "'";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			updatemymedicine: function(sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.UPDATE
				});
			},
			deletemymedicine: function(sql) {

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.DELETE
				});
			},
			checkreminder: function(c_date) {
				var sql = "SELECT medicine.medicineName, mymedicine.shape , mymedicine.medicineID , mymedicine.userID, mymedicine.deviceID, mymedicine.colour, mymedicine.variableDose, mymedicine.strengthSupplied, mymedicine.strengthTaken, mymedicine.medicineTake, mymedicine.unit, mymedicine.timingPerDay, mymedicine.reminderType, mymedicine.beforeActualTimeRemind, mymedicine.startDate, mymedicine.endDate, mymedicine.days, mymedicine.instruction from mymedicine  INNER JOIN medicine ON mymedicine.medicineID=medicine.id WHERE endDate >= '" + c_date + "'";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			},
			getmedicindeStatus: function(userid) {
				var sql = "SELECT  id, myMedicineID, userID, status, dateTime, timeTake as timeTaken, reason FROM mymedicinestatus WHERE userID = '" + userid + "'";

				return sequelize.query(sql, {
					type: sequelize.QueryTypes.SELECT
				});

			}

		}
	});

	return mymedicine;
};