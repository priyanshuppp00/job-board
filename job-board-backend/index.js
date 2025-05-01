import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/jobboard';

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

import jobsRouter from './routes/jobs.js';
import applicationsRouter from './routes/applications.js';
import usersRouter from './routes/users.js';

// Basic route to check server
app.get('/', (req, res) => {
  res.send('Job Board API is running');
});

// Use routes
app.use('/jobs', jobsRouter);
app.use('/applications', applicationsRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
