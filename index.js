/*  Se inició el proyecto con: 1.- npm init --yes
    2.- npm i express socket.io
    3.- npm i nodemon -D (-D Indica que es dependencia de desarrollo, no es tan importante que express y socket.io)
    4.- npm run dev (dev es un script de package.json)

 */
// Import express
const path = require('path'); // Para poder trabajar con rutas
const express = require('express'); // Para iniciar un servidor
const app = express();
const socketIO = require('socket.io');

// Settings
app.set('port',process.env.PORT || 3000); // proccess.env.PORT -> Selecciona el puerto configurado en el servidor.

// static files
// console.log(__dirname) -> Imprime ruta del proyecto
app.use(express.static(path.join(__dirname, '/public'))) // path.join para concatenar la cadena del directorio, ya sea en Windows/Mac/Linux
// Start server
const server = app.listen(app.get('port'), () => {
    console.log('Server on port:',app.get('port'));
});
// Le indica a socket.io el servidor a escuchar y enviar un archivo socket.io.js
const io = socketIO(server);

// WebSockets
io.on('connection', (socket) => {
    console.log("New connection",socket.id);
    socket.on('chat:messageClient', (data) => {
        io.sockets.emit('chat:messageServer',data);
    });
    socket.on('chat:typingClient', (username) => {
        socket.broadcast.emit('chat:typingServer',username);
    });
});