/**
 * @ngdoc service
 * @name offer-mgmt.offers
 * @module app.offer-mgmt
 * @requires offer-mgmt.offerManagementRestService
 */
angular.module('app.order-mgmt').factory('orderOverview2', function (ORDER_STORAGE) {
    'use strict';
    return {
        /**
         * @ngdoc method
         * @name offer-mgmt.offers#loadAllProducts
         * @methodOf offer-mgmt.offers
         *
         * @return {promise} promise
         */
        loadAllOrders: function () {
            var orders = {maxId:-1, orderObjects:null};
            orders.orderObjects = JSON.parse(localStorage.getItem(ORDER_STORAGE));
            if(orders.orderObjects){
                var keys = Object.keys(orders.orderObjects);
                for (var i=0; i<keys.length; ++i){
                    if (orders.maxId < keys[i]){
                        orders.maxId = keys[i];
                    }
                }
            }
            
            return orders;
        },
        
        deleteAllOrders: function () {
            localStorage.removeItem(ORDER_STORAGE);
        }
    };
});
