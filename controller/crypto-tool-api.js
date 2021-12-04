const logger = require('../utils/logger')
const { errorHandler, returnRequestBody, sendResponseBodyToClient } = require('../utils/middleware')
const validator = require('../services/validations')
const { fetchCoinGeckoAPI } = require('../models/coin-gecko-api')
const { returnDailyDataPoints } = require('../services/daily-data-points')

const returnLongestBearishTrend = data => {
  let days = [0]
  let di = 0
  for (let i = 1; i < data.prices.length; i++) {
    if (data.prices[i][1] < data.prices[i - 1][1]) {
      days[di] += 1
      continue
    }
    di += 1
    days.push(0)
  }
  return Math.max(...days)
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
      longest_bearish_trend: returnLongestBearishTrend(dataWithDailyDataPoints)
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