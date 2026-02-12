// Firebase Configuration
// You need to replace these with your own Firebase project credentials
// Get these from your Firebase console: https://console.firebase.google.com/

const firebaseConfig = {
    apiKey: "AIzaSyDummyKeyReplaceMeWithYourOwnKey",
    authDomain: "chatbot-12345.firebaseapp.com",
    projectId: "chatbot-12345",
    storageBucket: "chatbot-12345.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get reference to the database
const database = firebase.database();
