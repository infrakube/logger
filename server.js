require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { spawn } = require('child_process');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const path = require('path');
const fileJsPath = path.join(__dirname, '/client');
const fileHtmlPath = path.join(__dirname, '/client/client.html');

app.use(express.static(fileJsPath));

app.get('/', (req, res) => {
	res.status(200).sendFile(fileHtmlPath);
});


io.on('connection', (socket) => {
	console.log('user ' + socket.id + ', connected');
	

	// get the container logs
	const stream = spawn('docker', ['logs', '-f', process.env.NAME]);
		
	// format and filter the logs
	stream.stdout.on('data', (data) => {
		data.toString().split('\n').forEach((line) => {
			if (line.includes(process.env.FILTER)) {
				socket.emit('log', line.toString());
			}
		});
	});

	
	// define a message when disconnected
	socket.on('disconnect', () => {
		console.log('user ' + socket.id + ', disconnected');
	});

	socket.emit('id', 'Applying your tape...');
});

// starting the server
const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Server has started on port: ${process.env.PORT}`));