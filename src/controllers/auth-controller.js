const config = require("../helper/config");
const firebase = require("firebase");

if (!firebase.apps.length) {
  firebase.initializeApp(config.firebase);
} else {
  firebase.app(); // if already initialized, use that one
}

// Pages
exports.loginPage = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};

exports.registerPage = (req, res) => {
  res.render("register", { pageTitle: "Register" });
};

exports.forgotPasswordPage = (req, res) => {
  res.render("forgot-password", { pageTitle: "Reset Password" });
};

// APIs
exports.login = (req, res) => {
  var userData = {};

  firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((userCredential) => {
      // Signed in
      // userData = { ...userCredential };
      userData = getUserData(userCredential);
      userData = formatResponse(userData, "User Logged in succesfully", true);

      res.json(data);
      // res.render("home", { ...userData, pageTitle: "Home" });
    })
    .catch((error) => {
      userData = sendError(error);
      res.status(400).send(userData);
      // res.render("login", { ...data, pageTitle: "title" });
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

      // call login method to login
      res.json(data);
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
      res.send(data);
      // res.render("login", { ...data, pageTitle: "Login" });
    })
    .catch(function (error) {
      data = formatResponse(error, "Password reset failed", false);
      res.status(400).send(data);
    });
};

function sendError(error) {
  return formatResponse(null, error.message, false, error.code);
}

function getUserData(userCredential) {
  let user = {};
  user["uid"] = userCredential.user.uid;
  user["email"] = userCredential.user.email;
  user["refreshToken"] = userCredential.user.refreshToken;
  user["displayName"] = userCredential.user.displayName;
  user["lastLoginAt"] = userCredential.user.metadata.lastSignInTime;
  // user["token"] = userCredential.user.stsTokenManager.accessToken;
  // user["expirationTime"] = userCredential.user.stsTokenManager.expirationTime;
  return user;
}

function formatResponse(d, m, s, c = 200) {
  return {
    status: s,
    data: d,
    message: m,
    statusCode: c,
  };
}
