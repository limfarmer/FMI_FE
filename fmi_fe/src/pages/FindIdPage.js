import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/LoginPage.css"; // 로그인 페이지의 CSS를 재사용

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

const FindIdPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    setBackgroundImage(getRandomImage());
  }, []);

  const handleFindId = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8182/api/users/findId?email=${email}&name=${name}`
      );
      if (response.data) {
        setUserId(response.data);
        setError("");
      } else {
        setError("일치하는 사용자 정보를 찾을 수 없습니다.");
        setUserId("");
      }
    } catch (error) {
      console.error("ID 찾기 중 오류 발생!", error);
      setError("인터넷 에러가 발생했습니다.");
      setUserId("");
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
        <form onSubmit={handleFindId}>
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
          {userId && <div className="success">당신의 아이디: {userId}</div>}
          {error && <div className="error">{error}</div>}
          <button type="submit" className="find-btn">
            아이디 찾기
          </button>
        </form>
      </div>
    </div>
  );
};

export default FindIdPage;
