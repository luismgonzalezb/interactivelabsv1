var mongoose = require('mongoose');
mongoose.connect('mongodb://interactivelabsus:Labs2013@ds061258.mongolab.com:61258/il');
module.exports = mongoose.connection;