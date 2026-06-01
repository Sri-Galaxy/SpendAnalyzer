import axiosInstance from './axiosInstance.js';


export async function loginUser(email, password) {
    const response = await axiosInstance.post("/user/login", {email, password});
    return response.data;
}

export async function registerUser(name, email, password) {
  const response = await axiosInstance.post("/user/register", { name, email, password });
  return response.data;
}

export async function logoutUser() {
  const response = await axiosInstance.post("/user/logout");
  return response.data;
}