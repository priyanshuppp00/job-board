import express from 'express';
import Application from '../models/Application.js';

const router = express.Router();

// Apply for a job
router.post('/', async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
