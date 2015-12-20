var BPromise = require("bluebird");
var MW       = require("meteor-wapi");

module.exports = function listCards () {
    return BPromise.bind(this)
        /*
        *   Returns all cards that are saved to the user
        *   Stripe API reference: https://stripe.com/docs/api#create_card
        */
        .then(function () {
            return this.stripe.customers.listCards(this.user.stripeCustomer.id);
        })
        /* Normalize errors */
        .catch(function (err) {
            /*
            *   TODO: we might want to give feedback on what precisely went
            *   wrong.
            */
            throw new MW.Error(400, "Error while adding the card." + err);
        });
};
