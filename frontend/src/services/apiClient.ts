import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:1337", // Place backend API here
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;