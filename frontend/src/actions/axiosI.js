import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:7001",
  baseURL: process.env.REACT_APP_SERVER,
});
