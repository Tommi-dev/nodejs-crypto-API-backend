/**
 * Module dependencies
 */
const { cryptoToolAPI } = require('../services/crypto-tool-api')
const { unknownEndpoint } = require('../utils/middleware')

/**
 * Controller layer for API routes and endpoints.
 * @param {Object} request request object
 * @param {Object} response response object
 */
const api = (request, response) => {

  /**
   * Routes
   */
  switch (request.url) {

    // Route
    case '/api/bitcoin-eur': // endpoint
      cryptoToolAPI('bitcoin', 'eur', request, response) // Service layer
      break

    default:
      unknownEndpoint(request, response)
  }

}

module.exports = api