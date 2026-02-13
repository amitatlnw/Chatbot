# Deployment Guide

This guide shows you how to deploy your 1-on-1 Chat app to GitHub Pages for free.

## Prerequisites

- GitHub account (free at https://github.com)
- Your repo with the chat files
- Firebase project already configured (see FIREBASE_SETUP.md)

## Step-by-Step Deployment

### 1. Push to GitHub

Make sure your code is on GitHub:

```bash
# If you haven't already initialized git
git init
git add .
git commit -m "Initial commit: 1-on-1 chat app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Chatbot.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings**
3. In the sidebar, click **Pages**
4. Under "Build and deployment":
   - Source: Select "Deploy from a branch"
   - Branch: Select `main` (or your default branch)
   - Folder: Keep as `/ (root)`
5. Click **Save**

### 3. Wait for Deployment

- GitHub will deploy your site (should take 30 seconds to a few minutes)
- You'll see a green checkmark when it's done
- Your site URL will appear: `https://YOUR_USERNAME.github.io/Chatbot/`

### 4. Access Your Chat App

- Open `https://YOUR_USERNAME.github.io/Chatbot/`
- Share this link with your chat partner

## Testing Your Deployment

1. Open your deployed site in two browser windows (or two devices)
2. Configure both with different names
3. Exchange Chat Room IDs and enter them
4. Try sending messages

## Making Updates

After deployment, if you want to make changes:

```bash
# Make your changes to the files
git add .
git commit -m "Update: describe your changes"
git push origin main
```

Changes will be live within a few minutes!

## Troubleshooting

### Site not showing
- Wait a few minutes for deployment to complete
- Refresh the page (Ctrl+F5 or Cmd+Shift+R for hard refresh)
- Check Settings → Pages shows a green checkmark

### 404 errors on load
- Make sure all files are in the root directory
- Check that `index.html` exists
- Try accessing `/index.html` directly in the URL

### Messages not working after deployment
- Open browser console (F12) and check for errors
- Verify `config.js` has correct Firebase credentials
- Make sure your Firebase database is in Test Mode (initially)

### Firebase connection issues
- Check that your Firebase project is active
- Verify database URL is correct in `config.js`
- Make sure Realtime Database is enabled in Firebase Console

## Custom Domain (Optional)

To use your own domain instead of github.io:

1. Buy a domain (GoDaddy, Namecheap, etc.)
2. Go to your repo Settings → Pages
3. Under "Custom domain", enter your domain
4. Go to your domain registrar settings
5. Create DNS records pointing to GitHub Pages
   - See [GitHub Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) for details

## Going Private (Optional)

If you want to keep your chat private, you can:

1. Make the repository private on GitHub
2. The website still works the same way (GitHub Pages works for private repos too)
3. Only people you give the link to can access it

## Performance Tips

- The site loads instantly since it's static HTML/CSS/JS
- Messages sync in real-time through Firebase
- No server costs or uptime worries
- Completely free to host on GitHub Pages

## Scaling Beyond One Person

If you later want to support multiple chat rooms:

1. Modify `app.js` to support room names
2. Let users create or join rooms
3. Store room data in Firebase
4. Update security rules to handle multiple rooms

See comments in `app.js` for where to add this.

## Support

- [GitHub Pages Docs](https://docs.github.io)
- [GitHub Pages Troubleshooting](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-common-issues-with-github-pages)
