const logger = require('../utils/logger')
const { errorHandler, returnRequestBody, sendResponseBodyToClient } = require('../utils/middleware')
const validator = require('../services/validations')
const { fetchCoinGeckoAPI } = require('../models/coin-gecko-api')

const returnDailyDataPoints = data => {

  // 1. Get all UNIX timestamp data points
  const unixTimeStamps = data.prices.map(datapoint => datapoint[0])

  // 2. Get days from UNIX timestamps
  const days = unixTimeStamps.map(timestamp => new Date(timestamp).getUTCDate())

  // 3. Search the indexes for the first data point of the day
  let indexes = [0]
  for (let i = 1; i < days.length; i++) {
    if (days[i] !== days[i - 1]) {
      indexes.push(i)
    }
  }

  // 4. Search all datapoints with given index
  let newBitcoinDataPrices = []
  let newBitcoinDataMarketCap = []
  let newBitcoinDataTotalVolume = []
  for (let i = 0; i < indexes.length; i++) {
    newBitcoinDataPrices.push([...data.prices[indexes[i]]])
    newBitcoinDataMarketCap.push([...data.market_caps[indexes[i]]])
    newBitcoinDataTotalVolume.push([...data.total_volumes[indexes[i]]])
  }

  // 5. Convert UNIX time stamps to ISO8601 format
  let newDataPrices = convertUNIXtoISO8601(newBitcoinDataPrices)
  let newDataMarketCap = convertUNIXtoISO8601(newBitcoinDataMarketCap)
  let newDataTotalVolume = convertUNIXtoISO8601(newBitcoinDataTotalVolume)

  // 6. Create new data object
  let dataWithDailyDataPoints = {
    prices: newDataPrices,
    market_caps: newDataMarketCap,
    total_volumes: newDataTotalVolume
  }

  return dataWithDailyDataPoints

}

const convertUNIXtoISO8601 = data => {

  for (let i = 0; i < data.length; i++) {

    let months = new Date(data[i][0]).getMonth() + 1
    let date = new Date(data[i][0]).getDate()

    if (months < 10) {
      months = `0${new Date(data[i][0]).getMonth() + 1}`
    }

    if (date < 10) {
      date = `0${new Date(data[i][0]).getDate()}`
    }

    data[i][0] = `${new Date(data[i][0]).getFullYear()}-${months}-${date}`

  }
  return data
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
     * Handling response body
     */
    sendResponseBodyToClient(dataWithDailyDataPoints, response)

  } catch (err) {
    errorHandler(err, request, response)
  }

}

module.exports = { cryptoToolAPI }