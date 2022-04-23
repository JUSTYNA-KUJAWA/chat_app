const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
app.use(express.static(path.join(__dirname, '/client')));

const users = [];
const messages = [];

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

  socket.on('join', (join) => {
    users.push(join);
    socket.broadcast.emit('message', { author: 'Chat Bot', content: `<i>${join.name} has joined the conversation!</i>` });
  });

  socket.on('disconnect', () => {
    const findUserIndex = users.findIndex(user => user.id === socket.id);
    const findUserName = users[findUserIndex] === 'undefined' ? '' : users[findUserIndex].name;
    users.splice(findUserIndex, 1);
    socket.broadcast.emit('message', { author: 'Chat Bot', content: `<i>${findUserName} has left the conversation... :(</i>` });
  });
});