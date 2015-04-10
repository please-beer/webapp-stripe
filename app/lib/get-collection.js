var BPromise = require("bluebird");

module.exports = function getCollection (db, name) {
    return BPromise.promisifyAll(db.collection(name));
};
