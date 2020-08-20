import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCMIDnlLs7DyzTnKRZJlHDtQAFxXgMS29Q",
    authDomain: "wizy-clothing-db.firebaseapp.com",
    databaseURL: "https://wizy-clothing-db.firebaseio.com",
    projectId: "wizy-clothing-db",
    storageBucket: "wizy-clothing-db.appspot.com",
    messagingSenderId: "475925612514",
    appId: "1:475925612514:web:e292e2b21732176bae1bbb",
    measurementId: "G-BEWYXD5HSR"
};

export const createUserProfileDocument = async (userAuth, addtionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...addtionalData
            })
        } catch (error) {
            console.log('error creating user', error)
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

