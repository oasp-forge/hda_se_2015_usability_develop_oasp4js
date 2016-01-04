
angular.module('app.order-mgmt').controller('OrderPaymentModalCtrl',
        function ($scope, $modal, $modalInstance, order, orderPaymentFactory) {
            'use strict';
            $scope.order = order;
            $scope.paymentOrder = null;
            $scope.selected = {
                item: $scope.order
            };
            $scope.categories = [1, 2, 3, 4, 5, 6, 7, 8];
            $scope.selectCategory = function (index) {
                $scope.selectedCategory = index;
            };
            $scope.selectCategory(0);
            var categoryOrderMap = [];
            for (var i = 0; i < order.length; ++i) {
                categoryOrderMap.push(0);
            }

            $scope.selectCategoryOnOrder = function (index, offerCount) {
                if (offerCount > 1) {
                    $scope.selectNumberOfElementsInNewCategory(offerCount);
                }
                categoryOrderMap[index] = $scope.selectedCategory;
            };
            $scope.raiseCurBill = function (offer) {
                if (!offer.curBill || offer.curBill == 0)
                    offer.curBill = 1;
                else
                    offer.curBill++;
            };
            
            $scope.lowerCurBill = function (offer) {
                if (!offer.curBill)
                    offer.curBill = 0;
                else
                    offer.curBill--;
            };
            
            $scope.lowerPayed = function (offer) {
                if (!offer.payed)
                    offer.payed = 0;
                else
                    offer.payed--;
            };
            
            $scope.payCurBill = function() {
                for (var i=0; i<$scope.order.offers.length; ++i){
                    if (!$scope.order.offers[i].payed)
                        $scope.order.offers[i].payed = 0;
                    $scope.order.offers[i].payed += $scope.order.offers[i].curBill;
                    $scope.order.offers[i].curBill = 0;
                }
            };
            
            $scope.calcNumBill = function(offer) {
                return offer.count - offer.curBill - offer.payed;
            };
            
            //Gesamtpreis überwachen
            $scope.$watch('order.offers', function (newArray, oldArray) {
                $scope.billPrice = 0;
                $scope.curBillPrice = 0;
                $scope.payedPrice = 0;
                for (var i = 0; i < newArray.length; ++i) {
                    $scope.billPrice += $scope.calcNumBill(newArray[i]) * newArray[i].order.price;
                    $scope.curBillPrice += newArray[i].curBill * newArray[i].order.price;
                    $scope.payedPrice += newArray[i].payed * newArray[i].order.price;
                }
            }, true);
            
            $scope.billFilter = function (offer) {
                if (!offer.curBill) offer.curBill = 0;
                if (!offer.payed) offer.payed = 0;
                return (offer.count - offer.curBill - offer.payed) > 0;
            };
            
            $scope.curBillFilter = function (offer) {
                if (!offer.curBill) offer.curBill = 0;
                if (!offer.payed) offer.payed = 0;
                return (offer.curBill) > 0;
            };
            
            $scope.payedFilter = function (offer) {
                if (!offer.curBill) offer.curBill = 0;
                if (!offer.payed) offer.payed = 0;
                return (offer.payed) > 0;
            };
            
            $scope.ok = function () {
                $modalInstance.close($scope.selected.item);
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            $scope.getCategoryClassOnOrder = function (index) {
                return 'category' + categoryOrderMap[index];
            }
            
            //Autosave on leaving State if Order changed
            $scope.$on('$stateChangeStart', function (event) {
                $modalInstance.dismiss('cancel');
            });

            $scope.showPayedOrders = function () {

                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'order-mgmt/order-payment/order-payment-payedOrders-modal.html',
                    controller: 'OrderPaymentPayedOrdersModalCtrl',
                    size: 'sm',
                    resolve: {
                        order: function () {
                            return $scope.order;
                        }
                    }
                });
                modalInstance.result.then(function (selectedItem) {
                    $scope.test = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
        });