var BPromise = require("bluebird");
var R        = require("ramda");
var should   = require("should-promised");

var deleteCard = require("lib/delete-card.js");

describe("The deleteCard function", function () {

    it("should return a promise", function () {
        var ctx = {
            stripe: {customers: {
                deleteCard: R.always(BPromise.resolve())
            }},
            user: {stripeCustomer: {}}
        };
        return deleteCard.call(ctx).should.be.Promise;
    });

});

describe("The promise returned by the deleteCard function", function () {

    it("should be resolved if deleting the card succeeds", function () {
        var ctx = {
            stripe: {customers: {
                deleteCard: R.always(BPromise.resolve({}))
            }},
            user: {stripeCustomer: {}}
        };
        return deleteCard.call(ctx).should.be.fulfilledWith({});
    });

    it("should be rejected if deleting the card fails", function () {
        var ctx = {
            stripe: {customers: {
                deleteCard: function () {
                    return BPromise.reject();
                }
            }},
            user: {stripeCustomer: {}}
        };
        return deleteCard.call(ctx).should.be.rejectedWith("Error while deleting the card.");
    });

});
