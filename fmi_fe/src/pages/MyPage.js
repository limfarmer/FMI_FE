import React, { useState } from "react";
import MyPageSidebar from "./MyPageSidebar";
import EditProfile from "./EditProfile";
import FollowManagement from "./FollowManagement";
import DeleteAccount from "./DeleteAccount";
import styles from "../style/MyPage.module.css";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const userId = "your_user_id"; // 실제 사용자 ID로 대체해야 합니다.

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <EditProfile userId={userId} />;
      case "follow":
        return <FollowManagement userId={userId} />;
      case "delete":
        return <DeleteAccount userId={userId} />;
      default:
        return <EditProfile userId={userId} />;
    }
  };

  return (
    <div className={styles.mypageContainer}>
      <MyPageSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={styles.contentContainer}>{renderContent()}</div>
    </div>
  );
};

export default MyPage;
