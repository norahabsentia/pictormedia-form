const mongoose = require('mongoose');
//const dbURI = 'mongodb://localhost:27017/api';
const dbURI = 'mongodb://localhost:27017/';

mongoose.connect(dbURI);

module.exports = mongoose;
