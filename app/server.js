const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
require('dotenv').config();
const { Server } = require('socket.io');
const io = new Server(server);
const { spawn } = require('child_process');


// define the endpoint 
app.use(express.static(__dirname + '/client'));
app.get('/', (req, res) => {
	res.status(200).sendFile(__dirname + '/client/client.html');
});


io.on('connection', (socket) => {
	console.log('user ' + socket.id + ', connected');
	
	// get the container name
	let containerName = '';
	socket.on('containerName', (name) => {
		containerName = name;

		// get the container logs
		const stream = spawn('docker', ['logs', '-f', containerName]);
		
		// format and filter the logs
		stream.stdout.on('data', (data) => {
			data.toString().split('\n').forEach((line) => {
				if (line.includes('TAPES-INFO:')) {
					socket.emit('log', line.toString());
				}
			});
		});
	});
	
	// define a messgen when disconnected
	socket.on('disconnect', () => {
		console.log('user ' + socket.id + ', disconnected');
	});

	socket.emit('id', 'Applying your tape...');
});

// starting the server
const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Server has started on port: ${process.env.PORT}`));