import axios from "axios";
const FMI_DOMAIN = "http://localhost:8182";

const AxiosApi = {
  followList: async (userId) => {
    return await axios.get(FMI_DOMAIN + `/mypage/follow?userId=${userId}`);
  },
  getUserInfo: async (userId) => {
    return await axios.get(FMI_DOMAIN + `/mypage/user/${userId}`);
  },
  updateUserInfo: async (user) => {
    return await axios.put(FMI_DOMAIN + `/mypage/user`, user);
  },
  getFollowList: async () => {
    return await axios.get(FMI_DOMAIN + `/mypage/follow`);
  },
  unfollowTeam: async (teamId, userId) => {
    return await axios.delete(
      FMI_DOMAIN + `/mypage/follow/${teamId},${userId}`
    );
  },
  deleteUser: async () => {
    return await axios.delete(FMI_DOMAIN + `/mypage/user`);
  },
};

export default AxiosApi;
