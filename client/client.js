const socket = io('http://localhost:3000');

// Display the status on the client side
socket.on('id', (stream) => {
	const socketIdElement = document.getElementById('socketId');
	socketIdElement.textContent = 'STATUS: ' + stream;
});


// format de logs to display to the client 
let totalLog = '';
socket.on('log', (logs) => {
	totalLog = totalLog + logs + '\n';
	console.log(totalLog);
	const logsIdElement = document.getElementById('logs');
	logsIdElement.textContent = totalLog;
});