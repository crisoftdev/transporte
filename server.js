const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Importar cors

const app = express();
const server = http.createServer(app);

// Usar CORS para permitir conexiones desde otros orígenes
app.use(cors({
    origin: 'http://192.168.0.213',  // Aquí especificas el origen de tu app React Vite
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

const io = socketIo(server);

// Ruta raíz para probar el servidor 
app.get('/', (req, res) => {
    res.send('Servidor en funcionamiento!');
});

// Conexión de WebSocket
io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');

    // Escuchar el evento 'location' que recibirá las coordenadas
    socket.on('location', (data) => {
        console.log('Ubicación recibida:', data);

        // Emitir la ubicación a todos los clientes conectados
        io.emit('location', data);
    });

    // Detectar desconexión
    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    });
});

// Arrancar el servidor en el puerto 3000
server.listen(3000, () => {
    console.log('Servidor funcionando en http://localhost:3000');
});
