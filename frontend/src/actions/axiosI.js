import axios from "axios";
require("dotenv").config();

export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER}`,
});
