import axios from "axios";
import { getApiErrorMessage } from "../utils/apiError";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = getApiErrorMessage(error, "Unable to reach the server");
    return Promise.reject(new Error(message));
  }
);

export default api;
