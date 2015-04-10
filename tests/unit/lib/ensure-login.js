var BPromise = require("bluebird");
var R        = require("ramda");
var should   = require("should");

var ensureLogin = require("lib/ensure-login.js");

describe("The ensureLogin function", function () {

    it("should throw if userId in the context is null", function () {
        var ctx = {
            userId: null
        };
        return ensureLogin.bind(ctx).should.throw("Login required.");
    });

    it("should not throw if userId in the context is defined", function () {
        var ctx = {
            userId: "someId"
        };
        return ensureLogin.bind(ctx).should.not.throw();
    });

});
