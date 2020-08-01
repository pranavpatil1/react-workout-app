import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCWIqxGo5OtGugkzTxKI0ckSfClwiyoE8s",
    authDomain: "workout-share-3145b.firebaseapp.com",
    databaseURL: "https://workout-share-3145b.firebaseio.com",
    projectId: "workout-share-3145b",
    storageBucket: "workout-share-3145b.appspot.com",
    messagingSenderId: "982113370163",
    appId: "1:982113370163:web:dccb622e4e8b658fd8e346",
    measurementId: "G-83BVVVG60D"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();