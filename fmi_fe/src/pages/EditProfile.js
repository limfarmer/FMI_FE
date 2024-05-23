import React, { useState, useEffect } from "react";
import AxiosApi from "../api/AxiosApi";

const EditProfile = () => {
  const [user, setUser] = useState({ name: "", email: "", nickname: "" });

  useEffect(() => {
    AxiosApi.getUserInfo()
      .then((response) => setUser(response.data))
      .catch((error) =>
        console.error("사용자 정보를 가져오는 중 오류 발생:", error)
      );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AxiosApi.updateUserInfo(user)
      .then(() => alert("정보가 성공적으로 업데이트되었습니다."))
      .catch((error) =>
        console.error("사용자 정보를 업데이트하는 중 오류 발생:", error)
      );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>이름:</label>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
      />
      <label>이메일:</label>
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
      />
      <label>닉네임:</label>
      <input
        type="text"
        name="nickname"
        value={user.nickname}
        onChange={handleChange}
      />
      <button type="submit">변경 사항 저장</button>
    </form>
  );
};

export default EditProfile;
