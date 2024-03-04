const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.post('/signup', async (req, res) => {
    try {
      const { email, password, college } = req.body
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = new User({ email, password: hashedPassword, college })
      await user.save()
      res.status(201).json({ message: 'User created successfully' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) throw new Error('User not found')
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) throw new Error('Invalid password')
    const token = jwt.sign({ userId: user._id }, 'secret_key')
    res.status(200).json({ token })
  } catch (err) {
    res.status(401).json({ error: err.message })
  }
})

module.exports = router
