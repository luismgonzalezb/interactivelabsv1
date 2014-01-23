var mongoose = require('mongoose');
mongoose.connect('mongodb://airlineroot:root@ds047198.mongolab.com:47198/flights');
module.exports = mongoose.connection;