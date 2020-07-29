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

// Connect to Mongo
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/dev_spot_v2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
mongoose.connection
  .once("open", () => console.log("Successfully connected to MongoDB"))
  .on("error", (error) => {
    console.warn("Warning", error);
  });

// setup routes
app.use('/users', require('./routes/userRoutes'))
app.use('/projects', require('./routes/projectRouter'))