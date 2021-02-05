import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDGXtWbVKhUcG0h0xeJQsm4Wtjw6-0E9qU",
  authDomain: "crwn-clothing-e092d.firebaseapp.com",
  projectId: "crwn-clothing-e092d",
  storageBucket: "crwn-clothing-e092d.appspot.com",
  messagingSenderId: "511301157301",
  appId: "1:511301157301:web:5c1f08be953713c4be19fc",
  measurementId: "G-M9SKLXLSCD",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`user/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  console.log(collectionRef)
  const batch = firestore.batch();
  
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
  // //   console.log({newDocRef, ...obj})
    batch.set(newDocRef, obj );
  }); 

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (snapshot) => {
  const transformedCollection = snapshot.docs.map(docSnapshot => {
    const { title, items } = docSnapshot.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: docSnapshot.id,
      title,
      items
    }
  } );

  console.log(transformedCollection);
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] =  collection;
    return accumulator;
  }, {});
}

export default firebase;
