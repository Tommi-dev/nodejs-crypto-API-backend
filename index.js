/**
 * Module dependencies
 */
const http = require('http')
const api = require('./api/api')
const logger = require('./utils/logger')
const config = require('./utils/config')

/**
 * Create http server application
 */
const server = http.createServer()

// Listener to the request events
server.on('request', (request, response) => {
  api(request, response) // Controller layer
})

// Listener to the specified port. Starts the HTTP server listening for connections.
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})