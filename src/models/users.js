const { encrypt } = require("../services/encryption-service");
const request = require("request");
const config = require("@helper/config");

module.exports = class User {
  constructor(user) {
    this.user = user;
  }

  addUser() {
    console.log("users controller", users);

    // users.password = encrypt(users.password);
    // users.mpin = encrypt(users.mpin);

    // request.post(
    //   { url: config.fbdburl + "/users.json", form: JSON.stringify(users) },
    //   function (err, httpResponse, body) {
    //     console.log(body);
    //   }
    // );
  }

  fetchUsers() {
    return users;
  }
};
