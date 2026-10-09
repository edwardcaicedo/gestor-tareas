require('dotenv').config();
const { MongoClient } = require('mongodb');

const cliente = new MongoClient(process.env.MONGO_URI);

async function conectar() {
    try {
        await cliente.connect();
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.log('No se pudo conectar:', error.message);
    }
}

conectar();