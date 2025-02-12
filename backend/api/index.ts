const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const server = http.createServer(app);
const { sql } = require('@vercel/postgres');

const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config({ path: '.env' });

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

//app.options('*', cors());
const corsOptions = {
  origin: ['https://do-it-planner.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Дозволяє preflight-запити

//app.use(
//  cors({
//    origin: '*',
//    methods: ['GET', 'POST', 'PUT', 'DELETE'],
//    allowedHeaders: ['Content-Type', 'Authorization'],
//    credentials: true,
//  })
//);

//app.use(
//  cors({
//    origin: '*',
//    methods: ['GET', 'POST', 'PUT', 'DELETE'],
//    allowedHeaders: ['Content-Type', 'Authorization'],
//    credentials: true,
//  })
//);

// http://localhost:5173

app.use(express.json()); // Для парсингу JSON тіла запиту
//app.options('*', cors());

//* MongoDB Connection

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'components', 'home.htm'));
});

app.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'components', 'about.htm'));
});

app.get('/uploadUser', function (req, res) {
  res.sendFile(
    path.join(__dirname, '..', 'components', 'user_upload_form.htm')
  );
});

app.post('/uploadSuccessful', urlencodedParser, async (req, res) => {
  try {
    await sql`INSERT INTO Users (Id, Name, Email) VALUES (${req.body.user_id}, ${req.body.name}, ${req.body.email});`;
    res.status(200).send('<h1>User added successfully</h1>');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding user');
  }
});

app.get('/allUsers', async (req, res) => {
  try {
    const users = await sql`SELECT * FROM Users;`;
    if (users && users.rows.length > 0) {
      let tableContent = users.rows
        .map(
          (user) =>
            `<tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                    </tr>`
        )
        .join('');

      res.status(200).send(`
                <html>
                    <head>
                        <title>Users</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                            }
                            table {
                                width: 100%;
                                border-collapse: collapse;
                                margin-bottom: 15px;
                            }
                            th, td {
                                border: 1px solid #ddd;
                                padding: 8px;
                                text-align: left;
                            }
                            th {
                                background-color: #f2f2f2;
                            }
                            a {
                                text-decoration: none;
                                color: #0a16f7;
                                margin: 15px;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>Users</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${tableContent}
                            </tbody>
                        </table>
                        <div>
                            <a href="/">Home</a>
                            <a href="/uploadUser">Add User</a>
                        </div>
                    </body>
                </html>
            `);
    } else {
      res.status(404).send('Users not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving users');
  }
});

app.use('/user', require('../routes/userRoutes'));
app.use('/goal', require('../routes/goalRoutes'));
app.use('/subgoal', require('../routes/subgoalRoutes'));

app.listen(3000, () => console.log('Server ready on port 3000.'));

module.exports = app;
