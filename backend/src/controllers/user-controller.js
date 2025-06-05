import { db } from '../database.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';

const createUser = async (req, res) => {
  const { name, email } = req.body;
  const { sub } = req.auth.payload;

  try {
    //const isUserExists = await db.select(users).where(eq(users.email, email));
    const isUserExists = await db
      .select()
      .from(users)
      .where(eq(users.auth0Id, sub));

    if (isUserExists.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const [newUser] = await db
      .insert(users)
      .values({ name, email, auth0Id: sub })
      .returning();

    res.status(201).json(newUser);
    console.log('User created');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const testEndpoint = async (req, res) => {
  res.send('Backend is working');
};

export { createUser, testEndpoint };

//MongoDB

//const User = require('../schemas/user');

//const createUser = async (req, res) => {
//  const user = new User(req.body);
//  try {
//    await user.save();
//    res.status(201).json(user);
//    console.log('User created');
//  } catch (error) {
//    if (error.code === 11000) {
//      res.status(400).json({ message: 'User already exists' });
//    }
//    //res.status(400).json({ message: 'Error creating user' });
//  }
//};

//const testEndpoint = async (req, res) => {
//  res.send('Backend is working');
//};

//module.exports = { createUser, testEndpoint };
