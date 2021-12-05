const assert = require('assert')
const { 
  isDataISO8601, 
  checkThatObjectHaveRightProperties,
  theObjectHaveTheCorrectNumberOfProperties
} = require('../../../services/validations')

const validationsTest = () => {

  const body = {
    start: '2020-01-01',
    end: '2020-01-02'
  }

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

  describe('checkThatObjectHaveRightProperties( body, ...arguments )', () => {

    console.log('\n\tbody: ', body)
    test('With the given function arguments: \'start\', \'end\', \'end\' and \'start\', function returns true.', () => {
      const result = checkThatObjectHaveRightProperties(body, 'start', 'end', 'end', 'start')
      assert.equal(result, true)
    })
  
    test('With the given function arguments: \'start\' and \'end\', function returns true.', () => {
      const result = checkThatObjectHaveRightProperties(body, 'start', 'end')
      assert.equal(result, true)
    })
  
    test('With the given function arguments: \'start\', function returns true.', () => {
      const result = checkThatObjectHaveRightProperties(body, 'start')
      assert.equal(result, true)
    })

    test('With the given function arguments: \'end\', function returns true.', () => {
      const result = checkThatObjectHaveRightProperties(body, 'end')
      assert.equal(result, true)
    })

    test('With the given function arguments: \'start\', \'end\' and \'test\', function returns false.', () => {
      const result = checkThatObjectHaveRightProperties(body, 'start', 'end', 'test')
      assert.equal(result, false)
    })

    test('With the given function arguments: \'test2\', function returns false.', () => {
      const result = checkThatObjectHaveRightProperties(body, 'test2')
      assert.equal(result, false)
    })

  })

  describe('theObjectHaveTheCorrectNumberOfProperties( body, ...arguments )', () => {

    console.log('\n\tbody: ', body)
    test('With the given function arguments: \'mango\' and \'banana\', the body has the right number of properties.', () => {
      const result = theObjectHaveTheCorrectNumberOfProperties(body, 'mango', 'banana')
      assert.equal(result, true)
    })

    test('With the given function arguments: \'start\' and \'end\', the body has the right number of properties.', () => {
      const result = theObjectHaveTheCorrectNumberOfProperties(body, 'start', 'end')
      assert.equal(result, true)
    })

    test('With the given function arguments: \'start\', the number of body properties is different.', () => {
      const result = theObjectHaveTheCorrectNumberOfProperties(body, 'start')
      assert.equal(result, false)
    })

    test('With the given function arguments: \'end\', the number of body properties is different.', () => {
      const result = theObjectHaveTheCorrectNumberOfProperties(body, 'end')
      assert.equal(result, false)
    })

    test('With the given function arguments: \'start\', \'end\' and \'test\', the number of body properties is different.', () => {
      const result = theObjectHaveTheCorrectNumberOfProperties(body, 'start', 'end', 'test')
      assert.equal(result, false)
    })

    test('With the given function arguments: \'test2\', the number of body properties is different.', () => {
      const result = theObjectHaveTheCorrectNumberOfProperties(body, 'test2')
      assert.equal(result, false)
    })

  })

}

module.exports = { validationsTest }
