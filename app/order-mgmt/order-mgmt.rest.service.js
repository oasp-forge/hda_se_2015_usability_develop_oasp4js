/**
 * @ngdoc service
 * @name order-mgmt.orderManagementRestService
 * @module app.order-mgmt
 * @requires $http
 * @requires main.currentContextPath
 */
angular.module('app.order-mgmt').factory('orderManagementRestService', function ($http, currentContextPath) {
    'use strict';

    var servicePath = currentContextPath.get() + 'services/rest/ordermanagement/v1';

    return {
        /**
         * @ngdoc method
         * @name order-mgmt.orderManagementRestService#getTable
         * @methodOf order-mgmt.orderManagementRestService
         *
         * @params {number} id
         * @return {HttpPromise} http promise
         */
        getTable: function (id) {
            return $http.get(servicePath + '/order/' + id);
        },
        /**
         * @ngdoc method
         * @name order-mgmt.orderManagementRestService#getPaginatedTables
         * @methodOf order-mgmt.orderManagementRestService
         *
         * @params {number} pagenumber
         * @params {number} pagesize
         * @return {HttpPromise} http promise
         */
        getPaginatedTables: function (pagenumber, pagesize) {
            var orderSearchCriteria = {
                pagination: {
                    size: pagesize,
                    page: pagenumber,
                    total: true
                }
            };
            return $http.post(servicePath + '/order/search', orderSearchCriteria);
        },
        /**
         * @ngdoc method
         * @name order-mgmt.orderManagementRestService#createTable
         * @methodOf order-mgmt.orderManagementRestService
         *
         * @params {object} order
         * @return {HttpPromise} http promise
         */
        createTable: function (id, order) {
            return $http.put(servicePath + '/order/' + id, order);
        },
        /**
         * @ngdoc method
         * @name order-mgmt.orderManagementRestService#deleteTable
         * @methodOf order-mgmt.orderManagementRestService
         *
         * @params {number} id
         * @return {HttpPromise} http promise
         */
        deleteTable: function (id) {
            return $http.delete(servicePath + '/order/' + id);
        },
        /**
         * @ngdoc method
         * @name order-mgmt.orderManagementRestService#saveTable
         * @methodOf order-mgmt.orderManagementRestService
         *
         * @params {object} order
         * @return {HttpPromise} http promise
         */
        saveTable: function (order) {
            return $http.post(servicePath + '/order/', order);
        },
        /**
         * @ngdoc method
         * @name order-mgmt.orderManagementRestService#isTableReleasable
         * @methodOf order-mgmt.orderManagementRestService
         *
         * @params {number} id
         * @return {HttpPromise} http promise
         */
        isTableReleasable: function (id) {
            return $http.get(servicePath + '/order/' + id + '/isorderreleasable/');
        }
    };
});
