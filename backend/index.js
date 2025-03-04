const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const pool = require('./db');
const server = http.createServer(app);
//const { sql } = require('@vercel/postgres');

const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config({ path: '.env' });

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.json());
app.use(express.static('public'));

const corsOptions = {
  origin: ['https://do-it-planner.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

//* MongoDB Connection
//mongoose
//  .connect(process.env.MONGODB_URI, {})
//  .then(() => {
//    console.log('MongoDB Connected');
//  })
//  .catch((err) => {
//    console.log(err);
//  });

//* POSTGREsql Connection
pool
  .connect()
  .then(() => console.log('PostgreSQL connected'))
  .catch((err) => console.log('Error connecting to PostgreSQL', err));

//routes
app.get('/', async (req, res) => {
  try {
    const data = await pool.query('SELECT * FROM schools');
    res.status(200).send({ children: data.rows });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  res.sendStatus(200);
});

app.post('/', async (req, res) => {
  const { name, location } = req.body;
  try {
    await pool.query('INSERT INTO schools (name, address) VALUES ($1,$2)', [
      name,
      location,
    ]);
    res.status(200).send({ message: 'Successfully added child' });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  res.status(200).send({ message: `YOUR KEYS WERE ${name} and ${location}` });
});

app.get('/setup', async (req, res) => {
  try {
    await pool.query(
      'CREATE TABLE schools( id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))'
    );
    res.status(200).send({ message: 'Table created successfully' });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.use('/user', require('./routes/userRoutes'));
app.use('/goal', require('./routes/goalRoutes'));
app.use('/subgoal', require('./routes/subgoalRoutes'));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = app;
