import React, { useState } from "react";
import MyPageSidebar from "./MyPageSidebar";
import EditProfile from "./EditProfile";
import FollowManagement from "./FollowManagement";
import DeleteAccount from "./DeleteAccount";
import styles from "../style/MyPage.module.css";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <EditProfile />;
      case "follow":
        return <FollowManagement />;
      case "delete":
        return <DeleteAccount />;
      default:
        return <EditProfile />;
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
