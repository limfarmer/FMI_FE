import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../style/MyPage.module.css";

const EditProfile = () => {
  const [user, setUser] = useState({
    id: "your_user_id", // 실제 사용자 ID를 여기에 설정
    name: "",
    email: "",
    nickname: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8182/api/users/${user.id}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("There was an error fetching the user data!", error);
      }
    };
    fetchUser();
  }, [user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8182/api/users/${user.id}`, user);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("There was an error updating the profile!", error);
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>회원 정보 수정</h2>
      <form onSubmit={handleSubmit}>
        <label className={styles.formLabel}>이름</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          className={styles.formInput}
        />
        <label className={styles.formLabel}>이메일</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className={styles.formInput}
        />
        <label className={styles.formLabel}>닉네임</label>
        <input
          type="text"
          name="nickname"
          value={user.nickname}
          onChange={handleChange}
          className={styles.formInput}
        />
        <button type="submit" className={styles.formButton}>
          수정
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
