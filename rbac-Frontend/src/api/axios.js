import axios from "axios";

const API = axios.create({
  baseURL: "https://avidus-assignment-1.onrender.com/api",
});

export default API;