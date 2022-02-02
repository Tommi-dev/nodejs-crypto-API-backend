const logger = require('./logger')

const unknownEndpoint = (request, response) => {

  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST'
  }

  response.writeHead(404, headers)
  response.end()

}

const errorHandler = (err, request, response) => {

  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST'
  }

  if (err.message === 'Invalid method') {
    response.writeHead(405, headers)
    response.end()
  } else if (err.name === 'ValidationError') {
    let error = `${err.name} : ${err.message}`
    response.writeHead(400, headers)
    response.end(error)
  } else {
    response.writeHead(400, headers)
    response.end()
  }

}

/**
 * Function returns Promise
 * @param {Object} request 
 * @returns {Promise}
 */
const returnRequestBody = (request) => {

  let body = new Promise(function (resolve, reject) {

    /**
     * Grabbing data from the stream using the readable stream interface
     */
    
    let requestBody = []

    // Listener to the error events
    request.on('error', (err) => {
      throw new Error("Server side error")

    // Switching the stream into flowing mode
    }).on('data', (chunk) => {
      requestBody.push(chunk)

    // end event is emitted when there is no more data to be consumed from the stream
    }).on('end', () => {
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

module.exports = {
  unknownEndpoint,
  errorHandler,
  returnRequestBody,
  sendResponseBodyToClient
}
