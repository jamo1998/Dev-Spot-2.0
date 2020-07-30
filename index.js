const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// set up express

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200
}))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`)
})

const uri = process.env.MONGO_URI

// Connect to Mongo
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

mongoose.connect(uri).then(() => console.log('Mongoose Connected')).catch(err => console.log(err))

// setup routes
app.use('/users', require('./routes/userRoutes'))
app.use('/projects', require('./routes/projectRouter'))