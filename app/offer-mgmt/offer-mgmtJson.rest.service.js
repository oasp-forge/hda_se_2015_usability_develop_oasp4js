angular.module('app.offer-mgmt').factory('offerManagementJsonRestService', function ($resource) {
    'use strict';
    
    return $resource('/offer-mgmt/offers.json', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
});
