/**
 * @ngdoc service
 * @name offer-mgmt.offers
 * @module app.offer-mgmt
 * @requires offer-mgmt.offerManagementRestService
 */
angular.module('app.order-mgmt').factory('orderFactory2', function (ORDER_STORAGE, categoriesJson) {
    'use strict';
    return {
        /**
         * @ngdoc method
         * @name offer-mgmt.offers#loadAllOffers
         * @methodOf offer-mgmt.offers
         *
         * @return {promise} promise
         */
        saveOrder: function (id, order) {
            var allOrders = JSON.parse(localStorage.getItem(ORDER_STORAGE));
            if (!allOrders)
                allOrders = {};
            
            allOrders[id] = order;
            localStorage.setItem(ORDER_STORAGE, JSON.stringify(allOrders));
        },
        /**
         * @ngdoc method
         * @name offer-mgmt.offers#loadAllProducts
         * @methodOf offer-mgmt.offers
         *
         * @return {promise} promise
         */
        loadOrder: function (id) {
            //alert(JSON.parse(localStorage.getItem(ORDER_STORAGE))[id]);
            
            if (localStorage.getItem(ORDER_STORAGE) !== null)
                return JSON.parse(localStorage.getItem(ORDER_STORAGE))[id];
            else
                return null;
        }
    };
});
