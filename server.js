const express = require('express'); //import express
const path = require('path'); //import path methods
const PORT = process.env.PORT || 3001; //what port to use. The environment variable or port 3001
const app = express(); //allow express functionality 

//GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname,'/public/index.html'))
);


//have our app listen
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);