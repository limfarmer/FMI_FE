import React from "react";
import "../../style/MyPageSidebar.css"; // 스타일링을 위한 CSS 파일

const MyPageSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <button
        className={activeTab === "profile" ? "active" : ""}
        onClick={() => setActiveTab("profile")}
      >
        회원 정보 수정
      </button>
      <button
        className={activeTab === "follow" ? "active" : ""}
        onClick={() => setActiveTab("follow")}
      >
        팔로우 팀 관리
      </button>
      <button
        className={activeTab === "delete" ? "active" : ""}
        onClick={() => setActiveTab("delete")}
      >
        회원 탈퇴
      </button>
    </div>
  );
};

export default MyPageSidebar;
