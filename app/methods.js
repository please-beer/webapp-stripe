var BPromise = require("bluebird");
var R        = require("ramda");

var submitPayment      = require("./lib/submit-payment.js");
var stripeLogin        = require("./lib/stripe-login.js");
var stripeLogin        = require("./lib/submit-payment.js");
var addCard            = require("./lib/add-card.js");
var listCards          = require("./lib/list-cards.js");
var deleteCard         = require("./lib/delete-card.js");
var ensureLogin        = require("./lib/ensure-login.js");
var stripeCustomerSync = require("./lib/stripe-customer-sync.js");

exports["user:stripe-login"] = function () {
    return BPromise.bind(this)
        .then(ensureLogin)
        .then(stripeLogin)
        .then(R.always(null));
};

exports["user:stripe-sync"] = function () {
    return BPromise.bind(this)
        .then(ensureLogin)
        .then(stripeCustomerSync);
};
exports["users:add-card"] = function (exp_month,exp_year,number) {
    return BPromise.bind(this)
        .then(ensureLogin)
        .then(R.partial(addCard, exp_month,exp_year,number))
        .then(stripeCustomerSync)
        .then(R.always(null));
};

exports["users:submit-payment"] = function (campaignID,ammount,title, description, source) {
    return BPromise.bind(this)
        .then(ensureLogin)
        .then(R.partial(submitPayment,campaignID,ammount,title,description, source));
};

exports["users:list-cards"] = function () {
    return BPromise.bind(this)
        .then(ensureLogin)
        .then(listCards);
};

exports["users:delete-card"] = function (cardId) {
    return BPromise.bind(this)
        .then(ensureLogin)
        .then(R.partial(deleteCard, cardId))
        .then(stripeCustomerSync)
        .then(R.always(null));
};
