const request = require('request-promise-native');
const { nextISSTimesForMyLocation } = require('./iss-promised');
const { printPassTimes } = require('./iss-promised');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });


