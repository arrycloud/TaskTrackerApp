const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({

  examId: { type: String, required: true},
  questionId: { type: String, required: true},
  question: { type: String, required: true },
  optionsA: { type: String, required: true },
  optionsB: { type: String, required: true},
  optionsC:{type:String,required:true},
  optionsD: { type: String, required: true }, 
  answer: { type: String, required: true },
});


const Question = mongoose.model('Questions', questionSchema);

module.exports = Question;
