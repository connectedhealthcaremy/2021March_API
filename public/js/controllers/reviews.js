angular.module('mean.reviews').controller('ReviewsController', ['$scope', '$routeParams', '$location', 'Global', 'Reviews', function ($scope, $routeParams, $location, Global, Reviews) {
    $scope.global = Global;

    $scope.findOne = function() {
        Reviews.get({
            productId: $routeParams.productId
        }, function(review) {
            $scope.review = review;
        });
    };

    $scope.create = function() {

      var queryParams = {"user_id_fk":1,"product_id_fk":1,"comment":this.comment,"rating":this.rating};

      Reviews.query(queryParams,'',function(review) {

      });

      this.comment = "";
      this.rating = "";
    };

}]);
