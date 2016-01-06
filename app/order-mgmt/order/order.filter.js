angular.module('app.order-mgmt')
    .filter('customer', function () {
        'use strict';
        return function (customer) {
            if (!customer)
                return "-";
            else if (!customer.name)
                return "gelöscht";
            else
                return customer.name;
        };
    })
    .filter('timestamp', function () {
        'use strict';
        return function (item) {
            if (!item)
                return "";
            else
                return item;
        };
    })
    .filter('offerFilter', function () {
        return function(offers, input){
            var out = [];
            var check = false;
            //alert(JSON.stringify(input));
            if (input)
                input = input.toLowerCase();
            angular.forEach(offers, function(offer){
                //alert(JSON.stringify(offer));
                offerObject = offer.order?offer.order:offer;
                if (offerObject){
                    if (offerObject.id)
                        if (offerObject.id.toString().indexOf(input) > -1)
                            check = true;
                    if (offerObject.title)
                        if (offerObject.title.toLowerCase().indexOf(input) > -1)
                            check = true;
                    if (offerObject.desc)
                        if (offerObject.desc.toLowerCase().indexOf(input) > -1)
                            check = true;
                    if (offerObject.price)
                        if (offerObject.price.toFixed(2).toString().indexOf(input) > -1)
                            check = true;
                }
                
                if (!input || check)
                    out.push(offer);
                
                check = false;
            });
            return out;
        };
    });
