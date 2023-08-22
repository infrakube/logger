const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
require("dotenv").config();
const { spawn } = require('child_process');

const io = new Server(server);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.status(200).sendFile(__dirname + '/client.html');
});


io.on("connection", (socket) => {

	const stream = spawn('docker', ['logs', '-f', 'backend-ops']);
	
	stream.stdout.on('data', (data) => {
		data.toString().split('\n').forEach((line) => {
			console.log(line);
			socket.emit('log', line.toString())
		})
	})


	socket.on("disconnect", () => {
		console.log("user disconnected " + socket.id)
	});

	socket.emit('id', socket.id);
});





const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Server has started on port: ${process.env.PORT}`));
