const db = require("../dbConfig");

module.exports = {
  register: function(user) {
    return db("users").insert(user);
  },
};
