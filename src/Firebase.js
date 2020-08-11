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
    try {
      const userDocument = await firestore.doc(`users/${uid}`).get();
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
    if (!snapshot.exists) {
        const {email, displayName, photoURL} = user;
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

export const serverAddWorkout = async workout => {
    if (!workout) return;
    const db = firestore.collection('workouts');
    var res = "";
    try {
        res = await db.add(workout);
    } catch (error) {
        console.log("Error updating workout", error);
    }
    return res.id;
};

export const serverGetUserWorkouts = async uid => {
    if (!uid) return;
    var result = [];
    const db = firestore.collection('workouts');
    const snapshot = await db.where('uid','==',uid).get()
    for (var i in snapshot.docs) {
        const doc = snapshot.docs[i];
        result.push({
            id: doc.id,
            workout: doc.data()
        })
    }
    return result;
};

export const serverGetPublicWorkouts = async uid => {
    if (!uid) return;
    var result = [];
    const db = firestore.collection('workouts');
    const snapshot = await db.where('isPublic','==',true).get()
    for (var i in snapshot.docs) {
        const doc = snapshot.docs[i];
        result.push({
            id: doc.id,
            workout: doc.data()
        })
    }
    return result;
};
export const serverGetWorkoutById = async id => {
    if (!id) return;
    const ref = firestore.collection('workouts').doc(id);
    const snapshot = await ref.get();
    if (!snapshot.exists) {
        return null;
    } else {
        return snapshot.data();
    }
};

export const serverUpdateWorkout = async (id, workout) => {
    if (!id) return;
    const userRef = firestore.collection('workouts').doc(id);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        console.log("Error: updating non-existent workout");
    } else {
        try {
            await userRef.update(workout);
        } catch (error) {
            console.log("Error updating workout", error);
        }
    }
};