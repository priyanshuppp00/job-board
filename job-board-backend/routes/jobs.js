import express from 'express';
import Job from '../models/Job.js';
import auth from '../middleware/auth.js';

const router = express.Router();


// Create a new job posting
router.post('/', auth, async (req, res) => {
  try {
    const jobData = { ...req.body, userId: req.user.id };
    const job = new Job(jobData);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get list of jobs with optional search query
router.get('/', async (req, res) => {
  try {
    const { title, location, company, userId } = req.query;
    const query = {};
    if (title) query.title = { $regex: title, $options: 'i' };
    if (location) query.location = { $regex: location, $options: 'i' };
    if (company) query.company = { $regex: company, $options: 'i' };
    if (userId) query.userId = userId;

    const jobs = await Job.find(query).sort({ postedAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    if (job.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    Object.assign(job, req.body);
    await job.save();
    res.json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    if (job.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    await job.remove();
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
