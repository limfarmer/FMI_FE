import React from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";

const DeleteAccount = () => {
  const navigate = useNavigate();

  const handleDelete = () => {
    AxiosApi.deleteUser()
      .then(() => {
        alert("계정이 성공적으로 삭제되었습니다.");
        navigate("/");
      })
      .catch((error) => console.error("회원 탈퇴 중 오류 발생:", error));
  };

  return (
    <div>
      <h1>회원 탈퇴</h1>
      <p>정말로 회원 탈퇴를 하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
      <button onClick={handleDelete}>회원 탈퇴</button>
    </div>
  );
};

export default DeleteAccount;
