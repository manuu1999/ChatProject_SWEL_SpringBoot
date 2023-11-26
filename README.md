# Chat Project Software Engineering

We had to create a new project to implement the structure of a springboot project with the spring initializr The old project is on the repository: 
https://github.com/manuu1999/ChatProjectServer.git (not relevant anymore)

Furthermore, we used WebSocket instead of HTTP Connection to make the chat application more dynamic, since with the Websocket API you can leave the connection open. We hope that this is okey :-)

With the integration of Spring Boot, the WebSocket communication is facilitated by annotations and configurations provided by the Spring Framework. WebSocket functionality is embedded within the application itself, removing the necessity for a separate server class to handle socket connections explicitly.

Spring Boot, in combination with libraries like SockJS and STOMP, enables the application to establish WebSocket connections, handle message routing, and manage communication between clients without the need for explicit socket handling through a dedicated server class.

To launch the project, simply start the Spring Boot application using the main class. Once running, access the chat application on your local machine via localhost using different browser windows. This setup lets you chat in real-time by opening the chat application in different browser windows on your computer's localhost.

--------------------------------------------------------------------------------------------------------------------------------------------

we tried to implement the H2 Database to create the new features for login and register - However, we did not fully manage to run it
However, the whole Structure and the Code are finished and visible under the new Branch called "NewFeatures"
We hope that even though they are not completely working yet they will also be considered for the grading. Thanks :-)
