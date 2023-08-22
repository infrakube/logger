let endpoint = "localhost:3000"
let socket = io(endpoint)

let userSocket = io(endpoint, { auth: { token: "test" }})


var form = document.getElementById('form');
var input = document.getElementById('input');



socket.on('id', (stream) => {
	console.log("Socket id: ", stream);
	let socketIdElement = document.getElementById('socketId');
	socketIdElement.textContent = "Socket ID: " + stream
})


let totalLog = ""
socket.on('log', (logs) => {
	totalLog = totalLog + logs
	console.log(totalLog);
	let logsIdElement = document.getElementById('logs')
	logsIdElement.textContent = totalLog
})
