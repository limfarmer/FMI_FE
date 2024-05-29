import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../context/LoginContext";
import "../style/LoginPage.css";

const images = [
  "/images/10.jpg",
  "/images/11.jpg",
  "/images/12.jpg",
  "/images/13.jpg",
  "/images/14.jpg",
  "/images/15.jpg",
];

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(getRandomImage());
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);

  useEffect(() => {
    const randomImage = getRandomImage();
    setBackgroundImage(randomImage);
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
    <div
      className="background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container">
        <div className="profile-icon">
          <svg viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="text"
              placeholder="아이디"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="비밀번호"
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
          <a href="/signup">회원가입</a>
          <a href="/find-id">아이디 찾기</a>
          <a href="/find-password">비밀번호 찾기</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
