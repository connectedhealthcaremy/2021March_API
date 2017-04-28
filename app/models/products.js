'use strict';

module.exports = function(sequelize, DataTypes) {

	var Product = sequelize.define('Product',
	{
		/*brand_id_fk: DataTypes.INTEGER,
		name: DataTypes.STRING,
		desc: DataTypes.STRING,*/
	},
	{
			classMethods: {
				getLatestProducts: function () {
			return sequelize.query('SELECT * FROM Products',{ type: sequelize.QueryTypes.SELECT});
				},
				getProductsByBrand: function (brandId) {
					return sequelize.query('CALL GetLastestProducts('+brandId+');');
				} 
			}
	}
	);

	return Product;
};
