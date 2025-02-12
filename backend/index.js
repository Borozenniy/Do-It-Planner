const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const server = http.createServer(app);
//const { sql } = require('@vercel/postgres');

const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config({ path: '.env' });

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

const corsOptions = {
  origin: ['https://do-it-planner.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json()); // Для парсингу JSON тіла запиту);

//* MongoDB Connection

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/user', require('./routes/userRoutes'));
app.use('/goal', require('./routes/goalRoutes'));
app.use('/subgoal', require('./routes/subgoalRoutes'));

app.listen(3000, () => console.log('Server ready on port 3000.'));

module.exports = app;
