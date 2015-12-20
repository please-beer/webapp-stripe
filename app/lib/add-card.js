var BPromise = require("bluebird");
var MW       = require("meteor-wapi");

module.exports = function addCard (params) {
    return BPromise.bind(this)
        /*
        *   Adds the card to the user. exp_month,exp_year,number,cardholder_name
        *   Stripe API reference: https://stripe.com/docs/api#create_card
        */
        .then(function () {
            return this.stripe.customers.createSource(this.user.stripeCustomer.id, {
                source: {object: "card",
                exp_month: params.exp_month,
                exp_year: params.exp_year,
                number: params.number}
            });
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
