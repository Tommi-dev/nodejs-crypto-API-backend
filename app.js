const logger = require('./utils/logger')
const { cryptoToolAPI } = require('./controller/crypto-tool-api')

const app = (request, response) => {

  request.on('error', (err) => {
    logger.error(err)
    response.statusCode = 400
    response.end()
  })

  response.on('error', (err) => {
    logger.error(err)
  })

  /**
   * Routes
   */
  switch (request.method, request.url) {

    case 'POST', '/api/bitcoin-eur':
      cryptoToolAPI('bitcoin', 'eur', request, response)
      break

    default:
      response.statusCode = 404;
      response.end();
  }

}

module.exports = app