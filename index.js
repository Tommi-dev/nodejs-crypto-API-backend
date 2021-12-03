const http = require('http')
const app = require('./app')
const logger = require('./utils/logger')

// Create server
const server = http.createServer()

// Listen to the request event
server.on('request', async (request, response) => {
  app(request, response) // application
})

const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})