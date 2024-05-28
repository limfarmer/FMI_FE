import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

const SignupPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(getRandomImage());
  const navigate = useNavigate();

  useEffect(() => {
    const randomImage = getRandomImage();
    setBackgroundImage(randomImage);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8182/api/users/signup",
        {
          id: userId,
          pw: password,
          email,
          name,
          nickname,
          joinDate: new Date(), // 현재 날짜를 joinDate로 설정
        }
      );
      if (response.data) {
        alert("회원가입 성공");
        navigate("/login");
      } else {
        setError("회원가입 실패");
      }
    } catch (error) {
      console.error("회원가입 중 오류 발생!", error);
      setError("인터넷 에러가 발생했습니다.");
    }
  };

  return (
    <div
      className="background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container">
        <form onSubmit={handleSignup}>
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
          <div className="form-group">
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit" className="login-btn">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
