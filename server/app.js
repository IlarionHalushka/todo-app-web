import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import { serverPort } from './etc/config.json';

import * as db from './utils/DataBaseUtils';
import parseYelp from "./parsers/parseYelp";

// Initialization of express application
const app = express();

// Set up connection of database
db.setUpConnection();

// Using bodyParser middleware
app.use( bodyParser.json() );

// Using express fileUpload
app.use( fileUpload() );

// Allow requests from any origin
app.use(cors({ origin: '*' }));

// RESTful api handlers
app.get('/notes', (req, res) => {
    db.listNotes().then(data => res.send(data));
});

app.post('/notes', (req, res) => {
    db.createNote(req.body).then(data => res.send(data));
});

app.put('/notes/:id', (req, res) => {
    db.updateNote(req.params.id, req.body).then(data => res.send(data));
});

app.delete('/notes/:id', (req, res) => {
    db.deleteNote(req.params.id).then(data => res.send(data));
});

app.post('/upload', (req, res) => {
  /*if (!req.files)
    return res.status(400).send('No files were uploaded.');*/

  console.log(req);
  console.log(req.files.sampleFile);

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  const _id = new Date().getTime();

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('/home/ninja/application/uploads/' + _id, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('200', _id +'');
  })
});

app.get('/upload/:id', (req, res) => {
    let file = '/home/ninja/application/uploads/' + req.params.id;
    res.download(file); 
});

app.get('/parseUA', async (req, res) => {
  console.log('parsing started');
  let response = await parseYelp();
  res.send(200, response);
});

const server = app.listen(serverPort, function() {
    console.log(`Server is up and running on port ${serverPort}`);
});