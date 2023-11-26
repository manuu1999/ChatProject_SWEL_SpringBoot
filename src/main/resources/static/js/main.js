// This JavaScript File is a Teamwork from Dejen and Manuel



const BASE_URL = 'http://localhost:8080';

// ------------------------------------------------------------------------------------------------
// Initialization of various DOM elements and variables
// DOM (Document Object Model) interface between HTML and dynamic JavaScript.
// These variables hold references to HTML elements and WebSocket client
'use strict';
var chatContainer = document.querySelector('#chat-container');
var registrationPage = document.querySelector('#registration-page');
var loginPage = document.querySelector('#login-page');
var usernamePage = document.querySelector('#username-page');
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');

var registrationForm = document.querySelector('#registrationForm');
var loginForm = document.querySelector('#loginForm');
var regUsernameInput = document.querySelector('#regUsername');
var regPasswordInput = document.querySelector('#regPassword');
var loginUsernameInput = document.querySelector('#loginUsername');
var loginPasswordInput = document.querySelector('#loginPassword');


var stompClient = null;
var username = null;

var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];
// ------------------------------------------------------------------------------------------------
// Function to check which HTML file is currently loaded
function getCurrentHTML() {
    // Check for elements specific to chat.html
    if (document.querySelector('#chat-page')) {
        usernamePage = document.querySelector('#username-page');
        chatPage = document.querySelector('#chat-page');
        messageForm = document.querySelector('#messageForm');
        messageInput = document.querySelector('#message');
        messageArea = document.querySelector('#messageArea');
        connectingElement = document.querySelector('.connecting');
    }
    // Check for elements specific to login_register.html
    if (document.querySelector('#registrationForm')) {
        usernamePage = document.querySelector('#username-page');
        registrationForm = document.querySelector('#registrationForm');
        loginForm = document.querySelector('#loginForm');
        regUsernameInput = document.querySelector('#regUsername');
        regPasswordInput = document.querySelector('#regPassword');
        loginUsernameInput = document.querySelector('#loginUsername');
        loginPasswordInput = document.querySelector('#loginPassword');

    }
     if (document.querySelector('#registration-page')) { // Updated
            usernamePage = document.querySelector('#username-page');
            registrationPage = document.querySelector('#registration-page'); // Updated
            loginPage = document.querySelector('#login-page'); // Updated
    }
      if (document.querySelector('#chat-page')) {
        usernamePage = document.querySelector('#username-page');
        chatContainer = document.querySelector('#chat-container'); // Updated
        // ... other elements
    }
}

// Call the function to adjust elements based on the current HTML file
getCurrentHTML();

// Handles establishing a WebSocket connection and joining the chat room
// Retrieves username, connects to WebSocket server, and hides username page
function connect(event) {
    username = document.querySelector('#name').value.trim();

    if(username) {
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}


function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/public', onMessageReceived);

    // Tell your username to the server
    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    )

    connectingElement.classList.add('hidden');
}

// Handles errors when connecting to the WebSocket server
// Updates UI to display an error message
function onError(error) {
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
}


// Function to register a new user
async function registerUser(username, password) {
    try {
        const response = await fetch(`${BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        // Handle success, e.g., show a success message to the user
        console.log('User registered successfully');
         window.location.href = '/chat.html'; //
    } catch (error) {
        // Handle error, e.g., show an error message to the user
        console.error('Error registering user:', error.message);
    }
}

// Function to log in a user
async function loginUser(username, password) {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        // Handle success, e.g., redirect to the chat page upon successful login
        console.log('User logged in successfully');
        // window.location.href = '/chat.html'; // Replace with your chat page URL
    } catch (error) {
        // Handle error, e.g., show an error message to the user
        console.error('Error logging in:', error.message);
    }
}

// Logic to switch between login/register forms and connecting to chat
function switchToChat() {
    var isNewUser = true; // Check if the user is new or existing based on your logic

    if (isNewUser) {
        // Show registration form
        usernamePage.classList.remove('hidden');
        loginForm.classList.add('hidden');
        registrationForm.classList.remove('hidden');
    } else {
        // Show login form
        usernamePage.classList.remove('hidden');
        registrationForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    }
    chatPage.classList.add('hidden');
}

// Call switchToChat() when the user decides to login or register
// For instance, a button click might trigger this function
switchToChat();


// Handles sending messages via WebSocket
// Constructs a message object, sends it to the server, and clears the message input field
function sendMessage(event) {
    var messageContent = messageInput.value.trim();
    if(messageContent && stompClient) {
        var chatMessage = {
            sender: username,
            content: messageInput.value,
            type: 'CHAT'
        };
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
    event.preventDefault();
}

// Handles receiving messages from the WebSocket server
// Creates HTML elements based on message type and content, appends them to the chat area
function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);

    var messageElement = document.createElement('li');

    if(message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' joined!';
    } else if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' left!';
    } else {
        messageElement.classList.add('chat-message');

        var avatarElement = document.createElement('i');
        var avatarText = document.createTextNode(message.sender[0]);
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = getAvatarColor(message.sender);

        messageElement.appendChild(avatarElement);

        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}

// Generates an avatar color based on the username
// Uses a hash function to determine the color from a predefined array
function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }
    var index = Math.abs(hash % colors.length);
    return colors[index];
}


// Event listeners for form submissions to initiate connections or send messages
messageForm.addEventListener('submit', sendMessage, true)
// Event listeners for form submissions to register or login users
registrationForm.addEventListener('submit', registerUser, true);
loginForm.addEventListener('submit', loginUser, true);
