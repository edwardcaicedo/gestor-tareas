require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const cliente = new MongoClient(process.env.MONGO_URI);
let tareas;

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


app.put('/tareas/:id/estado', async function (req, res){
    const { completada } = req.body;
    const id = req.params.id;

    // Validar formato del ID
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'El ID proporcionado no es válido' });
    }

    if(typeof completada !== 'boolean'){
        return res.status(400).json({ error: 'El estado debe ser verdadero o falso' });
    }

    try {
        const resultado = await tareas.updateOne(
            { _id: new ObjectId(id) }, 
            { $set: { completada: completada } }
        );

        if(resultado.matchedCount === 0){
            return res.status(404).json({ error: 'No se encontró la tarea' });
        }
        return res.status(200).json({ mensaje: 'Estado de la tarea actualizado con éxito' });

    } catch(error){
        console.log('Error al actualizar la tarea', error.message);
        res.status(500).json({ error: 'No se pudo actualizar la tarea' });
    }
});

app.put('/tareas/:id', async function (req, res) {
    const titulo = req.body.titulo;
    const id = req.params.id;

    if (!titulo || titulo.trim() === '') {
        return res.status(400).json({ error: 'El título es obligatorio' });
    }

    try {
        const resultado = await tareas.updateOne(
            { _id: new ObjectId(id) },
            { $set: { titulo: titulo.trim() } }
        );

        if (resultado.matchedCount === 0) {
            return res.status(404).json({ error: 'No se encontro la tarea' });
        }

        res.status(200).json(resultado);
    } catch (error) {
        console.log('Error al actualizar: ', error.message);
        res.status(500).json({ error: 'No se pudo actualizar la tarea' });
    }
});

app.get('/tareas/:id', async function(req, res){

    const id = req.params.id;

    if(!ObjectId.isValid(id)){
        return res.status(400).json({error: 'El ID proporcionado no es valido'});
    }

    try {
        const buscar = await tareas.findOne({_id: new ObjectId(id)});

        if(!buscar){
            return res.status(404).json({error: 'No se encontraron tarea'});
        }

        return res.status(200).json(buscar);
    }catch(error){
        console.log('Error al buscar la tarea', error.message);
        res.status(500).json({error: 'No encontro la tarea'});
    }
})
app.get('/tareas', async function (req, res) {
    try {
        const lista = await tareas.find({}).toArray();
        res.json(lista);
    } catch (error) {
        console.log('Error al leer:', error.message);
        res.status(500).json({ error: 'No se pudieron leer las tareas' });
    }
});

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