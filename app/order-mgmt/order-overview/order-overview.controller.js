
angular.module('app.order-mgmt').controller('OrderOverviewCntl',
        function ($scope, $sce, $stateParams, offerList, orderOverview, globalSpinner, positionStateNotification, $state) {
            'use strict';

            var self = this;
            self.model = {};
            
            self.loadAllOrders = function() {
                self.orders = orderOverview.loadAllOrders();
                $scope.orders = self.orders.orderObjects;
                $scope.nextId = parseInt(self.orders.maxId) + 1;
            }
            self.loadAllOrders();
            
            $scope.newOrder = function() {
                $state.go('orderMgmt.order', {orderId: $scope.nextId});
            };
            
            $scope.deleteAllOrders = function() {
                orderOverview.deleteAllOrders();
                self.loadAllOrders();
            }
            
            $scope.loadOrder = function (id, order) {
                $state.go('orderMgmt.order', {orderId: id});
            };
            
            $scope.deleteFromOrder = function (offer) {
                for (var i=0; i<$scope.selOffers.length; ++i){
                    if (offer === $scope.selOffers[i]){
                        if ($scope.selOffers[i].count > 1)
                            $scope.selOffers[i].count--;
                        else
                            $scope.selOffers.splice(i,1);
                        break;
                    }
                }
                //alert(offer.desc + " hinzugefügt !");
            };
        });
