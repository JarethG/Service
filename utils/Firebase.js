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
} from 'firebase/firestore';
import {
    getDatabase,
    ref,
    onValue,
    set,
    push,
    update,
    remove,
    get,
    child,
    orderByChild,
    limitToLast,
    increment,
    runTransaction
} from 'firebase/database';
import React from "react";
import {Alert} from "react-native";

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

export async function proposeJobCompleted(id, uid) {
    await update(ref(rtdb, 'chat-room/' + id + '/chat'), {
        settled: true,
        settledID: uid
    });
}

export async function acceptJobCompletion(id) {
    await update(ref(rtdb, 'chat-room/' + id + '/chat'), {
        isComplete: true,
        reviews: 0
    });
    update(ref(rtdb, 'chat-room/' + id + '/chat/lastMessage'), {
        message: "Leave review!",
        timestamp: Date.now()
    }).then()
}

export function writeReview(uid, uid2, chatId, review) {

    //make new key for review
    let key = push(ref(rtdb, 'reviews'), review).key
    //add user access to both parties
    set(ref(rtdb, 'user-reviews/' + uid2 + '/to/' + key), true).then()
    set(ref(rtdb, 'user-reviews/' + uid + '/from/' + key), true).then()
    //add points to reviewed users profile
    update(ref(rtdb, 'public/' + uid2), {
        points: increment(10 + review.rating)
    }).then()
    //inc number of reviews
    update(ref(rtdb, 'chat-room/' + chatId + '/chat'), {
        reviews: 1
    }).then();
    //remove user access to chat-room
    remove(ref(rtdb, 'user-chats/' + uid + '/' + chatId)).then()
}

export function closeChatRoom(chat) {
    remove(ref(rtdb, 'chat-room/' + chat.id)).then()
    chat.description ?
        remove(ref(rtdb, 'user-posts/' + chat.uid + '/' + chat.id)).then()
        :
        remove(ref(rtdb, 'user-resources/' + chat.uid + '/' + chat.id)).then()
}

export async function postReview(review, request, userEmail, userName) {
    console.log("Firebase post review requests:", review)
    const docRef = await addDoc(collection(db, "Reviews"), review);
    console.log("mark 0")
// Atomically add a new region to the "regions" array field.
    await updateDoc(getUserDoc(userEmail), {
        myReviews: arrayUnion(docRef.id)
    });
    console.log("mark 1")

    if (request.reviewSubmitted == false) {
        console.log("mark 2")
        //notify header that the first review has been submitted
        await update(ref(rtdb, 'chatHeaders/' + request.id), {
            reviewSubmitted: true
        });
        console.log("mark 3")
        //remove individual access to request
        await updateDoc(getUserDoc(userEmail),
            request.client == userName ?
                {myRequests: arrayRemove(request.id)} :
                {acceptedRequests: arrayRemove(request.id)}
        );
        console.log("mark 4")
    } else {
        await updateDoc(getUserDoc(userEmail),
            request.client == userName ?
                {myRequests: arrayRemove(request.id)} :
                {acceptedRequests: arrayRemove(request.id)}
        );
        //remove all content relating to request
        // console.log(request.id)
        await deleteDoc(doc(db, "Requests", request.id));
        // console.log(request.id)
        await remove(ref(rtdb, 'chatHeaders/' + request.id))
        // console.log(request.id)
        await remove(ref(rtdb, 'chatState/' + request.id))
        // console.log(request.id)
        await remove(ref(rtdb, 'chats/' + request.id))
    }

}

export function writeNewPost(uid, post) {
    let key = push(ref(rtdb, 'posts'), post).key
    set(ref(rtdb, 'user-posts/' + uid + '/' + key), true).then()
}

export function writeResourceOffers(uid, post) {
    let key = push(ref(rtdb, 'posts'), post).key
    set(ref(rtdb, 'user-resources/' + uid + '/' + key), true).then()
}

export function clearResourceOffers(uid) {
    get(ref(rtdb, 'user-resources/' + uid))
        .then((snapshot) => {
            if (snapshot.exists()) {
                let ids = []
                snapshot.forEach((postID) => {
                    ids.push(postID.key)
                })
                ids.forEach((id) => {
                    remove(ref(rtdb, 'posts/' + id)).then()
                })
            }
        })
    remove(ref(rtdb, 'user-resources/' + uid)).then()
}

function keysToRef(uid, keyPath, refPath) {
    get(ref(rtdb, 'user-resources/' + uid)).then(async (snapshot) => {
        if (snapshot.exists()) {
            let ids = []
            snapshot.forEach((postID) => {
                ids.push(postID.key)
            })
            const promises = ids.map(async (id) => {
                return await get(ref(rtdb, 'posts/' + id))

            })
            const res = await Promise.all(promises)
            callback(res.map(e => e.val()).filter(r => r != null))
        }
    })
}

export function readPosts(callback) {
    let reference = ref(rtdb, 'posts')
    const q = query(reference)
    onValue(q, (snapshot) => {
        let posts = []
        snapshot.forEach((post) => {
            let p = post.val();
            p["id"] = post.key
            posts.push(p)
        })
        callback(posts)
    })
}

export function acceptPost(uid, name, post, firstMessage) {
    //add accepting users uid so review can be added at the end
    post["uid2"] = uid
    post["name2"] = name
    //create chatroom
    set(ref(rtdb, 'chat-room/' + post.id + '/chat'), post).then()
    push(ref(rtdb, 'chat-room/' + post.id + '/messages'), firstMessage)
    //remove the post
    remove(ref(rtdb, 'posts/' + post.id)).then()
    //set user access
    set(ref(rtdb, 'user-chats/' + uid + '/' + post.id), true).then()
    //add other user
    set(ref(rtdb, 'user-chats/' + post.uid + '/' + post.id), true).then()
}

export async function getMyPosts(uid, callback) {
    get(ref(rtdb, 'user-posts/' + uid)).then(async (snapshot) => {
        if (snapshot.exists()) {
            let ids = []
            snapshot.forEach((postID) => {
                ids.push(postID.key)
            })
            const promises = ids.map(async (id) => {
                return await get(ref(rtdb, 'posts/' + id))

            })
            const res = await Promise.all(promises)
            callback(res.map(e => e.val()).filter(r => r != null))
        }
    })
}

export async function getMyResourceOffers(uid, callback) {
    get(ref(rtdb, 'user-resources/' + uid)).then(async (snapshot) => {
        if (snapshot.exists()) {
            let ids = []
            snapshot.forEach((postID) => {
                ids.push(postID.key)
            })
            const promises = ids.map(async (id) => {
                return await get(ref(rtdb, 'posts/' + id))

            })
            const res = await Promise.all(promises)
            callback(res.map(e => e.val()).filter(r => r != null))
        }
    })
}

export async function readChats(uid, callback) {
    onValue(ref(rtdb, 'user-chats/' + uid), async (snapshot) => {
        if (snapshot.exists()) {
            let ids = []
            snapshot.forEach((postID) => {
                ids.push(postID.key)
            })
            const promises = ids.map(async (id) => {
                return await get(ref(rtdb, 'chat-room/' + id + '/chat'))
            })
            const res = await Promise.all(promises)
            callback(res.map(e => e.val()).filter(r => r != null))
        } else callback([])
    })
}

export async function getChat(id, callback) {
    await onValue(ref(rtdb, 'chat-room/' + id + '/chat'), (snapshot) => {
        if (snapshot.exists())
            callback(snapshot.val())
    })
}

export function readMessages(id, callback) {
    onValue(ref(rtdb, 'chat-room/' + id + '/messages'), (snapshot) => {
        let list = [];
        snapshot.forEach(message => {
            list.push(message.val())
        })
        callback(list)
    })
}

export function writeMessage(id, message) {
    push(ref(rtdb, 'chat-room/' + id + '/messages'), message);
    update(ref(rtdb, 'chat-room/' + id + '/chat/lastMessage'), message).then()
}

export async function readReviews(uid, from, to) {

    get(ref(rtdb, 'user-reviews/' + uid + '/from')).then(async (snapshot) => {
        if (snapshot.exists()) {
            let ids = []
            snapshot.forEach((postID) => {
                ids.push(postID.key)
            })
            const promises = ids.map(async (id) => {
                return await get(ref(rtdb, 'reviews/' + id))

            })
            const res = await Promise.all(promises)
            from(res.map(e => e.val()).filter(r => r != null))
        }
    })

    get(ref(rtdb, 'user-reviews/' + uid + '/to')).then(async (snapshot) => {
        if (snapshot.exists()) {
            let ids = []
            snapshot.forEach((postID) => {
                ids.push(postID.key)
            })
            const promises = ids.map(async (id) => {
                return await get(ref(rtdb, 'reviews/' + id))

            })
            const res = await Promise.all(promises)
            to(res.map(e => e.val()).filter(r => r != null))
        }
    })
}

export function readMyPublicData(uid, callback) {
    get(ref(rtdb, 'public/' + uid)).then(async (snapshot) => {
        if (snapshot.exists()) {
            callback(snapshot.val())
        }
    })
}

export async function newProfile(userEmail, profileData) {
    await setDoc(doc(db, "Users", userEmail.toLowerCase()), {
        avatar: profileData.avatar,
        about: profileData.about,
        name: profileData.name,
        resources: profileData.resources,
        skills: profileData.skills,
        title: profileData.title,
        acceptedRequests: [],
        myRequests: [],
        points: profileData.points
    });
}

export async function getProfile(email, callback) {
    const docRef = doc(db, "Users", email);
    const docSnap = await onSnapshot(docRef, (doc) => {
        let profileData = doc.data()
        profileData["email"] = email
        // console.log("Firebase/getprofile/ => profile reloaded")
        callback(profileData)
    });

    if (docSnap) {
        // console.log("Document data:", docSnap.data());
        // console.log("success");
    } else {
        // doc.data() will be undefined in this case
        // console.log("No such document!");
    }
}

export async function updateProfile(userEmail, profileData) {
    await updateDoc(doc(db, "Users", userEmail.toLowerCase()), {
        avatar: profileData.avatar,
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
        await setChatState(item.key, request)
    });
}

export async function deleteDummyData(data) {
    data.map(async (item) => {
        await deleteRequest(item.key, item.account)
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

export async function updatePublicUserInfo(updates, authToken) {
    await update(ref(rtdb, 'public/' + authToken), {
        "name": updates.name,
        "avatar": updates.avatar
    });
}

export async function setPublicUserInfo(data, authToken) {
    await set(ref(rtdb, 'public/' + authToken), {
        "name": data.name,
        "points": data.points,
        "monthlyPoints": data.points,
        "avatar": data.avatar,
        "rank": "bronze"
    });
}

export async function getLeaderBoard(callback) {
    const q = query(ref(rtdb, 'public'),
        orderByChild("monthlyPoints"),
        limitToLast(10)
    )
    await onValue(q, (snapshot) => {
        let leaders = [];
        snapshot.forEach((item) => {
            console.log(item.val())
            leaders.push(item.val())
        })
        callback(leaders.reverse())
    }, {
        onlyOnce: true
    })
}

export async function addNewInfoRTDB(path, key, value) {
    const q = query(ref(rtdb, path))
    await onValue(q, (snapshot) => {
        snapshot.forEach((item) => {
            let payLoad = {}
            payLoad[key] = value
            update(ref(rtdb, path + '/' + item.key), payLoad);
        })
    }, {
        onlyOnce: true
    })
}

export async function updateAllUsersRankings(role) {
    if (role == "admin") {
        const postRef = ref(rtdb, 'public');
        await runTransaction(postRef, (post) => {
            if (post) {
                Object.keys(post).forEach(function (key, index) {
                    console.log(post[key])
                    if (post[key].rank == "bronze" && post[key].monthlyPoints >= 100) {
                        post[key].rank = "silver"
                    } else if (post[key].rank == "silver" && post[key].monthlyPoints >= 100) {
                        post[key].rank = "gold"
                    } else if (post[key].rank == "silver" && post[key].monthlyPoints <= 10) {
                        post[key].rank = "bronze"
                    } else if (post[key].rank == "gold" && post[key].monthlyPoints <= 10) {
                        post[key].rank = "silver"
                    }
                    post[key].points += post[key].monthlyPoints;
                    post[key].monthlyPoints = 0;

                });
            } else {
                console.log("error")
            }
            return post
        });
    } else Alert.alert("Please contact the owner of this app." +
        "You should not have access to this and it likely means that" +
        "your security might be at risk!")
}

