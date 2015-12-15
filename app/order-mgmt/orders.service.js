/**
 * @ngdoc service
 * @name order-mgmt.orders
 * @module app.order-mgmt
 * @requires order-mgmt.orderManagementRestService
 */
angular.module('app.order-mgmt').factory('orders', function (orderManagementRestService) {
    'use strict';
    var paginatedTables = {};
    return {
        /**
         * @ngdoc method
         * @name order-mgmt.orders#getTable
         * @methodOf order-mgmt.orders
         *
         * @params {number} pagenumber
         * @params {number} pagesize
         * @return {promise} promise
         */
        getPaginatedTables: function (pagenumber, pagesize) {
            return orderManagementRestService.getPaginatedTables(pagenumber, pagesize).then(function (response) {
                angular.copy(response.data, paginatedTables);
                return paginatedTables;
            });
        },
        /**
         * @ngdoc method
         * @name order-mgmt.orders#getTable
         * @methodOf order-mgmt.orders
         *
         * @params {number} orderId
         * @return {promise} promise
         */
        loadTable: function (orderId) {
            return orderManagementRestService.getTable(orderId).then(function (response) {
                return response.data;
            });
        },
        /**
         * @ngdoc method
         * @name order-mgmt.orders#getTable
         * @methodOf order-mgmt.orders
         *
         * @params {object} order
         * @return {promise} promise
         */
        reserve: function (order) {
            order.state = 'RESERVED';
            return orderManagementRestService.saveTable(order).then(function () {
            });
        },
        /**
         * @ngdoc method
         * @name order-mgmt.orders#getTable
         * @methodOf order-mgmt.orders
         *
         * @params {object} order
         * @return {promise} promise
         */
        free: function (order) {
            order.state = 'FREE';
            return orderManagementRestService.saveTable(order).then(function () {
            });
        },
        /**
         * @ngdoc method
         * @name order-mgmt.orders#getTable
         * @methodOf order-mgmt.orders
         *
         * @params {object} order
         * @return {promise} promise
         */
        occupy: function (order) {
            order.state = 'OCCUPIED';
            return orderManagementRestService.saveTable(order).then(function () {
            });
        },
        /**
         * @ngdoc method
         * @name order-mgmt.orders#getTable
         * @methodOf order-mgmt.orders
         *
         * @params {object} order
         * @return {promise} promise
         */
        cancelReservation: function (order) {
            order.state = 'FREE';
            return orderManagementRestService.saveTable(order).then(function () {
            });
        }
    };
});
