var BPromise = require("bluebird");
var R        = require("ramda");
var should   = require("should-promised");

var addCard = require("lib/add-card.js");

describe("The addCard function", function () {

    it("should return a promise", function () {
        var ctx = {
            stripe: {customers: {
                createSource: R.always(BPromise.resolve())
            }},
            user: {stripeCustomer: {}}
        };
        return addCard.call(ctx).should.be.Promise;
    });

});

describe("The promise returned by the addCard function", function () {

    it("should be resolved if adding the card succeeds", function () {
        var ctx = {
            stripe: {customers: {
                createSource: R.always(BPromise.resolve({}))
            }},
            user: {stripeCustomer: {}}
        };
        return addCard.call(ctx).should.be.fulfilledWith({});
    });

    it("should be rejected if adding the card fails", function () {
        var ctx = {
            stripe: {customers: {
                createSource: function () {
                    return BPromise.reject();
                }
            }},
            user: {stripeCustomer: {}}
        };
        return addCard.call(ctx).should.be.rejectedWith("Error while adding the card.");
    });

});
