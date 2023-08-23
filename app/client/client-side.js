const endpoint = 'localhost:3000';
const socket = io(endpoint);

// Display the status on the client side
socket.on('id', (stream) => {
	const socketIdElement = document.getElementById('socketId');
	socketIdElement.textContent = 'STATUS: ' + stream;
});

// emit the container name to server
socket.emit('containerName', 'tape1');


// format de logs to display to the client 
let totalLog = '';
socket.on('log', (logs) => {
	totalLog = totalLog + logs + '\n';
	console.log(totalLog);
	const logsIdElement = document.getElementById('logs');
	logsIdElement.textContent = totalLog;
});