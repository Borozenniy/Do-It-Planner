const User = require('../schemas/user');

const createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).json(user);
    console.log('User created');
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'User already exists' });
    }
    //res.status(400).json({ message: 'Error creating user' });
  }
};

const testEndpoint = async (req, res) => {
  res.send('Backend is working');
};

module.exports = { createUser, testEndpoint };
