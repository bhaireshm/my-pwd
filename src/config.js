const dotenv = require("dotenv").config();

const config = {
  projectName: process.env.PROJECT_NAME,
  port: process.env.PORT || 3215,

  // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
  firebaseConfig: {
    apiKey: process.env.FB_API_KEY,
    authDomain: "PROJECT_ID.firebaseapp.com",
    databaseURL: "https://PROJECT_ID.firebaseio.com",
    projectId: "PROJECT_ID",
    storageBucket: "PROJECT_ID.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID",
    measurementId: "G-MEASUREMENT_ID",
  },
};


module.exports = config;
