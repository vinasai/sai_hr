const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  companyAddress: { type: String, required: true },
  salaryMinRange: { type: Number, default: 0 },
  salaryMaxRange: { type: Number, default: 0 },
  city: { type: String, required: true },
  jobType: { type: String, required: true },
  jobDescription: { type: String, required: true },
  email: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true } // Reference to Company model
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
