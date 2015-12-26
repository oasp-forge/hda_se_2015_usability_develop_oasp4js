/**
 * @ngdoc service
 * @name offer-mgmt.offers
 * @module app.offer-mgmt
 * @requires offer-mgmt.offerManagementRestService
 */
angular.module('app.order-mgmt').factory('orderPaymentFactory', function () {
    'use strict';
    return {
        setArticleCategory: function(article, category) {
            article.category = category;
        },
        
        
        splitOrderCategorys: function (order, article, category, count) {
            var newArticle = angular.copy(article);
            article.count -= count;
            newArticle.count = count;
            newArticle.category = category;
            order.push(newArticle);
        },
        
        deleteAllOrders: function () {
            localStorage.removeItem(ORDER_STORAGE);
        }
    };
});
