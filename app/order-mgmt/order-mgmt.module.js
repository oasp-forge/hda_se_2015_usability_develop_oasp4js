/**
 * @ngdoc object
 * @name app.order-mgmt
 * @module app
 * @requires app.offer-mgmt
 * @requires app.sales-mgmt
 * @requires app.main
 * @requires order-mgmt.templates
 */
angular.module('app.order-mgmt', ['app.offer-mgmt', 'app.sales-mgmt', 'app.main', 'app.order-mgmt.templates'], function (ROLES, $stateProvider, oaspTranslationProvider, oaspAuthorizationServiceProvider) {
    'use strict';
    oaspTranslationProvider.enableTranslationForModule('order-mgmt');

    $stateProvider.state('orderMgmt', {
        abstract: true,
        url: '/order-mgmt',
        template: '<ui-view/>'
    });
    
    $stateProvider.state('orderMgmt.overview', oaspAuthorizationServiceProvider.usersHavingAnyRoleOf(ROLES.WAITER).mayGoToStateDefinedAs({
        url: '/order-overview',
        templateUrl: 'order-mgmt/order-overview/order-overview.html',
        controller: 'OrderOverviewCntl',
        controllerAs: 'OOC'
    }));

//    $stateProvider.state('orderMgmt.search', oaspAuthorizationServiceProvider.usersHavingAnyRoleOf(ROLES.WAITER).mayGoToStateDefinedAs({
//        url: '/order-search',
//        templateUrl: 'order-mgmt/order-search/order-search.html',
//        controller: 'TableSearchCntl',
//        controllerAs: 'TSC',
//        resolve: {
//            paginatedTableList: ['orders', function (orders) {
//                return orders.getPaginatedTables(1, 4).then(function (paginatedTables) {
//                    return paginatedTables;
//                });
//            }]
//        }
//    }));
//
//    $stateProvider.state('orderMgmt.details', {
//        url: '/order-details/:orderId',
//        templateUrl: 'order-mgmt/order-details/order-details.html',
//        controller: 'TableDetailsCntl',
//        controllerAs: 'TDC'
//    });
});
