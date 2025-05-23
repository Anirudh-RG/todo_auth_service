const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/today', (req, res) => {
  const today = new Date();
  res.status(200).json({ message: `Today is ${today.toDateString()}` });
});
module.exports = router;
