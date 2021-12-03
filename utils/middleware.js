const logger = require('./logger')

const unknownEndpoint = (request, response) => {
  response.statusCode = 404
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
  } else {
    response.writeHead(400, headers)
    response.end()
  }

}

module.exports = {
  unknownEndpoint,
  errorHandler
}
