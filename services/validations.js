class ValidationError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
  }
}

const validator = (object, ...params) => {

  if (typeof(object) !== 'object') {
    throw new ValidationError('Invalid data.')
  }

  if (!theObjectHaveTheCorrectNumberOfProperties(object, ...params)) {
    throw new ValidationError('Invalid number of properties.')
  }

  if (!checkThatObjectHaveRightProperties(object, ...params)) {
    throw new ValidationError('Invalid property.')
  }

  for (let i = 0; i < params.length; i++) {

    if (typeof(object[params[i]]) !== 'string') {
      throw new ValidationError('Data is not in string format.')
    }

    if (!isDataISO8601(object[params[i]])) {
      throw new ValidationError('Data is not in ISO8601 format.')
    }
  }

  if (!checkThatTheStartDateIsBeforeTheEndDate(object[params[0]], object[params[1]])) {
    throw new ValidationError('Start date must be before the end date.')
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

const isDataISO8601 = data => {

  if (((data).match(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/g))) {
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

module.exports = {
  validator,
  checkThatTheStartDateIsBeforeTheEndDate,
  isDataISO8601,
  checkThatObjectHaveRightProperties,
  theObjectHaveTheCorrectNumberOfProperties
}