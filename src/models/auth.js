const User = require("./users");

module.exports = class Auth {
  constructor(user) {
    this.user = user;
  }

  login() {
    console.log(this.user);
    return { err: false, data: this.user, status: true };
  }

  register() {
    User.addUser(this.user);
  }
};
