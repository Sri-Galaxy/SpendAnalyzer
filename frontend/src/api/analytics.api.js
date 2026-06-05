import axiosInstance from "./axiosInstance";


export async function getSummary() {
  const response = await axiosInstance.get("/analytics/summary");
  return response.data;
}
export async function getCategorySummary() {
  const response = await axiosInstance.get("/analytics/category-summary");
  return response.data;
}
export async function getPaymentSummary() {
  const response = await axiosInstance.get("/analytics/payment-summary");
  return response.data;
}
export async function getMonthlyTrends() {
  const response = await axiosInstance.get("/analytics/monthly-summary");
  return response.data;
}