const config = require('../config');
const mongoose = require('mongoose');


mongoose.connect(config.mongo);


module.exports = mongoose.model('Constituency', new mongoose.Schema({
  name: String,
  geo: {
    type: [Number],
    index: '2d',
  },
  mp: String,
  party: String,
}));
