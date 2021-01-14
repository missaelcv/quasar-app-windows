import * as firebase from "firebase/app";
import "firebase/firestore";

// Agregar configuración firebase:
var firebaseConfig = {
    apiKey: "AIzaSyANhx4f2F4IEt3bVIXM6arqJfFPYpkua8I",
    authDomain: "vue-js-firebase-quasar.firebaseapp.com",
    projectId: "vue-js-firebase-quasar",
    storageBucket: "vue-js-firebase-quasar.appspot.com",
    messagingSenderId: "628455078147",
    appId: "1:628455078147:web:6d71552302803df4e21136"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export { db, firebase };