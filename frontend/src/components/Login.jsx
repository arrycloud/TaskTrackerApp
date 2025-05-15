import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    const emailString = String(email);
    const passwordString = String(password);
    try {
      const userInfo = await authService.login(emailString, passwordString);
     // console.log("user info", userInfo.info.user);
      const loginUserData = {
        sid: userInfo.info.user.SID,
        course: userInfo.info.user.course,
        courseId: userInfo.info.user.courseId,
        name: userInfo.info.user.name,
        image: userInfo.info.user.img,
      };
      localStorage.setItem("userData", JSON.stringify(loginUserData));
      navigate("/examlist");
      console.log("sucess login");
    } catch (err) {}
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>user Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
