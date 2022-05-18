import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc,getDocs,collection,getDoc} from 'firebase/firestore';
import { getDatabase, ref, onValue } from 'firebase/database';
import React from "react";
import * as firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyC3YZcmR4Q_mHcA381qJYamGj8xsYT5cAY",
    authDomain: "community-exchange-36fb6.firebaseapp.com",
    // databaseURL: "https://community-exchange-36fb6-default-rtdb.firebaseio.com",
    projectId: "community-exchange-36fb6",
    storageBucket: "community-exchange-36fb6.appspot.com",
    messagingSenderId: "439003403125",
    appId: "1:439003403125:web:34b9dd7b5ef52bf9f5793c",
    measurementId: "G-PJ5QRPDMXN"
    //????
    // databaseURL: 'https://project-id.firebaseio.com',}  // apiKey, authDomain, etc. (see above)
}


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default app;

export async function sendMessage(messageID, message) {
    await setDoc(doc(db, "Requests", messageID), {
        message:message
    });
}

export async function newOffer(request) {
    await setDoc(doc(db, "Offers"), request);
}

export async function newProfile(userEmail,profileData) {
    await setDoc(doc(db, "Users", userEmail.toLowerCase()), {
        about:profileData.about,
        name:profileData.name,
        resources:profileData.resources,
        skills:[],
        title:profileData.title
    });
}

export async function updateProfile(userEmail,profileData) {
    await setDoc(doc(db, "Users", userEmail.toLowerCase()), {
        about:profileData.about,
        name:profileData.name,
        resources:profileData.resources,
        skills:[],
        title:profileData.title
    });
}

export async function getProfile(email){
    const docRef = doc(db, "Users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    return docSnap.data()
}
