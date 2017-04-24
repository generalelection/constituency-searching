const fetch = require('isomorphic-fetch');
const Constituency = require('../models/Constituency');


module.exports = (req, res, next) => {
  const filter = req.body.filter;
  const postcode = req.body.postcode;
  const limit = req.body.limit || 5;

  fetch(`http://api.postcodes.io/postcodes/${postcode}`)
    .then(response => response.json())
    .then((json) => {
      if (json.status === 200) {
        const options = {
          geo: {
            $near: [
              json.result.latitude,
              json.result.longitude,
            ],
          },
        };

        if (filter) {
          options.party = filter;
        }

        const query = Constituency.find(options).limit(limit).exec((err, results) => {
          if (err) {
            throw err;
          }
          res.json({
            you: {
              latitude: json.result.latitude,
              longitude: json.result.longitude,
            },
            results,
          });
        });
      } else {
        res.json([]);
      }
    });
};
