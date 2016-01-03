angular.module('app.order-mgmt').controller('OrderCustomerCntl',
    function ($scope, $modalInstance, orderFactory) {
        "use strict";

        $scope.customers = orderFactory.customerList();

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.saveCustomer = function () {
            if ($scope.customers) {
                $scope.newCustomer.id = Number($scope.customers.maxId) + 1;
            }
            orderFactory.saveCustomer($scope.newCustomer);
            $scope.customers = orderFactory.loadAllCustomers();
            //$state.go('orderMgmt.overview');
        };

        $scope.deleteAllCustomers = function(){
            orderFactory.deleteAllCustomers();
            $scope.customers = orderFactory.loadAllCustomers();
        }
    });
