// GET ELEMENTS
const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

// GLOBAL
let userName;

// CODE

const login = function (event) {
    event.preventDefault();
    if (userNameInput.value === '') {
        alert(`Enter user name!`);
    } else {
        userName = userNameInput.value;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    }
};

const sendMessage = function (event) {
    event.preventDefault();
    if (messageContentInput.value === '') {
        alert(`Enter message!`);
    } else {
        addMessage(userName, messageContentInput.value);
        messageContentInput.value = '';
    }
};

const addMessage = function (author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if (author === userName) message.classList.add('message--self');
    message.innerHTML = `
        <h3 class="message__author">${author === userName ? 'You' : author}</h3>
        <div class="message__content">${content}</div>
    `;
    messagesList.appendChild(message);
};

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);