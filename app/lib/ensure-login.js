var MW = require("meteor-wapi");

module.exports = function ensureLogin (userId) {
    if (this.userId === null) {
        throw new MW.Error(401, "Login required.");
    }
};
