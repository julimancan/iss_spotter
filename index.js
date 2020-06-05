const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }
    // console.log('It worked! Returned IP:', ip);
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        console.log("It didn't work!", error);
        return;
      }
      // console.log("It worked! Returned Location:", coords)
      fetchISSFlyOverTimes(coords, (error, passes) => {
        if(error) {
          console.log("It didn't work!", error);
          return;
        }
        // console.log("It worked! The ISS Station is going to pass over your head: ", passes);   
        printPassTimes(passes);     
      })
    });
  });
  // success, print out the deets!
  return;
});

const printPassTimes = function(passes) {
  for (const pass of passes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};