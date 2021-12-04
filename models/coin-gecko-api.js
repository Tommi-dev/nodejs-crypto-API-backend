const https = require('https')
const url = require('url')

const fetchCoinGeckoAPI = async (crypto, fiat, startDate, endDate) => {

  // Set time to the end of the date (time is closest to midnight in UTF time)
  let startDateISO8601 = startDate + 'T00:00:01.000Z'  // + 1 second
  let endDateISO8601 = endDate + 'T01:00:00.000Z'      // + 1 hour

  // Converting ISO8601 format to UNIX time stamps
  let startDateUNIX = convertISO8601ToUNIX(startDateISO8601)
  let endDateUNIX = convertISO8601ToUNIX(endDateISO8601)

  // Fetch data from API
  let promise = await new Promise((resolve, reject) => {

    const apiUrl = `https://api.coingecko.com/api/v3/coins/${crypto}/market_chart/range?vs_currency=${fiat}&from=${startDateUNIX}&to=${endDateUNIX}`
    const q = url.parse(apiUrl, true)

    const options = {
      hostname: q.hostname,
      port: 443,
      path: q.path,
      method: 'GET'
    }

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

  return promise

}

const convertISO8601ToUNIX = date => {
  let unixTimeStamp = (new Date(date).getTime() / 1000).toString()
  return unixTimeStamp
} 

module.exports = { fetchCoinGeckoAPI }