var stripe = require("stripe");

var getCollection = require("./lib/get-collection.js");

module.exports = function (db) {
    return getCollection(db, "configurations")
        .findOne({
            name: "stripe"
        })
        .then(function (stripeConfig) {
            return stripe(stripeConfig.secretKey);
        });
};
