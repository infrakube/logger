import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';

const socket = io('http://localhost:8080',{
	query: {
		container_name : 'tape1'
	}
}); 

// Display the status on the client side
socket.on('id', (stream) => {
	const socketIdElement = document.getElementById('socketId');
	socketIdElement.textContent = 'Connected with ID: ' + stream;
});


// format de logs to display to the client 
let totalLog = '';
socket.on('log', (logs) => {
	totalLog = totalLog + logs + '\n';
	console.log(totalLog);
	const logsIdElement = document.getElementById('logs');
	logsIdElement.textContent = totalLog;
});