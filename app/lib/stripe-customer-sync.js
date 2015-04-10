var BPromise = require("bluebird");
var MW       = require("meteor-wapi");

var getCollection = require("./get-collection.js");

module.exports = function stripeCustomerSync () {
    return BPromise.bind(this)
        /* Retrieves the users's stripe-customer object */
        .then(function () {
            return this.stripe.customers.retrieve(this.user.stripeCustomer.id);
        })
        /* Perform the database update */
        .then(function (stripeCustomer) {
            var selector = {
                _id: this.userId
            };
            var modifier = {
                $set: {
                    stripeCustomer: stripeCustomer
                }
            };
            return getCollection(this.db, "users").update(selector, modifier);
        })
        /* Normalize errors */
        .catch(function (err) {
            /*
            *   An error at this point might leave the database in an
            *   inconsistent state in respect to stripe. Since an error here is
            *   probably a very rare occurrence, for now we just log the anomaly
            *   and move on, telling the client that such an error occurred and
            *   giving him the possibility to force a sync with stripe
            */
            throw new MW.Error(500, "Error syncing with stripe. Try again.");
        });
};
