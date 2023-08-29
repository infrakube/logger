const express = require('express');
const app = express();
require('dotenv').config();

const http = require('http').Server(app);
const io = require('socket.io')(http, {
	cors: {
		origins: [process.env.ENDPOINT_URL],
		methods: ['GET', 'POST'],
		allowedHeaders: ['*'],
		credentials: true,
		transports: ['websocket', 'polling', 'flashsocket']
	}
});

const { spawn } = require('child_process');

io.on('connection', (socket) => {
	console.log('user ' + socket.id + ', connected');
	const tape_name = socket.handshake.query.container_name;
	

	// get the container logs
	const stream = spawn('docker', ['logs', '-f', tape_name]);
		

	// format and filter the logs
	stream.stdout.on('data', (data) => {
		if (process.env.FILTER === '' || process.env.FILTER === null) {
			data.toString().split('\n').forEach((line) => {
				socket.emit('log', line.toString());
			});
		} else {
			data.toString().split('\n').forEach((line) => {
				if (line.includes(process.env.FILTER)) {
					socket.emit('log', line.toString());
				}
			});
		}
	});

	// define a message when disconnected
	socket.on('disconnect', () => {
		console.log('user ' + socket.id + ', disconnected');
	});
	
	socket.emit('id', socket.id);
});


// starting the server
const PORT = process.env.PORT || 8080;
http.listen(PORT, () => console.log(`Server has started on port: ${PORT}`));