angular.module('app.offer-mgmt').factory('offersJson', function (offerManagementJsonRestService) {
    'use strict';
    
    return {
        loadAllOffers: function () {
            return offerManagementJsonRestService.query();
        }
    };
});
