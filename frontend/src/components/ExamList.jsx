import React, { useState, useEffect } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";
function ExamList() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();
  const dummyUrl="dummy.jpeg";
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData);
  const handleExamList = async () => {
    try {
      const data = await authService.getExamData();
      console.log("Exam list fetched successfully:", data);
      setExams(data.examDatas);
    } catch (err) {
      console.error(
        "Error in fetching exam list:",
        err.response ? err.response.data : err.message
      );
    }
  };

  useEffect(() => {
    handleExamList();
  }, []);

  // fetch exam list every 2 minutes----------------------------
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     handleExamList();
  //   }, 120000);
  //   return () => clearInterval(interval);
  // }, []);

  const openQuestion = (id) => {
    navigate(`/queList/${id}`);
  };

  return (
    <>
      <div className="info-bar">
        <div className="info-content">
          <div className="user-details">
            <img src={userData.image?userData.image:dummyUrl} alt="User" className="user-image" />
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
      <div className="examList">
        {exams.length > 0 ? (
          exams.map((exam) => (
            <div key={exam.examId} onClick={() => openQuestion(exam.examId)}>
              <p>Exam Name: {exam.examName}</p>
              <p>Exam ID: {exam.examId}</p>
              <p>Eligibility: {exam.eligibility}</p>
              <p>
                Start Time:{" "}
                {new Date(parseInt(exam.startTime) * 1000).toLocaleString()}
              </p>
              <p>
                End Time:{" "}
                {new Date(parseInt(exam.endTime) * 1000).toLocaleString()}
              </p>
              <p>Exam Description: {exam.examDesc}</p>
            </div>
          ))
        ) : (
          <div>
            <p>No exams available</p>
          </div>
        )}
      </div>
    </>
  );
}

export default ExamList;
