const Admin = require('../models/addAdmin');
const Student = require('../models/addStudent');
const multer = require("multer");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

// create new admin function goes here

const AdminSignup = async (req, res) => {
    const { email, password, name } = req.body;
  
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const existingStudent = await Admin.findOne({ email });
      if (existingStudent) {
        return res.status(400).json({ message: 'Admin already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const student = new Admin({ email, password: hashedPassword, name });
      await student.save();
  
      res.status(201).json({ message: 'Admin created successfully' });
    } catch (err) {
      console.error('Error in signup:', err);
      res.status(500).json({ error: 'Internal server error during signup' });
    }
  };


  // login admin function goes here

const AdminLogin = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
      const user = await Admin.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.error('Password mismatch for user:', email);
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      // Generate and send JWT
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.json({ token });
    } catch (err) {
      console.error('Error during login process:', err);
      res.status(500).json({ error: 'Internal server error during login' });
    }
  };



// add Student goes here (22/09/24)

// Configure multer to save the uploaded file in the 'uploads' directory
const imageDir = path.join(__dirname, '../public');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Route that handles the addition of student data
const AddStudentData = async (req, res) => {
  const { name, gender, SID, course, courseId, stuCourseEndYear, mobno, email, password } = req.body;
  const img = req.file ? req.file.path : null; // Path to the uploaded image file

  if (!name || !gender || !SID || !course || !courseId || !stuCourseEndYear || !mobno || !email || !password || !img) {
    return res.status(400).json({ message: "All fields are required for signup" });
  }

  try {
    const existingStudent = await Student.findOne({ SID });
    if (existingStudent) {
      return res.status(400).json({ message: "Student with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const student = new Student({
      name,
      gender,
      SID,
      course,
      courseId,
      stuCourseEndYear,
      mobno,
      email,
      password: hashedPassword,
      img, // Store the file path in the database
    });

    await student.save();
    res.status(201).json({ message: "Student created successfully" });
  } catch (err) {
    console.error("Error in Adding Student Data:", err);
    res.status(500).json({ error: "Internal server error during Adding Student Data" });
  }
};

// update student function goes here (23/09/2024)
const updateStudentData = async (req, res) => {
  const { name, gender, studentId, course, courseId, stuCourseEndYear, mobno, email } = req.body;
  
  if (!studentId) {
    return res.status(400).json({ message: 'Student ID is required for update' });
  }
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    student.name = name || student.name;
    student.gender = gender || student.gender;
    student.course = course || student.course;
    student.courseId = courseId || student.courseId;
    student.stuCourseEndYear = stuCourseEndYear || student.stuCourseEndYear;
    student.mobno = mobno || student.mobno;
    student.email = email || student.email;

    if (req.file) {
      student.img = req.file.filename; 
    }

    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      student.password = hashedPassword;
    }
    await student.save();
    res.status(200).json({ message: 'Student data updated successfully' });
  } catch (err) {
    console.error('Error updating student data:', err);
    res.status(500).json({ error: 'Internal server error during updating student data' });
  }
};

// delete Student data function goes here (22/09/24)
const deleteStudentData = async (req, res) => {
  const { studentId } = req.params;
  if (!studentId) {
    return res.status(400).json({ message: 'Student ID is required' });
  }

  try {
    const deletedCount = await Student.deleteOne({ SID: studentId });
    if (!deletedCount.deletedCount) {
      return res.status(400).json({ message: 'Student ID not available' });
    }
    console.log(`Student with ID ${studentId} was deleted successfully.`);
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (err) {
    console.error('Error in deleting student:', err);
    res.status(500).json({ error: 'An error occurred during deletion' });
  }
};


module.exports = {
  AdminSignup,
  AdminLogin,
  AddStudentData,
  upload,
  updateStudentData,
  deleteStudentData
};