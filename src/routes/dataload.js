const csv = require('csvtojson');
const Constituency = require('../models/Constituency');


module.exports = (req, res, next) => {
  Constituency.collection.drop();

  csv({ delimiter: '|' })
    .fromFile(`${__dirname}/../data/data.csv`)
    .on('error', err => res.json(err))
    .on('json', (obj) => {
      const model = new Constituency();

      model.name = obj.constituency;
      model.geo = [obj.latitude, obj.longitude];
      model.mp = obj.mp;
      model.party = obj.party;

      model.save((err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`saved ${obj.constituency}`);
        }
      });
    })
    .on('end', () => {
      res.send('Data loaded');
    });
};
