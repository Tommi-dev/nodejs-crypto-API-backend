const http = require('http')
const app = require('./app')
const logger = require('./utils/logger')
const config = require('./utils/config')

// Create server
const server = http.createServer()

// Listen to the request event
server.on('request', async (request, response) => {
  app(request, response) // application
})

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})