import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../context/LoginContext";
import "../style/LoginPage.css";

const images = [
  "/images/deklerk-basson-tV3xTMx7DYE-unsplash.jpg",
  "/images/joshi-milestoner-Cm5w7fvuQZA-unsplash.jpg",
  "/images/tim-bechervaise-_hjsopbklZ0-unsplash.jpg",
  "/images/valentin-kremer-noqQBb1EKkc-unsplash.jpg",
  "/images/quan-tran-6Kc77imm5YI-unsplash.jpg",
  "/images/vienna-reyes-Zs_o1IjVPt4-unsplash.jpg",
];

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser, login } = useContext(LoginContext);

  useEffect(() => {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    document.body.style.backgroundImage = `url(${randomImage})`;
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8182/api/login", {
        id: userId,
        pw: password,
      });
      if (response.data) {
        login(userId);
        alert("로그인 성공");
        navigate("/");
      } else {
        setError("로그인 실패");
      }
    } catch (error) {
      console.error("로그인 중 오류 발생!", error);
      setError("인터넷 에러가 발생했습니다.");
    }
  };

  return (
    <div className="container">
      <div className="profile-icon">
        <svg viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </div>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <svg className="icon" viewBox="0 0 24 24">
            <path d="M16 2H8c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 14H8v-2h2v2zm0-4H8V8h2v4zm4 4h-2v-2h2v2zm0-4h-2V8h2v4zm2 4h-2v-2h2v2zm0-4h-2V8h2v4z" />
          </svg>
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <svg className="icon" viewBox="0 0 24 24">
            <path d="M12 1C8.69 1 6 3.69 6 7v4H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2h-1V7c0-3.31-2.69-6-6-6zm0 2c2.21 0 4 1.79 4 4v4H8V7c0-2.21 1.79-4 4-4zm-6 9h12v8H6v-8z" />
          </svg>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" className="login-btn">
          로그인
        </button>
      </form>
      <div className="options">
        <a href="/signup">회원가입 하시겠습니까?</a>
      </div>
    </div>
  );
};

export default LoginPage;
