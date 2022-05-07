import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

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

initializeApp(firebaseConfig);

const firestore = getFirestore();

export async function sendMessage(messageID, message) {
    await setDoc(doc(firestore, "Requests", messageID), {
        message:message
    });
}


// export function sendMessage(messageID, message) {
//     const db = getDatabase();
//     const reference = ref(db, 'Requests/' + messageID);
//     set(reference, {
//         message:message,
//     }).then(r => console.log("message sent |>" + r));
// }