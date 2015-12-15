angular.module('app.order-mgmt')
    .filter('priceEuro', function () {
        'use strict';
        return function (item) {
            return item.toFixed(2) + ' EUR';
        };
    });