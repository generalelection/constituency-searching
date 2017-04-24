
const Constituency = require('../models/Constituency');


let parties = [];


Constituency.find().distinct('party', (error, result) => {
  parties = result.sort();
});


module.exports = (req, res, next) => {
  res.render('pages/map', {
    parties,
  });
};
