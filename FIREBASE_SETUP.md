# 1-on-1 Chat - Firebase Setup Guide

This guide shows you how to set up Firebase for your chat application.

## Quick Start (5 minutes)

### 1. Create Firebase Project
- Go to https://console.firebase.google.com/
- Click "Add project"
- Enter a project name (e.g., "chatbot")
- Click through the setup wizard

### 2. Enable Realtime Database
- In your Firebase Console, click "Build" in the left sidebar
- Select "Realtime Database"
- Click "Create Database"
- Choose a location (default is fine)
- Select "Start in Test Mode"
- Click "Create"

### 3. Copy Your Firebase Config
- Click the gear icon ⚙️ → "Project Settings"
- Scroll down to "Your apps"
- Click the "</>" (Web) icon to create a web app
- Copy the Firebase config object that appears

### 4. Update config.js
Open `config.js` in your editor and replace this:
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyDummyKeyReplaceMeWithYourOwnKey",
    authDomain: "chatbot-12345.firebaseapp.com",
    projectId: "chatbot-12345",
    storageBucket: "chatbot-12345.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};
```

With your actual Firebase config (looks like):
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "your-project-abc123.firebaseapp.com",
    projectId: "your-project-abc123",
    storageBucket: "your-project-abc123.appspot.com",
    messagingSenderId: "123456789123",
    appId: "1:123456789123:web:abcdef123456"
};
```

### 5. Test Before Deploying
- Open `index.html` locally in your browser
- Click the ⚙️ button
- Make sure it loads without errors (check browser console with F12)
- Try sending a test message

### 6. Deploy to GitHub Pages
- Push to your GitHub repository
- Go to repository Settings → Pages
- Select your branch as the source
- Your site goes live at `https://username.github.io/Chatbot/`

## For Production / Security

If using this with potentially sensitive conversations:

### Add Authentication (Optional)
1. Go to Firebase Console → Build → Authentication
2. Set up sign-in method (Email/Password, Google, etc.)
3. Update `app.js` to validate users before allowing access

### Secure Your Database
1. Go to Realtime Database → Rules
2. Replace with:
```json
{
  "rules": {
    "chats": {
      "$userId": {
        ".read": "auth.uid == $userId",
        ".write": "auth.uid == $userId"
      }
    }
  }
}
```

### Limit Message Size
Add validation in your rules:
```json
{
  "rules": {
    "chats": {
      "$userId": {
        "$messageId": {
          ".validate": "newData.child('text').val().length < 1000"
        }
      }
    }
  }
}
```

## Troubleshooting

**Error: "Cannot find firebase" or 404 errors**
- Check your internet connection
- Verify you're loading from HTTPS (local file won't work)
- Check that `config.js` loads in the Network tab (F12 → Network)

**"Firebase config is invalid"**
- Double-check you copied the entire config
- Make sure there are no typos
- Verify all quotes and braces match

**"Cannot read/write to database"**
- Go to Realtime Database → Rules
- Currently should be in Test Mode (allows all reads/writes)
- If you modified rules, check them for errors

**Messages don't appear**
- Check browser console (F12)
- Verify both chat room IDs are correct
- Refresh the page
- Make sure database connection shows "Connected"

## Firebase Pricing

Firebase is free for most use cases! The Realtime Database free tier includes:
- 100 simultaneous connections
- 1 GB stored data
- 10 GB downloaded data per month

This is perfect for a small personal chat. If you exceed limits, you can upgrade anytime.

## Getting Help

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Community](https://stackoverflow.com/questions/tagged/firebase)
- [Discord Firebase Community](https://discord.gg/firebase)
