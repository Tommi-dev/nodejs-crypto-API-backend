const http = require('http')
const app = require('./app')

// Create server
const server = http.createServer()

// Listen to the request event
server.on('request', async (request, response) => {
  app(request, response) // application
})

const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})