/**
 * @ngdoc service
 * @name offer-mgmt.offers
 * @module app.offer-mgmt
 * @requires offer-mgmt.offerManagementRestService
 */
angular.module('app.order-mgmt').provider('orderFactory', function () {
    'use strict';
    var offerList = null;

    this.setOfferList = function (_offerList) {
        offerList = _offerList;
    };

    this.$get = function (ORDER_STORAGE, $filter) {
        var self = this;
        
        self.convertOrderIdsToObjects = function (order) {
            var fullOrder = {
                customer: null,
                timestamp: null,
                table: null,
                offers: []
            };

            if (order){
                if (order.customer)
                    fullOrder.customer = order.customer;
                if (order.timestamp)
                    fullOrder.timestamp = order.timestamp;
                if (order.table)
                    fullOrder.table = order.table;

                if (order.offers) {
                    //Bestellungen mappen
                    for (var i = 0; i < order.offers.length; ++i) {
                        for (var k = 0; k < offerList.length; ++k) {
                            if (order.offers[i][0] == offerList[k].id) {
                                fullOrder.offers.push({'order': offerList[k], 'count': order.offers[i][1], 'payed': order.offers[i][2]});
                                break;
                            }
                        }
                    }
                }
            }

            return fullOrder;
        };

        self.convertOrderObjectsToIds = function (order) {
            var idOrder = {
                customer: "Schmidt",
                timestamp: Date.now(),
                table: 1,
                offers: []
            };
            
            if (order){
                if (order.offers) {
                    for (var i = 0; i < order.offers.length; ++i) {
                        idOrder.offers.push([order.offers[i].order.id, order.offers[i].count, order.offers[i].payed]);
                    }
                }
            }

            return idOrder;
        };


        return {
            offerList: function(){
                return offerList;
            },
            
            saveOrder: function (id, order) {
                var allOrders = JSON.parse(localStorage.getItem(ORDER_STORAGE));
                if (!allOrders)
                    allOrders = {};

                allOrders[id] = self.convertOrderObjectsToIds(order);
                localStorage.setItem(ORDER_STORAGE, JSON.stringify(allOrders));
            },
            
            loadOrder: function (id) {
                //alert(JSON.parse(localStorage.getItem(ORDER_STORAGE))[id]);

                if (localStorage.getItem(ORDER_STORAGE) !== null)
                    return self.convertOrderIdsToObjects(JSON.parse(localStorage.getItem(ORDER_STORAGE))[id]);
                else
                    return self.convertOrderIdsToObjects(null);
            },
            loadAllOrders: function () {

                var orders = {maxId: -1, orderObjects: null};
                orders.orderObjects = JSON.parse(localStorage.getItem(ORDER_STORAGE));
                if (orders.orderObjects) {
                    var keys = Object.keys(orders.orderObjects);
                    for (var i = 0; i < keys.length; ++i) {
                        if (orders.maxId < keys[i]) {
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
    };
});
