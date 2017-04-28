//Articles service used for articles REST endpoint
angular.module('mean.reviews').factory("Reviews", ['$resource', function($resource) {
    return $resource('reviews/:productId', {
        productId: '@id'
    }, {
    });
}]);
