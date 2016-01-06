angular.module('app.order-mgmt').controller('OrderCntl',
    function ($filter, $scope, $sce, $stateParams, orderFactory, categoriesJsonRestService, globalSpinner, positionStateNotification, $state, $modal) {
        'use strict';

        var self = this;
        self.model = {};

        $scope.offers = orderFactory.offerList();
        $scope.order = orderFactory.loadOrder($stateParams.orderId);
        self.orderAtEnterState = angular.copy($scope.order);

        $scope.tables = [1,2,3,4,5,6];
        $scope.orderCategories = categoriesJsonRestService.query(); //load categories from json

        $scope.orderCategoryIsDisabled = function (content) {
            if (!content) return true;
            else return false;
        };
        $scope.setCurOrderCategory = function (id, title) {
            if (!$scope.curOrderCategories)
                $scope.curOrderCategories = {};
            $scope.curOrderCategories.title = title;
            $scope.curOrderCategories.ids = [id];
        };
        $scope.setCurOrderCategories = function (cat, isopen) {
            if (!$scope.curOrderCategories)
                $scope.curOrderCategories = {};
            if (isopen || !cat.content) {
                $scope.curOrderCategories.title = "Alle";
                $scope.curOrderCategories.ids = ["-1"];

            }
            else {
                $scope.curOrderCategories.title = cat.title;
                $scope.curOrderCategories.ids = Object.keys(cat.content);
            }
        };
        $scope.setCurOrderCategories(false, false);

        $scope.categoryFilter = function (offer) {
            if ($scope.curOrderCategories.ids[0] === "-1")
                return true;
            for (var i = 0; i < offer.category.length; ++i) {
                for (var k = 0; k < $scope.curOrderCategories.ids.length; ++k) {
                    if (offer.category[i] == $scope.curOrderCategories.ids[k]) {
                        return true;
                    }
                }
            }
            return false;
        };

        //Gesamtpreis überwachen
        $scope.$watch('order.offers', function (newArray, oldArray) {
            $scope.orderPrice = 0;
            for (var i = 0; i < newArray.length; ++i) {
                $scope.orderPrice += newArray[i].count * newArray[i].order.price;
            }
        }, true);

        $scope.$watch('order.offers', function (newArray) {
            var payedPrice = 0;
            for (var i = 0; i < newArray.length; ++i) {
                if (typeof newArray[i].payed !== 'undefined' && newArray[i].payed !== null) {
                    payedPrice += newArray[i].payed * newArray[i].order.price;
                }
            }
            $scope.leftPrice = $scope.orderPrice - payedPrice;
        }, true);
        
        self.doNotSaveOnChangeState = false;
        //Autosave on leaving State if Order changed
        $scope.$on('$stateChangeStart', function (event) {
            if (!angular.equals($scope.order, self.orderAtEnterState) && !self.doNotSaveOnChangeState){
                orderFactory.saveOrder($scope.order);
            }
        });

        $scope.saveOrder = function () {
            orderFactory.saveOrder($scope.order);
            $state.go('orderMgmt.overview');
        };
        
        $scope.discardOrder = function () {
            self.doNotSaveOnChangeState = true;
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
        
        $scope.raiseOfferCount = function (offer, count){
            var newCount;
            for (var i = 0; i < $scope.order.offers.length; ++i) {
                if (offer === $scope.order.offers[i]) {
                    newCount = parseInt($scope.order.offers[i].count) + parseInt(count);
                    if ($scope.order.offers[i].payed <= newCount || !$scope.order.offers[i].payed) {
                        if (newCount >= 1)
                            $scope.order.offers[i].count = newCount;
                        else
                            $scope.order.offers.splice(i, 1);
                    }
                    break;
                }
            }
        };
        
        $scope.deleteFromOrder = function (offer) {
            for (var i = 0; i < $scope.order.offers.length; ++i) {
                if (offer === $scope.order.offers[i]) {
                    if ($scope.order.offers[i].payed < $scope.order.offers[i].count || !$scope.order.offers[i].payed) {
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

        $scope.getStatus = function (offer) {
            var status = orderFactory.getOfferStatus(offer);
            if (status == 0)
                return "Bezahlt";
            else if (status == 1)
                return "Teilweise bezahlt";
            else if (status == 2)
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
                backdrop: true,
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

        $scope.setCustomer = function () {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'order-mgmt/order-customer/order-customer.html',
                controller: 'OrderCustomerCntl',
                size: '1g',
                resolve: {
                    order: function () {
                        return $scope.order;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.order.customer = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    });
