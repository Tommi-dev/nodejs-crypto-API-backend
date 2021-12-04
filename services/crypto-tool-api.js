/**
 * Dependencies
 */
const { errorHandler, returnRequestBody, sendResponseBodyToClient } = require('../utils/middleware')
const validator = require('./validations')
const { fetchCoinGeckoAPI } = require('../models/coin-gecko-api')
const { returnDailyDataPoints } = require('./daily-data-points')
const { returnLongestBearishTrend } = require('./longest-bearish-trend')
const { returnDateAndHighestTradingVolume } = require('./highest-trading-volume')
const { returnTimeMachineAnswer } = require('./time-machine')

/**
 * Service layer for business logic. The function responds to the request with the desired cryptocurrency information.
 * @param {String} crypto bitcoin, ethereum, cardano, etc.
 * @param {String} fiat eur, usd, etc.
 * @param {Object} request request object
 * @param {Object} response response object
 */
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

    /**
     * Retrieving data from API with given cryptocurrency, fiat money and time period
     */
    const data = await fetchCoinGeckoAPI(crypto, fiat, body.start, body.end)

    /**
     * Cleaning up retrieved data ( get daily datapoints )
     */
    let dataWithDailyDataPoints = returnDailyDataPoints(data)

    /**
     * Create new body object
     */
    let newBody = {
      longest_bearish_trend: returnLongestBearishTrend(dataWithDailyDataPoints),
      highest_trading_volume: returnDateAndHighestTradingVolume(dataWithDailyDataPoints),
      time_machine_response: returnTimeMachineAnswer(dataWithDailyDataPoints)
    }

    /**
     * Handling response body
     */
    sendResponseBodyToClient(newBody, response)

  } catch (err) {
    errorHandler(err, request, response)
  }

}

module.exports = { cryptoToolAPI }