import axios from "axios";

const baseURL = "https://coebackendacademia.herokuapp.com/login.php?login";

const loginService = async (credentials) => {
  const { data } = await axios.post(baseURL, credentials);
  return data;
};
export default { loginService };
