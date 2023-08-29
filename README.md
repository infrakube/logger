# logger
Application to manage docker container's logs

# How it works

The server side, fetch the logs from the container with the specified name and, if defined, filters and then sends it to the client which will redereize it to the web page. 

It is possible to integrate this server with any frontend you want or need. 

# How to use

1º

- Clone this code to your pc
- Go to the client folder
``````
cd client
``````
- Create a .env file:
``````
PORT=8080

``````
- Run the script
``````
node server.js
``````
2º 
- Go to the server folder
``````
cd ../server
``````
- Create a .env file:
``````
PORT=8080 
FILTER='' (the filter you want to fetch or leave empty string to fetch all)
ENDPOINT_URL='http://localhost:3000'
``````
- Run the script
``````
node server.js
``````
3º
- Run the container you want to fecth the logs
- Access your localhost:3000(if use the default port)
- Refresh the page.
- Watch your logs on the webpage!

# Thank you! 