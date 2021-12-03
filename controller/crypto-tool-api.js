const logger = require('../utils/logger')
const { errorHandler , returnRequestBody, sendResponseBodyToClient } = require('../utils/middleware')

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
     * Handling response body
     */
    sendResponseBodyToClient(body, response)

  } catch (err) {
    errorHandler(err, request, response)
  }

}

module.exports = { cryptoToolAPI }