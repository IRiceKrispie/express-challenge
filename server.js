const express = require('express'); //import express
const path = require('path'); //import path methods
const { title } = require('process');
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

    const { title, text, id} = req.body;

    if (req.body) {
        const newTip = {
          title,
          text,
          id
        };
    
        readAndAppend(newTip, './db/db.json');
        res.json(`Tip added successfully 🚀`);
      } else {
        res.error('Error in adding tip');
      }
});

//DELETE Route
app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id != noteId);
            
            writeToFile('./db/db.json', result);

            res.json(`Note ${noteId} has been deleted`);
        });
});

//have our app listen
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);