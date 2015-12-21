
angular.module('app.order-mgmt').controller('OrderCntl',
        function ($filter, $scope, $sce, $stateParams, offerList, orderFactory, globalSpinner, positionStateNotification, $state) {
            'use strict';
            
            var self = this;
            self.model = {};
            
            //$scope.offers = offersJson.loadAllOffers().$promise.then(function(result){alert(JSON.stringify(result));});
            $scope.offers = offerList;
            $scope.order = {
                customer : null,
                timestamp : null,
                table : null,
                offers : []
            };
            
            self.id = $stateParams.orderId;
            self.order = orderFactory.loadOrder(self.id);
            if (!self.order)
                self.order = {"offers" : []};
            
            if (self.order.customer)
                $scope.order.customer = self.order.customer;
            if (self.order.timestamp)
                $scope.order.timestamp = self.order.timestamp;
            if (self.order.table)
                $scope.order.table = self.order.table;
            
            //Bestellungen mappen
            for (var i=0; i<self.order.offers.length; ++i){
                for (var k=0; k<$scope.offers.length; ++k){
                    if (self.order.offers[i][1] == $scope.offers[k].id){
                        $scope.order.offers.push({'count':self.order.offers[i][0], 'order': $scope.offers[k]});
                        break;
                    }
                }
            }
            
            //Gesamtpreis überwachen
            $scope.$watch('order.offers', function (newArray, oldArray) {
                $scope.orderPrice = 0;
                for(var i=0; i<newArray.length; ++i){
                    $scope.orderPrice += newArray[i].count * newArray[i].order.price;
                }
            }, true);
            
            $scope.saveOrder = function() {
                var order = {};
                order.customer = "Schmidt";
                order.timestamp = Date.now();
                order.table = 1;
                order.offers = [];
                
                for (var i=0; i<$scope.order.offers.length; ++i){
                    order.offers.push([$scope.order.offers[i].count, $scope.order.offers[i].order.id]);
                }
                orderFactory.saveOrder(self.id, order);
                $state.go('orderMgmt.overview');
            }
            
            $scope.addToOrder = function (offer) {
                var found=false;
                for (var i=0; i<$scope.order.offers.length; ++i){
                    if (offer === $scope.order.offers[i].order){
                        $scope.order.offers[i].count++;
                        found=true;
                        break;
                    }
                }
                if (!found)
                    $scope.order.offers.push({count: 1, order: offer});
                //alert(offer.desc + " hinzugefügt !");
            };
            
            $scope.deleteFromOrder = function (offer) {
                for (var i=0; i<$scope.order.offers.length; ++i){
                    if (offer === $scope.order.offers[i]){
                        if ($scope.order.offers[i].count > 1)
                            $scope.order.offers[i].count--;
                        else
                            $scope.order.offers.splice(i,1);
                        break;
                    }
                }
                //alert(offer.desc + " hinzugefügt !");
            };
        });
