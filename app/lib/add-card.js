var BPromise = require("bluebird");
var MW       = require("meteor-wapi");

module.exports = function addCard (cardToken) {
    return BPromise.bind(this)
        /*
        *   Adds the card to the user.
        *   Stripe API reference: https://stripe.com/docs/api#create_card
        */
        .then(function () {
            return this.stripe.customers.createSource(this.user.stripeCustomer.id, {
                  source: cardToken
            });
        })
        /* Normalize errors */
        .catch(function (err) {
            /*
            *   TODO: we might want to give feedback on what precisely went
            *   wrong.
            */
            throw new MW.Error(400, "Error while adding the card.");
        });
};
