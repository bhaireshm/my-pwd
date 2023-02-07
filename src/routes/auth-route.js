const express = require("express");
const pageRouter = express.Router();
const apiRouter = express.Router();
const {
  loginPage,
  registerPage,
  forgotPasswordPage,
  login,
  registerUser,
  resetPassword,
  users,
} = require("../controllers/auth-controller");
const { fbdb } = require("../services/firebasedb-service");

pageRouter.get("/login", loginPage);
pageRouter.get("/register", registerPage);
pageRouter.get("/forgot-password", forgotPasswordPage);

apiRouter.post("/users", (req, res) => {

  console.log('req.params, req.query', req.params, req.query, req.body);

  fbdb.getAll('users/').then((snapshot) => {
    console.log('snapshot', snapshot);

    if (snapshot.exists()) {
      console.log(JSON.stringify(snapshot.val()));
      res.status(200).json(formatResponse(snapshot.val()));
    } else {
      res.status(400).json(formatResponse(null, "No data available"));
    }
  }).catch((error) => {
    res.status(500).json(formatResponse(error, "No data available"));
  });
});
apiRouter.post("/login", login);
apiRouter.post("/register", registerUser);
apiRouter.post("/forgot-password", resetPassword);

module.exports = {
  pageRouter,
  apiRouter,
};
