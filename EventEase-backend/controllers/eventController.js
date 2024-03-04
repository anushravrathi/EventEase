// controllers/eventController.js
const Event = require('../models/Event');
const User = require('../models/User');

exports.createEvent = async (req, res) => {
  try {
    const { name, description, college } = req.body;
    const event = new Event({ name, description, college });
    await event.save();
    res.status(201).json({ message: 'Event created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.registerEvent = async (req, res) => {
  try {
    const { eventId, userId } = req.body;
    const event = await Event.findById(eventId);
    const user = await User.findById(userId);
    if (!event || !user) throw new Error('Event or user not found');
    if (event.college !== user.college) throw new Error('User can only register for events in their college');
    
    // Check if the user is already registered for the event
    if (event.registeredUsers.includes(user._id)) {
      throw new Error('User is already registered for this event');
    }

    // Add user to the event's registeredUsers array
    event.registeredUsers.push(user._id);
    await event.save();

    res.status(200).json({ message: 'Registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
