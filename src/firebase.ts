import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyD6QqmGEEy-uTUdIUFHC38mbtuv3kGMLoU',
  authDomain: 'school-9b924.firebaseapp.com',
  databaseURL: 'https://school-9b924-default-rtdb.firebaseio.com/',
  projectId: 'school-9b924',
  storageBucket: 'school-9b924.appspot.com',
  messagingSenderId: '612048409247'
};
const app = initializeApp(firebaseConfig);

// Example usage: Access Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
export { app, db, auth };