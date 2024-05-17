import axios from "axios";
const FMI_DOMAIN = "http://localhost:8111";

const AxiosApi = () => {
  const seacrhList = async (inputValue) => {
    const search = {
      inputValue: inputValue,
    };
    return await axios.get(FMI_DOMAIN + `/auth/exists/${inputValue}`);
  };
};
export default AxiosApi;
