import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  applicantName: { type: String, required: true },
  applicantEmail: { type: String, required: true },
  resume: { type: String }, // URL or text of resume
  appliedAt: { type: Date, default: Date.now },
});

const Application = mongoose.model('Application', applicationSchema);

export default Application;
