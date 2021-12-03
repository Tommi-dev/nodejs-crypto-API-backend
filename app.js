const logger = require('./utils/logger')
const { cryptoToolAPI } = require('./controller/crypto-tool-api')
const { unknownEndpoint } = require('./utils/middleware')

const app = (request, response) => {

  /**
   * Routes
   */
  switch (request.url) {

    case '/api/bitcoin-eur':
      cryptoToolAPI('bitcoin', 'eur', request, response)
      break

    default:
      unknownEndpoint(request, response)
  }

}

module.exports = app