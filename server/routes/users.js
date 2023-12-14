const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

const { getOneUser, getAllUser, createUser, updateUser, deleteUser } = require('../controllers/users');
const requireAuthentication = require('../middleware/auth');

// Attempt to limit spam post requests for inserting data

const minutes = 5;

const postLimiter = rateLimit({
  windowMs: minutes * 60 * 1000, // milliseconds
  max: 100, // Limit each IP to 100 requests per windowMs
  delayMs: 0, // Disable delaying - full speed until the max limit is reached 
  handler: (req, res) => {
    res.status(429).json({ success: false, msg: `You made too many requests. Please try again after ${minutes} minutes.` });
  }
});

// READ (ONE)
router.get('/:id',requireAuthentication, getOneUser);

// READ (ALL)
router.get('/', getAllUser);

// CREATE
router.post('/', postLimiter, createUser);

// UPDATE
router.put('/:id', updateUser);

// DELETE
router.delete('/:id', deleteUser);

module.exports = router;

