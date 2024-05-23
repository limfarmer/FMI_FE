import React, { useEffect, useState } from "react";
import AxiosApi from "../api/AxiosApi";
import EditProfile from "./EditProfile";
import FollowManagement from "./FollowManagement";
import DeleteAccount from "./DeleteAccount";
import MyPageSidebar from "./MyPageSidebar";

const MyPage = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile"); // 'profile', 'follow', 'delete'

  useEffect(() => {
    AxiosApi.getUserInfo()
      .then((response) => setUser(response.data))
      .catch((error) =>
        console.error("사용자 정보를 가져오는 중 오류 발생:", error)
      );
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <EditProfile />;
      case "follow":
        return <FollowManagement />;
      case "delete":
        return <DeleteAccount />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <MyPageSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div style={{ marginLeft: "220px", padding: "20px", width: "100%" }}>
        {user ? (
          <div>
            <h1>{user.name}님, 환영합니다</h1>
            {renderContent()}
          </div>
        ) : (
          <p>로딩 중...</p>
        )}
      </div>
    </div>
  );
};

export default MyPage;
