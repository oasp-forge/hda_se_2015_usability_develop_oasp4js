/**
 * @ngdoc service
 * @name offer-mgmt.offers
 * @module app.offer-mgmt
 * @requires offer-mgmt.offerManagementRestService
 */
angular.module('app.order-mgmt').factory('orderOverviewFactory', function () {
    var self = this;
    self.fromDate;
    self.toDate;
    
    'use strict';
    return {
        setFromDate: function(date){
            self.fromDate = date;
        },
        getFromDate: function(){
            return self.fromDate;
        },
        setToDate: function(date){
            self.toDate = date;
        },
        getToDate: function(){
            return self.toDate;
        }
    };
});
