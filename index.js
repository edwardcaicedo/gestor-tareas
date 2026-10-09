require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());
const cliente = new MongoClient(process.env.MONGO_URI);
let tareas;

app.get('/', function (req, res) {
    res.send('Servidor funcionando');
});


app.post('/tareas', async function (req, res) {
    const titulo = req.body.titulo;

    if (!titulo || titulo.trim() === '') {
        return res.status(400).json({ error: 'El título es obligatorio' });
    }

    try {
        const resultado = await tareas.insertOne({ titulo: titulo.trim(), completada: false });
        res.status(201).json({ _id: resultado.insertedId, titulo: titulo.trim(), completada: false });
    } catch (error) {
        console.log('Error al guardar:', error.message);
        res.status(500).json({ error: 'No se pudo guardar la tarea' });
    }
});

app.get('/tareas', async function listaTarea(req, res) {
    const lista = await tareas.find({}).toArray();

    return res.status(200).json(lista);
})




async function iniciar() {
    try {
        await cliente.connect();
        tareas = cliente.db('gestor_tareas').collection('tareas');
        console.log('Conectado a MongoDB');

        app.listen(process.env.PUERTO, function () {
            console.log('Servidor en http://localhost:' + process.env.PUERTO);
        });
    } catch (error) {
        console.log('No se pudo conectar:', error.message);
    }
}

iniciar();