
angular.module('app.order-mgmt').controller('OrderOverviewCntl',
        function ($filter, $scope, $sce, $stateParams, offerList, orderFactory, globalSpinner, $state) {
            'use strict';

            var self = this;
            self.model = {};

            self.loadAllOrders = function () {
                self.orders = orderFactory.loadAllOrders();
                $scope.orders = self.orders.orderObjects;
                $scope.nextId = parseInt(self.orders.maxId) + 1;
            };
            self.loadAllOrders();


            $scope.newOrder = function () {
                $state.go('orderMgmt.order', {orderId: $scope.nextId});
            };

            $scope.deleteAllOrders = function () {
                orderFactory.deleteAllOrders();
                self.loadAllOrders();
            };

            $scope.loadOrder = function (order) {
                $state.go('orderMgmt.order', {orderId: order.id});
            };

            $scope.deleteFromOrder = function (offer) {
                for (var i = 0; i < $scope.selOffers.length; ++i) {
                    if (offer === $scope.selOffers[i]) {
                        if ($scope.selOffers[i].count > 1)
                            $scope.selOffers[i].count--;
                        else
                            $scope.selOffers.splice(i, 1);
                        break;
                    }
                }
                //alert(offer.desc + " hinzugefügt !");
            };
            
            //            $scope.datePickerFrom = {
//                dt: new Date(),
//                today: function () {
//                    this.dt = new Date();
//                },
//                clear: function () {
//                    $scope.dt = null;
//                },
//                open: function ($event) {
//                    this.status.opened = true;
//                },
//                dateOptions: {
//                    formatYear: 'yy',
//                    startingDay: 0
//                },
//                status: {
//                    opened: false
//                }
//            };
        });
