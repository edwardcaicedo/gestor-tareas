require('dotenv').config();
const { MongoClient } = require('mongodb');

const cliente = new MongoClient(process.env.MONGO_URI);

let tareas;

async function conectar() {
    try {
        await cliente.connect();
        const db = cliente.db('gestor_tareas');
        tareas = db.collection('tareas');
        await tareas.insertOne({ titulo: 'Prueba', completada: false });
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.log('No se pudo conectar:', error.message);
    }
}
conectar();