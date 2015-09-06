var serverController = require('./controllers/serverController');
var express = require('express');
var router = express.Router();

router.post('/forgotPassword', serverController.forgotPassword);

module.exports = router;
