
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

            self.loadAllOrders = function () {
                self.orders = orderFactory.loadAllOrders($scope.datePicker.dt);
                $scope.orders = self.orders.orderObjects;
                $scope.nextId = parseInt(self.orders.maxId) + 1;
            };
            self.loadAllOrders();

            $scope.$watch('datePicker.dt', function (newArray) {
                self.loadAllOrders();
            }, true);

            $scope.getStatus = function (order) {
                
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
        });
