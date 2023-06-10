const express = require('express');
const mongoose = require('mongoose');
const ytdl = require('ytdl-core');
const cors = require('cors');

// Crear una instancia de la aplicación Express
const app = express();

// Configurar la conexión a MongoDB
const mongoURI = 'mongodb+srv://valerymolina:olimpo@cluster0.e3w4d4x.mongodb.net/olimpo_bd?retryWrites=true&w=majority'; // Reemplaza 'nombre_basedatos' con el nombre de tu base de datos
mongoose
	.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log('Conexión exitosa a MongoDB'))
	.catch((err) => console.error('Error al conectar a MongoDB:', err));

// Middleware para aceptar datos en formato JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Habilitar CORS
app.use(cors());

app.get('/video', function(req, res) {
    var url = req.query.url;
    ytdl(url, {
        format: 'mp4',
        filter: 'audioandvideo',
        quality: 'highest'
    }).pipe(res);
});

// Rutas
app.get('/', (req, res) => {
	res.send('¡Hola, mundo!');
});

// Rutas de usuarios
const usersRoutes = require('./Routes/users');
app.use('/users', usersRoutes);

// Rutas de modelos
const modelsRoutes = require('./Routes/models');
app.use('/models', modelsRoutes);

// Iniciar el servidor
const port = 3001;
app.listen(port, () => {
	console.log(`Servidor Express escuchando en el puerto ${port}`);
});

console.log("HOLA MUNDO")