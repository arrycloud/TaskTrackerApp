import React from "react";
import "../styles/landingPage.css";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const nevigateTo = useNavigate();
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);
  };

  const userLogin = () => {
    nevigateTo("/login");
  };
  const adminLogin = () => {
    nevigateTo("/adminLogin");
  };
  const adminSignup = () => {
    nevigateTo("/adminSignup");
  };
  const userSignup = () => {
    nevigateTo("/signup");
  };

  return (
    <div className="landing-page">
      <header className="header">
        <nav className="snav">
          <img src="exam-logo.jpeg" alt="exam app logo" />
          <ul className="nav-links">
            <li>
              <a href="#about">ABOUT</a>
            </li>
            <li>
              <a href="#features">FEATURES</a>
            </li>
            <li>
              <a onClick={adminLogin}>ADMIN</a>
            </li>
            <li>
              <a href="#contact">CONTACTS</a>
            </li>
            <li>
              <a onClick={userLogin}>LOGIN</a>
            </li>
          </ul>
        </nav>
      </header>

      <section className="hero" id="about">
        <h2>Welcome to ExamApp</h2>
        <p>
          Streamline your exam experience with our easy-to-use online platform.
        </p>
        <a onClick={userLogin} className="cta-button">
          Get Started
        </a>
      </section>

      <h2 className="l-h2">Features</h2>
      <section id="features" className="features">
        <div className="feature-student">
          <h4>For Students</h4>
          <p>
            Login with your roll number and password, choose your exam, and
            start answering questions.
          </p>
          <button onClick={userLogin} className="cta-button">
            Login
          </button>
          {/* <button onClick={userSignup} className="cta-button">
            Signup
          </button> */}
        </div>
        <div className="feature-admin">
          <h4>For Admins</h4>
          <p>
            Manage exams, questions, and students effortlessly through a
            powerful dashboard.
          </p>
          <button onClick={adminLogin} className="cta-button">
            Login
          </button>
          <button onClick={adminSignup} className="cta-button">
            Signup
          </button>
        </div>
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
};

export default LandingPage;
