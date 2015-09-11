var serverController = require('./controllers/serverController');
var express = require('express');
var router = express.Router();

router.post('/forgotPassword', serverController.forgotPassword);
router.get('/resetPasswordToken/:token', serverController.resetPasswordToken);

router.post('/updatePassword',serverController.updatePassword);

module.exports = router;
