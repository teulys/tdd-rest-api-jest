import app from '../src/app';
import request from 'supertest';

// Debe ser un Web Services tipo REST API.
// Debe devolver el listado de tareas.
// Si la respuesta es positiva debe devolver un código 200.
// La respuesta debe ser tipo arreglo.
// Debe permitir crear tareas.
// Devolver la tarea creada.
// La respuesta debe ser tipo JSON
// La tarea creada debe tener un ID único.
// Debe devolver código http 400 si no se mandan los parámetros correctos (Title y Description). 
// Debe permitir marcar tareas como listas.
// Debe eliminar tareas.

describe('web services para administrar tareas', () => {

    describe('Optener tareas GET / Task', () => {

        test('Si la respuesta es positiva debe devolver un código 200', async () => {
            const response = await request(app).get('/tasks').send();
            expect(response.statusCode).toBe(200);
        });
    
        test('La respuesta debe ser tipo arreglo.', async () => {
            const response = await request(app).get('/tasks').send();
            expect(response.body).toBeInstanceOf(Array);
        });
    
    });

    describe('Debe tener endpoint para consultar una tarea por ID. GET / Task :id', () => {
        
        test('El resultado debe ser 200 y tipo json.', async () => {
            const response = await request(app).get('/tasks/123').send();
            expect(response.statusCode).toBe(200);
        });

        test('El resultado debe tener la estructura de una tarea (Title, Description, ID).', async () => {
            const response = await request(app).get('/tasks/123').send();
            const { title, description } = response.body;
            expect(title).toBeDefined();
            expect(description).toBeDefined();
        });

        test('El resultado debe tener el mismo ID que se mandó como parámetro. 123', async () => {
            const response = await request(app).get('/tasks/123').send();
            expect(response.body.id).toBe("123");
        });

    });
    
    describe('Crear tareas POST / Task', () => {

        const task = { title: "Title", description: "Description"};

        test('La respeusta debe ser tipo 200.', async () => {
            const response = await request(app).post('/tasks').send(task);
            expect(response.statusCode).toBe(200);
        });

        test('La respeusta debe ser tipo JSON', async () => {
            const response = await request(app).post('/tasks').send(task);
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        });

        test('La tarea creada debe tener un ID único.', async () => {
            const response = await request(app).post('/tasks').send(task);
            expect(response.body.id).toBeDefined();
        });

        test('Debe devolver código http 400 si no se mandan los parámetros correctos (Title y Description).', async () => {
            const response = await request(app).post('/tasks').send({ "title" : ""});
            expect(response.statusCode).toBe(400);
            expect(response.text).toEqual("Los campos Title y Description son obligatorios");
        });
    
    });

    describe('Debe tener endpoint para poder actualizar una tarea. PUT / Task', () => {
     
        const task = { 
            id: 123, 
            title: "Titulo",
            description: "Nueva description"
        };

        test('Si la respuesta es positiva debe devolver un código 200.', async () => {
            const response = await request(app).put('/tasks').send(task);
            expect(response.statusCode).toBe(200);
        });

        test('Debe devolver una respuesta con la tarea actualizada.', async () => {
            
            const response = await request(app).put('/tasks').send(task);
            expect(response.body).toEqual(task);
        });

        test('Si la tarea a actualizar no existe debe devolver 400 con el mensaje: Esta tarea no existe.', async () => {
            const task = { 
                id: 1111, 
                title: "Titulo",
                description: "Nueva description"
            };
            const response = await request(app).put('/tasks').send(task);
            expect(response.status).toEqual(400);
            expect(response.text).toBe('Esta tarea no existe');
        });

    });
    

});


