const { initializeApp } = require("firebase/app");
//const { initializeApp } = require("firebase-admin/app");

const dotenv = require("dotenv");
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

const app = initializeApp(firebaseConfig);

module.exports = app;
