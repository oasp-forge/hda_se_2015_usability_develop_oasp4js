angular.module('app.order-mgmt').controller('OrderCustomerCntl',
    function ($scope, $modalInstance, orderFactory, $stateParams) {
        "use strict";

        self.loadAllOrders = function () {
            self.customers = orderFactory.loadAllCustomers();
            $scope.customers = self.customers.customerObjects;
        };
        self.loadAllOrders();

        $scope.order = orderFactory.loadOrder($stateParams.orderId);

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.saveCustomer = function () {
            if ($scope.customers) {
                $scope.newCustomer.id = parseInt($scope.customers.maxId) + 1;
            }
            orderFactory.saveCustomer($scope.newCustomer);
            $scope.customers = orderFactory.loadAllCustomers();
        };

        $scope.deleteAllCustomers = function(){
            orderFactory.deleteAllCustomers();
            $scope.customers = orderFactory.loadAllCustomers();
        }

        $scope.selectCustomerForOrder = function(customer){
            $scope.order.customerId = customer.id;
            $scope.order.customerName = customer.name;
            orderFactory.saveOrder($scope.order);
        }
    });
