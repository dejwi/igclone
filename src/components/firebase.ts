import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth';
import 'firebase/compat/storage';

import firebase_config from '../firebase-config.json';

if (!firebase.apps.length) {
    firebase.initializeApp(firebase_config);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const timestamp = ()=>firebase.firestore.FieldValue.serverTimestamp();
