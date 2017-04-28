angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
  //  $scope.global = Global;

    $scope.menu = [{
        "title": "Create New Reviews",
        "link": "reviews/create"
    }];

    $scope.menu = [{
        "title": "Products",
        "link": "products"
    }];

    $scope.isCollapsed = false;
}]);
