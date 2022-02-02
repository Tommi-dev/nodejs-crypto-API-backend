class ValidationError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
  }
}

const checkObjectProperties = (object, ...params) => {

  if (!theObjectHaveTheCorrectNumberOfProperties(object, ...params)) {
    throw new ValidationError('Invalid number of properties')
  }

  if (!checkThatObjectHaveRightProperties(object, ...params)) {
    throw new ValidationError('Invalid property')
  }

}

const checkThatObjectHaveRightProperties = (object, ...params) => {

  if (JSON.stringify(Object.keys(object)) === JSON.stringify(params)) {
    return true
  }

  return false

}

const theObjectHaveTheCorrectNumberOfProperties = (object, ...params) => {

  if (Object.keys(object).length === params.length) {
    return true
  }

  return false

}

const checkThatTheStartDateIsBeforeTheEndDate = (startDate, endDate) => {

  if (new Date(startDate).getTime() >= new Date(endDate).getTime()) {
    return false
  }

  return true

}

const checkThatDataIsInISO8601Format = (...params) => {

  for (let i = 0; i < params.length; i++) {

    if (typeof(params[i]) !== 'string') {
      throw new ValidationError('Data is not in string format.')
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

module.exports = {
  checkObjectProperties,
  checkThatDataIsInISO8601Format,
  checkThatTheStartDateIsBeforeTheEndDate,
  isDataISO8601,
  checkThatObjectHaveRightProperties,
  theObjectHaveTheCorrectNumberOfProperties
}