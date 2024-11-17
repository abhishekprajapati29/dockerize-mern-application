const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

let db;
const uri = process.env.MONGODB_URI;
const dbName = 'todoApp';

// Connect to MongoDB
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log('Connected to MongoDB');
    db = client.db(dbName);
  })
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Routes
app.get('/todos', async (req, res) => {
  try {
    const todos = await db.collection('todos').find().toArray();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).send('Error fetching todos');
  }
});

app.get('/todos/:id', async (req, res) => {
  try {
    const todo = await db.collection('todos').findOne({ _id: new ObjectId(req.params.id) });
    if (!todo) {
      res.status(404).send('Todo not found');
    } else {
      res.status(200).json(todo);
    }
  } catch (err) {
    res.status(500).send('Error fetching todo');
  }
});

app.post('/todos', async (req, res) => {
  try {
    const newTodo = {
      title: req.body.title,
      description: req.body.description,
    };
    const result = await db.collection('todos').insertOne(newTodo);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send('Error creating todo');
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    const updates = {};
    if (req.body.title) updates.title = req.body.title;
    if (req.body.description) updates.description = req.body.description;

    const result = await db
      .collection('todos')
      .findOneAndUpdate(
        { _id: new ObjectId(req.params.id) },
        { $set: updates },
        { returnDocument: 'after' }
      );

    if (!result.value) {
      res.status(404).send('Todo not found');
    } else {
      res.status(200).json(result.value);
    }
  } catch (err) {
    res.status(500).send('Error updating todo');
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const result = await db.collection('todos').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      res.status(404).send('Todo not found');
    } else {
      res.status(200).send('Todo deleted');
    }
  } catch (err) {
    res.status(500).send('Error deleting todo');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('*', (req, res) => {
  res.status(404).send('Route not defined');
});

app.listen(8081, () => {
  console.log(`Listening at http://localhost:8081`);
});

module.exports = app;
