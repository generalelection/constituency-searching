

module.exports = {

  'if-eq': (item, test, options) => {
    if (item == test) { // eslint-disable-line eqeqeq
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  log: obj => JSON.stringify(obj, null, '\t'),

};
