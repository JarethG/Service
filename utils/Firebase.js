import {initializeApp} from 'firebase/app';
import {
    getFirestore,
    setDoc,
    addDoc,
    doc,
    getDocs,
    deleteDoc,
    collection,
    getDoc,
    limit,
    query,
    updateDoc,
    arrayUnion,
    where,
    onSnapshot,
    arrayRemove,
    increment
} from 'firebase/firestore';
import {getDatabase, ref, onValue, set, push, update, remove} from 'firebase/database';
import React from "react";

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
const rtdb = getDatabase(app);

export default app;

function getUserDoc(userEmail) {
    return doc(db, "Users", userEmail);
}

export async function deleteRequest(requestID, userEmail) {
    //delete the main request doc
    await deleteDoc(doc(db, "Requests", requestID));
    //delete doc reference id from profile
    await updateDoc(getUserDoc(userEmail), {
        myRequests: arrayRemove(requestID)
    });
    //delete chat and chat head references
    await remove(ref(rtdb, 'chatHeaders/' + requestID))
    await remove(ref(rtdb, 'chats/' + requestID))
}

export async function addPoints(userEmail) {
    await updateDoc(getUserDoc(userEmail), {
        points: increment(1)
    });
}

export async function pushMessage(chatID, message, userID) {
    await push(ref(rtdb, 'chats/' + chatID), {
        userID: userID,
        message: message,
        timestamp: Date.now()
    });
}

export async function createChatHeader(chatID, data) {
    await set(ref(rtdb, 'chatHeaders/' + chatID), {
        isComplete: "",
        acceptingUser: "",
        acceptingUserEmail: "",
        client: data.name,
        clientEmail: data.account,
        jobTitle: data.title,
        lastMessage: "waiting for someone to accept your offer",
        lastTimeStamp: Date.now(),
    });
}

export async function proposeJobCompleted(requestID, userEmail) {
    await update(ref(rtdb, 'chatHeaders/' + requestID), {
        isComplete: userEmail
    });
}

export async function acceptJobCompletion(request) {
    //delete header,chat,client references
    await deleteRequest(request.id, request.clientEmail)
    //delete accepting user reference
    await updateDoc(getUserDoc(request.acceptingUserEmail), {
        acceptedRequests: arrayRemove(request.id)
    });
    // add points
    await addPoints(request.clientEmail)
    await addPoints(request.acceptingUserEmail)
}

export async function getChatHeaders(chatID, callback) {
    onValue(ref(rtdb, 'chatHeaders/' + chatID), (snapshot) => {
        if (snapshot.exists()) {
            let header = snapshot.val()
            header.id = chatID
            let found = false
            callback(old => old.map((id) => {
                if (id.id != chatID) {
                    return id
                } else {
                    found = true;
                    return header
                }
            }))
            if (!found) callback(old => [...old, header])
        }

    })
}

export function getMessage(chatID, userID, callback) {
    onValue(ref(rtdb, 'chats/' + chatID), (snapshot) => {
        let list = [];
        snapshot.forEach(snap => {
            const issue = snap.val();
            list.push(issue)
        })
        callback(list)
    })
}

export async function getMyRequests(email) {
    const q = query(collection(db, "Requests"), where("account", "==", email));
    const querySnapshot = await getDocs(q);
    let offers = querySnapshot.docs.map((doc) => {
        return {id: doc.id, doc: doc.data()}
    })
    return offers
}

export async function acceptRequest(requestID, userEmail) {
    await updateDoc(getUserDoc(userEmail), {
        acceptedRequests: arrayUnion(requestID)
    });
    const requestDoc = doc(db, "Requests", requestID);
    await updateDoc(requestDoc, {
        accepted: true
    });

}


export async function newRequest(request, userEmail) {
    const docRef = await addDoc(collection(db, "Requests"), request);

// Atomically add a new region to the "regions" array field.
    await updateDoc(getUserDoc(userEmail), {
        myRequests: arrayUnion(docRef.id)
    });
    await createChatHeader(docRef.id, request)
}

export async function newProfile(userEmail, profileData) {
    await setDoc(doc(db, "Users", userEmail.toLowerCase()), {
        about: profileData.about,
        name: profileData.name,
        resources: profileData.resources,
        skills: profileData.skills,
        title: profileData.title,
        acceptedRequests: [],
        myRequests: [],
        points: 0
    });
}

export async function updateProfile(userEmail, profileData) {
    await updateDoc(doc(db, "Users", userEmail.toLowerCase()), {
        about: profileData.about,
        name: profileData.name,
        resources: profileData.resources,
        skills: profileData.skills,
        title: profileData.title,
    });
}

export async function getProfile(email, callback) {
    const docRef = doc(db, "Users", email);
    const docSnap = await onSnapshot(docRef, (doc) => {
        let profileData = doc.data()
        profileData["email"] = email
        console.log("Firebase/getprofile/ => profile reloaded")
        callback(profileData)
    });

    if (docSnap) {
        // console.log("Document data:", docSnap.data());
        console.log("success");
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}

export async function getOffers(max) {
    const q = query(collection(db, "Requests"), limit(max), where("accepted", "==", false))
    const querySnapshot = await getDocs(q);
    let offers = querySnapshot.docs.map((doc) => {
        let offer = doc.data();
        // console.log("docid == ", doc.id)
        offer.requestID = doc.id
        return offer
    })
    return offers
}

export async function createDummyData(data) {
    data.map(async (item) => {
        const request = {
            accepted: false,
            account: item.account,
            type: item.type,
            name: item.name,
            tags: item.tags,
            title: item.title,
            description: item.description
        }
        await setDoc(doc(db, "Requests", item.key), request).then(console.log("done =>", item.key))
        await updateDoc(getUserDoc(item.account), {
            myRequests: arrayUnion(item.key)
        });
        await createChatHeader(item.key, request)
    });
}

export async function deleteDummyData(data) {
    data.map(async (item) => {
        await deleteRequest(item.key,item.account)
    });
}