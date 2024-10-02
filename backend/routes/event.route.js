import express from "express";
const router = express.Router();
import Event from "../models/event.model.js";
import { verifyAlumni } from "../middleware/auth.verifyAlumini.js"; // Middleware to verify alumni

// Create an event
router.post('/create', verifyAlumni, async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      createdBy: req.alumniId // Assuming you have the alumni's ID from middleware
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Error creating event' });
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'name');
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

export default  router;
