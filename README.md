# 'Constituencies near me'
Node app that allows geospatial search by postcode.

[https://constituency-searching.herokuapp.com/](https://constituency-searching.herokuapp.com/)


### Prerequisites
- npm and node
- grunt
- mongodb


#### To configure
- Copy `src/config.sample.js` to `src/config.js`.
- Fill in the fields with a Google Analytics key, Google Maps key, and you may need to tweak the mongoDB connection


#### To build the CSS
It uses less and grunt. To build the CSS, type `grunt`.


#### To start the app
`npm start`. By default it will load at `http://localhost:3000`.


#### To dataload the database
The data is in CSV format in `src/data/data.csv`. Load by starting the app and visiting `/dataload`.