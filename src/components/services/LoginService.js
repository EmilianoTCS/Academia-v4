import axios from "axios";

const baseURL =
  "http://localhost/App_v2/AcademiaFormaci%C3%B3n_V2/login.php?login";

const loginService = async (credentials) => {
  const { data } = await axios.post(baseURL, credentials);
  return data;
};
export default { loginService };
