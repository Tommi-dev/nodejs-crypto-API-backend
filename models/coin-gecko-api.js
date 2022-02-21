/**
 * Node.js standard modules
 */
const https = require('https')
const url = require('url')

/**
 * Data access layer for working with another API. Retrieves data from CoinGeco's public API within a given date range.
 * @param {String} crypto bitcoin, ethereum, cardano, etc.
 * @param {String} fiat eur, usd, etc.
 * @param {String} startDate start date in ISO8601 format
 * @param {String} endDate end date in ISO8601 format
 * @returns returns object
 */
const fetchCoinGeckoAPI = async (crypto, fiat, startDate, endDate) => {

  /* 1. Converting the ISO 8601 date format to UNIX timestamps.
   * UNIX time is in seconds and UTF time format.
   * The variable is also converted to a string. */
  const startDateUNIX = (new Date(startDate).setUTCSeconds(1) / 1000).toString()  // + 1 second
  const endDateUNIX = (new Date(endDate).setUTCHours(1) / 1000).toString()        // + 1 hour

  // 2. Setting up https request
  const apiUrl = `https://api.coingecko.com/api/v3/coins/${crypto}/market_chart/range?vs_currency=${fiat}&from=${startDateUNIX}&to=${endDateUNIX}`
  const q = url.parse(apiUrl, true)

  const options = {
    hostname: q.hostname,
    port: 443,
    path: q.path,
    method: 'GET'
  }

 // 3. Fetching data from API using promises and node.js http.request
  let promise = await new Promise((resolve, reject) => {

    const req = https.request(options, (res) => {

      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error('statusCode=' + res.statusCode))
      }

      let body = []

      res.on('data', function (chunk) {
        body.push(chunk)
      })

      res.on('end', function () {
        try {
          body = JSON.parse(Buffer.concat(body).toString())
        } catch (e) {
          reject(e)
        }
        resolve(body)
      })

    })

    req.on('error', (e) => {
      reject(e.message)
    })

    req.end()
  })

  // 4. Return promise with data
  return promise

}

module.exports = { fetchCoinGeckoAPI }