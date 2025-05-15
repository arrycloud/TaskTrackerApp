import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

const AddStudent = () => {
  const [studentData, setStudentData] = useState({
    stuName: "",
    stuUid: "",
    stuCourse: "",
    stuCurseId: "",
    stuCourseEndYear: "",
    stuMobileNo: "",
    stuPassword: "",
    stuGender: "",
    stuEmail: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const handleStudentData = (event) => {
    const { name, value } = event.target;
    setStudentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const navigate = useNavigate();

  const handleAddStudent = async (e) => {
    e.preventDefault();

    // Create FormData to handle both text and file data
    const formData = new FormData();
    formData.append("name", studentData.stuName);
    formData.append("gender", studentData.stuGender);
    formData.append("SID", studentData.stuUid);
    formData.append("course", studentData.stuCourse);
    formData.append("courseId", studentData.stuCurseId);
    formData.append("stuCourseEndYear", studentData.stuCourseEndYear);
    formData.append("mobno", studentData.stuMobileNo);
    formData.append("email", studentData.stuEmail);
    formData.append("password", studentData.stuPassword);

    // Add image file if selected
    if (imageFile) {
      formData.append("img", imageFile); 
    }

    try {
      // Send FormData to authService
      await authService.addStudent(formData);
      console.log("Student added successfully");
      navigate("/addStu");
      alert(`Student With UID: ${studentData.stuUid} is regestered successfully`);
    } catch (err) {
      console.error(
        "Adding Student error:",
        err.response ? err.response.data : err.message
      );
      alert(`error: All Fields are Required`);
    }
  };

  const back = () => {
    navigate("/adminDashboard");
  };

  return (
    <form onSubmit={handleAddStudent}>
      <h2>Add Student</h2>
      <label htmlFor="imageInput" className="imageStu">
        {imageFile ? (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="add Image"
            className="demoImg"
          />
        ) : (
          <img src="dummy.jpeg" alt="add Image" className="demoImg" />
        )}
      </label>
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        onChange={handleImageChange}
      />
      <input
        type="text"
        name="stuName"
        placeholder="Student Name"
        value={studentData.stuName}
        onChange={handleStudentData}
        required
      />
      <input
        type="text"
        name="stuGender"
        placeholder="Student Gender"
        value={studentData.stuGender}
        onChange={handleStudentData}
        required
      />
      <input
        type="text"
        name="stuUid"
        placeholder="Student Id Must be Unique"
        value={studentData.stuUid}
        onChange={handleStudentData}
        required
      />
      <input
        type="text"
        name="stuCourse"
        placeholder="Student Enrolled Course"
        value={studentData.stuCourse}
        onChange={handleStudentData}
        required
      />
      <input
        type="text"
        name="stuCurseId"
        placeholder="Student Course Id"
        value={studentData.stuCurseId}
        onChange={handleStudentData}
        required
      />
      <input
        type="text"
        name="stuCourseEndYear"
        placeholder="Course End Year"
        value={studentData.stuCourseEndYear}
        onChange={handleStudentData}
        required
      />
      <input
        type="text"
        name="stuMobileNo"
        placeholder="Mobile No"
        value={studentData.stuMobileNo}
        onChange={handleStudentData}
        required
      />
      <input
        type="email"
        name="stuEmail"
        placeholder="Student Email Id must be unique"
        value={studentData.stuEmail}
        onChange={handleStudentData}
        required
      />
      <input
        type="password"
        name="stuPassword"
        placeholder="Password"
        value={studentData.stuPassword}
        onChange={handleStudentData}
        required
      />
      <button type="submit">Add Student</button>
      <button type="button" onClick={back}>
        Back
      </button>
    </form>
  );
};

export default AddStudent;
