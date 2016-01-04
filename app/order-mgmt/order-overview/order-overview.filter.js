angular.module('app.order-mgmt')
    .filter('checkStateFilter', function () {
        'use strict';
        return function (items, input) {
            var out = [];
            angular.forEach(items, function(item){
                if(item.status.toLowerCase() === input.open.toLowerCase() || item.status.toLowerCase() === input.payed.toLowerCase()){
                    out.push(item);
                }
            });
            return out;
        };
    });
