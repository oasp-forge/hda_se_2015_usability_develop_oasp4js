/**
 * @ngdoc object
 * @name app.order-mgmt
 * @module app
 * @requires app.offer-mgmt
 * @requires app.sales-mgmt
 * @requires app.main
 * @requires order-mgmt.templates
 */
angular.module('app.order-mgmt', ['app.offer-mgmt', 'app.sales-mgmt', 'app.main', 'app.order-mgmt.templates'])
    .constant("ORDER_STORAGE", "orders")
    .constant("CUSTOMER_STORAGE", "customers")
    .config(function (ROLES, $stateProvider, orderFactoryProvider, oaspTranslationProvider, oaspAuthorizationServiceProvider) {
        'use strict';
        oaspTranslationProvider.enableTranslationForModule('order-mgmt');

        $stateProvider.state('orderMgmt', {
            abstract: true,
            url: '/order-mgmt',
            template: '<ui-view/>',
            resolve: {
                offerList: ['offersJson', function (offersJson) {
                    return offersJson.loadAllOffers().$promise.then(function (result) {
                        orderFactoryProvider.setOfferList(result);
                        return result;
                    });
                }]
            }
        });

        $stateProvider.state('orderMgmt.overview', oaspAuthorizationServiceProvider.usersHavingAnyRoleOf(ROLES.WAITER).mayGoToStateDefinedAs({
            url: '/order-overview',
            templateUrl: 'order-mgmt/order-overview/order-overview.html',
            controller: 'OrderOverviewCntl',
            controllerAs: 'OOC'
        }));

        $stateProvider.state('orderMgmt.order', {
            url: '/order/:orderId',
            templateUrl: 'order-mgmt/order/order.html',
            controller: 'OrderCntl',
            controllerAs: 'OC',
            //resolve: {
            //    customerList: ['customersJson', function (customerJson) {
            //        return customerJson.loadAllCustomers().$promise.then(function (result) {
            //            orderFactoryProvider.setCustomerList(result);
            //            return result;
            //        })
            //    }]
            //}
        });
    });
