import React from "react";
import styles from "../style/MyPage.module.css";
import logo from "../images/FMI_logo.png";
import { useNavigate } from "react-router-dom";

const MyPageSidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className={styles.sidebar}>
      <div
        className={styles.logo}
        onClick={handleLogoClick}
        style={{ cursor: "pointer" }}
      >
        <img src={logo} alt="Logo" />
      </div>
      <button
        className={`${styles.sidebarButton} ${
          activeTab === "profile" ? styles.sidebarButtonActive : ""
        }`}
        onClick={() => setActiveTab("profile")}
      >
        회원정보 수정
      </button>
      <button
        className={`${styles.sidebarButton} ${
          activeTab === "follow" ? styles.sidebarButtonActive : ""
        }`}
        onClick={() => setActiveTab("follow")}
      >
        팔로우한 팀
      </button>
      <button
        className={`${styles.sidebarButton} ${
          activeTab === "delete" ? styles.sidebarButtonActive : ""
        }`}
        onClick={() => setActiveTab("delete")}
      >
        계정 삭제
      </button>
    </div>
  );
};

export default MyPageSidebar;
