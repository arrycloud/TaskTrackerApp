
import React from 'react';
import {useNavigate} from 'react-router-dom';
import "../../styles/admin.css";

function AdminDashboard() {
  const navigateTo = useNavigate();
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };
  const logout=()=>{
    return;
  }

  const addStudent=()=>{
    navigateTo("/addStu");
  }

  const addExam=()=>{
    navigateTo("/addExam");
  }
  const addQuestion=()=>{
    navigateTo("/addQue");
  }

  const Result=()=>{
    navigateTo("/result");
  }

  const Delete=()=>{
    navigateTo("/delete");
  }

  
  const logoutAdmin=()=>{
    navigateTo("/");
  }


  const updateStudent=()=>{
    navigateTo("/updtStu");
  }

  const updateExam=()=>{
    navigateTo("/updtExam");
  }

  const updateQuestion=()=>{
    navigateTo("/updtQue");
  }
  return(
    <div>
      <header className="adheader">
        <nav className="adsnav">
          <img src="exam-logo.jpeg" alt="exam app logo" />
          <ul className="adnav-links">
            <li>
              <a href="#about">HOME</a>
            </li>
            <li>
              <a href="#contact">CONTACTS</a>
            </li>
            <li>
              <a onClick={logoutAdmin}>LOGOUT</a>
            </li>
          </ul>
          <img src="exam-logo.jpeg" alt="exam app logo" />
        </nav>
      </header>

      <section className="adsection">
        <div onClick={addStudent} className="adcards">ADD NEW STUDENT</div>
        <div onClick={addExam} className="adcards">ADD NEW EXAM</div>
        <div onClick={addQuestion} className="adcards">ADD QUESTION</div>
        <div onClick={updateStudent} className="adcards">UPDATE STUDENT</div>
        <div onClick={updateExam} className="adcards">UPDATE EXAM</div>
        <div onClick={updateQuestion} className="adcards">UPDATE QUESTION</div>
        <div onClick={Delete} className="adcards">DELETE</div>
        <div onClick={Result} className="adcards">STUDENT RESULT</div>
      </section>

      <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about"></div>
          <div className="footer-section links">
            <h2>Quick Links</h2>
            <ul>
              <li>
                <a href="#">ABOUT</a>
              </li>
              <li>
                <a>FEATURES</a>
              </li>
              <li>
                <a>STUDENT LOGIN</a>
              </li>
              <li>
                <a>ADMIN LOGIN</a>
              </li>
              <li>
                <a>ADMIN SIGNUP</a>
              </li>
              <li>
                <a>CONTACTS US</a>
              </li>
            </ul>
          </div>
          <div className="footer-section contact-form">
            <h2>Contact Us</h2>
            <form>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 ExamApp. All rights reserved.</p>
          <a href="mailto:amtcuo8579gmail.com">amtcuo8579gmail.com</a>
        </div>
      </div>
    </footer>
    </div>
  );
}

export default AdminDashboard;
