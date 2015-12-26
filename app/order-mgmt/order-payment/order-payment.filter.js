angular.module('app.order-mgmt')
    .filter('bill', function () {
        'use strict';
        return function (offer) {
            alert(offer.count - offer.curBill - offer.payed)
            if (offer.count - offer.curBill - offer.payed > 0)
                return null;
            else
                return null;
        };
    })
    .filter('curBill', function () {
        'use strict';
        return function (item) {
            if (!item)
                return "-";
            else
                return item;
        };
    })
    .filter('payed', function () {
        'use strict';
        return function (item) {
            if (!item)
                return "";
            else
                return item;
        };
    });