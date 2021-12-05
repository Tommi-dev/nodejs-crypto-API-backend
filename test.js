const logger = require('./utils/logger')

let tests = []

function test(name, fn) {
  try {
    fn()
    logger.info('\n\t✅', name)
  } catch (err) {
    logger.error('\n\t❌', name)
    logger.error('\t', err.name + ': ' + err.message)
  }
}

function describe(name, fn) {
  tests.push({ name, fn })
}

function run() {
  tests.forEach(test => {
    logger.info('Testing: ', test.name)
    test.fn()
    logger.info('\n')
  })
}

const files = process.argv.slice(2)

global.describe = describe
global.test = test


files.forEach(file => {
  require(file)
})

run()