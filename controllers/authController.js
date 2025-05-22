const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByUsername, createUser } = require('../models/userModel');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = await findUserByUsername(username);
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(username, hashedPassword);
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findUserByUsername(username);
    if (!user) return res.status(400).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '6h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};
