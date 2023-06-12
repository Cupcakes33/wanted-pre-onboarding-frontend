import axios from "axios";
import { tokenManager } from "../util/tokenManager";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
});

instance.interceptors.request.use((config) => {
  config.headers["Authorization"] = tokenManager.getToken();
  return config;
});

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const res = error.response;
    if (res.status === 401) {
      tokenManager.removeToken();
      window.location.reload();
    } else return Promise.reject(error);
  }
);

export default instance;
