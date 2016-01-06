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

    this.$get = function (ORDER_STORAGE, CUSTOMER_STORAGE, $filter) {
        var self = this;
        
        
        self.loadCustomer = function (id) {
            //alert(JSON.parse(localStorage.getItem(ORDER_STORAGE))[id]);

            var storedCustomers = JSON.parse(localStorage.getItem(CUSTOMER_STORAGE));

            if (storedCustomers !== null) {
                return {"id":id, "name":storedCustomers[id]?storedCustomers[id]:null};
            } else
                return null;
        },

        /**
         * Gets an compressed order-Object and an id.
         * The order-Object contains only ids, e.g. to offers, customers, etc.
         * This function replaces the ids with the related objects.
         *
         * @param {type} order
         * @param {type} id
         * @returns {orders.service_L7.$get.self.convertOrderIdsToObjects.fullOrder}
         */
        self.convertOrderIdsToObjects = function (order, id) {
            var fullOrder = {
                id: id,
                customer: null,
                timestamp: null,
                table: null,
                offers: []
            };

            if (order) {
                if (order.customer)
                    fullOrder.customer = self.loadCustomer(order.customer);
                if (order.timestamp)
                    fullOrder.timestamp = order.timestamp;
                if (order.table)
                    fullOrder.table = order.table;

                if (order.offers) {
                    //Bestellungen mappen
                    for (var i = 0; i < order.offers.length; ++i) {
                        for (var k = 0; k < offerList.length; ++k) {
                            if (order.offers[i][0] == offerList[k].id) {
                                fullOrder.offers.push({
                                    'order': offerList[k],
                                    'count': order.offers[i][1],
                                    'payed': order.offers[i][2]
                                });
                                break;
                            }
                        }
                    }
                }
            }

            return fullOrder;
        };

        /**
         * Gets an expanded order and compresses it, so it is ready to store in localStorage.
         * That means it returns an order, that contains just ids and primitive datatypes.
         *
         * @param {type} order
         */
        self.convertOrderObjectsToIds = function (order) {
            var idOrder = {
                customer:null,
                timestamp: Date.now(),
                table: null,
                offers: []
            };

            if (order) {
                if (order.customer) {
                    idOrder.customer = order.customer.id;
                }
                
                idOrder.table = order.table;
                if (order.offers) {
                    for (var i = 0; i < order.offers.length; ++i) {
                        idOrder.offers.push([order.offers[i].order.id, order.offers[i].count, order.offers[i].payed]);
                    }
                }
            }

            return idOrder;
        };

        return {
            /**
             * Returns the offerList, which should be initialized by the main module
             */
            offerList: function () {
                return offerList;
            },

            getOfferStatus: function (offer) {
                if (offer.count == offer.payed)
                    return 0; //Payed
                else if (offer.count > offer.payed && offer.payed != 0 && offer.payed)
                    return 1; //Partly payed
                else if (offer.payed == 0 || !offer.payed)
                    return 2; //Not payed
                else
                    return -1;
            },
            /**
             * Gets a full order and stores it, as object, into local storage.
             * Not as an array, because otherwise it has to be checked, whether
             * an id exists or not for each element manually.
             *
             * @param {type} order
             */
            saveOrder: function (order) {
                var allOrders = JSON.parse(localStorage.getItem(ORDER_STORAGE));
                if (!allOrders)
                    allOrders = {};

                allOrders[order.id] = self.convertOrderObjectsToIds(order);
                localStorage.setItem(ORDER_STORAGE, JSON.stringify(allOrders));
            },

            deleteOrder: function (order) {
                var allOrders = JSON.parse(localStorage.getItem(ORDER_STORAGE));
                if (!allOrders)
                    allOrders = {};

                delete allOrders[order.id];
                localStorage.setItem(ORDER_STORAGE, JSON.stringify(allOrders));
            },
            /**
             *
             * @param {type} id
             * @returns {orders.service_L7.$get.self.convertOrderIdsToObjects.fullOrder}Loads an expanded order. If the order with the given id
             * does not exist, it returns an order object with the id, anyway,
             * so the saveOrder-Method can be called with that object and
             * automatically has an id
             *
             * @param {type} id
             */
            loadOrder: function (id) {
                //alert(JSON.parse(localStorage.getItem(ORDER_STORAGE))[id]);

                var storedOrders = JSON.parse(localStorage.getItem(ORDER_STORAGE));

                if (storedOrders !== null) {
                    return self.convertOrderIdsToObjects(storedOrders[id], id);
                } else
                    return self.convertOrderIdsToObjects(null, id);
            },
            
            /**
             * Returns all orders (expanded), stored in localStorage.
             */
            loadAllOrders: function (date, customerId) {
                var orders = {maxId: -1, orderObjects: null};
                orders.orderObjects = JSON.parse(localStorage.getItem(ORDER_STORAGE));
                if (orders.orderObjects) {
                    var keys = Object.keys(orders.orderObjects);
                    var orderObjArray = [];
                    var tempDate;
                    var sameDate;
                    var sameCustomer;
                    for (var i = 0; i < keys.length; ++i) {
                        //orders.orderObjects[parseInt(keys[i])] = self.convertOrderIdsToObjects(orders.orderObjects[keys[i]], keys[i]);
                        if (date) {
                            tempDate = new Date(orders.orderObjects[keys[i]].timestamp);
                            if (date.getDate() == tempDate.getDate()
                                && date.getMonth() == tempDate.getMonth()
                                && date.getYear() == tempDate.getYear()) {
                                sameDate = true;
                            }
                            else
                                sameDate = false;
                        }
                        else
                            sameDate = true;
                        
                        if (customerId){
                            if (orders.orderObjects[keys[i]].customer){
                                if (parseInt(customerId) === parseInt(orders.orderObjects[keys[i]].customer))
                                    sameCustomer = true;
                                else
                                    sameCustomer = false;
                            }
                            else
                                sameCustomer = false;
                        }
                        else
                            sameCustomer = true;
                        
                        if (sameDate && sameCustomer) {
                            orderObjArray.push(self.convertOrderIdsToObjects(orders.orderObjects[keys[i]], keys[i]));
                        }

                        if (parseInt(orders.maxId) < parseInt(keys[i])) {
                            orders.maxId = keys[i];
                        }
                    }
                    orders.orderObjects = orderObjArray;
                }

                return orders;
            },
            
            deleteAllOrders: function () {
                localStorage.removeItem(ORDER_STORAGE);
            },

            saveCustomer: function (customer) {
                var allCustomers = JSON.parse(localStorage.getItem(CUSTOMER_STORAGE));
                if (!allCustomers)
                    allCustomers = {};

                allCustomers[customer.id] = customer.name;
                localStorage.setItem(CUSTOMER_STORAGE, JSON.stringify(allCustomers));
            },
            
            deleteCustomer: function (customer) {
                var allCustomers = JSON.parse(localStorage.getItem(CUSTOMER_STORAGE));
                if (!allCustomers)
                    allCustomers = {};

                delete allCustomers[customer.id];
                localStorage.setItem(CUSTOMER_STORAGE, JSON.stringify(allCustomers));
                
                //Delete deleted customer from all Orders
                var allOrders = JSON.parse(localStorage.getItem(ORDER_STORAGE));
                if (!allOrders)
                    allOrders = {};
                var keys = Object.keys(allOrders);
                for (var i = 0; i < keys.length; ++i) {
                    if (angular.equals(allOrders[keys[i]].customer, customer.id)) {
                        allOrders[keys[i]].customer = null;
                    }
                }

                localStorage.setItem(ORDER_STORAGE, JSON.stringify(allOrders));
            },
            
            
            /**
             * Returns all customers from localStorage
             */
            loadAllCustomers: function () {
                var customers = {maxId: 0, customerObjects: null};
                customers.customerObjects = JSON.parse(localStorage.getItem(CUSTOMER_STORAGE));
                if (customers.customerObjects) {
                    var keys = Object.keys(customers.customerObjects);
                    var customerObjArray = [];
                    for (var i = 0; i < keys.length; ++i) {
                        customerObjArray.push({"id":keys[i], "name":customers.customerObjects[keys[i]]});
                        if (parseInt(customers.maxId) < parseInt(keys[i])) {
                            customers.maxId = keys[i];
                        }
                    }
                }
                customers.customerObjects = customerObjArray;

                return customers;
            },
            
            deleteAllCustomers: function () {
                localStorage.removeItem(CUSTOMER_STORAGE);
            }
        };
    };
});
