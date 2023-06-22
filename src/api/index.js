import axios from "axios";

// const API = axios.create({ baseURL: "https://ecom-z3we.onrender.com" });
const API = axios.create({
  baseURL: "https://ecom-oto.vercel.app",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user_info")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("user_info").token
    )}`;
  }

  return req;
});
export const signIn = (data) => API.post("/api/user/login", data);
export const signInGoogle = (accessToken) =>
  API.post("/api/user/login", {
    googleAccessToken: accessToken,
  });
export const signUp = (data) => API.post("/api/user/register", data);
export const signUpGoogle = (accessToken) =>
  API.post("/api/user/register", {
    googleAccessToken: accessToken,
  });
