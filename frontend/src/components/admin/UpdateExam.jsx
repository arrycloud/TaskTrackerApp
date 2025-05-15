import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const AddExam = () => {
  const [examName, setExamName] = useState('');
  const [examId, setExamId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [examDesc, setExamDesc] = useState('');
  const [examEleg, setExamEleg] = useState('');
  const navigate = useNavigate();

  const handleUpdtExam = async (e) => {
    e.preventDefault();
    if (!examName || !examId || !startTime || !endTime || !examDesc || !examEleg) {
      alert("All fields must be filled.");
      return;
    }
  
    try {
      const stimestampSeconds = Math.round(new Date(startTime).getTime() / 1000);
      const etimestampSeconds = Math.round(new Date(endTime).getTime() / 1000);

      await authService.updtExam(
        examName,
        examId,
        stimestampSeconds,
        etimestampSeconds,
        examDesc,
        examEleg
      );
      
      alert(`Exam with exam id ${examId} is Updated successfully`);
      navigate('/addQue');
    } catch (err) {
      console.error('Error updating exam:', err.response ? err.response.data : err.message);
      alert("exam data updation error");
    }
  };
  

  const addQuestion = () => {
    navigate('/addQue');
  };

  const back = () => {
    navigate('/adminDashboard');
  };

  return (
    <form onSubmit={handleUpdtExam}>
      <h2>Update Exam</h2>
      <input
        type="text"
        placeholder="Name"
        value={examName}
        onChange={(e) => setExamName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Exam Id"
        value={examId}
        onChange={(e) => setExamId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Exam Eligibility"
        value={examEleg}
        onChange={(e) => setExamEleg(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        placeholder="Exam Start Time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        placeholder="Exam End Time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Some description about the exam"
        value={examDesc}
        onChange={(e) => setExamDesc(e.target.value)}
        required
      />
      <button type="submit">Update Exam</button>
      <button type="button" onClick={back}>
        Back
      </button>
      <button type="button" onClick={addQuestion}>
        Add Question
      </button>
    </form>
  );
};

export default AddExam;
