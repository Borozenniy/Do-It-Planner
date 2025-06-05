import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
//import { Pool } from 'pg';

//* Without Drizzle-Kit

//const { Pool } = require('pg');
//require('dotenv').config();

//const pool = new Pool({
//  host: process.env.POSTGRES_HOST,
//  port: Number(process.env.POSTGRES_PORT),
//  user: process.env.POSTGRES_USER,
//  password: process.env.POSTGRES_PASSWORD,
//  database: process.env.POSTGRES_DB,
//});

export const db = drizzle(process.env.POSTGRES_URL!);
//export const db = drizzle(pool);
//module.exports = pool;
