const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { email, emailPassword } = require('../config')
const nodemailer = require('nodemailer')

exports.signup = async (req, res) => {
  try {
    const { email, password, college } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ email, password: hashedPassword, college })
    await user.save()

    // Send registration confirmation email
    sendConfirmationEmail(email, 'Registration Confirmation', 'You have successfully registered for EventEase.')

    res.status(201).json({ message: 'User created successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) throw new Error('User not found')

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) throw new Error('Invalid password')

    const token = jwt.sign({ userId: user._id }, 'secret_key')
    res.status(200).json({ token })
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
}

// Function to send confirmation email
const sendConfirmationEmail = async (to, subject, text) => {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: email,
      pass: emailPassword
    }
  })

  let mailOptions = {
    from: email,
    to: to,
    subject: subject,
    text: text
  }

  await transporter.sendMail(mailOptions)
}
