import React, { useState, useEffect } from "react";
import MyPageSidebar from "./MyPageSidebar";
import EditProfile from "./EditProfile";
import FollowManagement from "./FollowManagement";
import DeleteAccount from "./DeleteAccount";
import styles from "../style/MyPage.module.css";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

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
