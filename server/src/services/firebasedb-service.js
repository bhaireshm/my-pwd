const config = require("../helper/config");
const firebaseService = require("firebase");

// export interface AuthResponseData {
//   idToken: string; //	A Firebase Auth ID token for the newly created user.
//   email: string; //	The email for the newly created user.
//   refreshToken: string; //	A Firebase Auth refresh token for the newly created user.
//   expiresIn: string; //	The number of seconds in which the ID token expires.
//   localId: string; //	The uid of the newly created user.
//   registered?: boolean;
// }

firebaseService.initializeApp(config.firebase);

// Get a reference to the database service
// var database = firebase.database();

module.exports = firebaseService;

