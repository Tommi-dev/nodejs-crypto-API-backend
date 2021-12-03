const unknownEndpoint = (request, response) => {
  response.statusCode = 404
  response.end()
}

module.exports = { unknownEndpoint }