const http = require('http')
const api = require('./api/api')
const logger = require('./utils/logger')
const config = require('./utils/config')

// Create server
const server = http.createServer()

// Listen to the request event
server.on('request', async (request, response) => {
  api(request, response) // Controller layer
})

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})