angular.module('app.order-mgmt')
    .filter('customer', function () {
        'use strict';
        return function (item) {
            if (!item)
                return "Kein Kunde gewählt";
            else
                return item;
        };
    })
    .filter('table', function () {
        'use strict';
        return function (item) {
            if (!item)
                return "-";
            else
                return item;
        };
    })
    .filter('timestamp', function () {
        'use strict';
        return function (item) {
            if (!item)
                return "";
            else
                return item;
        };
    });