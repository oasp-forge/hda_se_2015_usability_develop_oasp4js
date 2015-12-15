describe('Module: orderMgmt, filter: price', function () {
    'use strict';
    beforeEach(module('app.order-mgmt'));

    it('should add EUR suffix to the price', inject(function (priceFilter) {
        //given when then
        expect(priceFilter(2000)).toEqual('2000.00 EUR');
    }));
});