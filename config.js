// Firebase Configuration
// These credentials are for the chatbot-d26a7 project

const firebaseConfig = {
    apiKey: "AIzaSyCU2MQ59Y5xcaAB2nh4sdGdErvmKWpEPVE",
    authDomain: "chatbot-d26a7.firebaseapp.com",
    databaseURL: "https://chatbot-d26a7-default-rtdb.firebaseio.com",
    projectId: "chatbot-d26a7",
    storageBucket: "chatbot-d26a7.firebasestorage.app",
    messagingSenderId: "992792638905",
    appId: "1:992792638905:web:a379ec1aba545d7e567268",
    measurementId: "G-HPGXFBZV6V"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get reference to the database
const database = firebase.database();
