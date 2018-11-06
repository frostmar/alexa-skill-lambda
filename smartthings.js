const request = require('request-promise-native')
const smartthingsBaseUrl = 'https://api.smartthings.com/v1'
const humidityDevId = 'd142b6c5-977b-44a9-9dc9-b8f1ba898d3e'

/**
 * Fetch smartthings humidity sensor reading
 * @returns {Promise<number>} humidity percentage
 */
function getHumidity () {
  const smartthingsAccessToken = process.env.SMARTTHINGS_ACCESS_TOKEN
  const options = {
    uri: `${smartthingsBaseUrl}/devices/${humidityDevId}/status`,
    auth: { bearer: smartthingsAccessToken },
    json: true
  }

  return request(options)
    .then((response) => {
      console.log('getHumidity(): response\n' + JSON.stringify(response))
      return response.components.main.relativeHumidityMeasurement.humidity.value
    })
    .catch((err) => {
      console.log('getHumidity(): error fetching humidity sensor reading from smartthings api: ' + err)
    })
}

module.exports = {
  getHumidity
}
