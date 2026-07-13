import axios from "axios";
import { useAuth } from "../store/auth";

// Your backend URL (replace with your FastAPI URL)
const BASE_URL = "https://lingala-app.onrender.com/api";

const client = axios.create({
  baseURL: BASE_URL,
});

// Inject JWT token into every request
client.interceptors.request.use((config) => {
  const token = useAuth.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle 401 → auto logout
client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      useAuth.getState().logout();
    }
    return Promise.reject(err);
  }
);

// Helper to format backend errors
export function apiError(detail: any): string {
  if (!detail) return "Something went wrong";

  if (typeof detail === "string") return detail;

  if (Array.isArray(detail)) {
    return detail
      .map((e) => (e?.msg ? e.msg : JSON.stringify(e)))
      .join(" ");
  }

  if (detail?.msg) return detail.msg;

  return String(detail);
}

export default client;
