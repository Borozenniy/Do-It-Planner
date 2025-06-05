import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/user-routes';
import taskRoutes from './routes/task-routes';
import goalRoutes from './routes/goal-router';
//import { db } from '../database';
//import { db } from './db/index';
//import jwtCheck from './middleware/auth-middleware';
import { auth } from 'express-oauth2-jwt-bearer';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { users } from './db/schema';
import 'dotenv/config';

const db = drizzle(process.env.POSTGRES_URL!);

//import { userRoutes } from './routes/userRoutes.js';
//import { db } from './db/index';
//const db = require('./database');
//const { sql } = require('@vercel/postgres');
//require('dotenv').config({ path: '.env' });
import path from 'path';

const jwtCheck = auth({
  audience: 'https://do-it-planner.vercel.app/app/dashboard',
  issuerBaseURL: 'https://dev-761rd8ygardisai0.us.auth0.com/',
  tokenSigningAlg: 'RS256',
});

const app = express();
//const db = drizzle(process.env.POSTGRES_URL!);
const server = http.createServer(app);

// Create application/x-www-form-urlencoded parser
const corsOptions = {
  origin: ['https://do-it-planner.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
const urlencodedParser = bodyParser.urlencoded({ extended: false });
//app.use(jwtCheck);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public'));

app.get('/authorized', function (req, res) {
  res.send('Secured Resource');
});

const logAuthHeader = (req, res, next) => {
  console.log('Authorization:', req.headers.authorization);
  next();
};
app.use(logAuthHeader);

app.options('*', cors(corsOptions));

async function main() {
  console.log('CHECK');
  const user = {
    name: 'test',
    email: 'test@te2st.com',
  };

  await db.insert(users).values(user);
  console.log('New user created');

  await db
    .update(users)
    .set({
      name: 'test2',
    })
    .where(eq(users.email, user.email));
  console.log('User updated');

  await db.delete(users).where(eq(users.email, user.email));
  console.log('User deleted');
}

app.get('/', (req, res) => {
  res.send('Hello WORLD');
});

app.get('/authorized', function (req, res) {
  res.send('Secured Resource');
});

//pool
//  .connect()
//  .then(() => console.log('PostgreSQL connected'))
//  .catch((err) => console.log('Error connecting to PostgreSQL', err));

//routes

//app.use('/user', userRoutes);
app.use('/', userRoutes);
app.use('/', goalRoutes);
app.use('/goal', taskRoutes);

//app.use('/user', require('./routes/userRoutes'));
//app.use('/goal', require('./routes/goalRoutes'));
//app.use('/subgoal', require('./routes/subgoalRoutes'));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

//main(); //Check if it works

export default app;
