const express = require('express');
const {signup,login} = require('../controllers/authentication.js');
const {authenticate} = require('../middlewares/authmiddleware.js');
const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);

module.exports = router;
