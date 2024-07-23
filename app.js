const express = require('express');
const app = express();

let todos = [];

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Root route to check server status
app.get('/', (req, res) => {
    res.json({ message: 'Server is running', todos });
});

// Define the routes

// GET /todos: Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// POST /todos: Add a new todo
app.post('/todos', (req, res) => {
    const { id, title, description } = req.body;
    if (!id || !title || !description) {
        return res.status(400).json({ message: 'Invalid request body' });
    }
    const newTodo = { id, title, description };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// GET /todos/:id: Get a single todo by ID
app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
});

// PUT /todos/:id: Update an existing todo
app.put('/todos/:id', (req, res) => {
    const { title, description } = req.body;
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    todo.title = title;
    todo.description = description;
    res.json(todo);
});

// DELETE /todos/:id: Delete a todo
app.delete('/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    todos.splice(todoIndex, 1);
    res.json({ message: 'Todo deleted successfully' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
