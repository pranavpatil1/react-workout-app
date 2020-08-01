const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
/*
app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});


*/

app.use(express.static(__dirname));

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbUser:hwFe4JQ5tWCtUQ03@cluster0.uuvqv.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  
  client.close();
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);