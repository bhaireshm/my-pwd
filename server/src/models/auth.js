const { encrypt } = require("../services/encryption-service");
const request = require("request");
const config = require("../helper/config");
module.exports = class Auth {
  constructor(user) {
    this.user = user;
  }

  login() {
    console.log(this.user);
    return { err: false, data: this.user, status: true };
  }

  register() {
    this.user.password = encrypt(this.user.password);
    this.user.mpin = encrypt(this.user.mpin);
    const config = require("../helper/config");
    const firebase = require("firebase");

    if (!firebase.apps.length) {
      firebase.initializeApp(config.firebase);
    } else {
      firebase.app(); // if already initialized, use that one
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then((userCredential) => {
        // Signed in
        return { ...this.user, ...userCredential };
      })
      .catch((error) => {
        var errorMessage = { status: error.code, message: error.message };
        return { ...this.user, ...errorMessage };
      });

    // return this.user;
    // request.post(
    //   { url: config.fbdburl + "/users.json", form: JSON.stringify(this.user) },
    //   function (err, httpResponse, body) {
    //     console.log(body);
    //     this.user["id"] = body.name;
    //     return this.user;
    //   }
    // );
  }
};
