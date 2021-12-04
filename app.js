const logger = require('./utils/logger')
const { cryptoToolAPI } = require('./controller/crypto-tool-api')
const { unknownEndpoint } = require('./utils/middleware')

/**
 * Controller layer for API routes and endpoints.
 * @param {Object} request request object
 * @param {Object} response response object
 */
const app = (request, response) => {

  /**
   * Routes
   */
  switch (request.url) {

    case '/api/bitcoin-eur': // endpoint
      cryptoToolAPI('bitcoin', 'eur', request, response)
      break

    default:
      unknownEndpoint(request, response)
  }

}

module.exports = app