import React from "react";
import styles from "../style/MyPage.module.css";
import axios from "axios";

const DeleteAccount = () => {
  const handleDelete = () => {
    axios
      .post("/api/deleteAccount")
      .then((response) => {
        // 성공 시 처리 로직
        console.log("Account deleted successfully");
      })
      .catch((error) => {
        // 오류 시 처리 로직
        console.error("There was an error deleting the account!", error);
      });
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>회원 탈퇴</h2>
      <p>정말로 회원 탈퇴를 하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
      <button className={styles.formButton} onClick={handleDelete}>
        회원 탈퇴
      </button>
    </div>
  );
};

export default DeleteAccount;
