var BPromise = require("bluebird");
var R        = require("ramda");
var should   = require("should-promised");

var stripeCustomerSync = require("lib/stripe-customer-sync.js");

describe("The stripeCustomerSync function", function () {

    it("should return a promise", function () {
        var ctx = {
            stripe: {customers: {
                retrieve: R.always(BPromise.resolve())
            }},
            db: {collection: R.always({
                update: function (first, second, cb) {
                    cb(false, {});
                }
            })},
            user: {stripeCustomer: {}}
        };
        return stripeCustomerSync.call(ctx).should.be.Promise;
    });

});

describe("The promise returned by the stripeCustomerSync function", function () {

    it("should be resolved if syncing succeeds", function () {
        var ctx = {
            stripe: {customers: {
                retrieve: R.always(BPromise.resolve())
            }},
            db: {collection: R.always({
                update: function (first, second, cb) {
                    cb(null, {});
                }
            })},
            user: {stripeCustomer: {}}
        };
        return stripeCustomerSync.call(ctx).should.be.fulfilledWith({});
    });

    it("should be rejected if syncing fails at stripe", function () {
        var ctx = {
            stripe: {customers: {
                retrieve: function () {
                    return BPromise.reject();
                }
            }},
            db: {collection: R.always({
                update: function (first, second, cb) {
                    cb(null, {});
                }
            })},
            user: {stripeCustomer: {}}
        };
        return stripeCustomerSync.call(ctx).should.be.rejectedWith("Error syncing with stripe. Try again.");
    });

    it("should be rejected if syncing fails at mongo", function () {
        var ctx = {
            stripe: {customers: {
                retrieve: R.always(BPromise.resolve())
            }},
            db: {collection: R.always({
                update: function (first, second, cb) {
                    cb(true);
                }
            })},
            user: {stripeCustomer: {}}
        };
        return stripeCustomerSync.call(ctx).should.be.rejectedWith("Error syncing with stripe. Try again.");
    });

});
