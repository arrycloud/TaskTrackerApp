const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ optionText: String, isCorrect: Boolean }],
});

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [questionSchema],
  timeLimit: { type: Number, required: true }, // in minutes
});

module.exports = mongoose.model('Exam', examSchema);
