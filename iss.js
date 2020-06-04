/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = callback => {
  const apiIP = "https://api.ipify.org/?format=json";
  // use request to fetch IP address from JSON API
  request(apiIP, (error, response, body) => {
    if (error) {
      callback(error);
    } else if (response.statusCode !== 200) {
      callback(Error(`Code: ${response.statusCode} when getting IP.`))
    } else {
      callback(null, JSON.parse(body).ip);
    }
  })
};

const fetchCoordsByIP = (ip, callback) => {
  const apiGEO = "https://ipvigilante.com/json/8.8.8.8";
  request(apiGEO, (error, response, body) => {
    // console.log(body)
    if (error) {
      callback(error);
    } else if (response.statusCode !== 200) {
      callback(Error(`Code: ${response.statusCode} when getting GEO Location.`))
    } else {
      const lat = JSON.parse(body).data.latitude;
      const long = JSON.parse(body).data.longitude;
      callback(null, { lat, long });
    }
  })


  // console.log('Latitude: ', result.data.latitude);
  // console.log('Longitude: ', result.data.longitude);

}


// fetchCoordsByIP(null, (error, data) => {
//   console.log(data)
// })

module.exports = { fetchMyIP, fetchCoordsByIP };
