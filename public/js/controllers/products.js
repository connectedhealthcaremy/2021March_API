angular.module('mean.products').controller('ProductsController', ['$scope', '$routeParams', '$location', 'Global', 'Products', function ($scope, $routeParams, $location, Global, Products) {
    $scope.global = Global;

    $scope.find = function() {
        Products.query(function(products) {
			
            $scope.products = products;
        });
    };

    $scope.findBrand = function() {

        var queryParams = {"brandId":$routeParams.brandId};

        Products.query(queryParams,'',function(products) {
            $scope.products = products;
        });
    };

}]);
