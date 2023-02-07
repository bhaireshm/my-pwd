const firebaseService = require("firebase/app");
const firebaseAuthService = require("firebase/auth");
const firebaseDB = require("firebase/database");

const config = require("../helper/config");

const firebase = {
    firebaseApp: firebaseService.initializeApp(config.firebase),
    firebaseAuth: firebaseAuthService,
    firebaseUser: firebaseAuthService.currentUser,
    firebaseDB,
};


firebase["fbdb"] = {
    ref: function (...args) {
        return firebaseDB.ref(firebaseDB.getDatabase(), ...args);
    },
    create: function (url, data) {
        return firebaseDB.ref(firebaseDB.getDatabase(), url).set(data);
    },
    on: function (url, key, cb) {
        firebase.firebaseApp.database().ref(url).on(key, (snapshot) => {
            const data = snapshot.val();
            if (cb) cb(data, snapshot);
            else return data;
        });
    },
    getAll: function (url) {
        return firebaseDB.ref().child(url).get();
    }
}

module.exports = firebase;
