
angular.module('app.order-mgmt').controller('OrderOverviewCntl',
        function ($filter, $scope, $sce, $stateParams, offerList, orderFactory, globalSpinner, $state) {
            'use strict';

            var self = this;
            self.model = {};
            
            $scope.datePicker = {
                dt: new Date(),
                
                today: function () {
                    this.dt = new Date();
                },
                clear: function () {
                    $scope.dt = null;
                },
                open: function ($event) {
                    this.status.opened = true;
                },
                dateOptions: {
                    formatYear: 'yy',
                    startingDay: 1
                },
                status: {
                    opened: false
                }
            };
            
            $scope.checkState = {
                open: 'offen',
                payed: ''
            };
            
            self.getStatus = function (order) {
                if (!order.offers.length)
                    return "Offen";
                
                var curStatus, payed = 0;
                for (var i=0; i<order.offers.length; ++i){
                    curStatus = orderFactory.getOfferStatus(order.offers[i]);
                    if (curStatus == 1 || curStatus == 2)
                        return "Offen";
                    else if(curStatus == 0){
                        payed++;
                    }
                }
                if (payed == order.offers.length)
                    return "Bezahlt";
                else
                    return "Ungültig";
            };

            self.loadAllOrders = function () {
                self.orders = orderFactory.loadAllOrders($scope.datePicker.dt);
                $scope.orders = self.orders.orderObjects;
                $scope.nextId = parseInt(self.orders.maxId) + 1;
                angular.forEach($scope.orders, function(order){
                    order.status = self.getStatus(order);
                });
            };
            self.loadAllOrders();

            $scope.$watch('datePicker.dt', function (newArray) {
                self.loadAllOrders();
            }, true);

            
            $scope.newOrder = function () {
                $state.go('orderMgmt.order', {orderId: $scope.nextId});
            };
            
            $scope.getPrice = function (order){
                var price=0;
                angular.forEach(order.offers, function(offer){
                    price += offer.order.price * offer.count;
                });
                return price;
            };

            $scope.deleteAllOrders = function () {
                orderFactory.deleteAllOrders();
                self.loadAllOrders();
            };
            
            $scope.deleteOrder = function (order) {
                orderFactory.deleteOrder(order);
                self.loadAllOrders();
            };

            $scope.loadOrder = function (order) {
                $state.go('orderMgmt.order', {orderId: order.id});
            };
        });
