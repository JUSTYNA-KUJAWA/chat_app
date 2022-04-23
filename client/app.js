// GET ELEMENTS
const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

// GLOBAL
const socket = io();
let userName;

// SOCKET
socket.on('message', ({ author, content }) => addMessage(author, content));

// CODE

const login = function (event) {
    event.preventDefault();
    if (userNameInput.value === '') {
        alert(`Enter user name!`);
    } else {
        userName = userNameInput.value;
        socket.emit('join', { name: userName, id: socket.id});
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    }
};

function sendMessage(e) {
    e.preventDefault();
  
    let messageContent = messageContentInput.value;
  
    if(!messageContent.length) {
      alert('You have to type something!');
    }
    else {
      addMessage(userName, messageContent);
      socket.emit('message', { author: userName, content: messageContent })
      messageContentInput.value = '';
    }
  
  }

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