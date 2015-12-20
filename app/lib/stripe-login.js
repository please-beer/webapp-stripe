var BPromise = require("bluebird");
var MW       = require("meteor-wapi");

var getCollection = require("./get-collection.js");

module.exports = function stripeLogin (db, cardToken) {
    return BPromise.bind(this)
        /*
        *   Adds the card to the user.
        *   Stripe API reference: https://stripe.com/docs/api#create_card
        */
        .then(function () {
        	if (typeof this.user.stripeCustomer==="undefined") {
    			return this.stripe.customers.create({});
    		} else return this.user.stripeCustomer;
    	})
        .then(function(customer)
        	{ 
        	if (typeof this.user.stripeCustomer==="undefined") {
				var selector = {
	                _id: this.userId
	            };
	            var modifier = {
	               $set: {
	                    stripeCustomer: customer
	                }
	            };
	            return getCollection(this.db, "users").update(selector, modifier);	
	        } else return this.user.stripeCustomer

		        
        })
        /* Normalize errors */
        .catch(function (err) {
            /*
            *   TODO: we might want to give feedback on what precisely went
            *   wrong.
            */
            throw new MW.Error(400, "Error while creating stripe user. " +err);
        });
};
