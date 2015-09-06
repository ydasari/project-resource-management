var mongoose = require('mongoose');
var mongoConnect = mongoose.connect('mongodb://localhost:27017/prm-beta-v1');
module.exports = mongoConnect;