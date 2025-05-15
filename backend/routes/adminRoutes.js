const express = require('express');
const { AdminSignup, AdminLogin, AddStudentData,updateStudentData,deleteStudentData,upload
    } = require('../controllers/adminAuthController');

const router = express.Router();

router.post('/adminSignup', AdminSignup);
router.post('/adminLogin', AdminLogin);
router.post('/addStu', upload.single('img'), AddStudentData);
router.put('/updtStu', upload.single('img'), updateStudentData);
router.delete('/deleteStu/:studentId', deleteStudentData);


module.exports = router;

