const logger = require('../utils/logger')
const { errorHandler, returnRequestBody, sendResponseBodyToClient } = require('../utils/middleware')
const validator = require('../services/validations')
const { fetchCoinGeckoAPI } = require('../models/coin-gecko-api')

const cryptoToolAPI = async (crypto, fiat, request, response) => {

  try {

    if (request.method !== 'POST') {
      throw new Error('Invalid method')
    }

    /**
     * Handling request body
     */
    let body = await returnRequestBody(request)

    /**
     * Validation tests to ensure that the request body is in the correct format
     */
    validator.checkObjectProperties(body, 'start', 'end')
    validator.checkThatDataIsInISO8601Format(body.start, body.end)
    validator.checkThatTheStartDateIsBeforeTheEndDate(body.start, body.end)

    // Retrieving data from API with given cryptocurrency, fiat money and time period
    let data = await fetchCoinGeckoAPI(crypto, fiat, body.start, body.end)

    /**
     * Handling response body
     */
    sendResponseBodyToClient(data, response)

  } catch (err) {
    errorHandler(err, request, response)
  }

}

module.exports = { cryptoToolAPI }