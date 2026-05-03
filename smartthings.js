const request = require('request-promise-native')
const smartthingsBaseUrl = 'https://api.smartthings.com/v1'
const humidityDevId = 'e90a25e1-fe7a-4322-9659-042070b63a03'

/**
 * Fetch smartthings humidity sensor reading
 * @returns {Promise<{temp: number, humidity: number>} object containing temperature and humidity percentage
 */
async function getTemperatureAndHumidity () {
  const smartthingsAccessToken = process.env.SMARTTHINGS_ACCESS_TOKEN
  if (!smartthingsAccessToken) {
    throw new Error('environment variable SMARTTHINGS_ACCESS_TOKEN not defined')
  }
  const options = {
    uri: `${smartthingsBaseUrl}/devices/${humidityDevId}/status`,
    auth: { bearer: smartthingsAccessToken },
    json: true
  }

  return request(options)
    .then((response) => {
      console.log('getTemperatureAndHumidity(): response\n' + JSON.stringify(response))
      return {
        temp: response.components.main.temperatureMeasurement.temperature.value,
        humidity: response.components.main.relativeHumidityMeasurement.humidity.value
      }
    })
    .catch((err) => {
      console.log('getTemperatureAndHumidity(): error fetching humidity sensor reading from smartthings api: ' + err)
    })
}

module.exports = {
  getTemperatureAndHumidity
}
