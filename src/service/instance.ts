import axios from "axios";
import { tokenManager } from "../util/tokenManager";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
});

instance.interceptors.request.use((config) => {
  config.headers["Authorization"] = tokenManager.getToken();
  return config;
});

export default instance;
