const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017';
const dbName = 'eventsDB';
let db;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err);
    db = client.db(dbName);
    console.log(`Connected to database ${dbName}`);
});

app.use(cors());
app.use(bodyParser.json());

app.get('/events', (req, res) => {
    db.collection('events').find().toArray((err, items) => {
        if (err) return res.status(500).send(err);
        res.send(items);
    });
});

app.post('/events', (req, res) => {
    const event = req.body;
    db.collection('events').insertOne(event, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result.ops[0]);
    });
});

app.delete('/events/:id', (req, res) => {
    const { id } = req.params;
    db.collection('events').deleteOne({ _id: new MongoClient.ObjectID(id) }, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
