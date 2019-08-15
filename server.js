const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname))
app.set('views', __dirname)

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('./index.html');
});

var messages = [];

io.on('connection', client => {
    client.emit('id', client.id);

    client.on('message', message => {
        messages.push(message);

        client.broadcast.emit('receivedMessage', client.id + ': ' + message);
    });
    // client.on('disconnect', () => { /* … */ });
});

server.listen(3000);