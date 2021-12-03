const app = (request, response) => {

  request.on('error', (err) => {
    logger.error(err)
    response.statusCode = 400
    response.end()
  })

  response.on('error', (err) => {
    logger.error(err)
  })

  /**
   * Routes
   */
   if (request.method === 'GET' && request.url === `/`) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end( 
      `<!DOCTYPE html>
      <html>
      <head>
      <title>Crypto API</title>
      </head>
      <body>
      
      <h1>Hello world</h1>
      
      </body>
      </html>`
    );

  } else {
    response.statusCode = 404;
    response.end();
  }

}

module.exports = app