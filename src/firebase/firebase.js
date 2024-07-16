import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDrdgGvm91DlzGDYzWDq6tvIxXRRsVoXV4",
  authDomain: "mine-crafter-community.firebaseapp.com",
  databaseURL: "https://mine-crafter-community-default-rtdb.firebaseio.com",
  projectId: "mine-crafter-community",
  storageBucket: "mine-crafter-community.appspot.com",
  messagingSenderId: "999518187868",
  appId: "1:999518187868:web:2e854b5f677cb6886a9199",
  measurementId: "G-F7TQX0JR61"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
