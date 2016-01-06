angular.module('app.order-mgmt').controller('OrderCustomerOrdersCntl',
    function ($scope, $modalInstance, orderFactory, oldOrderMerger, customer) {
        "use strict";

        var self = this;

        self.loadAllOrders = function () {
            self.orders = orderFactory.loadAllOrders(null, customer.id);
            $scope.orders = self.orders.orderObjects;
            
        };
        self.loadAllOrders();

        $scope.customerName = customer.name;
        $scope.getPrice = function(order) {
            var price=0;
            angular.forEach(order.offers, function(offer){
                price += offer.order.price * offer.count;
            });
            return price;
        };
        
        $scope.cancel = function () {
            $modalInstance.close();
        };

        $scope.addOrder = function(order){
            oldOrderMerger.addOffersFromOrder(order);
            $modalInstance.close(customer);
        };
        
        //Close Modal on leaving state
        $scope.$on('$stateChangeStart', function (event) {
            $modalInstance.dismiss('cancel');
        });
    });