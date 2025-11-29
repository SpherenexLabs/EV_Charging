import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "intel-gesture.firebaseapp.com",
    databaseURL: "https://intel-gesture-default-rtdb.firebaseio.com",
    projectId: "intel-gesture",
    storageBucket: "intel-gesture.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
