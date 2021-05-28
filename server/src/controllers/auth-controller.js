const config = require("../helper/config");
const firebase = require("firebase");
const { setLocalStorage, getLocalStorage } = require("../helper/helper");
const { encrypt } = require("../services/encryption-service");
const { log } = require("../helper/logger");

if (!firebase.apps.length) {
  firebase.initializeApp(config.firebase);
} else {
  firebase.app(); // if already initialized, use that one
}

// Pages
exports.loginPage = (req, res) => {
  res.render("login", { pageTitle: "Login", error: null, data: null });
};

exports.registerPage = (req, res) => {
  res.render("register", { pageTitle: "Register" });
};

exports.forgotPasswordPage = (req, res) => {
  res.render("forgot-password", { pageTitle: "Reset Password" });
};

// APIs
exports.verifyUser = (req, res, next) => {
  const user = getLocalStorage("user-data");
  const token = req.headers.authorization
    ? req.headers.authorization
    : user
    ? user.refreshToken
    : null;

  log(req.url, "token", token);

  // if (token == "dummytoken") {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, PATCH, OPTIONS"
  );

  next();
  // } else {
  //   res.status(201).send(sendError(new Error("Authentication Failed")));
  // }
};

exports.login = (req, res) => {
  var userData = {};

  firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((userCredential) => {
      // Signed in
      userData = userCredential.user;
      req.session.user = userData;

      userData = formatResponse(userData, "User Logged in succesfully", true);
      setLocalStorage(userData.data, "user-data");

      let pb = [
        {
          name: "Google",
          url: "",
          password: "password@123",
        },
        {
          name: "Microsoft",
          url: "",
          password: "abc@241",
        },
        {
          name: "Opera",
          url: "",
          password: "Qwerty@324",
        },
      ];

      res.send(userData);

      // res.send({
      //   uid: userData.uid,
      //   email: userData.email,
      //   refreshToken: userData.refreshToken,
      //   displayName: userData.displayName,
      //   emailVerified: userData.emailVerified,
      //   lastLoginAt: userData.metadata.lastSignInTime,
      //   token: userData.stsTokenManager.accessToken,
      //   expirationTime: userData.stsTokenManager.expirationTime,
      // });
      // res.render("home", { user: userData, passbook: pb, pageTitle: "Home" });
    })
    .catch((error) => {
      userData = sendError(error);
      res.status(400).send(userData);
      // res.render("login", { data: userData, pageTitle: "title" });
    });
};

exports.registerUser = (req, res) => {
  const user = { ...req.body };
  var data = {};

  firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then((userCredential) => {
      // Registered and Signed in
      data = { ...user, ...userCredential };
      data = formatResponse(data, "Account Created Successfully", true);

      // res.json(data);
      // display success message
      res.redirect("/");
      // res.render("home", { ...data, pageTitle: "Home" });
    })
    .catch((error) => {
      data = sendError(error);
      res.status(400).json(data);
    });
};

exports.resetPassword = (req, res) => {
  var emailAddress = req.body.email,
    data = {};

  firebase
    .auth()
    .sendPasswordResetEmail(emailAddress)
    .then(function (d) {
      // Email sent.
      data = formatResponse(null, "Email sent", true);
      // res.send(data);
      res.render("login", { data: data, pageTitle: "Login" });
    })
    .catch(function (error) {
      data = formatResponse(error, "Password reset failed", false);
      res.status(400).send(data);
    });
};

function sendError(error) {
  return formatResponse(null, error.message, false);
}

function getUserData(userCredential) {
  let user = {};
  user["uid"] = userCredential.user.uid;
  user["email"] = userCredential.user.email;
  user["refreshToken"] = userCredential.user.refreshToken;
  user["displayName"] = userCredential.user.displayName;
  user["emailVerified"] = userCredential.user.emailVerified;
  user["lastLoginAt"] = userCredential.user.metadata.lastSignInTime;
  user["token"] = userCredential.user.stsTokenManager.accessToken;
  user["expirationTime"] = userCredential.user.stsTokenManager.expirationTime;
  return user;
}

function formatResponse(d, m, s) {
  return {
    status: s,
    data: d,
    message: m,
  };
}
