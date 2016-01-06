angular.module('app.order-mgmt').factory('categoriesJsonRestService', function ($resource) {
    'use strict';

    return $resource('order-mgmt/order/categories.json', {}, {
        query: {method: 'GET', params: {}, isArray: true}
    });
});
