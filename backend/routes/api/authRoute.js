const express = require('express');
const AuthController = require('../../controllers/auth');
const auth = require('../../middlewares/checkAuth');

const router = express.Router();

// @route POST api/auth/register
// @desc register user
// @access Public
router.post('/register', AuthController.registerUser);

// @route POST api/auth/login
// @desc login user
// @access Public
router.post('/login', AuthController.loginUser);

// @route GET api/auth/user
// @desc Get User
// @access Private
router.get('/user', auth, AuthController.getUser);

module.exports = router;
