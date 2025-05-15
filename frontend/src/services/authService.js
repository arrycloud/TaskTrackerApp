import axios from "axios";

// API base URL
const API_URL = "http://172.206.242.31:5000/api/auth/";

// STUDENT SIGNUP FUNCTION
const signup = async (email, password, name) => {
  try {
    const response = await axios.post(API_URL + "signup", {
      email,
      password,
      name,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Signup error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

//  STUDENT LOGIN FUNCTION GOES HERE
const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL + "login", { email, password });
    if (response.data.info.token) {
      localStorage.setItem("token", response.data.info.token); // Store JWT token
    }
    return response.data;
  } catch (error) {
    console.error(
      "Login error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// LOGOUT FUNCTION GOES HERE
const logout = () => {
  localStorage.removeItem("token");
};

// Get current user (based on stored token)
const getCurrentUser = () => {
  return localStorage.getItem("token");
};

// ADIMN AUTHSERVICES STARTS HERE(_____________________________________________________)

// ADMIN SIGNUP FUNCTION GOES HERE
const adminSignup = async (email, password, name) => {
  try {
    const response = await axios.post(API_URL + "adminSignup", {
      email,
      password,
      name,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Signup error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// ADMIN LOGIN FUNCTION GOES HERE
const adminLogin = async (email, password) => {
  try {
    const response = await axios.post(API_URL + "adminLogin", {
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token); // Store JWT token
    }
    return response.data;
  } catch (error) {
    console.error(
      "Login error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// add Student function goes here (14/09/24)
const addStudent = (formData) => {
  return axios.post(API_URL + "addStu", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ADD EXAM FUNCTION GOES HERE
const addExam = async (
  examName,
  examId,
  startTime,
  endTime,
  examDesc,
  examEleg
) => {
  try {
    const response = await axios.post(API_URL + "addExam", {
      examName,
      examId,
      startTime,
      endTime,
      examDesc,
      examEleg,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Adding Exam error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

//add questions and answer goes here  (14/09/24)

const addQuestion = async (
  examId,
  questionId,
  question,
  optionsA,
  optionsB,
  optionsC,
  optionsD,
  answer
) => {
  try {
    const response = await axios.post(API_URL + "addQue", {
      examId,
      questionId,
      question,
      optionsA,
      optionsB,
      optionsC,
      optionsD,
      answer,
    });
    return response.data;
  } catch (error) {
    console.error(
      "adding Question error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// update features goes here------------------------------------------------------------------------------------------------------------------------

// update Student function goes here (14/09/24)
const updtStudent = async (formData) => {
  try {
    const response = await axios.put(`${API_URL}updtStu`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set proper headers for form data
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Updating student error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// update exam function goes here  (14/09/24)
const updtExam = async (
  UpdtExamName,
  UpdtExamId,
  UpdtEstartTime,
  UpdtEendTime,
  UpdtExamDesc,
  UpdtExamEleg
) => {
  try {
    const response = await axios.put(API_URL + "updtExam", {
      examName: UpdtExamName,
      examId: UpdtExamId,
      stimestampSeconds: UpdtEstartTime,
      etimestampSeconds: UpdtEendTime,
      examDesc: UpdtExamDesc,
      examEleg: UpdtExamEleg, // Ensure eligibility is sent
    });
    return response.data;
  } catch (error) {
    console.error(
      "Updating Exam error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// update exam Question  (14/09/24)
const updtQuestion = async (
  examId,
  questionId,
  question,
  optionsA,
  optionsB,
  optionsC,
  optionsD,
  answer
) => {
  try {
    const response = await axios.put(API_URL + "updtQue", {
      examId,
      questionId,
      question,
      optionsA,
      optionsB,
      optionsC,
      optionsD,
      answer,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Updating Question error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// delete functionality goes here-_________________________________

// delete Students function goes here
const deleteStudent = async (studentId) => {
  try {
    const response = await axios.delete(`${API_URL}deleteStu/${studentId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Deleting Student data error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// deleteExam function goes here

const deleteExam = async (examId) => {
  try {
    const response = await axios.delete(`${API_URL}deleteExam/${examId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Deleting Exam data error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// delete Question function goes here
const deleteQuestion = async (examId, questionId) => {
  try {
    const response = await axios.delete(
      `${API_URL}deleteQue/${examId}/${questionId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Deleting question data error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
// get exam list and exam question goes here------------------------------(09-10-2024)

//get exam list----------------------------------
const getExamData = async () => {
  try {
    const response = await axios.get(`${API_URL}examlist`);
    return response.data;
  } catch (error) {
    console.error(
      "Exam List data fetching error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// get question data-------------------------------
const getQuestionData = async (examId) => {
  try {
    const response = await axios.get(`${API_URL}queList/${examId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Question List data fetching error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
  adminSignup,
  adminLogin,
  addStudent,
  addExam,
  getExamData,
  addQuestion,
  getQuestionData,
  updtStudent,
  updtExam,
  updtQuestion,
  deleteStudent,
  deleteExam,
  deleteQuestion,
};

export default authService;
