import axios from "axios";
import router from "next/router";

const JokioBackend = axios.create({
  // baseURL: process.env.JOKIO_BACKEND_URL,
  baseURL: "http://localhost:3333",
});

JokioBackend.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Redirect the user to the login page
      router.push("/");
    }
    return Promise.reject(error);
  }
);

export { JokioBackend };
