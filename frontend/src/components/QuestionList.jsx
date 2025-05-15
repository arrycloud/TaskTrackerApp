import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import authService from "../services/authService";
import "../styles/global.css";

function QuestionList() {
  const { examId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const dummyUrl="dummy.jpeg";
  const [score, setScore] = useState(null);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const handleQuestionList = async () => {
    try {
      const data = await authService.getQuestionData(examId);
      console.log("Question list fetched successfully:", data);
      setQuestions(data.questions);
    } catch (err) {
      console.error(
        "Error in fetching question list:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((question) => {
      if (userAnswers[question.questionId] === question.answer) {
        score += 1;
      }
    });
    setScore(score);
    console.log("User's Score:", score);
  };

  useEffect(() => {
    handleQuestionList();
  }, [examId]);

  return (
    <>
      <div className="info-bar">
        <div className="info-content">
          <div className="user-details">
            <img src={dummyUrl} alt="User" className="user-image" />
            <div className="user-info">
              <p>
                <strong>Name:</strong> {userData.name}
              </p>
              <p>
                <strong>SID:</strong> {userData.sid}
              </p>
              <p>
                <strong>Course:</strong> {userData.course}
              </p>
              <p>
                <strong>Course ID:</strong> {userData.courseId}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="quelistMain">
        {questions.length === 0 ? (
          <div>
            <p>Loading Questions.... </p>
          </div>
        ) : score === null ? (
          // Render the questions before the exam is submitted
          <section>
            {questions.map((question, index) => (
              <div className="queList" key={index}>
                <span>Question ID: {question.questionId}</span>
                <p>{question.question}</p>
                <input
                  type="radio"
                  value="A"
                  id={`A-${question.questionId}`}
                  name={`options-${question.questionId}`}
                  onChange={() => handleAnswerChange(question.questionId, "A")}
                />
                <label htmlFor={`A-${question.questionId}`}>
                  {question.optionsA}
                </label>
                <br />
                <input
                  type="radio"
                  value="B"
                  id={`B-${question.questionId}`}
                  name={`options-${question.questionId}`}
                  onChange={() => handleAnswerChange(question.questionId, "B")}
                />
                <label htmlFor={`B-${question.questionId}`}>
                  {question.optionsB}
                </label>
                <br />
                <input
                  type="radio"
                  value="C"
                  id={`C-${question.questionId}`}
                  name={`options-${question.questionId}`}
                  onChange={() => handleAnswerChange(question.questionId, "C")}
                />
                <label htmlFor={`C-${question.questionId}`}>
                  {question.optionsC}
                </label>
                <br />
                <input
                  type="radio"
                  value="D"
                  id={`D-${question.questionId}`}
                  name={`options-${question.questionId}`}
                  onChange={() => handleAnswerChange(question.questionId, "D")}
                />
                <label htmlFor={`D-${question.questionId}`}>
                  {question.optionsD}
                </label>
              </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
          </section>
        ) : (
          // Render the result after the exam is submitted
          <div>
            <div className="result">
              <p>
                Your Score: {score} / {questions.length}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default QuestionList;
