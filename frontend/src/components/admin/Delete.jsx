import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
const Delete = () => {
  const navigate = useNavigate();
  const [examId, setExamId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [questionId, setQuestionId] = useState("");

  const Back = () => {
    navigate("/adminDashboard");
  };
  const handleDeleteStudent = async (e) => {
    e.preventDefault();
    try {
      await authService.deleteStudent(studentId);
      alert(`Student with id ${studentId} is Deleted successfully`);
    } catch (err) {
      console.error(
        "deleting student error:",
        err.response ? err.response.data : err.message
      );
      alert("Error in deleting student data");
    }
  };
  const handleDeleteExam = async (e) => {
    e.preventDefault();
    try {
      await authService.deleteExam(examId);
      alert(`Exam with id ${examId} is Deleted successfully`);
    } catch (err) {
      console.error(
        "deleting exam error:",
        err.response ? err.response.data : err.message
      );
      alert("Error in deleting exam data");
    }
  };
  const handleDeleteQuestion = async (e) => {
    e.preventDefault();
    try {
      await authService.deleteQuestion(examId, questionId);
      alert(`question with question id  ${questionId} is deleted successfully`);
      //navigate("/addQue");
    } catch (err) {
      console.error(
        "deleting question error:",
        err.response ? err.response.data : err.message
      );
      alert("Error in deleting question");
    }
  };

  return (
    <div>
      <h2>All Delete functionality Available Here</h2>
      <div className="deleteMainDiv">
        <form onSubmit={handleDeleteStudent}>
          <h2>Delete Student</h2>
          <input
            type="text"
            placeholder="Student Id"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
          <button type="submit">Delete Student</button>
        </form>
        <form onSubmit={handleDeleteExam}>
          <h2>Delete Exam</h2>
          <input
            type="text"
            placeholder="Exam Id"
            value={examId}
            onChange={(e) => setExamId(e.target.value)}
            required
          />
          <button type="submit">Delete Exam</button>
        </form>
        <form onSubmit={handleDeleteQuestion}>
          <h2>Delete Question</h2>
          <input
            type="text"
            placeholder="Exam Id"
            value={examId}
            onChange={(e) => setExamId(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Question Id"
            value={questionId}
            onChange={(e) => setQuestionId(e.target.value)}
            required
          />
          <button type="submit">Delete Question</button>
        </form>
        <button type="submit" onClick={Back}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Delete;
