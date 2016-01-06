/**
 * @ngdoc service
 * @name offer-mgmt.offers
 * @module app.offer-mgmt
 * @requires offer-mgmt.offerManagementRestService
 */

angular.module('app.order-mgmt').factory('oldOrderMerger', function () {
    'use strict';
    var order;
    return {
        registerOrder: function (_order) {
            order = _order;
        },
        addOffersFromOrder: function (_order) {
            var _offer, offer;
            var _offersLength = _order.offers.length, offersLength = order().offers.length;
            var raised;
            
            for (var i = 0; i < _offersLength; ++i) {
                _offer = _order.offers[i];
                for (var k = 0; k < offersLength; ++k) {
                    offer = order().offers[k];
                    
                    if (angular.equals(offer.order.id, _offer.order.id)) {
                        offer.count += _offer.count;
                        raised = true;
                        break;
                    }
                }
                if (raised) {
                    raised = false;
                } else {
                    _offer.payed = null;
                    order().offers = order().offers.concat(_offer);
                }
            }
        }
    };
});
