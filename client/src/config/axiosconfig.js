import axios from "axios";
export const axiosAdmin= axios.create({
  baseURL: "http://localhost:4000/admin",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: "http://localhost:4000/user",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
