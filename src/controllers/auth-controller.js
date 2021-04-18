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

// APIs
exports.login = (req, res) => {
  var data = {},
    user = {};

  // req.headers["Content-Type"] = "application/json";

  firebase.storage.UpdateMetaData({
    contentType: "application/json",
  });
  
  firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((userCredential) => {
      // Signed in
      // data = getUserData(userCredential);
      data = { ...userCredential.user };

      req.headers["Content-Type"] = "application/json";
      res.json(data);
    })
    .catch((error) => {
      data = sendError(error, user);
      res.status(400).send(data);
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
      res.json(data);
    })
    .catch((error) => {
      data = sendError(error, user);
      res.status(400).json(data);
    });
};

exports.resetPassword = (req, res) => {
  var auth = firebase.auth();
  var emailAddress = req.body.email;

  auth
    .sendPasswordResetEmail(emailAddress)
    .then(function (d) {
      // Email sent.
      console.log(d);
    })
    .catch(function (error) {
      // An error happened.
      console.log(error);
    });
};

function sendError(error, user) {
  var errorMessage = { status: error.code, message: error.message };
  return { ...user, ...errorMessage };
}

function getUserData(userCredential) {
  let user = {};
  user["uid"] = userCredential.user.uid;
  user["email"] = userCredential.user.email;
  // user["token"] = userCredential.user.stsTokenManager.accessToken;
  user["refreshToken"] = userCredential.user.stsTokenManager.refreshToken;
  user["expirationTime"] = userCredential.user.stsTokenManager.expirationTime;
  user["lastLoginAt"] = userCredential.user.stsTokenManager.lastLoginAt;
  return user;
}

function handleError(errRes) {
  let errMessage;
  if (!errRes.error || !errRes.error.error) {
    return throwError(errMessage);
  }

  switch (errRes.error.error.message) {
    case "EMAIL_EXISTS":
      errMessage = "The email address is already in use by another account !!";
      break;
    case "OPERATION_NOT_ALLOWED":
      errMessage = "Password sign-in is disabled for this project.";
      break;
    case "TOO_MANY_ATTEMPTS_TRY_LATER":
      errMessage =
        "We have blocked all requests from this device due to unusual activity. Try again later.";
      break;
    case "EMAIL_NOT_FOUND":
      errMessage =
        "Email not found / There is no user record corresponding to this identifier. The user may have been deleted.";
      break;
    case "INVALID_PASSWORD":
      errMessage =
        "The password is invalid or the user does not have a password.";
      break;
    default:
      errMessage = "An unknown error occured!!";
  }

  return throwError(errMessage);
}
