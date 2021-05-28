const { encrypt } = require("../services/encryption-service");

const dotenv = require("dotenv").config();

const config = {
  projectName: process.env.PROJECT_NAME,
  port: process.env.PORT || 3215,
  fbdburl: process.env.FB_URL,
  encryptionKey: encrypt(this.projectName),

  // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
  firebase: {
    apiKey: process.env.FB_API_KEY,
    authDomain: `${process.env.PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${process.env.PROJECT_ID}.firebaseio.com`,
    projectId: process.env.PROJECT_ID,
    storageBucket: `${process.env.PROJECT_ID}.appspot.com`,
    // messagingSenderId: "SENDER_ID",
    // appId: "APP_ID",
    // measurementId: "G-MEASUREMENT_ID",
  },
};

module.exports = config;
