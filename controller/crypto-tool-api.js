const logger = require('../utils/logger')
const { errorHandler, returnRequestBody, sendResponseBodyToClient } = require('../utils/middleware')
const validator = require('../services/validations')
const { fetchCoinGeckoAPI } = require('../models/coin-gecko-api')
const { returnDailyDataPoints } = require('../services/daily-data-points')
const { returnLongestBearishTrend } = require('../services/longest-bearish-trend')
const { returnDateAndHighestTradingVolume } = require('../services/highest-trading-volume')

const returnTimeMachineAnswer = data => {
  let bitcoinPrices = data.prices.map(datapoint => datapoint[1])
  let lowestPrice = data.prices.find(datapoint => datapoint[1] === Math.min(...bitcoinPrices))
  let newBitcoinPrices = bitcoinPrices.slice(bitcoinPrices.indexOf(lowestPrice[1]), bitcoinPrices.length)
  let highestPrice = data.prices.find(datapoint => datapoint[1] === Math.max(...newBitcoinPrices))
  let timeMachine = {
    buy: lowestPrice[0],
    sell: highestPrice[0],
    message: ''
  }
  if (lowestPrice[1] === highestPrice[1]) {
    timeMachine.message = 'Bear market! Don\'t buy or sell!'
    timeMachine.buy = ''
    timeMachine.sell = ''
    return timeMachine
  }
  return timeMachine
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