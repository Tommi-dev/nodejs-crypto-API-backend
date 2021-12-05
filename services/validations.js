class ValidationError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
  }
}

const checkThatTheStartDateIsBeforeTheEndDate = (startDate, endDate) => {

  let start = ''
  let end = ''
  let arrStart = []
  let arrEnd = []

  for (let i = 0; i < startDate.length; i++) {
    if (startDate[i] === '-') {
      arrStart.push(Number(start))
      arrEnd.push(Number(end))
      start = ''
      end = ''
      continue
    }
    start += startDate[i]
    end += endDate[i]
  }

  arrStart.push(Number(start))
  arrEnd.push(Number(end))

  for (let i = 0; i < arrStart.length; i++) {
  
    if (i === arrStart.length - 1) {
      if (arrStart[i] >= arrEnd[i] && arrStart[1] >= arrEnd[1] && arrStart[0] >= arrEnd[0]) {
        throw new ValidationError('Start date must be before the end date')
      }
    }
  
    if (arrStart[i] > arrEnd[i]) {
      throw new ValidationError('Start date must be before the end date')
    }
  
  }

}

const checkThatDataIsInISO8601Format = (...params) => {

  for (let i = 0; i < params.length; i++) {

    if (typeof(params[i]) !== 'string') {
      throw new ValidationError('Invalid data')
    }

    if (!isDataISO8601(params[i])) {
      throw new ValidationError('Data is not in ISO8601 format')
    }
  }
}

const isDataISO8601 = data => {

  if (((data).match(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/g))) {
    return true
  }

  return false

}

const checkObjectProperties = (object, ...params) => {

  if (!checkThatObjectHaveRightProperties(object, ...params)) {
    throw new ValidationError('Property missing')
  }

  if (!theObjectHaveTheCorrectNumberOfProperties(object, ...params)) {
    throw new ValidationError('Too many properties')
  }

}

const checkThatObjectHaveRightProperties = (object, ...params) => {

  for (let i = 0; i < params.length; i++) {

    if (!(params[i] in object)) {
      return false
    }

  }

  return true

}

const theObjectHaveTheCorrectNumberOfProperties = (object, ...params) => {

  let i = 0
  for (let property in object) {
    i++
  }

  if (params.length !== i) {
    return false
  } 

  return true

}

module.exports = {
  checkObjectProperties,
  checkThatDataIsInISO8601Format,
  checkThatTheStartDateIsBeforeTheEndDate,
  isDataISO8601,
  checkThatObjectHaveRightProperties,
  theObjectHaveTheCorrectNumberOfProperties
}