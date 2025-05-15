import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
const AddQuestion = () => {
  const navigation = useNavigate();
  const [questionData, setQuestionData] = useState({
    examId: "",
    questionId: "",
    question: "",
    options: {
      A: "",
      B: "",
      C: "",
      D: "",
    },
    answer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({
      ...questionData,
      [name]: value,
    });
  };

  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({
      ...questionData,
      options: {
        ...questionData.options,
        [name]: value,
      },
    });
  };


  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      await authService.addQuestion(
        questionData.examId,
        questionData.questionId,
        questionData.question,
        questionData.options.A,
        questionData.options.B,
        questionData.options.C,
        questionData.options.D,
        questionData.answer
      );
      alert(`Question with question id ${questionData.questionId} is added successfully`);
      navigation("/addQue");

    } catch (err) {
      console.error(
        "adding question error:",
        err.response ? err.response.data : err.message
      );
      alert("Adding question error");
    }
  };
  const Back = (e) => {
    e.preventDefault();
    navigation("/adminDashboard");
  };

  return (
    <form onSubmit={handleAddQuestion}>
      <label>
        Exam Id:
        <input
          type="text"
          name="examId"
          value={questionData.examId}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Question ID:
        <input
          type="text"
          name="questionId"
          value={questionData.questionId}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Question:
        <input
          type="text"
          name="question"
          id="question"
          value={questionData.question}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Option A:
        <input
          type="text"
          name="A"
          id="A"
          value={questionData.options.A}
          onChange={handleOptionChange}
        />
      </label>
      <br />
      <label>
        Option B:
        <input
          type="text"
          name="B"
          id="B"
          value={questionData.options.B}
          onChange={handleOptionChange}
        />
      </label>
      <br />
      <label>
        Option C:
        <input
          type="text"
          name="C"
          id="C"
          value={questionData.options.C}
          onChange={handleOptionChange}
        />
      </label>
      <br />
      <label>
        Option D:
        <input
          type="text"
          name="D"
          id="D"
          value={questionData.options.D}
          onChange={handleOptionChange}
        />
      </label>
      <br />
      <label>
        Answer:
        <input
          type="text"
          name="answer"
          value={questionData.answer}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
      <button type="submit" onClick={Back}>
        Back
      </button>
    </form>
  );
};

export default AddQuestion;
