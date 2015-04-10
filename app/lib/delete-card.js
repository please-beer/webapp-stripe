var BPromise = require("bluebird");
var MW       = require("meteor-wapi");

module.exports = function deleteCard (cardId) {
    return BPromise.bind(this)
        /*
        *   Removes the card from the user.
        *   Stripe API reference: https://stripe.com/docs/api#delete_card
        */
        .then(function () {
            return this.stripe.customers.deleteCard(this.user.stripeCustomer.id, cardId);
        })
        /* Normalize errors */
        .catch(function (err) {
            /*
            *   TODO: we might want to give feedback on what precisely went
            *   wrong.
            */
            throw new MW.Error(400, "Error while deleting the card.");
        });
};
