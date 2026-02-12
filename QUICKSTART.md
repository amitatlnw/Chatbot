# Quick Start Guide

Get your 1-on-1 chat running in 10 minutes!

## TL;DR - Super Quick Setup

1. **Create Firebase Project**
   - Go to https://console.firebase.google.com/
   - Create new project
   - Create Realtime Database (Test Mode)
   - Copy config

2. **Add Firebase Config**
   - Edit `config.js`
   - Paste your Firebase credentials

3. **Deploy**
   - Push to GitHub
   - Enable GitHub Pages
   - Done! ✨

## What You Get

✅ Real-time 1-on-1 chat  
✅ Works on all devices  
✅ Free hosting on GitHub Pages  
✅ Free backend with Firebase  
✅ Message history  
✅ Beautiful UI  
✅ No coding required!

## File Structure

```
Chatbot/
├── index.html          # Main chat interface
├── styles.css          # Styling
├── app.js              # Chat logic
├── config.js           # Your Firebase config (you fill this in)
├── README.md           # Full documentation
├── FIREBASE_SETUP.md   # Firebase step-by-step
├── DEPLOYMENT.md       # GitHub Pages guide
└── QUICKSTART.md       # This file
```

## How It Works

1. **You**: Open the chat app → Set name → Get unique ID → Share ID
2. **Friend**: Opens same app → Set name → Enter your ID
3. **Chat**: Messages sync instantly through Firebase

## Important: Firebase Configuration

The app won't work until you add real Firebase credentials to `config.js`.

**Before deployment:**
1. Follow FIREBASE_SETUP.md
2. Update `config.js` with your credentials
3. Test locally first

## Local Testing

You can test before deploying:

1. Open `index.html` in your browser
2. You'll see the welcome screen
3. Click ⚙️ to configure
4. Check browser console (F12) for any errors

## Frequently Asked Questions

**Q: Can I chat with multiple people?**  
A: Current version is 1-on-1 only. See README for future enhancement ideas.

**Q: Are my messages private?**  
A: Messages are stored in your private Firebase database. Only share IDs with people you trust.

**Q: Can I use my own domain?**  
A: Yes! See DEPLOYMENT.md for custom domain setup.

**Q: Does it work offline?**  
A: No, it requires internet. Messages need Firebase connection.

**Q: Can I run this locally?**  
A: Yes, but both people need to be in the same browser instance unless you use a backend.

**Q: Is this secure?**  
A: For personal use with trusted friend. For sensitive data, add authentication (see README).

**Q: Will it cost money?**  
A: No! Firebase free tier is generous. GitHub Pages is always free.

## What To Do Next

### Option 1: Use Right Away
1. Follow FIREBASE_SETUP.md
2. Follow DEPLOYMENT.md
3. Share your site URL with your friend

### Option 2: Customize
1. Change colors in `styles.css`
2. Change title in `index.html`
3. Add your own branding
4. Keep main functions in `app.js` the same

### Option 3: Learn More
- Read full README.md for all details
- Check FIREBASE_SETUP.md for Firebase security options
- Modify `app.js` to understand the code

## Troubleshooting

**"Config is invalid"** → Copy config from Firebase again  
**"Can't send message"** → Settings not configured, check browser console  
**"Connecting... forever"** → Firebase database not enabled  
**Site not loading** → Wait a few minutes, refresh with Ctrl+F5  

See full troubleshooting in README.md

## Support

1. **Error in browser** → Open F12 console, read error message
2. **Firebase issue** → Check FIREBASE_SETUP.md
3. **Deployment issue** → Check DEPLOYMENT.md
4. **Code issue** → Read through app.js comments

---

**Ready?** Go to FIREBASE_SETUP.md and get started! 🚀
