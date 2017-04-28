angular.module('mean.products').factory("Products", ['$resource', function($resource) {
    return $resource('products/:brandId', {brandId: '@id'}, {
    } );
}]);
