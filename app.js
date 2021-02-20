const express = require('express');
const path = require('path');

// initialize a new instance of socket.io
const messenger = require('socket.io')();

const app = express();

// tell express in which directory to search for files
app.use(express.static("public"));

const port = process.env.PORT || 5050;

//get the home route
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/chat", (req, res) => {
	res.sendFile(path.join(__dirname, "chat.html"));
});

//socket will use it as a hook
const server = app.listen(port, () => {
	console.log(`app is running on ${port}`);
});

//messengers = io service
messenger.attach(server);

//connection = somebody made a call to the operator
//when you make a connection to the meneger service it creates socket
//whener anybody connects
//listen for individual sockets
//messanger - operator
//socket - individual 


// messenger is the connection manager - like a switchboard operator
// socket is the individual connection - the caller


messenger.on('connection', (socket) => {
	console.log(`a user connected: ${socket.id}`);

	// send the user their assignd ID


	socket.emit('connected', { sID: `${socket.id}`, message: 'new connection' });

	// assign the event
	socket.on('chatmessage', function (msg) {
		console.log(msg);
		messenger.emit('message', { id: socket.id, message: msg })
	});

	socket.on('disconnect', () => {
		console.log('a user has disconnected');
	})
})



