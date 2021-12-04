const logger = require('../utils/logger')
const { errorHandler , returnRequestBody, sendResponseBodyToClient } = require('../utils/middleware')

class ValidationError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
  }
}

const checkObjectProperties = (object, ...params) => {

  if (!checkThatObjectHaveRightProperties(object, ...params)) {
    throw new ValidationError('Property missing')
  }
  if (!checkThatObjectDoesntHaveOtherProperties(object, ...params)) {
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

const checkThatObjectDoesntHaveOtherProperties = (object, ...params) => {

  let i = 0
  for (let property in object) {
    i++
  }
  if (params.length !== i) {
    return false
  } 
  return true

}

const cryptoToolAPI = async (crypto, fiat, request, response) => {

  try {

    if (request.method !== 'POST') {
      throw new Error('Invalid method')
    }

    /**
     * Handling request body
     */
    let body = await returnRequestBody(request)

    checkObjectProperties(body, 'start', 'end')

    /**
     * Handling response body
     */
    sendResponseBodyToClient(body, response)

  } catch (err) {
    errorHandler(err, request, response)
  }

}

module.exports = { cryptoToolAPI }