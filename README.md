# 1-on-1 Chat App

A simple, real-time one-on-one chat application that can be hosted on GitHub Pages. Chat with exactly one person using unique Chat Room IDs.

## Features

- 🔒 One-on-one chat with a specific person
- ⚡ Real-time messaging using Firebase
- 📱 Fully responsive design
- 🔐 Private chat rooms with unique IDs
- 💾 Message history stored in Firebase
- 🎨 Beautiful gradient UI
- 📋 Easy setup - no backend needed

## Setup Instructions

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and create a new project
3. Follow the setup wizard (you can skip Analytics if you want)
4. Once created, go to your project settings

### Step 2: Set Up Realtime Database

1. In Firebase Console, go to **Build** → **Realtime Database**
2. Click **Create Database**
3. Choose a location (close to your users is best)
4. Start in **Test Mode** for quick setup (you can secure it later)
5. Click **Create**
6. Note your database URL (looks like: `https://your-project.firebaseio.com`)

### Step 3: Get Your Firebase Credentials

1. In Firebase Console, click the gear icon (⚙️) → **Project Settings**
2. Scroll to **Your apps** section
3. Click the **</>** icon to add a Web app
4. Follow the setup wizard and copy your Firebase config

Your config should look like:
```javascript
{
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
}
```

### Step 4: Update config.js

1. Open the `config.js` file in this repository
2. Replace the placeholder Firebase config with your actual credentials from Step 3
3. Save the file

### Step 5: Set Security Rules (Important!)

To keep your chat room private, add security rules to your database:

1. In Firebase Console, go to **Realtime Database** → **Rules**
2. Replace the default rules with this:

```json
{
  "rules": {
    "chats": {
      "$userId": {
        ".read": "true",
        ".write": "$uid === $userId",
        ".validate": "newData.hasChildren(['id', 'text', 'timestamp', 'sender'])"
      }
    }
  }
}
```

3. Click **Publish**

### Step 6: Deploy to GitHub Pages

1. Push your code to a GitHub repository
2. Go to your repository settings
3. Navigate to **Pages**
4. Under "Build and deployment", select:
   - Branch: `main` (or your default branch)
   - Folder: `/ (root)`
5. Click **Save**
6. Your site will be published at `https://username.github.io/Chatbot/`

## How to Use

### First Person (You):
1. Open the website
2. Click the ⚙️ settings button
3. Enter your name
4. Your Chat Room ID is auto-generated (copy it)
5. Share the Chat Room ID with your friend

### Second Person (Your Friend):
1. Open the same website
2. Click the ⚙️ settings button
3. Enter their name
4. Paste your Chat Room ID in the "Friend's Chat Room ID" field
5. Click Save Settings

### Chatting:
- Type messages in the input box
- Press Enter or click Send
- Messages appear in real-time for both parties
- Messages are stored in Firebase and persist between sessions

## Customization

### Change Colors
Edit `styles.css` and modify the gradient colors:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Change Title
Edit `index.html` and modify:
```html
<title>1-on-1 Chat</title>
```

## Security Considerations

- **Test Mode**: Currently uses Firebase Test Mode which allows anyone to read/write
- **Production**: For production, implement proper authentication
- **Share Carefully**: Only share your Chat Room ID with the person you want to chat with
- **Private Repo**: Keep your code repo private if it contains sensitive Firebase credentials (though they're meant to be public)

## Troubleshooting

### "Connecting..." stuck or "Disconnected"
- Check your internet connection
- Verify Firebase credentials in `config.js`
- Make sure Firebase Realtime Database is enabled
- Check if your database is in Test Mode

### Messages not sending
- Make sure both people have saved their settings with valid Chat Room IDs
- Check browser console for error messages
- Verify Firebase security rules allow writes

### Friend doesn't receive messages
- Confirm they've entered your correct Chat Room ID
- Refresh the page
- Check if you're online (green status)

## Browser Support

Works on all modern browsers (Chrome, Firefox, Safari, Edge)

## License

MIT License - feel free to modify and distribute

## Support

If you encounter issues:
1. Check the browser console (F12 → Console) for error messages
2. Verify Firebase configuration
3. Make sure both users have correct Chat Room IDs entered

## Future Enhancements

- User authentication
- Multiple chat rooms
- Message encryption
- Typing indicators
- Read receipts
- Message reactions
- File sharing
- Voice/video calls