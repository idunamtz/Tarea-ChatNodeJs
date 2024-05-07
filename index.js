const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Configurar una ruta para servir la página HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Manejar conexiones de Socket.io
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  // Manejar mensajes de chat
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Enviar mensaje a todos los clientes conectados
  });

  // Manejar desconexiones
  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});

// Iniciar el servidor
server.listen(3000, () => {
  console.log('Servidor en ejecución en http://localhost:3000');
});