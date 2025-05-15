const express = require('express');
const { AddExam,DeleteExam,UpdateExam,GetExamData,AddNewQuestion,UpdateQuestion,GetQuestionData,DeleteQuestion}= require('../controllers/examController');
const auth = require('../middleware/auth');
const router = express.Router();

// routes for Exam (22/09/2024)
router.get('/examlist', GetExamData);
router.post('/addExam', AddExam);
router.put('/updtExam', UpdateExam);
router.delete('/deleteExam/:examId', DeleteExam);

// routes for Question (22/09/2024)
router.get('/queList/:examId', GetQuestionData);
router.post('/addQue', AddNewQuestion);
router.put('/updtQue', UpdateQuestion);
router.delete('/deleteQue/:examId/:questionId', DeleteQuestion);

module.exports = router;
