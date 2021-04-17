const express = require("express");
const authRoutes = require("./auth-route");
const { log } = require("../helper/logger");

const router = express.Router();
router.use(authRoutes);

router.get("/", (req, res) => {
  res.send("Home Page rendering");
});

module.exports = router;
