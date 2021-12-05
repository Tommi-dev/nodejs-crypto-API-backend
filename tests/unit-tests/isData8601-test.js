const assert = require('assert')
const { isDataISO8601 } = require('../../services/validations')

const isDataISO8601Test = () => {

  describe('isDataISO8601()', () => {

    test('The date 2020-01-01 is in ISO 8601 format', () => {
      const result = isDataISO8601('2020-01-01')
      assert.equal(result, true)
    })
  
    test('Date 2020-01-1 is not in ISO 8601 format', () => {
      const result = isDataISO8601('2020-01-1')
      assert.equal(result, false)
    })
  
    test('Date 2020-1-01 is not in ISO 8601 format', () => {
      const result = isDataISO8601('2020-1-01')
      assert.equal(result, false)
    })
  
    test('Date 202-01-01 is not in ISO 8601 format', () => {
      const result = isDataISO8601('202-01-01')
      assert.equal(result, false)
    })
  
    test('Date 202001-01 is not in ISO 8601 format', () => {
      const result = isDataISO8601('202001-01')
      assert.equal(result, false)
    })
  
    test('Date 20200101 is not in ISO 8601 format', () => {
      const result = isDataISO8601('20200101')
      assert.equal(result, false)
    })
  
    test('Date -2020-01-01 is not in ISO 8601 format', () => {
      const result = isDataISO8601('-2020-01-01')
      assert.equal(result, false)
    })
  
    test('Empty date is not in ISO 8601 format', () => {
      const result = isDataISO8601('')
      assert.equal(result, false)
    })
  })

}

module.exports = { isDataISO8601Test }
