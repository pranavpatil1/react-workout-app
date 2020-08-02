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
const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
};

const getUserDocument = async uid => {
    if (!uid) return null;
    console.log("uid", uid);
    try {
      const userDocument = await firestore.doc(`users/${uid}`).get();
      console.log("doc", userDocument);
      return {
        uid,
        ...userDocument.data()
      };
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };

export const generateUserDocument  = async (user, additionalData) => {
    if (!user) return;
    const userRef = firestore.collection('users').doc(`${user.uid}`);
    const snapshot = await userRef.get();
    console.log("snapshot", snapshot);
    if (!snapshot.exists) {
        const {email, displayName, photoURL} = user;
        console.log("doesn't exist, creating")
        console.log(email, displayName, photoURL);
        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                ...additionalData
            });
        } catch (error) {
            console.log("Error creating user document", error);
        }
    }
    return getUserDocument(user.uid);
}

