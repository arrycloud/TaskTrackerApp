import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import LandingPage from './components/LandingPage';
import ExamList from './components/ExamList';
import QuestionList from './components/QuestionList';
import AdminLogin from './components/admin/AdminLogin';
import AdminSignup from './components/admin/AdminSignup';
import AdminDashboard from './components/admin/AdminDashboard';
import AddStudent from './components/admin/AddStudent';
import AddExam from './components/admin/AddExam';
import AddQuestion from './components/admin/AddQuestion';
import Delete from './components/admin/Delete';
import Result from './components/admin/Result';
import UpdateStudent from './components/admin/UpdateStudent';
import UpdateExam from './components/admin/UpdateExam';
import UpdateQuestion from './components/admin/UpdateQuestion';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/examlist" element={<ExamList />} />
        <Route path="/queList/:examId" element={<QuestionList />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/adminSignup" element={<AdminSignup />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/addStu" element={<AddStudent />} />
        <Route path="/addExam" element={<AddExam />} />
        <Route path="/addQue" element={<AddQuestion />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/result" element={<Result />} />
        <Route path="/updtStu" element={<UpdateStudent />} />
        <Route path="/updtExam" element={<UpdateExam />} />
        <Route path="/updtQue" element={<UpdateQuestion />} />
      </Routes>
    </Router>
  );
}

export default App;
