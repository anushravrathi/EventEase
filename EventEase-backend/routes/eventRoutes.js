const express = require('express')
const router = express.Router()
const EventController = require('../controllers/eventController')

router.post('/create', EventController.createEvent)
router.post('/register', EventController.registerEvent)

module.exports = router
