const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  salaryMinRange: { type: Number, required: true, min: 0 },
  salaryMaxRange: { type: Number, required: true, min: 0 },
  experienceYear: { type: Number, required: true, min: 0 },
  city: { type: String, required: true },
  ageLimitMin: { type: Number, min: 0 },
  ageLimitMax: { type: Number, min: 0 },
  workingHours: { type: String },
  overtime: { type: String, enum: ['Mandatory', 'Optional', 'Depends'], default: 'Depends' },
  education: { type: String },
  drivingLicence: { type: String, enum: ['Required', 'Not Required'], default: 'Not Required' },
  accommodation: { type: String, enum: ['Included', 'Not Included'], default: 'Not Included' },
  transportation: { type: String, enum: ['Included', 'Not Included'], default: 'Not Included' },
  food: { type: String, enum: ['Included', 'Not Included'], default: 'Not Included' },
  specialTraining: { type: String, enum: ['Yes', 'No'], default: 'No' },
  specialSkill: { type: String, enum: ['Yes', 'No'], default: 'No' },
  specialNotes: { type: String },

});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
