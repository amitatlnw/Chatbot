// Chat Application Logic
let currentUserId = localStorage.getItem('userId');
let currentUserName = localStorage.getItem('userName') || 'User';
let friendChatId = localStorage.getItem('friendChatId');
let messagesRef = null;
let friendMessagesRef = null;

// Generate unique user ID if not exists
if (!currentUserId) {
    currentUserId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('userId', currentUserId);
}

// DOM Elements
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const messagesContainer = document.getElementById('messagesContainer');
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeBtn = document.querySelector('.close');
const userNameInput = document.getElementById('userNameInput');
const chatIdInput = document.getElementById('chatIdInput');
const friendIdInput = document.getElementById('friendIdInput');
const saveSettingsBtn = document.getElementById('saveSettingsBtn');
const copyIdBtn = document.getElementById('copyIdBtn');
const statusEl = document.getElementById('status');

// Initialize
initialize();

function initialize() {
    chatIdInput.value = currentUserId;
    userNameInput.value = currentUserName;
    friendIdInput.value = friendChatId || '';
    
    setupMessageListeners();
    setupEventListeners();
}

function setupEventListeners() {
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    settingsBtn.addEventListener('click', () => {
        settingsModal.style.display = 'block';
    });
    
    closeBtn.addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
    });
    
    saveSettingsBtn.addEventListener('click', saveSettings);
    copyIdBtn.addEventListener('click', copyToClipboard);
}

function saveSettings() {
    const newUserName = userNameInput.value.trim();
    const newFriendId = friendIdInput.value.trim();
    
    if (!newUserName) {
        alert('Please enter your name');
        return;
    }
    
    if (!newFriendId) {
        alert('Please enter your friend\'s Chat Room ID');
        return;
    }
    
    currentUserName = newUserName;
    friendChatId = newFriendId;
    
    localStorage.setItem('userName', currentUserName);
    localStorage.setItem('friendChatId', friendChatId);
    
    settingsModal.style.display = 'none';
    setupMessageListeners();
    alert('Settings saved! You\'re now connected.');
}

function copyToClipboard() {
    chatIdInput.select();
    document.execCommand('copy');
    copyIdBtn.textContent = 'Copied!';
    setTimeout(() => {
        copyIdBtn.textContent = 'Copy ID';
    }, 2000);
}

function setupMessageListeners() {
    messagesContainer.innerHTML = '';
    
    if (!friendChatId) {
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: #999;
        `;
        placeholder.innerHTML = `
            <div>
                <p style="font-size: 18px; margin-bottom: 10px;">👋 Welcome to 1-on-1 Chat</p>
                <p>Step 1: Click ⚙️ to configure your chat room</p>
                <p>Step 2: Share your Chat Room ID with your friend</p>
                <p>Step 3: Paste their Chat Room ID to start chatting</p>
            </div>
        `;
        messagesContainer.appendChild(placeholder);
        updateStatus(false);
        return;
    }
    
    try {
        // Listen to your own messages
        messagesRef = database.ref('chats/' + currentUserId);
        messagesRef.on('child_added', (snapshot) => {
            if (snapshot.val()) {
                displayMessage(snapshot.val(), 'own');
            }
        });
        
        // Listen to friend's messages
        friendMessagesRef = database.ref('chats/' + friendChatId);
        friendMessagesRef.on('child_added', (snapshot) => {
            if (snapshot.val()) {
                displayMessage(snapshot.val(), 'other');
            }
        });
        
        // Check connection status
        database.ref('.info/connected').on('value', (snapshot) => {
            updateStatus(snapshot.val() === true);
        });
        
    } catch (error) {
        console.error('Error setting up listeners:', error);
        updateStatus(false);
    }
}

function sendMessage() {
    const text = messageInput.value.trim();
    
    if (!text) return;
    if (!friendChatId) {
        alert('Please configure your chat settings first');
        return;
    }
    
    const messageId = Date.now();
    const message = {
        id: messageId,
        text: text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        sender: currentUserName
    };
    
    try {
        database.ref('chats/' + currentUserId + '/' + messageId).set(message)
            .then(() => {
                messageInput.value = '';
                messageInput.focus();
            })
            .catch((error) => {
                console.error('Error sending message:', error);
                alert('Failed to send message. Check your Firebase config.');
            });
    } catch (error) {
        console.error('Error:', error);
        alert('Error sending message. Please check the console.');
    }
}

function displayMessage(message, type) {
    const messageEl = document.createElement('div');
    messageEl.className = 'message ' + type;
    
    const time = message.timestamp ? new Date(message.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    }) : 'just now';
    
    messageEl.innerHTML = `
        <div>
            <div class="message-content">${escapeHtml(message.text)}</div>
            <div class="message-time">${time}</div>
        </div>
    `;
    
    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function updateStatus(connected) {
    if (connected && friendChatId) {
        statusEl.textContent = 'Connected';
        statusEl.className = 'status connected';
    } else {
        statusEl.textContent = connected ? 'Configure to start' : 'Disconnected';
        statusEl.className = 'status disconnected';
    }
}
