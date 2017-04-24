const dataload = require('../routes/dataload');
const home = require('../routes/home');
const nearby = require('../routes/nearby');


const config = require('../config');

module.exports = {

  register: (app) => {
    app.get('/', home);
    app.get('/dataload', dataload);
    app.post('/nearby', nearby);
  },

};
