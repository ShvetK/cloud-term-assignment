import axios from "axios";
require("dotenv").config();

export const axiosInstance = axios.create({
  baseURL: "http://54.167.236.187:7001",
});
