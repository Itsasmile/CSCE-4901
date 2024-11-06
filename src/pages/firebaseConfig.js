// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD6QqmGEEy-uTUdIUFHC38mbtuv3kGMLoU',
  authDomain: 'school-9b924.firebaseapp.com',
  databaseURL: 'https://school-9b924-default-rtdb.firebaseio.com/',
  projectId: 'school-9b924',
  storageBucket: 'school-9b924.appspot.com',
  messagingSenderId: '612048409247',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
