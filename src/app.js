import express, { json }  from "express";
import {v4} from "uuid";

const app = express();

app.use(express.json());

app.get('/ping', (req, res) => {
    res.send("pong");
});

app.get('/tasks', (req, res) => {
    res.json([]);
});

app.get('/tasks/:id', (req, res) => {

    const id = req.params.id;

    res.send({
        id: id,
        title: "Test",
        description: "Description"
    });
});

app.post('/tasks', (req, res) => {

    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).send("Los campos Title y Description son obligatorios");
    }

    //TODO: Inserta tarea en DB

    res.json({
        id: v4(),
        title,
        description
    });
});

app.put('/tasks', (req, res) => {

    const tasks = [{ 
        id: 123, 
        title: "Titulo",
        description: "Nueva description"
    }];

    var task = tasks.find( t => t.id == req.body.id);

    if (!task) {
        return res.status(400).send('Esta tarea no existe');
    }

    res.send(req.body);

});


export default app;

