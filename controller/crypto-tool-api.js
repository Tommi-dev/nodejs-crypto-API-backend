const logger = require('../utils/logger')

const cryptoToolAPI = async (crypto, fiat, request, response) => {

  try {

    response.writeHead(200)
    response.end()

  } catch (err) {
    logger.error(err)
  }

}

module.exports = { cryptoToolAPI }