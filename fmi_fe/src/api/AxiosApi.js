import axios from "axios";
const FMI_DOMAIN = "http://localhost:8182";

const AxiosApi = {
  followList: async (userId) => {
    return await axios.get(FMI_DOMAIN + `/follow/list?userId=${userId}`);
  },
};
export default AxiosApi;
