var bodyParser  = require("body-parser");
var express     = require("express");
var MongoClient = require("mongodb").MongoClient;
var MW          = require("meteor-wapi");
var BPromise    = require("bluebird");

var mongoUrl = process.env.MONGO_URL || "mongodb://localhost:3001/meteor";

var getStripe = require("./get-stripe.js");
var methods   = require("./methods.js");

BPromise.resolve()
    .then(function () {
        console.log("trying to connect to mongodb " + mongoUrl);
        return MongoClient.connect(mongoUrl);
    })
    .then(function (db) {
        console.log("connected, trying to connect to db");
        return BPromise.all([db, getStripe(db)]);
    })
    .spread(function (db, stripe) {
        console.log("connected, trying to connect to meteor");
        //console.log(stripe);
        var mw = new MW(db);
        mw.methods(methods
        , {
            db: db,
            stripe: stripe
        });
        express().use(function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                res.setHeader('Access-Control-Allow-Credentials', true);
                // Pass to next layer of middleware
                 next();
            }).get("/tickets", function(req, res, next) {
                        var result= {"1":"test"};
                        res.json(result);  
                })
            .post("/call", mw.getRouter())
            .listen(process.env.PORT || 4000);
            
        console.log("all done");
    });
