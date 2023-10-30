const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');

router.post('/register', controllers.createUser);
router.post('/login', controllers.loginUser);

module.exports = router;