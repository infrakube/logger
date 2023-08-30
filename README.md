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

# Use docker images to run our app
1º
- Clone this code to your pc
- Go to the client folder
``````
cd client
``````
- Inside of public folder go to the client.js
- If you run your server in another port than the default 8080, update the endpoint on the socket.io connection:
``````
const socket = io('http://localhost:8080',{
	query: {
		container_name : 'tape1'
	}
});
``````
- On the query define the name of the container which you want to read the logs  
- Create the docker image using the dockerfile
``````
docker build -f dockerfile -t client:1.0.0 .
``````
- Now you can run your container
``````
docker run --name client -p 3000:3000 --network <name of the docker network> client:1.0.0
``````
- If you want to run the server on other port, in the run command add the follow:
``````
-e PORT=<the port you want>
``````
- Don't forget to update as well the -p

2º
- Go to the server folder
``````
cd ../server
``````
- Create the docker image using the dockerfile
``````
docker build -f dockerfile -t server:1.0.0 .
``````
- Now you can run your container
``````
docker run --name server \
			 -p 8080:8080 \
			 -v /var/run/docker.sock:/var/run/docker.sock \
			--network <name of the docker network> client:1.0.0 \
			-e PORT=8080 \
			-e FILTER='<the filter you want>' \
			-e ENDPOINT_URL='http://localhost:3000' \ 
			server:1.0.0
``````
- On the -e PORT if you choose other port than the default don't forget to update the -p
- Remember if you have choosen other port for the client, update the -e ENDPOINT_URL

3º
- Run the container you want to fecth the logs
- Access your localhost:3000(if use the default port)
- Refresh the page.
- Watch your logs on the webpage!

# Thank you! 