import axios from "axios";
const instance = axios.create({
  baseURL: "https://amazon-by-akash.herokuapp.com",
});
export default instance;
