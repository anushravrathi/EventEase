const mongoose = require('mongoose')
const { mongoURI } = require('../config')

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    // Use createIndexes() to avoid the deprecation warning
    mongoose.connection.createIndexes()

    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('MongoDB connection error:', error.message)
    process.exit(1)
  }
}

module.exports = connectDB
