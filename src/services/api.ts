import axios from "axios";

const JokioBackend = axios.create({
  // baseURL: process.env.JOKIO_BACKEND_URL,
  baseURL: "http://localhost:3333",
});

export { JokioBackend };
