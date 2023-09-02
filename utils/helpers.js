const session = require("express-session");
const { User } = require("../models");

module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  verify_author: (author, user, options) => {
    // Format date as MM/DD/YYYY
    if (author === user) {
      console.log('same?');
      return options.fn(this);
    }
    console.log('not the same');
    return options.inverse(this);
  },
};

