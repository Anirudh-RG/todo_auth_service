const express = require('express');
const { register, login, updateEmail, getUserProfile } = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/middleware'); // Add this import

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/email', authenticateToken, updateEmail); // Add auth middleware
router.get('/profile', authenticateToken, getUserProfile); // Add this route

module.exports = router;