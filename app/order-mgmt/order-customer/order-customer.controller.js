angular.module('app.order-mgmt').controller('OrderCustomerCntl',
    function ($scope, $modalInstance, orderFactory, $stateParams) {
        "use strict";
        
        var self = this;

        self.loadAllCustomers = function () {
            self.customers = orderFactory.loadAllCustomers();
            $scope.customers = self.customers.customerObjects;
        };
        self.loadAllCustomers();
        
        $scope.order = orderFactory.loadOrder($stateParams.orderId);

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.saveCustomer = function () {
            var newId = parseInt(self.customers.maxId) + 1;
            var newCustomer = {"id": newId, "name": $scope.newCustomer.name};
            //alert(JSON.stringify(newCustomer));
            orderFactory.saveCustomer(newCustomer);
            self.loadAllCustomers();
        };

        $scope.deleteAllCustomers = function(){
            orderFactory.deleteAllCustomers();
            $scope.customers = orderFactory.loadAllCustomers();
        };

        $scope.selectCustomerForOrder = function(customer){
            $modalInstance.close(customer);
        };
    });
