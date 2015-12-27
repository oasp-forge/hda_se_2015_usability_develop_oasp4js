angular.module('app.order-mgmt').controller('OrderCustomerCntl',
    function ($scope, $modalInstance) {
        "use strict";

        $scope.ok = function () {
            $modalInstance.close();
        };
    });
