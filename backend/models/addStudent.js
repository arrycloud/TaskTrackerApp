const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender:{type:String,required:true},
  SID: { type: String, required: true, unique: true },
  course:{type:String,required:true},
  courseId:{type:String,required:true},
  stuCourseEndYear: { type: Number, required: true },
  mobno: { type: Number, required: true }, 
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  img: { type: String, required: true } 
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
