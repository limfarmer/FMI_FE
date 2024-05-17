import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8181",
  timeout: 10000,
});

export const fetchUsers = () => api.get("/users");
export const createUser = (userData) => api.post("/users", userData);
export const deleteUser = (userId) => api.delete(`/users/${userId}`);
