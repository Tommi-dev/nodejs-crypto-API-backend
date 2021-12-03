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

module.exports = {
  unknownEndpoint,
  errorHandler,
  returnRequestBody,
  sendResponseBodyToClient
}
