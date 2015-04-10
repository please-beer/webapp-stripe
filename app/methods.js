var BPromise = require("bluebird");
var R        = require("ramda");

var addCard            = require("./lib/add-card.js");
var deleteCard         = require("./lib/delete-card.js");
var ensureLogin        = require("./lib/ensure-login.js");
var stripeCustomerSync = require("./lib/stripe-customer-sync.js");

exports["user:stripe-sync"] = function () {
    return BPromise.bind(this)
        .then(ensureLogin)
        .then(stripeCustomerSync)
        .then(R.always(null));
};

exports["users:add-card"] = function (cardToken) {
    return BPromise.bind(this)
        .then(ensureLogin)
        .then(R.partial(addCard, cardToken))
        .then(stripeCustomerSync)
        .then(R.always(null));
};

exports["users:delete-card"] = function (cardId) {
    return BPromise.bind(this)
        .then(ensureLogin)
        .then(R.partial(deleteCard, cardId))
        .then(stripeCustomerSync)
        .then(R.always(null));
};
