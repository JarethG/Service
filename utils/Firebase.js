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
import {getDatabase, ref, onValue, set, push, update, remove,get,child} from 'firebase/database';
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

export async function pushMessage(chatID, message, userID) {
    let now = Date.now()
    await push(ref(rtdb, 'chats/' + chatID), {
        userID: userID,
        message: message,
        timestamp: now
    });

    await update(ref(rtdb, 'chatHeaders/' + chatID), {
        lastMessage:message,
        lastTimeStamp: now
    });
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

export async function setChatState(chatID, data) {
    await set(ref(rtdb, 'chatState/' + chatID), {
        isComplete: "",
        acceptingUserEmail: "",
        client: data.name,
        clientEmail: data.account,
        jobTitle: data.title
    });
}

export async function getChatState(chatID, callback){
    onValue(ref(rtdb, 'chatState/' + chatID), (snapshot) => {
        if (snapshot.exists()) {
            callback(snapshot.val())
        }
    })
}

export async function setChatHeader(chatID, data) {
    console.log(data)
    await set(ref(rtdb, 'chatHeaders/'+ chatID), {
        isComplete:false,
        reviewSubmitted:false,
        client: data.name,
        jobTitle:data.title,
        acceptingUser: "",
        lastMessage: "waiting for someone to accept your offer",
        lastTimeStamp: Date.now(),
    });
}

export async function getChatHeaders(chatID, callback) {
    console.log("called")
    await onValue(ref(rtdb, 'chatHeaders/' + chatID), (snapshot) => {
        let header = snapshot.val()
        console.log("firebase header = +>",header)
        header.id = chatID
        callback(old =>[...old,header])
    }, {
        onlyOnce: true
    })
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
    return offers.reverse()
}

export async function proposeJobCompleted(requestID, userEmail) {
    await update(ref(rtdb, 'chatState/' + requestID), {
        isComplete: userEmail
    });
}

export async function acceptJobCompletion(requestID) {
    await update(ref(rtdb, 'chatHeaders/' + requestID), {
        isComplete: true
    });
}

export async function postReview(review,request,userEmail,userName){
    console.log("Firebase post review requests:",request)
    const docRef = await addDoc(collection(db, "Reviews"), review);

// Atomically add a new region to the "regions" array field.
    await updateDoc(getUserDoc(userEmail), {
        myReviews: arrayUnion(docRef.id)
    });


    if(request.reviewSubmitted==false) {
        //notify header that the first review has been submitted
        await update(ref(rtdb, 'chatHeaders/' + request.id), {
            reviewSubmitted: true
        });
        //remove individual access to request
        await updateDoc(getUserDoc(userEmail),
        request.client==userName?
            {myRequests: arrayRemove(request.id)}:
            {acceptedRequests: arrayRemove(request.id)}
        );
    } else {

        await updateDoc(getUserDoc(userEmail),
            request.client==userName?
                {myRequests: arrayRemove(request.id)}:
                {acceptedRequests: arrayRemove(request.id)}
        );
        //remove all content relating to request
        console.log(request.id)
        await deleteDoc(doc(db, "Requests", request.id));
        console.log(request.id)
        await remove(ref(rtdb, 'chatHeaders/' + request.id))
        console.log(request.id)
        await remove(ref(rtdb, 'chatState/' + request.id))
        console.log(request.id)
        await remove(ref(rtdb, 'chats/' + request.id))
    }

}

export async function deleteRequest(requestID, userEmail) {
    //delete the main request doc
    await deleteDoc(doc(db, "Requests", requestID));

    await updateDoc(getUserDoc(userEmail), {
        myRequests: arrayRemove(requestID)
    });

    //delete chat and chat head references
    await remove(ref(rtdb, 'chatHeaders/' + requestID))
    await remove(ref(rtdb, 'chatState/' + requestID))
    await remove(ref(rtdb, 'chats/' + requestID))
}

export async function getMyRequests(email) {
    const q = query(collection(db, "Requests"), where("account", "==", email));
    const querySnapshot = await getDocs(q);
    let offers = querySnapshot.docs.map((doc) => {
        return {id: doc.id, doc: doc.data()}
    })
    return offers
}

export async function acceptRequest(requestID, userEmail,userName) {
    //set accepted boolean to true
    const requestDoc = doc(db,"Requests", requestID)
    await updateDoc(requestDoc, {
        accepted: true
    });
    //add request to accepting users account
    const userDoc = doc(db, "Users", userEmail);
    await updateDoc(userDoc, {
        acceptedRequests: arrayUnion(requestID)
    });
    //update chatHeader to reflect acceptance
    await update(ref(rtdb, 'chatState/' + requestID), {
        acceptingUser:userName,
        acceptingUserEmail:userEmail
    });
    await update(ref(rtdb, 'chatHeaders/' + requestID), {
        acceptingUser:userName
    });
    pushMessage(requestID, "hey, my name is " + userName+ ". I think I can help you", userEmail)
        .then(console.log("request accepted"))
}

export async function newRequest(request, userEmail) {
    const docRef = await addDoc(collection(db, "Requests"), request);

// Atomically add a new region to the "regions" array field.
    await updateDoc(getUserDoc(userEmail), {
        myRequests: arrayUnion(docRef.id)
    });
    await setChatHeader(docRef.id, request)
    await setChatState(docRef.id, request)
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
        points: Math.floor(Math.random()*100)
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

export async function updateProfile(userEmail, profileData) {
    await updateDoc(doc(db, "Users", userEmail.toLowerCase()), {
        about: profileData.about,
        name: profileData.name,
        resources: profileData.resources,
        skills: profileData.skills,
        title: profileData.title,
    });
}

export async function createDummyData(data) {
    data.map(async (item) => {
        const request = item;
        await setDoc(doc(db, "Requests", item.key), request).then(console.log("done =>", item.key))
        await updateDoc(getUserDoc(item.account), {
            myRequests: arrayUnion(item.key)
        });
        await setChatHeader(item.key, request)
        await setChatState(item.key,request)
    });
}

export async function deleteDummyData(data) {
    data.map(async (item) => {
        await deleteRequest(item.key,item.account)
    });
}

export async function deleteCollection(collectionPath, batchSize) {
    const q = query(collection(db, collectionPath), limit(batchSize))
    return new Promise((resolve, reject) => {
        deleteQueryBatch(q, resolve).catch(reject);
    });
}

 async function deleteQueryBatch(query, resolve) {
     const snapshot = await getDocs(query);
    const batchSize = snapshot.size;
    if (batchSize === 0) {
        resolve();
        return;
    }
    snapshot.docs.forEach((doc) => {
        deleteDoc(doc.ref);
    });
}

export async function addPoints(userEmail) {
    await updateDoc(getUserDoc(userEmail), {
        points: increment(1)
    });
}
