const chai = require('chai')
chai.use(require('chai-as-promised'))
const expect = chai.expect
const smartthings = require('../smartthings.js')

describe('smartthings', function () {
  describe('getTemperatureAndHumidity', function () {
    it('fetches current humidity sensor reading', async function () {
      const val = await smartthings.getTemperatureAndHumidity()
      expect(val).to.have.property('temp').that.is.a('number')
      expect(val).to.have.property('humidity').that.is.a('number')
    })
  })
})
