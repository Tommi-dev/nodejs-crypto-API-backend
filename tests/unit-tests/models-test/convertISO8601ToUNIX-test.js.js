const assert = require('assert')
const { convertISO8601ToUNIX } = require('../../../models/coin-gecko-api')

const convertISO8601ToUNIXTest = () => {

  describe('convertISO8601ToUNIX()', () => {

    test('Convert 2020-01-01 to UNIX time stamp format', () => {
      const result = convertISO8601ToUNIX('2020-01-01')
      assert.equal(result, '1577836800')
    })

    test('Convert date 2020-01-01 + one second to UNIX time stamp format', () => {
      const result = convertISO8601ToUNIX('2020-01-01T00:00:01.000Z')
      assert.equal(result, '1577836801')
    })

    test('Convert date 2020-01-01 + one hour to UNIX time stamp format', () => {
      const result = convertISO8601ToUNIX('2020-01-01T01:00:00.000Z')
      assert.equal(result, '1577840400')
    })
  
  })
}

module.exports = { convertISO8601ToUNIXTest }
