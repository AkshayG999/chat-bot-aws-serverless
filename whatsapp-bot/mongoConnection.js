const mongoose = require('mongoose')
const logger = require("nirmitee-logger");
mongoose.Promise = global.Promise
let isConnected

module.exports = connectToDatabase = () => {
  if (isConnected) {
    console.log('=> using existing database connection')
    return Promise.resolve()
  }

  console.log('=> using new database connection')
  logger.info({
      uri: process.env.MONGODB_URI
  })
  return mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
  })
    .then(db => {
      isConnected = db.connections[0].readyState
    })
}
