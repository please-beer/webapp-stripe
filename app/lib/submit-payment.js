var BPromise = require("bluebird");
var MW       = require("meteor-wapi");

var getCollection = require("./get-collection.js");

module.exports = function submitPayment (params) {
    return BPromise.bind(this)
        /* Retrieves the users's stripe-customer object */
        .then(function () {
            return this.stripe.customers.retrieve(this.user.stripeCustomer.id);
        })
        .then(function (stripeCustomer) {
        	console.log(params.source);
        	return this.stripe.charges.create({
				  amount: params.ammount*100,
				  currency: "eur",
				  customer: stripeCustomer.id,
				  source: params.source, // obtained with Stripe.js
				  description: params.title,
				  capture: false
				});

        })
        /* Perform the database update */
        .then(function (charge) {
            console.log("Charge status: ");
            console.log(charge);
            var selector = {
                _id: this.userId
            };
            var modifier = {
                $addToSet: {
                    charges: charge
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
            throw new MW.Error(500, "Error setting up payment for the user. Try again.");
        });
};
