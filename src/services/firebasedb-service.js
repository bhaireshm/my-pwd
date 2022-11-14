const config = require("@helper/config");
const firebaseService = require("firebase");
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// export interface AuthResponseData {
//   idToken: string; //	A Firebase Auth ID token for the newly created user.
//   email: string; //	The email for the newly created user.
//   refreshToken: string; //	A Firebase Auth refresh token for the newly created user.
//   expiresIn: string; //	The number of seconds in which the ID token expires.
//   localId: string; //	The uid of the newly created user.
//   registered?: boolean;
// }

firebaseService.initializeApp(config.firebase);


// Get a list of cities from your database
// async function getCities(db) {
//     const citiesCol = collection(db, 'cities');
//     const citySnapshot = await getDocs(citiesCol);
//     const cityList = citySnapshot.docs.map(doc => doc.data());
//     return cityList;
// }




// Get a reference to the database service
// var database = firebase.database();


// module.exports = { getCities, firebaseService, app };
module.exports = firebaseService;

