const Exam = require('../models/addExam');
const Question = require('../models/addQuestion');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// add Exam goes here (22/09/24)

const AddExam = async (req, res) => {
  const { examName, examId, startTime, endTime, examDesc, examEleg } = req.body;

  if (!examName || !examId || !startTime || !endTime || !examDesc || !examEleg) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if Exam already exists
    const existingExam = await Exam.findOne({ examId });
    if (existingExam) {
      return res.status(400).json({ message: 'Exam already exists. Use another examId' });
    }

    const examDetails = new Exam({
      examName,
      examId,
      startTime, 
      endTime,
      examDesc,
      eligibility: examEleg 
    });
    await examDetails.save();

    res.status(201).json({ message: 'Exam created successfully' });
  } catch (err) {
    console.error('Error in adding Exam:', err);
    res.status(500).json({ error: 'Internal server error during Adding Exam' });
  }
};

// update Exam function goes here (11-10-2024)

const UpdateExam = async (req, res) => {
  const { examName, examId, stimestampSeconds, etimestampSeconds, examDesc, examEleg } = req.body;

  if (!examId) {
    return res.status(400).json({ message: 'Exam ID is required for update' });
  }

  try {
    const existingExam = await Exam.findOneAndUpdate(
      { examId },
      {
        $set: {
          examName: examName ? examName : undefined,
          startTime: stimestampSeconds ? stimestampSeconds : undefined,  // Correct the schema key
          endTime: etimestampSeconds ? etimestampSeconds : undefined,    // Correct the schema key
          examDesc: examDesc ? examDesc : undefined,
          eligibility: examEleg ? examEleg : undefined,  // Fixed key to match the schema
        },
      },
      { new: true } // Return the updated document
    );

    if (!existingExam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    res.status(200).json({ message: 'Exam updated successfully', exam: existingExam });
  } catch (err) {
    console.error('Error in updating Exam:', err);
    res.status(500).json({ error: 'Internal server error during updating Exam' });
  }
};

// Fetch Exam data function goes here (22/09/24)

const GetExamData = async (req, res) => {
  try {
    const exams = await Exam.find(); 
    const examDatas = exams.map(exam => ({
      examId: exam.examId,
      examName: exam.examName,
      startTime: exam.startTime, 
      endTime: exam.endTime,     
      examDesc: exam.examDesc,
      eligibility: exam.eligibility, 
    }));

    res.status(200).json({ examDatas });
  } catch (err) {
    console.error('Error fetching exam data:', err);
    res.status(500).json({ error: 'Internal server error during fetching exam data' });
  }
};



// add Question function goes Here (22/09/24)

const AddNewQuestion = async (req, res) => {
  const { examId, questionId, question, optionsA, optionsB, optionsC, optionsD, answer } = req.body;
  if (!examId || !questionId || !question || !optionsA || !optionsB || !optionsC || !optionsD || !answer) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const existingExam = await Exam.findOne({ examId });
    if (!existingExam) {
      return res.status(400).json({ message: 'Exam or examId does not exist. Please add the exam first.' });
    }
    const existingQuestion = await Question.findOne({ examId, questionId });
    if (existingQuestion) {
      return res.status(400).json({ message: 'Question Id already exists for this exam. Use another Question Id.' });
    }

    const Questiondetails = new Question({
      examId,
      questionId,
      question,
      optionsA,
      optionsB,
      optionsC,
      optionsD,
      answer
    });

    await Questiondetails.save();
    res.status(201).json({ message: 'New Question created successfully' });

  } catch (err) {
    console.error('Error in adding Question:', err); // Enhanced logging
    res.status(500).json({ error: 'Internal server error during Adding Question' });
  }
};



// Get Questions with options function goes here
const GetQuestionData = async (req, res) => {
  const { examId } = req.params; 
  if (!examId) {
    return res.status(400).json({ message: 'Exam ID is required' });
  }

  try {
    const questions = await Question.find({ examId }); 
    if (questions.length === 0) {
      return res.status(404).json({ message: 'No questions found for the specified exam ID' });
    }
    res.status(200).json({ questions });
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).json({ error: 'Internal server error during fetching questions' });
  }
};


// update question function goes here (22/09/24)

const UpdateQuestion = async (req, res) => {
  const { examId, questionId, question, optionsA, optionsB, optionsC, optionsD, answer } = req.body;

  if (!questionId) {
    return res.status(400).json({ message: 'Question ID is required for update' });
  }

  try {
    const existingQuestion = await Question.findOneAndUpdate(
      { questionId }, 
      { 
        $set: {
          examId: examId ? examId : undefined, 
          question: question ? question : undefined,
          optionsA: optionsA ? optionsA : undefined,
          optionsB: optionsB ? optionsB : undefined,
          optionsC: optionsC ? optionsC : undefined,
          optionsD: optionsD ? optionsD : undefined,
          answer: answer ? answer : undefined,
        },
      },
      { new: true } 
    );

    if (!existingQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json({ message: 'Question updated successfully', question: existingQuestion });
  } catch (err) {
    console.error('Error updating question:', err);
    res.status(500).json({ error: 'Internal server error during updating question' });
  }
};


// delete exam and question are listed below________________________________________

// delete exam details (22/09/24)

const DeleteExam = async (req, res) => {
  const { examId } = req.params;
  if (!examId) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const deletedCount = await Exam.deleteOne({ examId:examId });
    if (!deletedCount.deletedCount) {
      return res.status(400).json({ message: 'Exam or examId Not available' });
    }
    const deletionResult = await Question.deleteMany({ examId:examId });
    console.log(`${deletionResult.deletedCount} question(s) with examId: ${examId} were deleted successfully.`);
  } catch (err) {
    console.error('Error in deleting exams or questions:', err);
    res.status(500).json({ error: 'An error occurred during deletion' });
  }
};

// delete question function goes here (22/09/2024)

const DeleteQuestion = async (req, res) => {
  const { examId, questionId } = req.params;  
  console.log(examId, questionId);

  if (!examId || !questionId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const deletedCount = await Question.deleteOne({ examId, questionId });
    if (!deletedCount.deletedCount) {
      return res.status(400).json({ message: 'Question or QuestionId Not available' });
    }
    console.log(`${deletedCount.deletedCount} question(s) with examId: ${examId} were deleted successfully.`);
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (err) {
    console.error('Error in deleting questions:', err);
    res.status(500).json({ error: 'An error occurred during deletion' });
  }
};


module.exports = {
  AddExam,
  UpdateExam,
  GetExamData,
  DeleteExam,
  AddNewQuestion,
  UpdateQuestion,
  GetQuestionData,
  DeleteQuestion
};









// const Exam = require('../models/Exam');

// exports.getExams = async (req, res) => {
//   try {
//     const exams = await Exam.find();
//     res.json(exams);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.addExam = async (req, res) => {
//   const { title, questions, timeLimit } = req.body;

//   try {
//     const newExam = new Exam({ title, questions, timeLimit });
//     await newExam.save();
//     res.json({ msg: 'Exam added successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
