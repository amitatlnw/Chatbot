// Demo Chat Application using localStorage
// This version works without Firebase for quick testing
// Open in 2 browser tabs/windows to simulate 2-person chat

let currentUserName = localStorage.getItem('demoUserName') || 'User ' + Math.random().toString(36).substr(2, 5);
let messages = JSON.parse(localStorage.getItem('demoMessages')) || [];

// DOM Elements
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const messagesContainer = document.getElementById('messagesContainer');
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeBtn = document.querySelector('.close');
const userNameInput = document.getElementById('userNameInput');
const saveSettingsBtn = document.getElementById('saveSettingsBtn');
const statusEl = document.getElementById('status');

// Initialize
initialize();

function initialize() {
    userNameInput.value = currentUserName;
    loadMessages();
    setupEventListeners();
    
    // Poll for new messages every 500ms (not ideal but works for demo)
    setInterval(() => {
        loadMessages();
    }, 500);
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
}

function saveSettings() {
    const newUserName = userNameInput.value.trim();
    
    if (!newUserName) {
        alert('Please enter your name');
        return;
    }
    
    currentUserName = newUserName;
    localStorage.setItem('demoUserName', currentUserName);
    settingsModal.style.display = 'none';
    
    // Show notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #667eea;
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        z-index: 2000;
    `;
    notification.textContent = 'Settings saved!';
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

function sendMessage() {
    const text = messageInput.value.trim();
    
    if (!text) return;
    
    const message = {
        id: Date.now(),
        text: text,
        sender: currentUserName,
        timestamp: new Date().getTime()
    };
    
    messages.push(message);
    localStorage.setItem('demoMessages', JSON.stringify(messages));
    
    messageInput.value = '';
    messageInput.focus();
    
    loadMessages();
}

function loadMessages() {
    const storedMessages = JSON.parse(localStorage.getItem('demoMessages')) || [];
    
    // Check if messages changed
    if (JSON.stringify(storedMessages) === JSON.stringify(messages)) {
        return; // No changes, don't re-render
    }
    
    messages = storedMessages;
    
    // Clear and rebuild
    messagesContainer.innerHTML = '';
    
    messages.forEach((message) => {
        displayMessage(message);
    });
    
    // Auto-scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function displayMessage(message) {
    const messageEl = document.createElement('div');
    const isOwn = message.sender === currentUserName;
    messageEl.className = 'message ' + (isOwn ? 'own' : 'other');
    
    const time = new Date(message.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    messageEl.innerHTML = `
        <div>
            <div class="message-content">${escapeHtml(message.text)}</div>
            <div class="message-time" style="text-align: ${isOwn ? 'right' : 'left'}; font-size: 11px; color: #999; padding: 4px 12px;">
                ${escapeHtml(message.sender)} • ${time}
            </div>
        </div>
    `;
    
    messagesContainer.appendChild(messageEl);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show instructions
window.addEventListener('load', () => {
    if (messages.length === 0) {
        const instruction = document.createElement('div');
        instruction.style.cssText = `
            padding: 20px;
            background: #f0f0f0;
            border-radius: 8px;
            margin: 20px;
            line-height: 1.6;
            text-align: center;
        `;
        instruction.innerHTML = `
            <strong style="font-size: 16px; display: block; margin-bottom: 10px;">📝 Demo Mode Instructions</strong>
            <p>1. Enter your name and click "Save Settings" ⚙️</p>
            <p>2. Open this page in another browser tab/window</p>
            <p>3. Enter a different name in the second tab</p>
            <p>4. Send messages from either tab - both will see them!</p>
            <p style="margin-top: 10px; font-size: 12px; color: #666;">
                💡 This demo uses browser storage. Messages only persist on this device.
                For real deployment, use the main index.html with Firebase.
            </p>
        `;
        messagesContainer.appendChild(instruction);
    }
});
