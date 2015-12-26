
angular.module('app.order-mgmt').controller('OrderPaymentNumberSelectModalCtrl',
        function ($scope, $modalInstance, orderNumber) {
            'use strict';
            
            $scope.orderNumber = orderNumber;

            $scope.ok = function (n) {
                $modalInstance.close(n);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.range = function (min, max, step) {
                step = step || 1;
                var input = [];
                for (var i = min; i <= max; i += step) {
                    input.push(i);
                }
                return input;
            };
        });