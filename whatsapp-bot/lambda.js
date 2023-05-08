const awsServerlessExpress = require('aws-serverless-express')
const connectToDatabase = require('./mongoConnection')

const {app} = require('./index')
const logger = require('nirmitee-logger')
const warmer = require('lambda-warmer')

const server = awsServerlessExpress.createServer(app)
exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  warmer(event).then(isWarmer => {
    if (isWarmer) {
      callback(null, 'warmed')
      // else proceed with handler logic
    } else {
      connectToDatabase()
        .then(db => {
          console.log("its connected")
          awsServerlessExpress.proxy(server, event, context)
        })
        .catch(err => {
          console.log(err)
          logger.error({ message: 'Mongo Error', ...err })
        })
    }
  })
}
