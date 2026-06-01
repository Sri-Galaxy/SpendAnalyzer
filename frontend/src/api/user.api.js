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

export async function getMe() {
  const response = await axiosInstance.get("/user/me");
  return response.data;
}
export async function updateMe(name, email) {
  const response = await axiosInstance.put("/user/me", { name, email });
  return response.data;
}
export async function changePassword(oldPassword, newPassword) {
  const response = await axiosInstance.post("/user/change-password", { oldPassword, newPassword });
  return response.data;
}
export async function deleteMe() {
  const response = await axiosInstance.delete("/user/me");
  return response.data;
}