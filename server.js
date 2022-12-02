const express = require('express'); //import express
const path = require('path'); //import path methods
const PORT = process.env.PORT || 3001; //what port to use. The environment variable or port 3001
const app = express(); //allow express functionality 
app.use(express.static('public'));
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('./helpers/fsUtils')

//GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname,'/public/index.html'))
);

//GET Route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//GET route for the notes
app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

//POST route for adding a new note
app.post('/api/notes', (req, res) => {
    console.log(req.body);
});

//have our app listen
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);