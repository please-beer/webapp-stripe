var bodyParser  = require("body-parser");
var express     = require("express");
var MongoClient = require("mongodb").MongoClient;
var MW          = require("meteor-wapi");

var mongoUrl = process.env.MONGO_URL || "mongodb://localhost:3001/meteor";

var getStripe = require("./get-stripe.js");
var methods   = require("./methods.js");

BPromise.resolve()
    .then(function () {
        return MongoClient.connect(mongoUrl);
    })
    .then(function (db) {
        return BPromise.all([db, getStripe(db)]);
    })
    .spread(function (db, stripe) {
        var mw = new MW(db);
        mw.methods(methods, {
            db: db,
            stripe: stripe
        });
        express()
            .post("/call", mw.getRouter())
            .listen(process.env.PORT || 4000);
    });
