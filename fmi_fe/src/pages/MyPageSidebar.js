import React from "react";
import styles from "../../src/style/MyPage.module.css";
import logo from "../../src/images/FMI_logo.png"; // 로고 이미지 파일 경로를 수정하세요

const MyPageSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
      </div>
      <button
        className={`${styles.sidebarButton} ${
          activeTab === "profile" ? styles.sidebarButtonActive : ""
        }`}
        onClick={() => setActiveTab("profile")}
      >
        Edit Profile
      </button>
      <button
        className={`${styles.sidebarButton} ${
          activeTab === "follow" ? styles.sidebarButtonActive : ""
        }`}
        onClick={() => setActiveTab("follow")}
      >
        Followed Teams
      </button>
      <button
        className={`${styles.sidebarButton} ${
          activeTab === "delete" ? styles.sidebarButtonActive : ""
        }`}
        onClick={() => setActiveTab("delete")}
      >
        Delete Account
      </button>
    </div>
  );
};

export default MyPageSidebar;
