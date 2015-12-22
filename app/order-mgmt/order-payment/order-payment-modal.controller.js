
angular.module('app.order-mgmt').controller('OrderPaymentModalCtrl',
        function ($scope, $modalInstance, order) {
            'use strict';

            $scope.order = order;
            $scope.selected = {
                item: $scope.order
            };
            
            
            $scope.categories = [1,2,3,4,5,6,7,8];
            
            $scope.selectCategory = function (index) {
                $scope.selectedCategory = index;
            };
            $scope.selectCategory(0);
            
            var categoryOrderMap = [];
            for (var i=0; i<order.length; ++i){
                categoryOrderMap.push(0);
            }
            
            $scope.selectCategoryOnOrder = function (index) {
                categoryOrderMap[index] = $scope.selectedCategory;
            };
            
            $scope.getCategoryClassOnOrder = function (index) {
                return 'category'+categoryOrderMap[index];
            }

            $scope.ok = function () {
                $modalInstance.close($scope.selected.item);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        });