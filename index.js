const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned IP:', ip);

  fetchCoordsByIP(ip, (error, coords) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }
    console.log("It worked! Returned Location:", coords)
    fetchISSFlyOverTimes(coords, (error, passes) => {
      if(error) {
        console.log("It didn't work!", error);
        return;
      }
      console.log("It worked! The ISS Station is going to pass over your head: ", passes);


    })
    
 
 
  });

});

