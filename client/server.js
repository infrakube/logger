require('dotenv').config();
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const path = require('path');
const fileJsPath = path.join(__dirname, '/public');
const fileHtmlPath = path.join(__dirname, '/public/client.html');

app.use(express.static(fileJsPath));

app.get('/', (req, res) => {
	res.status(200).sendFile(fileHtmlPath);
});

// starting the server
const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Server has started on port: ${process.env.PORT}`));