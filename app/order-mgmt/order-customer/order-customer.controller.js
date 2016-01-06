angular.module('app.order-mgmt').controller('OrderCustomerCntl',
    function ($scope, $modalInstance, orderFactory, $modal) {
        "use strict";
        
        var self = this;
        
        self.loadAllCustomers = function () {
            self.customers = orderFactory.loadAllCustomers();
            $scope.customers = self.customers.customerObjects;
        };
        self.loadAllCustomers();
        
        $scope.cancel = function () {
            $modalInstance.close();
        };

        $scope.saveCustomer = function () {
            var newId = parseInt(self.customers.maxId) + 1;
            var newCustomer = {"id": newId, "name": $scope.newCustomer.name};
            //alert(JSON.stringify(newCustomer));
            orderFactory.saveCustomer(newCustomer);
            self.loadAllCustomers();
        };
        
        $scope.deleteCustomer = function (customer){
            orderFactory.deleteCustomer(customer);
            self.loadAllCustomers();
        };

        $scope.deleteAllCustomers = function(){
            orderFactory.deleteAllCustomers();
            $scope.customers = orderFactory.loadAllCustomers();
        };

        $scope.selectCustomerForOrder = function(customer){
            $modalInstance.close(customer);
        };
        
        $scope.showCustomerOrders = function (customer) {

            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'order-mgmt/order-customer/order-customer.orders.modal.html',
                controller: 'OrderCustomerOrdersCntl',
                size: 'lg',
                backdrop: true,
                resolve: {
                    customer: function () {
                        return customer;
                    }
                }
            });

            modalInstance.result.then(function (customer) {
                if (customer){
                    $modalInstance.close(customer);
                }
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        
        //Close Modal on leaving state
        $scope.$on('$stateChangeStart', function (event) {
            $modalInstance.dismiss('cancel');
        });
    });
