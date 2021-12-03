const logger = require('../utils/logger')
const { errorHandler } = require('../utils/middleware')

const returnRequestBody = async (request) => {

  let body = await new Promise(function (resolve, reject) {

    let requestBody = []
    request.on('data', (chunk) => {
      requestBody.push(chunk)
    })

    request.on('end', () => {
      try {
        requestBody = JSON.parse(Buffer.concat(requestBody))
      } catch (err) {
        reject(err)
      }
      resolve(requestBody)
    })
  })

  return body
}

const sendResponseBodyToClient = (body, response) => {

  body = JSON.stringify(body)

  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST'
  }

  response.writeHead(200, headers)
  response.end(body)
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
     * Handling response body
     */
    sendResponseBodyToClient(body, response)

  } catch (err) {
    errorHandler(err, request, response)
  }


}

module.exports = { cryptoToolAPI }