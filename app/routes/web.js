let express = require('express');
let router = express.Router();
let authController = require('../controllers/device/auth.controller');

router.post('/login', authController.login);

module.exports = router;
