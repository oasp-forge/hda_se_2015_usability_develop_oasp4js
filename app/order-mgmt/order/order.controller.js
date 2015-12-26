
angular.module('app.order-mgmt').controller('OrderCntl',
        function ($filter, $scope, $sce, $stateParams, orderFactory, globalSpinner, positionStateNotification, $state, $modal) {
            'use strict';
            
            var self = this;
            self.model = {};

            $scope.offers = orderFactory.offerList();
            $scope.order = orderFactory.loadOrder($stateParams.orderId);
            
            //Gesamtpreis überwachen
            $scope.$watch('order.offers', function (newArray, oldArray) {
                $scope.orderPrice = 0;
                for (var i = 0; i < newArray.length; ++i) {
                    $scope.orderPrice += newArray[i].count * newArray[i].order.price;
                }
            }, true);

            $scope.saveOrder = function () {
                orderFactory.saveOrder($stateParams.orderId, $scope.order);
                $state.go('orderMgmt.overview');
            };

            $scope.addToOrder = function (offer) {
                var found = false;
                for (var i = 0; i < $scope.order.offers.length; ++i) {
                    if (offer === $scope.order.offers[i].order) {
                        $scope.order.offers[i].count++;
                        found = true;
                        break;
                    }
                }
                if (!found)
                    $scope.order.offers.push({count: 1, order: offer});
                //alert(offer.desc + " hinzugefügt !");
            };

            $scope.deleteFromOrder = function (offer) {
                for (var i = 0; i < $scope.order.offers.length; ++i) {
                    if (offer === $scope.order.offers[i]) {
                        if ($scope.order.offers[i].payed < $scope.order.offers[i].count || !$scope.order.offers[i].payed){
                            if ($scope.order.offers[i].count > 1)
                                $scope.order.offers[i].count--;
                            else
                                $scope.order.offers.splice(i, 1);
                        }
                        break;
                    }
                }
                //alert(offer.desc + " hinzugefügt !");
            };
            
            $scope.getStatus = function(offer){
                if (offer.count == offer.payed)
                    return "Bezahlt";
                else if (offer.count > offer.payed && offer.payed != 0 && offer.payed )
                    return "Teilweise bezahlt";
                else if (offer.payed == 0 || !offer.payed )
                    return "Nicht bezahlt";
                else
                    return "Ungültig"
            };

            $scope.payOrder = function () {

                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'order-mgmt/order-payment/order-payment-modal.html',
                    controller: 'OrderPaymentModalCtrl',
                    size: 'lg',
                    resolve: {
                        order: function () {
                            return $scope.order;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
        });
