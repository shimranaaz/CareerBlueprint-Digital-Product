import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL || "https://careerblueprint-digital-product.onrender.com";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;