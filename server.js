const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
const users = [];
const messages = [];

app.use(express.static(path.join(__dirname, '/client')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
  });

  const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    messages.push(message);
    socket.broadcast.emit('message', message);
});

  socket.on('join', (user) => {
    users.push(user);
    socket.broadcast.emit('message', { author: 'Chat Bot', content: `<i>${user.name} has joined the conversation!</i>` });
  });

  socket.on('disconnect', () => {
    const foundUserIndex = users.findIndex(user => user.id === socket.id);
    const foundUserName = users[foundUserIndex] === 'undefined' ? '' : users[foundUserIndex].name;
    users.splice(foundUserIndex, 1);
    socket.broadcast.emit('message', { author: 'Chat Bot', content: `<i>${foundUserName} has left the conversation... :(</i>` });
  });
});