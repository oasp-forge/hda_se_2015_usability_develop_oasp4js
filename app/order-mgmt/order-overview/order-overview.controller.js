
angular.module('app.order-mgmt').controller('OrderOverviewCntl',
        function ($scope, $sce, $stateParams, offersJson, globalSpinner, positionStateNotification, $state) {
            'use strict';

            var self = this;
            self.model = {};

            $scope.offers = offersJson.loadAllOffers();
            $scope.selOffers = [];
            
            $scope.addToOrder = function (offer) {
                var found=false;
                for (var i=0; i<$scope.selOffers.length; ++i){
                    if (offer === $scope.selOffers[i].order){
                        $scope.selOffers[i].count++;
                        found=true;
                        break;
                    }
                }
                if (!found)
                    $scope.selOffers.push({count: 1, order: offer});
                //alert(offer.desc + " hinzugefügt !");
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
