const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  examName: { type: String, required: true },
  examId: { type: String, required: true, unique: true },
  startTime: { type: String, required: true }, 
  endTime: { type: String, required: true },
  examDesc: { type: String, required: true },
  eligibility: { type: String, required: true }, 
});

const Exam = mongoose.model('Exams', examSchema);
module.exports = Exam;
