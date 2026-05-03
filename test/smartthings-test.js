import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import * as smartthings from '../smartthings.js'
chai.use(chaiAsPromised)
const expect = chai.expect

describe('smartthings', function () {
  describe('getTemperatureAndHumidity', function () {
    it('fetches current humidity sensor reading', async function () {
      const val = await smartthings.getTemperatureAndHumidity()
      expect(val).to.have.property('temp').that.is.a('number')
      expect(val).to.have.property('humidity').that.is.a('number')
    })
  })
})
