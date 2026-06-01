import axiosInstance from "./axiosInstance.js";


export async function getExpenses(filters = {}) {
    const response = await axiosInstance.get("/expense", { params: filters });
    return response.data;
}

export async function addExpense(data) {
    const response = await axiosInstance.post("/expense", data);
    return response.data;
}

export async function getExpenseById(id) {
    const response = await axiosInstance.get(`/expense/${id}`);
    return response.data;
}

export async function updateExpense(id, data) {
    const response = await axiosInstance.patch(`/expense/${id}`, data);
    return response.data;
}

export async function deleteExpense(id) {
    const response = await axiosInstance.delete(`/expense/${id}`);
    return response.data;
}