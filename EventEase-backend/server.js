const express = require('express')
const connectDB = require('./utils/db')
const userRoutes = require('./routes/userRoutes')
const eventRoutes = require('./routes/eventRoutes')

const app = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

// Middleware
app.use(express.json())

// Routes
app.use('/api/users', userRoutes)
app.use('/api/events', eventRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
