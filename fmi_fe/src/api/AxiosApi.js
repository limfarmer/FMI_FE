import axios from "axios";
const FMI_DOMAIN = "http://localhost:8111";

const AxiosApi = {
  boardList: async (id) => {
    return await axios.get(FMI_DOMAIN + "/user");
  },
};
export default AxiosApi;
