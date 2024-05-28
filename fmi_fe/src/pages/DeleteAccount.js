import React from "react";
import styles from "../style/MyPage.module.css";
import axios from "axios";

const DeleteAccount = ({ userId }) => {
  const handleDeactivate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/users/deactivate", // 서버 주소와 엔드포인트
        {
          userId: userId,
        }
      );
      if (response.data) {
        alert("Your account has been deactivated.");
      }
    } catch (error) {
      console.error("There was an error deactivating the account!", error);
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>회원 탈퇴</h2>
      <p>정말로 회원 탈퇴를 하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
      <button className={styles.formButton} onClick={handleDeactivate}>
        회원 탈퇴
      </button>
    </div>
  );
};

export default DeleteAccount;
