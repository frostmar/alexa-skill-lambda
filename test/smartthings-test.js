const chai = require('chai')
chai.use(require('chai-as-promised'))
const expect = chai.expect
const smartthings = require('../smartthings.js')

describe('smartthings', function () {
  describe('getHumidity', function () {
    it('fetches current humidity sensor reading', function () {
      return expect(smartthings.getHumidity())
        .to.eventually.be.fulfilled
        .to.be.a('Number')
    })
  })
})
